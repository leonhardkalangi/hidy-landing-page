import { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import { Section, Reveal } from "@/components/site/Section";

interface Item {
  name: string;
  comment: string;
  submittedAt: string;
  rating?: number;
}

const Testimonials = () => {
  const [items, setItems] = useState<Item[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/testimonials")
      .then((r) => r.json())
      .then((data) => setItems(data.items || []))
      .catch((e) => setError(String(e)));
  }, []);

  return (
    <Layout>
      <div className="pt-36 md:pt-44">
        <Section className="!pb-0 text-center">
          <Reveal>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-gradient">
              What people say
            </h1>
          </Reveal>
          <Reveal>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground">
              Real feedback from real Hidy users.
            </p>
          </Reveal>
        </Section>

        <Section>
          {error && (
            <p className="text-center text-destructive">Failed to load: {error}</p>
          )}
          {items === null && !error && (
            <p className="text-center text-muted-foreground">Loading…</p>
          )}
          {items && items.length === 0 && (
            <p className="text-center text-muted-foreground">
              No reviews yet — be the first.
            </p>
          )}
          {items && items.length > 0 && (
            <div className="mx-auto grid max-w-4xl gap-4 md:grid-cols-2">
              {items.map((it, i) => (
                <Reveal key={i}>
                  <div className="glass rounded-2xl p-6">
                    <p className="text-base leading-relaxed">{it.comment}</p>
                    <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
                      <span className="font-medium">{it.name}</span>
                      <span>{formatDate(it.submittedAt)}</span>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          )}
        </Section>
      </div>
    </Layout>
  );
};

function formatDate(iso: string): string {
  if (!iso) return "";
  try {
    const d = new Date(iso);
    return d.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
  } catch {
    return "";
  }
}

export default Testimonials;
