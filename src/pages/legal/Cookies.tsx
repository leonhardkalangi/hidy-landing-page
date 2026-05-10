import LegalLayout from "./LegalLayout";

const Cookies = () => (
  <LegalLayout title="Cookie Policy" effectiveDate="TBD">
    <p>
      Hidy.app uses a small set of cookies to keep you signed in and to understand how the site is being used. The macOS
      app sets no cookies of any kind. Headings define what this policy must cover — bodies are placeholders pending
      counsel review.
    </p>

    <h2>1. What are cookies</h2>
    <p>[Plain-language explainer.]</p>

    <h2>2. Cookies we use</h2>
    <h3>2.1 Essential</h3>
    <p>[Session cookie set by Supabase Auth so you stay signed in. Required for the site to function.]</p>
    <h3>2.2 Analytics</h3>
    <p>[Self-hosted PostHog cookie, proxied through our own domain. Used to understand which pages help and which don't. Never shared.]</p>
    <h3>2.3 Third-party</h3>
    <p>[None. We do not embed ad pixels, social trackers, or marketing tags.]</p>

    <h2>3. Your choices</h2>
    <p>[Browser-level cookie controls. Disabling essential cookies will sign you out and disable account features.]</p>

    <h2>4. Changes</h2>
    <p>[We will post material changes here with a new effective date.]</p>

    <h2>5. Contact</h2>
    <p>support@hidy.app</p>
  </LegalLayout>
);

export default Cookies;
