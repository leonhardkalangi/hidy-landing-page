import { Apple, Download } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import { Section, Reveal } from "@/components/site/Section";

type Release = {
  version: string;
  tag: string;
  date: string;
  url: string;
  summary: string;
  highlights: string[];
};

const releases: Release[] = [
  {
    version: "v1.0.1",
    tag: "Public launch",
    date: "2026-05-17",
    url: "https://github.com/leonhardkalangi/hidy-landing-page/releases/download/v1.0.1-app/Hidy-1.0.1.dmg",
    summary:
      "First public Hidy build. Panic blur, Notification Blur, Area Blur, lid pre-close, cough trigger, and the ⌘⌃B hotkey are all wired up.",
    highlights: [
      "Panic blur with whole-screen frost (lid · cough · ⌘⌃B · menubar)",
      "Notification Blur for incoming banners — auto-arms when a known screen-share app is running",
      "Area Blur for any rectangle on screen, persisted across sessions",
      "Lid pre-close trigger using the hardware hinge sensor — fires before the lid touches the keyboard",
      "Cough detection (microphone) with on-device audio only — never uploads",
      "Polar.sh license activation, up to 3 Macs per license",
      "Requires macOS 13.0 or later, Apple Silicon",
    ],
  },
];

const DownloadPage = () => (
  <Layout>
    <div className="pt-36 md:pt-44">
      <Section className="!pb-0 text-center">
        <Reveal>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-gradient">
            Download Center
          </h1>
        </Reveal>
        <Reveal>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground">
            Grab the latest Hidy build and read what changed in each release. Direct download — Hidy is not in the Mac App Store.
          </p>
        </Reveal>
      </Section>

      <Section>
        <div className="space-y-6">
          {releases.map((r) => (
            <Reveal key={r.version}>
              <article className="glass rounded-3xl p-8 md:p-10">
                <header className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
                      <span className="text-foreground">{r.version}</span>
                      <span className="ml-3 text-base font-normal text-muted-foreground">{r.tag}</span>
                    </h2>
                    <p className="mt-1 text-sm text-muted-foreground">{r.date}</p>
                  </div>
                  <Button asChild variant="hero" size="lg">
                    <a href={r.url}>
                      <Apple className="h-4 w-4" /> Download for macOS
                    </a>
                  </Button>
                </header>

                <p className="mt-6 text-muted-foreground leading-relaxed">{r.summary}</p>

                <div className="mt-6">
                  <h3 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                    What's in it
                  </h3>
                  <ul className="mt-3 space-y-2 text-sm">
                    {r.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-3">
                        <Download className="mt-0.5 h-4 w-4 shrink-0 text-brand-glow" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10 text-center">
          <p className="text-sm text-muted-foreground">
            Trouble installing?{" "}
            <Link to="/contact" className="text-foreground underline-offset-4 hover:underline">
              Contact support
            </Link>{" "}
            and we'll help you out.
          </p>
        </Reveal>
      </Section>
    </div>
  </Layout>
);

export default DownloadPage;
