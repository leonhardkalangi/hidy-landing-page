import { Twitter, Apple } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import hidyIcon from "@/assets/hidy-icon.png";

const legalLinks = [
  { to: "/legal/terms", label: "Terms" },
  { to: "/legal/eula", label: "EULA" },
  { to: "/legal/privacy", label: "Privacy" },
  { to: "/legal/cookies", label: "Cookies" },
  { to: "/legal/refunds", label: "Refunds" },
];

const openCookieSettings = () => {
  // Placeholder until the analytics opt-out toggle ships. Wired to a toast
  // so the footer entry is real and clickable now; the cookie-prefs modal
  // lands when PostHog gets self-proxied.
  toast("Cookie preferences coming soon", {
    description: "We'll wire the analytics opt-out toggle here once the self-hosted PostHog instance is live.",
  });
};

const Footer = () => (
  <footer className="border-t border-border/60 mt-12">
    <div className="mx-auto max-w-6xl px-6 py-16 grid gap-10 md:grid-cols-4">
      <div className="md:col-span-1">
        <Link to="/" className="flex items-center gap-2">
          <img src={hidyIcon} alt="" className="h-8 w-8 rounded-lg" width={32} height={32} />
          <span className="font-semibold">Hidy</span>
        </Link>
        <p className="mt-3 text-sm text-muted-foreground max-w-xs">
          Privacy that doesn't watch you back.
        </p>
        <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-border bg-secondary/40 px-3 py-1.5 text-xs text-muted-foreground">
          <Apple className="h-3.5 w-3.5" /> macOS 13+ Apple Silicon
        </div>
      </div>

      <div>
        <h4 className="text-sm font-semibold">Product</h4>
        <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
          <li><Link to="/pricing" className="hover:text-foreground transition-colors">Pricing</Link></li>
          <li><Link to="/download" className="hover:text-foreground transition-colors">Download</Link></li>
          <li><Link to="/#features" className="hover:text-foreground transition-colors">Features</Link></li>
          <li><Link to="/#faq" className="hover:text-foreground transition-colors">FAQ</Link></li>
        </ul>
      </div>

      <div>
        <h4 className="text-sm font-semibold">Support</h4>
        <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
          <li><Link to="/contact" className="hover:text-foreground transition-colors">Contact</Link></li>
          <li>
            <a href="mailto:support@hidyapp.com" className="hover:text-foreground transition-colors">
              support@hidyapp.com
            </a>
          </li>
        </ul>
      </div>

      <div>
        <h4 className="text-sm font-semibold">Legal</h4>
        <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
          {legalLinks.map((l) => (
            <li key={l.to}>
              <Link to={l.to} className="hover:text-foreground transition-colors">
                {l.label}
              </Link>
            </li>
          ))}
          <li>
            <button
              type="button"
              onClick={openCookieSettings}
              className="text-left hover:text-foreground transition-colors"
            >
              Cookie Settings
            </button>
          </li>
        </ul>
      </div>
    </div>

    <div className="border-t border-border/60">
      <div className="mx-auto max-w-6xl px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
        <p>© 2026 LiveSync, Inc. Made with care.</p>
        <div className="flex items-center gap-3">
          <a href="#" aria-label="X" className="hover:text-foreground transition-colors">
            <Twitter className="h-4 w-4" />
          </a>
          <a
            href="https://www.tiktok.com/@hidy.app"
            target="_blank"
            rel="noreferrer"
            aria-label="TikTok"
            className="hover:text-foreground transition-colors"
          >
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
              className="h-4 w-4"
            >
              <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
