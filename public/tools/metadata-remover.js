// Photo metadata viewer and remover. Runs entirely in the browser: the file is
// read with FileReader, EXIF is parsed from JPEG APP1, and the clean copy is a
// canvas re-encode (which carries no EXIF, GPS, XMP or IPTC). Nothing is uploaded.
(function () {
  const input = document.getElementById("mr-file");
  if (!input) return;
  const out = document.getElementById("mr-out");
  const status = document.getElementById("mr-status");
  const table = document.getElementById("mr-table");
  const preview = document.getElementById("mr-preview");
  const save = document.getElementById("mr-save");
  let cleanUrl = null;

  const TAGS = {
    ifd0: { 0x010f: "Camera make", 0x0110: "Camera model", 0x0131: "Software", 0x0132: "Modified", 0x013b: "Artist", 0x8298: "Copyright" },
    exif: { 0x9003: "Taken", 0xa434: "Lens", 0xa433: "Lens make", 0x9010: "Time zone", 0xa420: "Unique image ID", 0xa431: "Camera serial number" },
  };

  function readExif(buf) {
    const v = new DataView(buf);
    if (v.getUint16(0) !== 0xffd8) return null;
    const found = { fields: [], gps: null, extra: [] };
    let off = 2;
    while (off + 4 < v.byteLength) {
      const marker = v.getUint16(off);
      if ((marker & 0xff00) !== 0xff00) break;
      const len = v.getUint16(off + 2);
      if (marker === 0xffe1) {
        const head = String.fromCharCode(...new Uint8Array(buf, off + 4, Math.min(28, len - 2)));
        if (head.startsWith("Exif")) parseTiff(v, off + 10, found);
        else if (head.startsWith("http://ns.adobe.com/xap")) found.extra.push("XMP metadata block");
      } else if (marker === 0xffed) {
        found.extra.push("IPTC / Photoshop metadata block");
      } else if (marker === 0xffda) {
        break;
      }
      off += 2 + len;
    }
    return found;
  }

  function parseTiff(v, t, found) {
    const le = v.getUint16(t) === 0x4949;
    const u16 = (o) => v.getUint16(t + o, le);
    const u32 = (o) => v.getUint32(t + o, le);
    const ascii = (o, n) => {
      let s = "";
      for (let i = 0; i < n; i++) {
        const c = v.getUint8(t + o + i);
        if (!c) break;
        s += String.fromCharCode(c);
      }
      return s.trim();
    };
    const rational = (o) => u32(o) / (u32(o + 4) || 1);
    function ifd(o, names, visit) {
      const n = u16(o);
      for (let i = 0; i < n; i++) {
        const e = o + 2 + i * 12;
        const tag = u16(e), type = u16(e + 2), count = u32(e + 4);
        const dataOff = count * (type === 5 ? 8 : type === 3 ? 2 : type === 4 ? 4 : 1) > 4 ? u32(e + 8) : e + 8;
        if (visit) visit(tag, type, count, dataOff, e);
        if (names && names[tag] && type === 2) {
          const val = ascii(dataOff, count);
          if (val) found.fields.push([names[tag], val]);
        }
      }
    }
    let exifPtr = 0, gpsPtr = 0;
    ifd(u32(4), TAGS.ifd0, (tag, type, count, dataOff, e) => {
      if (tag === 0x8769) exifPtr = u32(e + 8);
      if (tag === 0x8825) gpsPtr = u32(e + 8);
    });
    if (exifPtr) ifd(exifPtr, TAGS.exif);
    if (gpsPtr) {
      const g = {};
      ifd(gpsPtr, null, (tag, type, count, dataOff) => {
        if (tag === 1 || tag === 3) g[tag] = ascii(dataOff, 2);
        if ((tag === 2 || tag === 4) && type === 5) g[tag] = rational(dataOff) + rational(dataOff + 8) / 60 + rational(dataOff + 16) / 3600;
        if (tag === 6 && type === 5) g.alt = rational(dataOff);
      });
      if (g[2] != null && g[4] != null) {
        found.gps = {
          lat: (g[1] === "S" ? -1 : 1) * g[2],
          lon: (g[3] === "W" ? -1 : 1) * g[4],
          alt: g.alt,
        };
      }
    }
  }

  function row(k, v, warn) {
    const tr = document.createElement("tr");
    const th = document.createElement("th");
    const td = document.createElement("td");
    th.textContent = k;
    td.textContent = v;
    if (warn) td.style.fontWeight = "650";
    tr.append(th, td);
    table.append(tr);
  }

  async function handle(file) {
    table.textContent = "";
    out.hidden = false;
    save.hidden = true;
    preview.removeAttribute("src");
    if (cleanUrl) URL.revokeObjectURL(cleanUrl);
    status.textContent = "Reading " + file.name + " on your device…";

    const buf = await file.arrayBuffer();
    const info = readExif(buf);
    row("File", file.name + " · " + Math.round(file.size / 1024) + " KB");
    if (info) {
      if (info.gps) {
        row("Location", info.gps.lat.toFixed(5) + ", " + info.gps.lon.toFixed(5) + (info.gps.alt != null ? " · " + Math.round(info.gps.alt) + " m" : ""), true);
      } else {
        row("Location", "None found");
      }
      for (const [k, v] of info.fields) row(k, v);
      for (const x of info.extra) row("Also contains", x);
      if (!info.gps && !info.fields.length && !info.extra.length) row("Metadata", "No EXIF metadata found");
    } else {
      row("Metadata", "Details are shown for JPEG files. The clean copy below works for any image your browser can open.");
    }

    try {
      const bitmap = await createImageBitmap(file, { imageOrientation: "from-image" });
      const canvas = document.createElement("canvas");
      canvas.width = bitmap.width;
      canvas.height = bitmap.height;
      canvas.getContext("2d").drawImage(bitmap, 0, 0);
      const type = file.type === "image/png" || file.type === "image/webp" ? file.type : "image/jpeg";
      const blob = await new Promise((r) => canvas.toBlob(r, type, 0.92));
      cleanUrl = URL.createObjectURL(blob);
      preview.src = cleanUrl;
      save.href = cleanUrl;
      save.download = file.name.replace(/\.[^.]+$/, "") + "-clean." + type.split("/")[1].replace("jpeg", "jpg");
      save.hidden = false;
      status.textContent = "Done. The clean copy has no location, camera details, timestamps or other metadata. Nothing was uploaded.";
    } catch (e) {
      status.textContent = "Your browser can't open this image format (HEIC opens in Safari). The metadata above was still read on your device.";
    }
  }

  input.addEventListener("change", () => input.files[0] && handle(input.files[0]));
  const drop = document.getElementById("mr-drop");
  drop.addEventListener("dragover", (e) => { e.preventDefault(); drop.classList.add("over"); });
  drop.addEventListener("dragleave", () => drop.classList.remove("over"));
  drop.addEventListener("drop", (e) => {
    e.preventDefault();
    drop.classList.remove("over");
    if (e.dataTransfer.files[0]) handle(e.dataTransfer.files[0]);
  });
})();
