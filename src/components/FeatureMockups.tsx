import { motion } from "framer-motion";
import { Mail, BellOff, Laptop } from "lucide-react";
import lidPhoto from "@/assets/feature-lid-photo.jpg";
import coughPhoto from "@/assets/feature-cough-photo.jpg";

const FrameShell = ({ children }: { children: React.ReactNode }) => (
  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-[#0b0b14] ring-1 ring-white/5">
    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--brand-violet)/0.18),transparent_70%)]" />
    {children}
  </div>
);

/* --------- NOTIFICATION (banner appears -> frosts) --------- */
export const NotificationMockup = () => (
  <FrameShell>
    {/* fake desktop background */}
    <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/40 via-purple-900/30 to-slate-900" />
    {/* menu bar */}
    <div className="absolute inset-x-0 top-0 h-6 bg-black/40 backdrop-blur-sm flex items-center justify-end gap-3 px-3 text-[8px] text-white/70">
      <span>100%</span><span>Wed 13:12</span>
    </div>

    {/* banner */}
    <motion.div
      initial={{ opacity: 0, x: 40, y: -10 }}
      animate={{
        opacity: [0, 1, 1, 1, 1],
        x: [40, 0, 0, 0, 0],
      }}
      transition={{ duration: 4, times: [0, 0.2, 0.5, 0.8, 1], repeat: Infinity, repeatDelay: 0.5 }}
      className="absolute right-3 top-9 w-[58%] rounded-xl bg-white/95 p-2.5 shadow-xl"
    >
      <div className="flex items-start gap-2">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-blue-500">
          <Mail className="h-4 w-4 text-white" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between">
            <p className="text-[9px] font-semibold text-slate-900">Sarah Chen</p>
            <span className="text-[7px] text-slate-500">now</span>
          </div>
          <p className="text-[8px] font-medium text-slate-800 leading-tight">Re: Q4 financials attached</p>
          <p className="text-[7px] text-slate-500 leading-tight mt-0.5">Hey — sending the updated deck and the…</p>
        </div>
      </div>

      {/* frost overlay that animates in */}
      <motion.div
        initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
        animate={{ opacity: [0, 0, 1, 1, 0], backdropFilter: ["blur(0px)", "blur(0px)", "blur(8px)", "blur(8px)", "blur(0px)"] as any }}
        transition={{ duration: 4, times: [0, 0.35, 0.5, 0.85, 1], repeat: Infinity, repeatDelay: 0.5 }}
        className="absolute inset-0 rounded-xl bg-white/40"
        style={{ backdropFilter: "blur(8px)" as any }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/90 shadow ring-1 ring-black/5">
            <BellOff className="h-3.5 w-3.5 text-brand-violet" />
          </div>
        </div>
      </motion.div>
    </motion.div>
  </FrameShell>
);

/* --------- CLOSE TO BLUR (lid angle drops, blur grows) --------- */
export const LidMockup = () => (
  <FrameShell>
    <img
      src={lidPhoto}
      alt=""
      loading="lazy"
      className="absolute inset-0 h-full w-full object-cover"
    />

    {/* lid-closing curtain: a dark band that descends from the top of the screen */}
    <motion.div
      initial={{ height: "0%" }}
      animate={{ height: ["0%", "0%", "55%", "55%", "0%"] }}
      transition={{ duration: 4.5, times: [0, 0.2, 0.55, 0.85, 1], repeat: Infinity, repeatDelay: 0.4, ease: "easeInOut" }}
      className="pointer-events-none absolute left-[24%] right-[22%] top-[31%] overflow-hidden rounded-t-[10px]"
      style={{ transformOrigin: "top center" }}
    >
      <div className="h-full w-full bg-gradient-to-b from-zinc-900 via-zinc-800 to-zinc-700/80 ring-1 ring-white/5" />
    </motion.div>

    {/* frost overlay clipped to the laptop screen area */}
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 0, 0.95, 0.95, 0] }}
      transition={{ duration: 4.5, times: [0, 0.3, 0.55, 0.85, 1], repeat: Infinity, repeatDelay: 0.4 }}
      className="pointer-events-none absolute left-[24%] right-[22%] top-[31%] h-[34%] rounded-md bg-white/35"
      style={{ backdropFilter: "blur(10px)" as any }}
    />

    {/* status pill */}
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: [0, 0, 1, 1, 0], y: [8, 8, 0, 0, 8] }}
      transition={{ duration: 4.5, times: [0, 0.3, 0.5, 0.85, 1], repeat: Infinity, repeatDelay: 0.4 }}
      className="absolute left-1/2 top-3 -translate-x-1/2 rounded-full bg-black/60 px-3 py-1 text-[10px] text-white ring-1 ring-white/10 backdrop-blur"
    >
      <Laptop className="mr-1 inline h-3 w-3" /> Lid closing — frosting screen
    </motion.div>
  </FrameShell>
);

