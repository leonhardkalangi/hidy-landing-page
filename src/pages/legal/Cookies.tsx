import LegalLayout from "./LegalLayout";

const Cookies = () => (
  <LegalLayout title="Cookie Policy" effectiveDate="TBD">
    <p>
      Hidy.app uses a small set of cookies to keep you signed in and to understand how the site is being used. The
      Hidy macOS app does not set any cookies of any kind. Plain-English draft below; counsel will tighten the wording
      before launch.
    </p>

    <h2>1. What are cookies</h2>
    <p>
      Cookies are tiny text files a site stores in your browser. Some keep you signed in across pages. Some help the
      site remember your preferences. Some count visits. They aren't programs and they can't read other sites' data.
    </p>

    <h2>2. Cookies we use</h2>
    <h3>2.1 Essential</h3>
    <p>
      A session cookie set by Supabase Auth keeps you signed in. Without it the account portal can't function. We
      can't ship the site without these and they don't require your consent.
    </p>
    <h3>2.2 Analytics</h3>
    <p>
      One cookie set by our self-hosted PostHog instance — proxied through hidyapp.com, never a third-party domain — helps
      us understand which pages convert and which ones don't. The data sits on our infrastructure and is never sold or
      shared. You can switch it off any time from{" "}
      <button type="button" data-cookie-settings className="underline-offset-4 hover:underline text-foreground">
        Cookie Settings
      </button>{" "}
      in the footer.
    </p>
    <h3>2.3 Third-party cookies</h3>
    <p>
      None. We do not embed advertising pixels, social-network trackers, or marketing tags of any kind. The browser's
      network panel should show only hidyapp.com and our own /ingest/ subpath.
    </p>

    <h2>3. Your choices</h2>
    <p>
      Use the Cookie Settings button in the footer to turn analytics off. Browser-level cookie controls also work; if
      you block essential cookies, the account portal will sign you out and account features will stop working.
    </p>

    <h2>4. Changes to this policy</h2>
    <p>
      Material changes get a banner on the site. The current version is always the one posted here with the effective
      date at the top.
    </p>

    <h2>5. Contact</h2>
    <p>
      <a href="mailto:support@hidyapp.com">support@hidyapp.com</a>
    </p>
  </LegalLayout>
);

export default Cookies;
