import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Layout from "@/components/layout/Layout";
import { Section, Reveal } from "@/components/site/Section";

const Register = () => {
  const [params] = useSearchParams();
  const [license, setLicense] = useState(params.get("key") || "");
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "ok" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const valid =
    license.trim().toUpperCase().startsWith("HIDY-") &&
    name.trim() &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!valid) return;
    setStatus("submitting");
    setError(null);
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          license: license.trim().toUpperCase(),
          name: name.trim(),
          email: email.trim().toLowerCase(),
          nickname: nickname.trim() || name.trim().split(" ")[0],
        }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        setError(err.error || `HTTP ${res.status}`);
        setStatus("error");
        return;
      }
      setStatus("ok");
    } catch (err) {
      setError(String(err));
      setStatus("error");
    }
  };

  return (
    <Layout>
      <div className="pt-36 md:pt-44">
        <Section className="!pb-0 text-center">
          <Reveal>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-gradient">
              Set up your profile
            </h1>
          </Reveal>
          <Reveal>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground">
              Hidy will greet you by name. Takes 30 seconds.
            </p>
          </Reveal>
        </Section>

        <Section>
          <div className="mx-auto max-w-md">
            {status === "ok" ? (
              <Reveal>
                <div className="glass rounded-2xl p-8 text-center">
                  <h2 className="text-2xl font-semibold">All set, {nickname || name}.</h2>
                  <p className="mt-3 text-muted-foreground">
                    Open Hidy on your Mac. It'll pick up your name automatically.
                  </p>
                </div>
              </Reveal>
            ) : (
              <Reveal>
                <form onSubmit={submit} className="glass space-y-5 rounded-2xl p-8">
                  <div className="space-y-2">
                    <Label htmlFor="license">License key</Label>
                    <Input
                      id="license"
                      value={license}
                      onChange={(e) => setLicense(e.target.value.toUpperCase())}
                      placeholder="HIDY-XXXX-XXXX-XXXX-XXXX"
                      required
                      autoComplete="off"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="name">Full name</Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Leon Kalangi"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="nickname">Nickname (what should Hidy call you?)</Label>
                    <Input
                      id="nickname"
                      value={nickname}
                      onChange={(e) => setNickname(e.target.value)}
                      placeholder="Leon"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="leon@example.com"
                      required
                      autoComplete="email"
                    />
                  </div>
                  {error && <p className="text-sm text-destructive">{error}</p>}
                  <Button
                    type="submit"
                    disabled={!valid || status === "submitting"}
                    className="w-full"
                    size="lg"
                  >
                    {status === "submitting" ? "Saving..." : "Save profile"}
                  </Button>
                </form>
              </Reveal>
            )}
          </div>
        </Section>
      </div>
    </Layout>
  );
};

export default Register;
