import { motion } from "framer-motion";
import { Apple, Eye, Wind, Laptop, BellOff, SquareDashed, ShieldCheck, Github, Twitter, Check, X, Mic } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import hidyIcon from "@/assets/hidy-icon.png";
import HeroMockup from "@/components/HeroMockup";
import { NotificationMockup, LidMockup, CoughMockup, MarkingMockup } from "@/components/FeatureMockups";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
} as const;

const Section = ({ id, children, className = "" }: { id?: string; children: React.ReactNode; className?: string }) => (
  <section id={id} className={`relative mx-auto w-full max-w-6xl px-6 py-24 md:py-32 ${className}`}>
    {children}
  </section>
);

const Reveal = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} className={className}>
    {children}
  </motion.div>
);

const Navbar = () => (
  <header className="fixed top-0 inset-x-0 z-50 flex justify-center px-4 pt-4">
    <nav className="glass flex w-full max-w-5xl items-center justify-between rounded-2xl px-4 py-3 md:px-6">
      <a href="#top" className="flex items-center gap-2">
        <img src={hidyIcon} alt="Hidy" className="h-8 w-8 rounded-lg" width={32} height={32} />
        <span className="text-base font-semibold tracking-tight">Hidy</span>
      </a>
      <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
        <a href="#features" className="hover:text-foreground transition-colors">Features</a>
        <a href="#pricing" className="hover:text-foreground transition-colors">Pricing</a>
        <a href="#download" className="hover:text-foreground transition-colors">Download</a>
      </div>
      <div className="flex items-center gap-2 md:gap-3">
        <a href="#" className="hidden sm:inline text-sm text-muted-foreground hover:text-foreground transition-colors">Account</a>
        <Button asChild variant="hero" size="sm">
          <a href="#download"><Apple className="h-4 w-4" /> Download</a>
        </Button>
      </div>
    </nav>
  </header>
);

const Hero = () => (
  <div id="top" className="hero-bg relative overflow-hidden pt-36 md:pt-44">
    <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 mx-auto h-[600px] max-w-5xl bg-[radial-gradient(ellipse_at_top,hsl(var(--brand-violet)/0.25),transparent_60%)]" />
    <Section className="!py-0 text-center">
      <Reveal>
        <span className="glass inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs text-muted-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-brand-glow" /> Now in beta · macOS 13+
        </span>
      </Reveal>
      <Reveal>
        <h1 className="mt-6 text-5xl md:text-7xl font-bold tracking-tight leading-[1.05] text-gradient">
          Privacy that doesn't<br />watch you back.
        </h1>
      </Reveal>
      <Reveal>
        <p className="mx-auto mt-6 max-w-2xl text-lg md:text-xl text-muted-foreground">
          Blur your Mac windows instantly. Blow into your mic, close your lid, or hit a hotkey. No camera. No surveillance.
        </p>
      </Reveal>
      <Reveal>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button asChild variant="hero" size="lg"><a href="#download"><Apple className="h-5 w-5" /> Download for Mac</a></Button>
          <Button asChild variant="ghost-soft" size="lg"><a href="#demo">See how it works</a></Button>
        </div>
        <p className="mt-4 text-xs text-muted-foreground">macOS 13+ · One-time payment · 7-day trial</p>
      </Reveal>

      <Reveal className="mt-16 md:mt-20">
        <div id="demo" className="relative mx-auto max-w-5xl">
          <HeroMockup />
        </div>
      </Reveal>
    </Section>
  </div>
);

