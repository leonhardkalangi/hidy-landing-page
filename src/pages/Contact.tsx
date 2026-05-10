import { Mail, Twitter, HelpCircle } from "lucide-react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Section, Reveal } from "@/components/site/Section";

type Channel = {
  icon: typeof Mail;
  title: string;
  body: string;
  cta: string;
  href: string;
  external?: boolean;
};

const channels: Channel[] = [
  {
    icon: Mail,
    title: "Email Support",
    body: "Send us a note about anything — bugs, billing, license trouble. We typically reply within 24 hours.",
    cta: "support@hidy.app",
    href: "mailto:support@hidy.app",
  },
  {
    icon: Twitter,
    title: "X / Twitter",
    body: "Follow Hidy for build updates, release announcements, and quick support over DMs.",
    cta: "@hidyapp",
    href: "https://twitter.com/hidyapp",
    external: true,
  },
  {
    icon: HelpCircle,
    title: "FAQ",
    body: "Most setup and license questions are answered on the homepage FAQ. Worth a peek before you write.",
    cta: "View FAQ →",
    href: "/#faq",
  },
];

const ContactPage = () => (
  <Layout>
    <div className="pt-36 md:pt-44">
      <Section className="text-center">
        <Reveal>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-gradient">
            Get in touch.
          </h1>
        </Reveal>
        <Reveal>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground">
            Question, bug report, license issue, or just want to say hi — pick the channel that fits.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-5 md:grid-cols-3 text-left">
          {channels.map((c) => {
            const Icon = c.icon;
            const Wrapper = c.external
              ? ({ children }: { children: React.ReactNode }) => (
                  <a
                    href={c.href}
                    target="_blank"
                    rel="noreferrer"
                    className="glass block h-full rounded-2xl p-7 transition-transform duration-300 hover:-translate-y-1"
                  >
                    {children}
                  </a>
                )
              : c.href.startsWith("mailto:")
                ? ({ children }: { children: React.ReactNode }) => (
                    <a href={c.href} className="glass block h-full rounded-2xl p-7 transition-transform duration-300 hover:-translate-y-1">
                      {children}
                    </a>
                  )
                : ({ children }: { children: React.ReactNode }) => (
                    <Link to={c.href} className="glass block h-full rounded-2xl p-7 transition-transform duration-300 hover:-translate-y-1">
                      {children}
                    </Link>
                  );
            return (
              <Reveal key={c.title}>
                <Wrapper>
                  <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-brand-violet/15 text-brand-glow">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 text-xl font-semibold">{c.title}</h3>
                  <p className="mt-2 text-muted-foreground leading-relaxed">{c.body}</p>
                  <p className="mt-5 text-sm font-medium text-foreground">{c.cta}</p>
                </Wrapper>
              </Reveal>
            );
          })}
        </div>
      </Section>
    </div>
  </Layout>
);

export default ContactPage;