/* --------- COUGH TO HIDE (3/4 laptop + person silhouette + cough bubble) --------- */
export const CoughMockup = () => (
  <FrameShell>
    <img
      src={coughPhoto}
      alt=""
      loading="lazy"
      className="absolute inset-0 h-full w-full object-cover"
    />
    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/30" />

    {/* frost overlay clipped over the laptop screen on the right */}
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 0, 0.95, 0.95, 0] }}
      transition={{ duration: 4.5, times: [0, 0.4, 0.55, 0.9, 1], repeat: Infinity, repeatDelay: 0.4 }}
      className="pointer-events-none absolute left-[63%] right-[10%] top-[44%] h-[36%] rounded-md bg-white/40"
      style={{ backdropFilter: "blur(10px)" as any }}
    />

    {/* cough bubble */}
    <motion.div
      initial={{ opacity: 0, scale: 0.7, y: 8 }}
      animate={{
        opacity: [0, 0, 1, 1, 0],
        scale: [0.7, 0.7, 1, 1, 0.7],
        y: [8, 8, 0, 0, 8],
      }}
      transition={{ duration: 4.5, times: [0, 0.3, 0.45, 0.7, 1], repeat: Infinity, repeatDelay: 0.4 }}
      className="absolute left-[34%] top-[20%]"
    >
      <div className="relative rounded-2xl bg-white px-3 py-1.5 text-[11px] font-semibold text-slate-900 shadow-xl">
        “cough!”
        <span className="absolute -bottom-1 left-3 h-3 w-3 rotate-45 bg-white" />
      </div>
    </motion.div>

    {/* sound waves emitting toward laptop */}
    {[0, 1, 2].map((i) => (
      <motion.span
        key={i}
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: [0, 0, 0.6, 0, 0], scale: [0.6, 0.6, 1.4, 1.8, 0.6] }}
        transition={{ duration: 4.5, times: [0, 0.35, 0.5, 0.65, 1], repeat: Infinity, repeatDelay: 0.4, delay: i * 0.08 }}
        className="absolute left-[48%] top-[40%] h-6 w-6 rounded-full border border-brand-glow/60"
      />
    ))}

    {/* status pill */}
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 0, 1, 1, 0] }}
      transition={{ duration: 4.5, times: [0, 0.45, 0.55, 0.9, 1], repeat: Infinity, repeatDelay: 0.4 }}
      className="absolute left-3 top-3 rounded-full bg-black/60 px-3 py-1 text-[10px] text-white ring-1 ring-white/10 backdrop-blur"
    >
      Cough detected — hiding screen
    </motion.div>
  </FrameShell>
);

/* --------- MARKING BLUR (drag rectangle then frost area) --------- */
export const MarkingMockup = () => (
  <FrameShell>
    <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-900 to-black" />
    {/* fake browser */}
    <div className="absolute inset-3 rounded-xl bg-white/95 ring-1 ring-white/10 overflow-hidden">
      <div className="flex h-5 items-center gap-1 bg-slate-100 px-2">
        <span className="h-1.5 w-1.5 rounded-full bg-red-400" />
        <span className="h-1.5 w-1.5 rounded-full bg-yellow-400" />
        <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
      </div>
      <div className="grid grid-cols-3 gap-2 p-3">
        <div className="col-span-2 space-y-1.5">
          <div className="h-1.5 w-3/4 rounded bg-slate-300" />
          <div className="h-1.5 w-1/2 rounded bg-slate-200" />
          <div className="h-1.5 w-2/3 rounded bg-slate-200" />
          <div className="h-1.5 w-3/5 rounded bg-slate-200" />
          <div className="h-1.5 w-4/5 rounded bg-slate-200" />
        </div>
        {/* sidebar that gets marked */}
        <div className="relative h-24 rounded-md bg-slate-100 p-2">
          <div className="space-y-1">
            <div className="h-1.5 w-full rounded bg-slate-300" />
            <div className="h-1.5 w-2/3 rounded bg-slate-200" />
            <div className="h-1.5 w-3/4 rounded bg-slate-200" />
            <div className="h-1.5 w-1/2 rounded bg-slate-200" />
          </div>

          {/* dashed marking rectangle: draws then locks + frosts */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{
              opacity: [0, 1, 1, 1, 0],
              scale: [0.6, 1, 1, 1, 0.6],
            }}
            transition={{ duration: 4, times: [0, 0.35, 0.5, 0.9, 1], repeat: Infinity, repeatDelay: 0.4 }}
            className="absolute inset-1 rounded-md border-2 border-dashed border-brand-glow"
            style={{ transformOrigin: "top left" }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0, 1, 1, 0] }}
              transition={{ duration: 4, times: [0, 0.45, 0.55, 0.9, 1], repeat: Infinity, repeatDelay: 0.4 }}
              className="absolute inset-0 rounded-md bg-white/40"
              style={{ backdropFilter: "blur(8px)" as any }}
            />
          </motion.div>

          {/* cursor */}
          <motion.div
            initial={{ x: 0, y: 0, opacity: 0 }}
            animate={{
              opacity: [0, 1, 1, 0, 0],
              x: [0, 60, 60, 60, 0],
              y: [0, 60, 60, 60, 0],
            }}
            transition={{ duration: 4, times: [0, 0.35, 0.5, 0.7, 1], repeat: Infinity, repeatDelay: 0.4 }}
            className="absolute -left-1 -top-1 h-3 w-3"
          >
            <div className="h-0 w-0 border-l-[6px] border-l-transparent border-t-[10px] border-t-white border-r-[6px] border-r-transparent rotate-[-30deg]" />
          </motion.div>
        </div>
      </div>
    </div>
  </FrameShell>
);