const Wedge = () => {
  const cards = [
    { icon: <X className="h-5 w-5" />, title: "Camera-based apps", body: "Always-on webcam. Constant face detection. Battery drain.", bad: true },
    { icon: <X className="h-5 w-5" />, title: "Manual hotkeys only", body: "You have to remember. You have to be ready.", bad: true },
    { icon: <Check className="h-5 w-5" />, title: "Hidy: gestures + auto", body: "Blow into your mic. Close your lid. Or just walk away. Your apps blur themselves.", bad: false },
  ];
  return (
    <Section>
      <Reveal>
        <h2 className="text-center text-3xl md:text-5xl font-semibold tracking-tight text-gradient">
          Other privacy apps watch you.<br />Hidy doesn't.
        </h2>
      </Reveal>
      <div className="mt-14 grid gap-5 md:grid-cols-3">
        {cards.map((c, i) => (
          <Reveal key={i}>
            <div className={`glass h-full rounded-2xl p-7 transition-transform duration-300 hover:-translate-y-1 ${!c.bad ? "ring-1 ring-brand-violet/40" : ""}`}>
              <div className={`inline-flex h-9 w-9 items-center justify-center rounded-lg ${c.bad ? "bg-destructive/15 text-destructive" : "bg-brand-violet/15 text-brand-glow"}`}>
                {c.icon}
              </div>
              <h3 className="mt-5 text-xl font-semibold">{c.title}</h3>
              <p className="mt-2 text-muted-foreground leading-relaxed">{c.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
};

const features = [
  { icon: Mic, title: "Cough to hide", body: "Just cough naturally. Hidy listens for the short, sharp burst and instantly frosts your screen — speech and music are ignored. Perfect for cafés, open offices, and shoulder surfers.", Mockup: CoughMockup },
  { icon: Laptop, title: "Close to blur", body: "Start closing your laptop lid. Hidy senses the angle drop and blurs everything before it touches the keyboard. Open back up, you're protected.", Mockup: LidMockup },
  { icon: BellOff, title: "Notification pop-ups, frosted", body: "Mail, Messages, Slack pings — incoming notification banners get frosted the moment they appear, so a stranger over your shoulder never sees the preview. Perfect for screen shares and coffee shops.", Mockup: NotificationMockup },
  { icon: SquareDashed, title: "Marking Blur for any spot", body: "Drag a rectangle anywhere on your screen. That area stays frosted forever. Perfect for the WhatsApp Web sidebar or your bank tab corner.", Mockup: MarkingMockup },
];

const Features = () => (
  <Section id="features">
    <Reveal>
      <h2 className="text-center text-3xl md:text-5xl font-semibold tracking-tight text-gradient">
        Three ways to hide.<br />Zero ways to leak.
      </h2>
    </Reveal>
    <div className="mt-20 space-y-24 md:space-y-32">
      {features.map((f, i) => {
        const Icon = f.icon;
        const Mockup = f.Mockup;
        const reverse = i % 2 === 1;
        return (
          <Reveal key={f.title}>
            <div className={`grid items-center gap-10 md:grid-cols-2 ${reverse ? "md:[&>*:first-child]:order-2" : ""}`}>
              <div className="glass overflow-hidden rounded-3xl p-2">
                <Mockup />
              </div>
              <div className="md:px-4">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand-violet/15 text-brand-glow">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-3xl md:text-4xl font-semibold tracking-tight">{f.title}</h3>
                <p className="mt-4 text-lg text-muted-foreground leading-relaxed">{f.body}</p>
              </div>
            </div>
          </Reveal>
        );
      })}
    </div>
  </Section>
);

const PrivacyFirst = () => (
  <Section>
    <Reveal>
      <div className="glass relative overflow-hidden rounded-3xl p-10 md:p-16 text-center brand-glow">
        <div className="pointer-events-none absolute inset-0 -z-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--brand-violet)/0.18),transparent_70%)]" />
        <ShieldCheck className="mx-auto h-10 w-10 text-brand-glow" />
        <h2 className="mt-5 text-3xl md:text-5xl font-semibold tracking-tight text-gradient">Your face is yours.</h2>
        <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground leading-relaxed">
          Hidy never opens your camera. Never sends data anywhere. Never tracks. Everything runs on your Mac — gestures, detection, blur. We can't see you. We don't want to.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {["No camera", "100% on-device", "Open about what we do"].map((b) => (
            <span key={b} className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/40 px-4 py-2 text-sm text-foreground">
              <Check className="h-4 w-4 text-brand-glow" /> {b}
            </span>
          ))}
        </div>
      </div>
    </Reveal>
  </Section>
);

const Pricing = () => {
  const Card = ({ founding }: { founding: boolean }) => (
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
  return (
    <Section id="pricing">
      <Reveal>
        <h2 className="text-center text-3xl md:text-5xl font-semibold tracking-tight text-gradient">
          Simple pricing.<br />No subscriptions you'll forget.
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-center text-muted-foreground">
          One-time payment. Lifetime access. Free updates.
        </p>
      </Reveal>
      <div className="mt-14 grid gap-5 md:grid-cols-2">
        <Reveal><Card founding /></Reveal>
        <Reveal><Card founding={false} /></Reveal>
      </div>
      <p className="mt-8 text-center text-sm text-muted-foreground">
        🛡️ 7-day free trial. No credit card required. Cancel by deleting the app.
      </p>
    </Section>
  );
};

const FAQ = () => {
  const items = [
    ["Does Hidy use my camera?", "Never. We don't even ask for camera permission."],
    ["Will it work on Apple Silicon?", "Yes. Optimized for M1/M2/M3/M4."],
    ["What macOS version do I need?", "macOS 13 Ventura or later."],
    ["Can I use it on multiple Macs?", "Yes — up to 2 with one license."],
    ["What happens after the trial?", "The app keeps running but features lock until you buy."],
    ["How is this different from BlurAway?", "BlurAway uses your camera to detect faces. We use gestures — blow, lid, hotkey, app focus. No surveillance, no battery drain."],
    ["Refund policy?", "30-day no-questions-asked refund."],
  ];
  return (
    <Section id="faq">
      <Reveal>
        <h2 className="text-center text-3xl md:text-5xl font-semibold tracking-tight text-gradient">Questions, answered.</h2>
      </Reveal>
      <Reveal className="mx-auto mt-12 max-w-3xl">
        <Accordion type="single" collapsible className="space-y-3">
          {items.map(([q, a], i) => (
            <AccordionItem key={i} value={`item-${i}`} className="glass rounded-2xl border-0 px-6">
              <AccordionTrigger className="text-left text-base md:text-lg font-medium hover:no-underline">{q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">{a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Reveal>
    </Section>
  );
};

const CTA = () => (
  <Section id="download">
    <Reveal>
      <div className="glass relative overflow-hidden rounded-3xl p-12 md:p-20 text-center brand-glow">
        <div className="pointer-events-none absolute inset-0 -z-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--brand-blue)/0.22),transparent_70%)]" />
        <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-gradient">Stop hoping nobody's looking.</h2>
        <p className="mt-4 text-lg md:text-xl text-muted-foreground">Start hiding what matters.</p>
        <Button asChild variant="hero" size="lg" className="mt-8">
          <a href="#"><Apple className="h-5 w-5" /> Download Hidy for Mac</a>
        </Button>
        <p className="mt-4 text-xs text-muted-foreground">macOS 13+ · 7-day trial · $19.90 lifetime (founding price)</p>
      </div>
    </Reveal>
  </Section>
);

const Footer = () => (
  <footer className="border-t border-border/60 mt-12">
    <div className="mx-auto max-w-6xl px-6 py-16 grid gap-10 md:grid-cols-4">
      <div className="md:col-span-1">
        <div className="flex items-center gap-2">
          <img src={hidyIcon} alt="" className="h-8 w-8 rounded-lg" width={32} height={32} />
          <span className="font-semibold">Hidy</span>
        </div>
        <p className="mt-3 text-sm text-muted-foreground max-w-xs">Privacy that doesn't watch you back.</p>
      </div>
      {[
        { h: "Product", l: ["Features", "Pricing", "Download"] },
        { h: "Support", l: ["FAQ", "Contact", "Privacy Policy", "Terms"] },
        { h: "Company", l: ["About", "Blog"] },
      ].map((c) => (
        <div key={c.h}>
          <h4 className="text-sm font-semibold">{c.h}</h4>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            {c.l.map((i) => <li key={i}><a href="#" className="hover:text-foreground transition-colors">{i}</a></li>)}
          </ul>
        </div>
      ))}
    </div>
    <div className="border-t border-border/60">
      <div className="mx-auto max-w-6xl px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
        <p>© 2026 LiveSync, Inc. Made with care.</p>
        <div className="flex items-center gap-3">
          <a href="#" aria-label="X" className="hover:text-foreground transition-colors"><Twitter className="h-4 w-4" /></a>
          <a href="#" aria-label="GitHub" className="hover:text-foreground transition-colors"><Github className="h-4 w-4" /></a>
        </div>
      </div>
    </div>
  </footer>
);

const Index = () => (
  <main className="min-h-screen bg-background">
    <Navbar />
    <Hero />
    <Wedge />
    <Features />
    <PrivacyFirst />
    <Pricing />
    <FAQ />
    <CTA />
    <Footer />
  </main>
);

export default Index;
