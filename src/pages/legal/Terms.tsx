import LegalLayout from "./LegalLayout";

const Terms = () => (
  <LegalLayout title="Terms of Service" effectiveDate="TBD">
    <p>
      These Terms govern your use of Hidy — the macOS privacy app — and the Hidy website. By creating an account or
      using the app you agree to them. The headings below cover everything we think these Terms need to address; the
      language here is a plain-English draft that counsel will turn into the final legal version.
    </p>

    <h2>1. About Hidy</h2>
    <p>
      Hidy is operated by LiveSync, Inc. The product is a macOS app that frosts your screen on demand, plus a small
      website to manage your license. You can reach us at <a href="mailto:support@hidyapp.com">support@hidyapp.com</a>.
    </p>

    <h2>2. Who can use Hidy</h2>
    <p>
      You need to be at least the age of digital consent in your country (13 in most places, 16 in parts of the EU)
      and able to enter into a contract. Hidy is sold worldwide; some features depend on your Mac's hardware, not on
      where you live.
    </p>

    <h2>3. Your account</h2>
    <h3>3.1 Account required</h3>
    <p>
      You'll need a Hidy account to manage which Macs your license covers and to receive software updates after the
      trial. Account creation only asks for an email and a password.
    </p>
    <h3>3.2 Accurate information</h3>
    <p>Keep your email current. We'll use it for receipts, security notices, and the occasional release note.</p>
    <h3>3.3 Account security</h3>
    <p>
      Your credentials are yours to protect. If you suspect they've leaked, change your password and email us so we
      can sign every device out.
    </p>

    <h2>4. The Hidy app and your license</h2>
    <p>
      Buying Hidy gives you a personal, non-transferable license to install and run it on Macs you own or control. The
      full grant lives in the <a href="/legal/eula">EULA</a> — read it; that's the document that governs the app
      itself.
    </p>

    <h2>5. Plans, trials, and purchases</h2>
    <h3>5.1 Available plans</h3>
    <p>
      Hidy is sold as a one-time lifetime purchase. There is no recurring subscription. The first 100 buyers get the
      founding price; everyone after pays the standard lifetime price.
    </p>
    <h3>5.2 Free trial</h3>
    <p>
      A 7-day free trial is available before you buy. We don't ask for a card to start the trial. When it ends, the
      gestures stop arming until you purchase a license.
    </p>

    <h2>6. Billing and taxes</h2>
    <h3>6.1 Pricing</h3>
    <p>
      Prices are shown excluding local taxes. Where applicable (EU VAT, UK VAT, certain US states), tax is added at
      checkout based on your billing country.
    </p>
    <h3>6.2 Payment processor</h3>
    <p>
      Card payments are handled by Polar, our merchant of record. Hidy never sees your full card number. Polar's terms
      and privacy policy apply to the payment itself.
    </p>
    <h3>6.3 Failed payments</h3>
    <p>
      If a charge fails or is reversed without a refund being issued, your license may be paused until the balance is
      settled.
    </p>

    <h2>7. Refunds</h2>
    <p>
      We offer a 30-day no-questions-asked refund window after purchase. The full policy lives at{" "}
      <a href="/legal/refunds">Refunds</a>.
    </p>

    <h2>8. Acceptable use</h2>
    <p>
      Don't reverse-engineer Hidy, don't redistribute the app or its license keys, and don't use Hidy to interfere
      with anyone else's computer. Hidy is built to protect privacy, not to defeat it.
    </p>

    <h2>9. Support and communications</h2>
    <h3>9.1 Support</h3>
    <p>
      We answer email at <a href="mailto:support@hidyapp.com">support@hidyapp.com</a>, usually within one business day. There's
      no phone line.
    </p>
    <h3>9.2 Electronic communications</h3>
    <p>
      Buying or signing up means you agree to receive transactional emails from us — receipts, security alerts, and
      important policy changes. Marketing email is opt-in.
    </p>

    <h2>10. Intellectual property</h2>
    <p>
      Hidy, the Hidy name, the icon, and the source code are owned by LiveSync, Inc. or its licensors. Your license
      is to use the app, not the brand.
    </p>

    <h2>11. Third-party services</h2>
    <p>
      The website uses Polar for payments, Supabase for account storage, Sparkle for app updates, and a self-hosted
      PostHog instance for site analytics. The macOS app itself ships no third-party trackers and no analytics.
    </p>

    <h2>12. Privacy</h2>
    <p>
      Hidy never opens your camera and runs all detection on-device. The full policy is at{" "}
      <a href="/legal/privacy">Privacy</a>.
    </p>

    <h2>13. Disclaimers</h2>
    <p>
      Hidy is provided "as is." We do everything we can to make blur fast and reliable, but no software can guarantee
      that information is unobservable in every situation — over-the-shoulder, reflections, and recording devices are
      outside our control.
    </p>

    <h2>14. Limitation of liability</h2>
    <p>
      To the extent the law allows, our total liability is capped at the amount you paid us in the twelve months
      before the issue arose. We aren't liable for indirect, incidental, or consequential damages.
    </p>

    <h2>15. Termination</h2>
    <p>
      You can stop using Hidy any time by uninstalling the app and closing your account. We may terminate access for
      serious or repeated breaches of these Terms.
    </p>

    <h2>16. Changes to these Terms</h2>
    <p>
      Material changes get an email and a banner on the site at least 14 days before they take effect. Minor edits
      (typos, clarifications) take effect when posted with a new effective date.
    </p>

    <h2>17. Governing law</h2>
    <p>[Jurisdiction to be set with counsel before launch.]</p>

    <h2>18. Contact</h2>
    <p>
      <a href="mailto:support@hidyapp.com">support@hidyapp.com</a>
    </p>
  </LegalLayout>
);

export default Terms;
