import { Apple } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import hidyIcon from "@/assets/hidy-icon.png";
import { POLAR_CHECKOUT_URL } from "@/lib/polar";

const navItems = [
  { to: "/pricing", label: "Pricing" },
  { to: "/download", label: "Download" },
  { to: "/contact", label: "Contact" },
];

const Header = () => (
  <header className="fixed top-0 inset-x-0 z-50 flex justify-center px-4 pt-4">
    <nav className="glass flex w-full max-w-5xl items-center justify-between rounded-2xl px-4 py-3 md:px-6">
      <Link to="/" className="flex items-center gap-2">
        <img src={hidyIcon} alt="Hidy" className="h-8 w-8 rounded-lg" width={32} height={32} />
        <span className="text-base font-semibold tracking-tight">Hidy</span>
      </Link>
      <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
        {navItems.map((n) => (
          <NavLink
            key={n.to}
            to={n.to}
            className={({ isActive }) =>
              `transition-colors ${isActive ? "text-foreground" : "hover:text-foreground"}`
            }
          >
            {n.label}
          </NavLink>
        ))}
      </div>
      <div className="flex items-center gap-2 md:gap-3">
        <a
          href="#"
          className="hidden sm:inline text-sm text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Account (coming soon)"
        >
          Account
        </a>
        <Button asChild variant="hero" size="sm">
          <a href={POLAR_CHECKOUT_URL} target="_blank" rel="noopener noreferrer">
            <Apple className="h-4 w-4" /> Buy Hidy
          </a>
        </Button>
      </div>
    </nav>
  </header>
);

export default Header;
