import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Section, Reveal } from "@/components/site/Section";

interface Item {
  name: string;
  comment: string;
  submittedAt: string;
}

/// Pulls the latest user submissions from /api/testimonials (CF KV) and
/// shows the 6 most recent on the homepage. "View all" links to /testimonials.
const TestimonialsSection = () => {
  const [items, setItems] = useState<Item[] | null>(null);

  useEffect(() => {
    fetch("/api/testimonials")
      .then((r) => r.json())
      .then((data) => setItems((data.items || []).slice(0, 6)))
      .catch(() => setItems([]));
  }, []);

  if (items !== null && items.length === 0) return null; // hide section until first review

  return (
    <Section id="testimonials">
      <div className="text-center">
        <Reveal>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            What people are saying
          </h2>
        </Reveal>
        <Reveal>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Real feedback, straight from Hidy users.
          </p>
        </Reveal>
      </div>
      <div className="mx-auto mt-10 grid max-w-5xl gap-4 md:grid-cols-2 lg:grid-cols-3">
        {(items || []).map((it, i) => (
          <Reveal key={i}>
            <div className="glass h-full rounded-2xl p-6">
              <p className="text-base leading-relaxed">{it.comment}</p>
              <p className="mt-4 text-sm font-medium text-muted-foreground">— {it.name}</p>
            </div>
          </Reveal>
        ))}
      </div>
      <div className="mt-8 text-center">
        <Link
          to="/testimonials"
          className="text-sm text-muted-foreground underline-offset-4 hover:underline"
        >
          See all reviews →
        </Link>
      </div>
    </Section>
  );
};

export default TestimonialsSection;
