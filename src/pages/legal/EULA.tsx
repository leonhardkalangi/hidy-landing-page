import LegalLayout from "./LegalLayout";

const EULA = () => (
  <LegalLayout title="End User License Agreement" effectiveDate="TBD">
    <p>
      This EULA covers the Hidy macOS application specifically. The Terms of Service cover your use of the website and your
      account; this document covers what you can and can't do with the app on your Mac. The headings are the topics that need
      coverage — bodies are placeholders until reviewed by counsel.
    </p>

    <h2>1. License grant</h2>
    <p>[Personal, non-exclusive, non-transferable license to install and run Hidy on Macs you own or control.]</p>

    <h2>2. License model and device limit</h2>
    <h3>2.1 Account-based</h3>
    <p>[The license is bound to your Hidy account, not to a specific Mac.]</p>
    <h3>2.2 Two devices</h3>
    <p>[Up to 2 active Macs per license. Sign a Mac out from your account to free a slot.]</p>
    <h3>2.3 Device management</h3>
    <p>[Devices appear in your account dashboard with hostname, model, and last-seen time.]</p>
    <h3>2.4 No transfer</h3>
    <p>[License cannot be sold, sublicensed, or transferred separately from the account.]</p>

    <h2>3. Permitted use</h2>
    <p>[Personal use on supported macOS versions. Internal business use by the licensed account holder is also permitted.]</p>

    <h2>4. Restrictions</h2>
    <p>[No reverse engineering, no redistribution of the binary, no removal of copyright notices, no circumvention of the license check.]</p>

    <h2>5. Updates</h2>
    <p>[Hidy ships updates via Sparkle. Updates may add, change, or retire features; the license terms applicable to a given build are the ones in effect at install time.]</p>

    <h2>6. Privacy and on-device processing</h2>
    <h3>6.1 Camera access</h3>
    <p>[Hidy never requests camera access. None of the triggers depend on a camera.]</p>
    <h3>6.2 Microphone access</h3>
    <p>[The cough trigger uses a short audio buffer processed entirely on your Mac. No audio leaves the device.]</p>
    <h3>6.3 Lid sensor</h3>
    <p>[The lid trigger reads the hardware hinge angle through IOKit HID. No data is transmitted.]</p>
    <h3>6.4 Local settings</h3>
    <p>[Per-app config and protected-region data are stored under ~/Library on your Mac.]</p>

    <h2>7. Ownership</h2>
    <p>[Hidy, its name, icon, and source code are owned by LiveSync, Inc. or its licensors.]</p>

    <h2>8. Disclaimer</h2>
    <p>[Software provided "as is." Hidy reduces visibility but does not guarantee that information is unobservable in all conditions.]</p>

    <h2>9. Limitation of liability</h2>
    <p>[Cap at amounts paid in the prior 12 months. No liability for indirect or consequential damages.]</p>

    <h2>10. Termination</h2>
    <p>[License terminates if you breach these terms. Lifetime purchases otherwise persist for the life of the supported product.]</p>

    <h2>11. Governing law</h2>
    <p>[Jurisdiction TBD.]</p>

    <h2>12. Contact</h2>
    <p>support@hidy.app</p>
  </LegalLayout>
);

export default EULA;
