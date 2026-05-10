import { Apple, Eye, Wind, Laptop, BellOff, SquareDashed, ShieldCheck, Check, X, Mic } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import HeroMockup from "@/components/HeroMockup";
import { NotificationMockup, LidMockup, CoughMockup, MarkingMockup } from "@/components/FeatureMockups";
import Layout from "@/components/layout/Layout";
import { Section, Reveal } from "@/components/site/Section";
import PricingSection from "@/components/sections/PricingSection";
import hidyIcon from "@/assets/hidy-icon.png";

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
        <div className="relative mt-6 flex justify-center">
          <div className="relative inline-flex flex-col items-center">
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,hsl(var(--brand-violet)/0.32),transparent_72%)] blur-3xl md:h-44 md:w-44" />
            <h1 className="relative z-10 flex flex-col items-center gap-2 text-center text-5xl font-bold leading-[0.96] tracking-tight text-gradient md:gap-3 md:text-7xl">
              <span className="block">Privacy that doesn&apos;t</span>
              <span className="flex items-center justify-center gap-3 md:gap-5">
                <span>watch</span>
                <span className="relative inline-flex h-16 w-16 shrink-0 items-center justify-center md:h-24 md:w-24">
                  <span className="absolute inset-0 rounded-[30%] bg-[radial-gradient(circle,hsl(var(--brand-blue)/0.34),transparent_70%)] blur-2xl" />
                  <img
                    src={hidyIcon}
                    alt=""
                    aria-hidden="true"
                    className="relative h-full w-full rounded-[30%] object-cover animate-float shadow-[0_18px_40px_-12px_hsl(var(--brand-violet)/0.8)]"
                  />
                </span>
                <span>you back.</span>
              </span>
            </h1>
          </div>
        </div>
      </Reveal>
      <Reveal>
        <p className="mx-auto mt-6 max-w-2xl text-lg md:text-xl text-muted-foreground">
          Blur your Mac windows instantly. Blow into your mic, close your lid, or hit a hotkey. No camera. No surveillance.
        </p>
      </Reveal>
      <Reveal>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button asChild variant="hero" size="lg">
            <Link to="/download"><Apple className="h-5 w-5" /> Download for Mac</Link>
          </Button>
          <Button asChild variant="ghost-soft" size="lg">
            <a href="#demo">See how it works</a>
          </Button>
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
  { icon: SquareDashed, title: "Area Blur for any spot", body: "Drag a rectangle anywhere on your screen. That area stays frosted forever. Perfect for the WhatsApp Web sidebar or your bank tab corner.", Mockup: MarkingMockup },
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

