import { Apple, Mail, KeyRound, Sparkles, Shield, UserCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import { Section, Reveal } from "@/components/site/Section";
import {
  HIDY_DMG_DOWNLOAD_URL,
  POLAR_CUSTOMER_PORTAL_URL,
} from "@/lib/polar";

const Thanks = () => {
  const [params] = useSearchParams();
  const checkoutId = params.get("checkout_id");

  return (
    <Layout>
      <div className="pt-36 md:pt-44">
        <Section className="!pb-0 text-center">
          <Reveal>
            <span className="glass inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs text-muted-foreground">
              <Sparkles className="h-3.5 w-3.5 text-brand-glow" /> Purchase complete
            </span>
          </Reveal>
          <Reveal>
            <h1 className="mt-8 text-4xl md:text-6xl font-bold tracking-tight text-gradient">
              Welcome to Hidy.
            </h1>
          </Reveal>
          <Reveal>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground">
              Your purchase is complete. Check your email for your license key.
            </p>
          </Reveal>
        </Section>

        <Section>
          <Reveal>
            <h2 className="text-center text-2xl md:text-3xl font-semibold tracking-tight">
              What&rsquo;s next
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            <Reveal>
              <div className="glass h-full rounded-2xl p-7">
                <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-brand-violet/15 text-brand-glow">
                  <Mail className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-lg font-semibold">1. Check your email</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  Your license key from <code className="text-foreground">support@hidyapp.com</code> arrives within 60 seconds. Check spam if you don&rsquo;t see it.
                </p>
              </div>
            </Reveal>

            <Reveal>
              <div className="glass h-full rounded-2xl p-7 ring-1 ring-brand-violet/40">
                <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-brand-violet/15 text-brand-glow">
                  <Apple className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-lg font-semibold">2. Download Hidy</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  Grab the DMG, drag Hidy.app into Applications, and launch.
                </p>
                <Button asChild variant="hero" size="lg" className="mt-5 w-full">
                  <a href={HIDY_DMG_DOWNLOAD_URL}>
                    <Apple className="h-4 w-4" /> Download Hidy for Mac
                  </a>
                </Button>
              </div>
            </Reveal>

            <Reveal>
              <div className="glass h-full rounded-2xl p-7">
                <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-brand-violet/15 text-brand-glow">
                  <KeyRound className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-lg font-semibold">3. Activate</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  Open Hidy, paste your license key. One license works on up to 3 Macs.
                </p>
              </div>
            </Reveal>

            <Reveal>
              <div className="glass h-full rounded-2xl p-7">
                <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-brand-violet/15 text-brand-glow">
                  <UserCircle className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-lg font-semibold">4. Set up profile</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  Tell Hidy your nickname so it greets you by name. 30 seconds.
                </p>
                <Button asChild variant="outline" size="sm" className="mt-5 w-full">
                  <Link to="/register">Set up profile</Link>
                </Button>
              </div>
            </Reveal>
          </div>
        </Section>

        <Section className="!pt-0">
          <Reveal>
            <div className="glass rounded-3xl p-8 md:p-10">
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:gap-5">
                <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-violet/15 text-brand-glow">
                  <Shield className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Opening Hidy</h3>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                    Hidy is signed with an Apple Developer ID and notarized by Apple, so it opens with a single click &mdash; drag it into Applications and launch.
                  </p>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                    On older macOS versions or with stricter security settings you may still see a one-time prompt. If so, right-click <span className="text-foreground">Hidy.app</span> &rarr; <span className="text-foreground">Open</span>, then click <span className="text-foreground">Open</span> in the dialog &mdash; macOS remembers it after that.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </Section>

        <Section className="!pt-0">
          <div className="grid gap-5 md:grid-cols-2">
            <Reveal>
              <div className="glass h-full rounded-2xl p-7">
                <h3 className="text-lg font-semibold">Support</h3>
                <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                  <li>
                    Email{" "}
                    <a
                      href="mailto:support@hidyapp.com"
                      className="text-foreground underline-offset-4 hover:underline"
                    >
                      support@hidyapp.com
                    </a>
                  </li>
                  <li>License key not received after 5 minutes? Contact us with your order ID below.</li>
                  <li>
                    <a
                      href={POLAR_CUSTOMER_PORTAL_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground underline-offset-4 hover:underline"
                    >
                      Manage your license &rarr;
                    </a>
                  </li>
                </ul>
              </div>
            </Reveal>

            <Reveal>
              <div className="glass h-full rounded-2xl p-7">
                <h3 className="text-lg font-semibold">Order details</h3>
                <p className="mt-4 text-sm text-muted-foreground">
                  Reference this order ID when contacting support.
                </p>
                <div className="mt-3 rounded-xl border border-border bg-secondary/40 px-4 py-3 font-mono text-xs text-foreground break-all">
                  {checkoutId ?? "Order ID will appear once you arrive from Polar checkout."}
                </div>
              </div>
            </Reveal>
          </div>
        </Section>
      </div>
    </Layout>
  );
};

export default Thanks;
