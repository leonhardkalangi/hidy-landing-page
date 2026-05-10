import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section, Reveal } from "@/components/site/Section";

const PricingCard = ({ founding }: { founding: boolean }) => (
  <div className={`glass relative rounded-3xl p-8 md:p-10 ${founding ? "ring-2 ring-brand-violet/60 brand-glow" : ""}`}>
    <div className="flex items-center justify-between">
      <span className={`text-xs font-semibold uppercase tracking-widest ${founding ? "text-brand-glow" : "text-muted-foreground"}`}>
        {founding ? "Founding — first 100 users" : "Standard"}
      </span>
    </div>
    <div className="mt-6 flex items-baseline gap-2">
      <span className="text-5xl font-bold tracking-tight">${founding ? "19.90" : "24.90"}</span>
      <span className="text-sm text-muted-foreground">+ local taxes</span>
    </div>
    <p className="mt-1 text-sm text-muted-foreground">One-time payment · Lifetime access</p>
    <ul className="mt-8 space-y-3 text-sm">
      {["All features included", "Lifetime updates", "Up to 2 Macs", "7-day free trial"].map((i) => (
        <li key={i} className="flex items-center gap-3"><Check className="h-4 w-4 text-brand-glow" /> {i}</li>
      ))}
    </ul>
    <Button asChild variant={founding ? "hero" : "ghost-soft"} size="lg" className="mt-8 w-full" disabled={!founding}>
      <a href="#">{founding ? "Buy Founding Access" : "Buy Lifetime Access"}</a>
    </Button>
  </div>
);

const PricingSection = ({ id }: { id?: string }) => (
  <Section id={id ?? "pricing"}>
    <Reveal>
      <h2 className="text-center text-3xl md:text-5xl font-semibold tracking-tight text-gradient">
        Simple pricing.<br />No subscriptions you'll forget.
      </h2>
      <p className="mx-auto mt-5 max-w-xl text-center text-muted-foreground">
        One-time payment. Lifetime access. Free updates.
      </p>
    </Reveal>
    <div className="mt-14 grid gap-5 md:grid-cols-2">
      <Reveal><PricingCard founding /></Reveal>
      <Reveal><PricingCard founding={false} /></Reveal>
    </div>
    <p className="mt-8 text-center text-sm text-muted-foreground">
      🛡️ 7-day free trial. No credit card required. Cancel by deleting the app.
    </p>
  </Section>
);

export default PricingSection;
