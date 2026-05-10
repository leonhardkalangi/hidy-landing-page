import { ReactNode } from "react";
import Layout from "@/components/layout/Layout";
import { Section, Reveal } from "@/components/site/Section";

type LegalLayoutProps = {
  title: string;
  effectiveDate?: string;
  children: ReactNode;
};

const LegalLayout = ({ title, effectiveDate, children }: LegalLayoutProps) => (
  <Layout>
    <div className="pt-36 md:pt-44">
      <Section className="!pb-12">
        <Reveal>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gradient">
            {title}
          </h1>
          {effectiveDate && (
            <p className="mt-3 text-sm text-muted-foreground">Effective {effectiveDate}</p>
          )}
        </Reveal>

        <Reveal>
          <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-2 text-xs text-amber-400">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
            Draft — pending review with legal counsel before launch
          </div>
        </Reveal>

        <Reveal>
          <div className="prose prose-invert prose-zinc mt-10 max-w-3xl prose-headings:tracking-tight prose-h2:mt-12 prose-h2:text-2xl prose-h3:mt-8 prose-h3:text-lg prose-p:text-muted-foreground prose-p:leading-relaxed prose-li:text-muted-foreground">
            {children}
          </div>
        </Reveal>
      </Section>
    </div>
  </Layout>
);

export default LegalLayout;