const UseCases = () => {
  const cases = [
    { icon: Eye, title: "The shoulder surfer", body: "The person at the next table. The colleague walking past. The kid climbing onto your lap. Cough once and your screen goes frosted before they see a thing." },
    { icon: BellOff, title: "Live screen shares", body: "Notifications were not invited to your Zoom call. Hidy spots the banner the instant it appears and frosts the corner — your DMs stay yours." },
    { icon: Wind, title: "The walk-away", body: "Quick coffee run? Close the lid. Hidy reads the hinge angle, blurs everything before the lid even touches down, and re-arms when you open it again." },
    { icon: ShieldCheck, title: "Coffee shop coding", body: "Open laptop, sensitive Slack thread, public table. Pin a frost rectangle over the conversation and forget about it. Move the window — the frost stays put." },
  ];
  return (
    <Section>
      <Reveal>
        <h2 className="text-center text-3xl md:text-5xl font-semibold tracking-tight text-gradient">
          Made for the moments<br />you didn't plan for.
        </h2>
      </Reveal>
      <div className="mt-14 grid gap-5 md:grid-cols-2">
        {cases.map((c) => {
          const Icon = c.icon;
          return (
            <Reveal key={c.title}>
              <div className="glass h-full rounded-2xl p-7 transition-transform duration-300 hover:-translate-y-1">
                <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-brand-violet/15 text-brand-glow">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-xl font-semibold">{c.title}</h3>
                <p className="mt-2 text-muted-foreground leading-relaxed">{c.body}</p>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
};

const TrustBlock = () => {
  const ours = [
    "Run every gesture and every blur on your Mac, locally",
    "Listen to your microphone only for a short cough-shaped burst",
    "Read your laptop lid angle from a hardware sensor",
    "Update through Sparkle, signed with our Developer ID",
  ];
  const never = [
    "Open your camera. We don't even ask for permission.",
    "Send your audio, screen, or activity off your Mac",
    "Use third-party trackers, ads, or analytics inside the app",
    "Phone home with your usage. The app works offline.",
  ];
  return (
    <Section>
      <Reveal>
        <h2 className="text-center text-3xl md:text-5xl font-semibold tracking-tight text-gradient">
          Privacy you can verify.
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-center text-muted-foreground">
          What Hidy does, and what it never does. Both sides of the deal in plain English.
        </p>
      </Reveal>
      <div className="mt-14 grid gap-5 md:grid-cols-2">
        <Reveal>
          <div className="glass h-full rounded-2xl p-7 ring-1 ring-brand-violet/40">
            <h3 className="text-lg font-semibold text-brand-glow">What Hidy does</h3>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              {ours.map((i) => (
                <li key={i} className="flex items-start gap-3">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-glow" />
                  <span>{i}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
        <Reveal>
          <div className="glass h-full rounded-2xl p-7">
            <h3 className="text-lg font-semibold">What Hidy never does</h3>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              {never.map((i) => (
                <li key={i} className="flex items-start gap-3">
                  <X className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />
                  <span>{i}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </Section>
  );
};

const FAQ = () => {
  const items: [string, string][] = [
    ["Does Hidy use my camera?", "Never. Hidy does not request camera permission. The triggers are a microphone listening for cough-shaped bursts, a hardware lid-angle sensor, a global hotkey, and the menubar."],
    ["Will it work on Apple Silicon?", "Yes — Hidy is built for Apple Silicon and tested on M1, M2, M3, and M4 Macs."],
    ["What macOS version do I need?", "macOS 13 Ventura or later."],
    ["Can I use it on multiple Macs?", "Yes. One license covers up to two Macs. You can sign a Mac out from your account at any time to free a slot."],
    ["What happens after the trial?", "After 7 days, the gestures stop arming until you buy a license. Your settings are preserved — buy any time and everything picks up where you left it."],
    ["How is Hidy different from camera-based privacy apps?", "Camera-based apps stare at your face all day to decide whether to blur. Hidy uses gestures and a hardware lid sensor instead, so there's no webcam stream, no battery drain, and nothing watching you."],
    ["Does it need an internet connection?", "Only for the first license check and for app updates. Day to day, every gesture and every blur happens entirely on your Mac, offline."],
    ["What permissions does Hidy ask for?", "Microphone (for the cough trigger), Accessibility (so it can frost protected app windows), and HID access for the lid sensor. Each is requested only when you turn the matching feature on."],
    ["Refund policy?", "30-day no-questions-asked refund. Email support@hidyapp.com and we'll handle it."],
  ];
  return (
    <Section id="faq">
      <Reveal>
        <h2 className="text-center text-3xl md:text-5xl font-semibold tracking-tight text-gradient">
          Questions, answered.
        </h2>
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
  <Section id="download-cta">
    <Reveal>
      <div className="glass relative overflow-hidden rounded-3xl p-12 md:p-20 text-center brand-glow">
        <div className="pointer-events-none absolute inset-0 -z-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--brand-blue)/0.22),transparent_70%)]" />
        <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-gradient">
          Stop hoping nobody's looking.
        </h2>
        <p className="mt-4 text-lg md:text-xl text-muted-foreground">Start hiding what matters.</p>
        <Button asChild variant="hero" size="lg" className="mt-8">
          <Link to="/download"><Apple className="h-5 w-5" /> Download Hidy for Mac</Link>
        </Button>
        <p className="mt-4 text-xs text-muted-foreground">macOS 13+ · 7-day trial · $19.90 lifetime (founding price)</p>
      </div>
    </Reveal>
  </Section>
);

const Index = () => (
  <Layout>
    <Hero />
    <Wedge />
    <Features />
    <UseCases />
    <TrustBlock />
    <PricingSection />
    <FAQ />
    <CTA />
  </Layout>
);

export default Index;
