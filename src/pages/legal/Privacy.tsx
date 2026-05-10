import LegalLayout from "./LegalLayout";

const Privacy = () => (
  <LegalLayout title="Privacy Policy" effectiveDate="TBD">
    <p>
      Hidy is built around one rule: your privacy isn't a feature, it's the product. The macOS app does its detection
      and blurring entirely on your Mac. The website does the bare minimum needed to sell you a license and keep your
      account working. The headings below define the topics this policy must cover — bodies are placeholders pending
      counsel review.
    </p>

    <h2>1. Who we are</h2>
    <p>[The legal entity operating Hidy and where to reach us.]</p>

    <h2>2. What we collect</h2>
    <h3>2.1 Information you give us</h3>
    <p>[Email when you create an account, plus optional name. That's it for first-party signup.]</p>
    <h3>2.2 Information collected on the website</h3>
    <p>[Self-hosted PostHog usage data — page views, feature interactions — proxied through our own domain. No third-party trackers, no ad networks.]</p>
    <h3>2.3 Payment information</h3>
    <p>[Card data is handled exclusively by our payment processor (Polar). We never see or store full card numbers.]</p>
    <h3>2.4 The macOS app</h3>
    <p>[The app processes microphone audio (cough trigger) and lid-angle data on-device. None of it is sent to us. The app does call our license-check endpoint with your account token to confirm the license is valid.]</p>

    <h2>3. How we use information</h2>
    <p>[Run your account, fulfil purchases, send transactional emails, support requests, and improve the website.]</p>

    <h2>4. Legal bases (EU/UK)</h2>
    <p>[Contract performance for purchases, legitimate interest for site analytics, consent where required.]</p>

    <h2>5. Sharing</h2>
    <p>[Polar (payments), Supabase (account database, hosted in the EU), email provider for transactional mail. No advertising sharing, ever.]</p>

    <h2>6. International transfers</h2>
    <p>[Standard contractual clauses where applicable.]</p>

    <h2>7. Retention</h2>
    <p>[Account data kept while the account is active and for a reasonable period after closure for tax / accounting.]</p>

    <h2>8. Security</h2>
    <p>[TLS in transit, encryption at rest at the database level, hashed device tokens.]</p>

    <h2>9. Your rights</h2>
    <p>[Access, correction, deletion, portability, objection — exercise via support@hidy.app.]</p>

    <h2>10. US state privacy notice</h2>
    <p>[We do not sell personal information.]</p>

    <h2>11. Children</h2>
    <p>[Hidy is not directed at children under 13.]</p>

    <h2>12. Changes</h2>
    <p>[Notice via email and site banner for material changes.]</p>

    <h2>13. Contact</h2>
    <p>support@hidy.app</p>
  </LegalLayout>
);

export default Privacy;
