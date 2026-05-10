import LegalLayout from "./LegalLayout";

const Privacy = () => (
  <LegalLayout title="Privacy Policy" effectiveDate="TBD">
    <p>
      Hidy is built around one rule: your privacy isn't a feature, it's the product. The macOS app does its detection
      and blurring entirely on your Mac. The website does the bare minimum needed to sell you a license and keep your
      account working. The plain-English draft below covers what we collect, how we use it, and your choices —
      counsel will tighten the language before launch.
    </p>

    <h2>1. Who we are</h2>
    <p>
      Hidy is operated by LiveSync, Inc. We are the data controller for the personal information described below. You
      can reach us at <a href="mailto:support@hidy.app">support@hidy.app</a>.
    </p>

    <h2>2. What we collect</h2>
    <h3>2.1 Information you give us</h3>
    <p>
      When you create a Hidy account we ask for an email and a password. You can optionally add a display name. That's
      the entire signup flow. We don't ask for your phone number, your address, or your date of birth.
    </p>
    <h3>2.2 Website usage</h3>
    <p>
      We run a self-hosted PostHog instance to understand which pages help and which ones don't. The script is
      proxied through hidy.app — there is no third-party domain in the page network panel and no ad-network pixel.
      Usage data is stored on our infrastructure and never sold or shared.
    </p>
    <h3>2.3 Payment information</h3>
    <p>
      Card payments are handled by Polar, our merchant of record. Polar collects card data directly; Hidy never sees
      your full card number. We receive only the metadata we need to fulfil the order — name on file, billing
      country, last four digits, transaction status, tax breakdown.
    </p>
    <h3>2.4 The macOS app</h3>
    <p>
      This is where Hidy is most different from comparable apps. The Hidy macOS app:
    </p>
    <ul>
      <li>Never opens your camera. Camera permission is not requested.</li>
      <li>Uses the microphone (when the cough trigger is enabled) to analyse a short audio buffer for a cough-shaped burst, on-device, and discards the buffer.</li>
      <li>Reads your laptop's hinge angle from a hardware sensor through IOKit HID, locally.</li>
      <li>Stores per-feature settings and saved Area Blur regions under <code>~/Library</code> on your Mac.</li>
      <li>Makes network calls only to verify your license and to fetch software updates.</li>
    </ul>
    <p>
      No audio, screen content, frame data, or activity log ever leaves your Mac.
    </p>

    <h2>3. How we use information</h2>
    <p>
      We use what we collect to run your account, fulfil your purchase, deliver receipts and security notices, answer
      support requests, fix bugs that surface in site analytics, and comply with our legal obligations. We don't use
      it for advertising and we don't sell it.
    </p>

    <h2>4. Legal bases (EU and UK)</h2>
    <p>
      If you live in the EEA or the UK, our legal bases for processing are: contract performance (creating and
      maintaining your account, fulfilling your purchase), legitimate interests (running site analytics, securing the
      service), legal obligation (tax, accounting), and consent where required (for non-essential cookies).
    </p>

    <h2>5. How we share information</h2>
    <p>
      We share only with the providers that make the service work:
    </p>
    <ul>
      <li><strong>Polar</strong> — payments, invoicing, and the customer billing portal.</li>
      <li><strong>Supabase</strong> — the database and authentication layer that holds your account and license state.</li>
      <li><strong>An email provider</strong> — to send transactional mail (receipts, security alerts, password resets).</li>
    </ul>
    <p>
      That's the complete list. No advertising networks, no analytics resellers, no data brokers.
    </p>

    <h2>6. International transfers</h2>
    <p>
      Where personal information is transferred outside your country, we rely on the standard contractual clauses or
      equivalent safeguards published by the relevant authority.
    </p>

    <h2>7. Retention</h2>
    <p>
      We keep account data while your account is active and for a reasonable period afterwards to satisfy tax,
      accounting, and refund-window obligations. Site analytics are kept for a rolling window and then aggregated.
    </p>

    <h2>8. Security</h2>
    <p>
      Connections to hidy.app use TLS. Account passwords are hashed by Supabase. Device verification tokens are
      stored as hashes, not raw tokens. We use scoped service keys for our backend services.
    </p>

    <h2>9. Your rights</h2>
    <p>
      You can ask us to access, correct, delete, port, or stop processing your personal information. Email{" "}
      <a href="mailto:support@hidy.app">support@hidy.app</a> from the address on your account and we'll respond within
      a reasonable time. You also have the right to lodge a complaint with your local data protection authority.
    </p>

    <h2>10. US state privacy notice</h2>
    <p>
      We do not sell personal information and do not share it for cross-context behavioural advertising. Residents of
      US states that grant additional rights (California, Virginia, Colorado, Connecticut, Utah, and others) can
      exercise those rights via the contact above.
    </p>

    <h2>11. Children</h2>
    <p>
      Hidy is not directed at children under 13, and we do not knowingly collect their personal information. If you
      believe a child has signed up, write to us and we'll close the account.
    </p>

    <h2>12. Changes to this policy</h2>
    <p>
      Material changes get an email and a banner on the site at least 14 days before they take effect. The current
      version is always the one posted here, with the effective date at the top.
    </p>

    <h2>13. Contact</h2>
    <p>
      <a href="mailto:support@hidy.app">support@hidy.app</a>
    </p>
  </LegalLayout>
);

export default Privacy;
