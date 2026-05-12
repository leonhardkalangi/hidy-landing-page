import { Apple, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section, Reveal } from "@/components/site/Section";
import { POLAR_CHECKOUT_URL } from "@/lib/polar";

const PricingCard = () => (
  <div className="glass relative rounded-3xl p-8 md:p-10 ring-2 ring-brand-violet/60 brand-glow">
    <div className="flex items-center justify-between">
      <span className="text-xs font-semibold uppercase tracking-widest text-brand-glow">
        Hidy lifetime
      </span>
    </div>
    <div className="mt-6 flex items-baseline gap-2">
      <span className="text-5xl font-bold tracking-tight">$19.90</span>
      <span className="text-sm text-muted-foreground">+ local taxes</span>
    </div>
    <p className="mt-1 text-sm text-muted-foreground">One-time payment &middot; Lifetime access</p>
    <ul className="mt-8 space-y-3 text-sm">
      {[
        "All features included",
        "Lifetime updates",
        "Up to 3 Macs per license",
        "Instant license email",
        "30-day refund window",
      ].map((i) => (
        <li key={i} className="flex items-center gap-3"><Check className="h-4 w-4 text-brand-glow" /> {i}</li>
      ))}
    </ul>
    <Button asChild variant="hero" size="lg" className="mt-8 w-full">
      <a href={POLAR_CHECKOUT_URL} target="_blank" rel="noopener noreferrer">
        <Apple className="h-4 w-4" /> Buy Hidy &mdash; $19.90
      </a>
    </Button>
  </div>
);

const PricingSection = ({ id }: { id?: string }) => (
  <Section id={id ?? "pricing"}>
    <Reveal>
      <h2 className="text-center text-3xl md:text-5xl font-semibold tracking-tight text-gradient">
        Simple pricing.<br />No subscriptions you&rsquo;ll forget.
      </h2>
      <p className="mx-auto mt-5 max-w-xl text-center text-muted-foreground">
        One payment. Lifetime access. Free updates.
      </p>
    </Reveal>
    <div className="mt-14 mx-auto max-w-xl">
      <Reveal><PricingCard /></Reveal>
    </div>
    <p className="mt-8 text-center text-sm text-muted-foreground">
      🛡️ 30-day refund window. Email <a href="mailto:support@hidyapp.com" className="text-foreground underline-offset-4 hover:underline">support@hidyapp.com</a> &mdash; no questions asked.
    </p>
  </Section>
);

export default PricingSection;
