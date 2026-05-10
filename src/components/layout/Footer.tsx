import { Github, Twitter, Apple } from "lucide-react";
import { Link } from "react-router-dom";
import hidyIcon from "@/assets/hidy-icon.png";

const legalLinks = [
  { to: "/legal/terms", label: "Terms" },
  { to: "/legal/eula", label: "EULA" },
  { to: "/legal/privacy", label: "Privacy" },
  { to: "/legal/cookies", label: "Cookies" },
  { to: "/legal/refunds", label: "Refunds" },
];

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
            <a href="mailto:support@hidy.app" className="hover:text-foreground transition-colors">
              support@hidy.app
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
            href="https://github.com/leonhardkalangi/hidy-landing-page"
            aria-label="GitHub"
            className="hover:text-foreground transition-colors"
          >
            <Github className="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
