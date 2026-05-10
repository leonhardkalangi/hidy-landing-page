import LegalLayout from "./LegalLayout";

const EULA = () => (
  <LegalLayout title="End User License Agreement" effectiveDate="TBD">
    <p>
      The Terms of Service cover your use of the Hidy website and your account. This EULA covers something narrower —
      what you can and can't do with the Hidy app on your Mac. Plain-English draft below; counsel will polish.
    </p>

    <h2>1. License grant</h2>
    <p>
      We grant you a personal, non-exclusive, non-transferable license to install and run Hidy on Macs you own or
      control, for as long as your account remains in good standing.
    </p>

    <h2>2. Devices and the device limit</h2>
    <h3>2.1 Account-based</h3>
    <p>
      Your license is tied to your Hidy account, not to any single Mac. Sign in on a new Mac and that Mac claims one
      of your slots.
    </p>
    <h3>2.2 Two-device limit</h3>
    <p>
      A single license covers up to two active Macs at the same time. Sign a Mac out from your account dashboard to
      free a slot — the next Mac you sign in will take its place.
    </p>
    <h3>2.3 Device management</h3>
    <p>
      Active Macs appear in your account with their hostname, model identifier, macOS version, and last seen time.
      You can revoke any of them at any moment.
    </p>
    <h3>2.4 No transfer</h3>
    <p>
      You can't sell, sublicense, lease, or hand off your license separately from the account it lives on.
    </p>

    <h2>3. Permitted use</h2>
    <p>
      Personal use is fine. Internal business use by the same account holder is also fine. Anything that requires
      Hidy to run on a Mac you don't control needs a written license from us.
    </p>

    <h2>4. Restrictions</h2>
    <p>
      Don't reverse-engineer, decompile, or disassemble the app. Don't redistribute the binary or any installer that
      bundles it. Don't strip Hidy's name, copyright, or other notices. Don't try to bypass the license check.
    </p>

    <h2>5. Updates</h2>
    <p>
      Hidy ships updates through Sparkle, signed with our Apple Developer ID. Updates may add, change, or retire
      features. The license terms that apply to a given build are the ones in force when you install it.
    </p>

    <h2>6. Privacy and on-device processing</h2>
    <h3>6.1 Camera</h3>
    <p>
      Hidy never asks for camera permission. None of the triggers — lid pre-close, blow/cough, hotkey, menubar — use
      a camera. There is no face detection of any kind.
    </p>
    <h3>6.2 Microphone</h3>
    <p>
      The blow/cough trigger uses a short audio buffer processed entirely on your Mac. The buffer is analysed for a
      sharp, cough-shaped burst and then discarded. No audio is stored, transmitted, or shared.
    </p>
    <h3>6.3 Lid sensor</h3>
    <p>
      The lid pre-close trigger reads the hardware hinge angle through Apple's IOKit HID interface. This is a local
      hardware read; no data is transmitted.
    </p>
    <h3>6.4 Local settings</h3>
    <p>
      Per-feature settings, sensitivity values, and saved Area Blur regions live under{" "}
      <code>~/Library</code> on your Mac. Deleting the app removes them.
    </p>
    <h3>6.5 Network use</h3>
    <p>
      The app makes network calls only to verify your license and to fetch software updates. Both go to hidyapp.com. The
      app works fully offline once your license is verified.
    </p>

    <h2>7. Ownership</h2>
    <p>
      Hidy, including its name, icon, look-and-feel, and source code, is owned by LiveSync, Inc. or its licensors.
      This license doesn't transfer ownership of any of it.
    </p>

    <h2>8. Disclaimer of warranties</h2>
    <p>
      Hidy is provided "as is." We don't warrant that the app will be error-free or that blur will be sufficient to
      prevent observation in every situation. Use it together with sensible habits — close the laptop, don't share
      the screen by default, etc.
    </p>

    <h2>9. Limitation of liability</h2>
    <p>
      To the extent the law allows, our total liability under this EULA is capped at the amount you paid for the
      license in the twelve months before the issue arose.
    </p>

    <h2>10. Termination</h2>
    <p>
      Your license terminates automatically if you breach this EULA. A lifetime purchase otherwise stays valid for as
      long as we operate Hidy, including for major-version upgrades.
    </p>

    <h2>11. Export controls</h2>
    <p>
      You agree not to export or re-export Hidy in violation of any applicable export laws.
    </p>

    <h2>12. Governing law</h2>
    <p>[Jurisdiction to be set with counsel before launch.]</p>

    <h2>13. Contact</h2>
    <p>
      <a href="mailto:support@hidyapp.com">support@hidyapp.com</a>
    </p>
  </LegalLayout>
);

export default EULA;
