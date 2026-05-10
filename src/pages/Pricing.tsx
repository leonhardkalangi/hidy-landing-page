import Layout from "@/components/layout/Layout";
import PricingSection from "@/components/sections/PricingSection";
import { Section, Reveal } from "@/components/site/Section";

const PricingPage = () => (
  <Layout>
    <div className="pt-36 md:pt-44">
      <Section className="!pb-0 text-center">
        <Reveal>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-gradient">
            Simple pricing for absolute privacy.
          </h1>
        </Reveal>
        <Reveal>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground">
            One-time payment. Lifetime access. Free updates. No subscription, no surprise renewals.
          </p>
        </Reveal>
      </Section>
      <PricingSection id="pricing" />
    </div>
  </Layout>
);

export default PricingPage;
