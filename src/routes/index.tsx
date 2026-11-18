import { useEffect, useState, type FormEvent } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Check, X } from "lucide-react";
import portrait from "@/assets/alexios-portrait.webp";
import { caseStudies, method, mainSites, cloudflarePicks, mailto, GITHUB_URL } from "@/data/portfolio";
import { WebsiteCollection } from "@/components/site/WebsiteCollection";
import { CaseArt } from "@/components/site/Illustrations";
import { PortfolioIntro, LatestWork } from "@/components/site/PortfolioShowcase";
import { Reveal } from "@/components/site/Reveal";
import { preflight, type Check as PCheck } from "@/lib/preflight";
import { cn } from "@/lib/utils";
import { Tilt } from "@/components/site/Motion";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Alexios Papaioannou — Independent Websites, Tools & Technical SEO" },
      { name: "description", content: "Explore Alexios Papaioannou’s independent websites, decision tools and technical SEO work, from rooftop solar estimates to public procurement search." },
      { property: "og:title", content: "Alexios Papaioannou — Independent Websites, Tools & Technical SEO" },
      { property: "og:description", content: "Discover ten independent websites, the tools behind them and selected Cloudflare builds." },
      { property: "og:image", content: "https://alexios-portfolio.pages.dev/network/gearuptofit-cover.webp" },
      { property: "og:url", content: "https://alexios-portfolio.pages.dev/" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://alexios-portfolio.pages.dev/" }],
    scripts: [{ type: "application/ld+json", children: JSON.stringify({
      "@context": "https://schema.org", "@graph": [
        { "@type": "Person", "@id": "https://alexios-portfolio.pages.dev/#alexios", name: "Alexios Papaioannou", jobTitle: "Founder and independent publisher", url: "https://alexios-portfolio.pages.dev/", sameAs: [GITHUB_URL] },
        { "@type": "CollectionPage", "@id": "https://alexios-portfolio.pages.dev/", name: "Alexios Papaioannou’s portfolio", author: { "@id": "https://alexios-portfolio.pages.dev/#alexios" },
          mainEntity: { "@type": "ItemList", numberOfItems: mainSites.length, itemListElement: mainSites.map((site,index) => ({ "@type": "ListItem", position: index + 1, item: { "@type": "WebSite", name: site.name, url: site.url } })) } }
      ] }) }],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      <PortfolioIntro />
      <WebsiteCollection />
      <LatestWork />
      <Lab />
      <Work />
      <Paths />
      <Method />
      <Preflight />
      <About />
      <Contact />
    </>
  );
}

function SectionHead({ k, title, sub, id }: { k: string; title: React.ReactNode; sub?: string; id?: string }) {
  return (
    <Reveal className="mb-14 grid gap-6 md:grid-cols-[1fr_1fr] md:items-end">
      <div>
        <p className="eyebrow text-accent">{k}</p>
        <h2 id={id} className="mt-4 text-5xl font-light leading-[0.95] md:text-7xl">{title}</h2>
      </div>
      {sub && <p className="max-w-md text-lg text-muted-foreground md:justify-self-end">{sub}</p>}
    </Reveal>
  );
}

function Work() {
  return (
    <section id="work" className="scroll-mt-16 py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHead k="01 / Selected case studies" title={<>Inside the <em>build.</em></>} sub="How I built a search diagnostics system, a food-label scanner and a dashboard for running a portfolio." />
        <div className="space-y-8">
          {caseStudies.map((c, i) => (
            <Reveal key={c.slug}>
              <Tilt max={3}><Link to="/work/$slug" params={{ slug: c.slug }} className={cn("group grid overflow-hidden border border-foreground bg-card transition duration-500 hover:-translate-y-1 hover:shadow-card md:grid-cols-2", i % 2 && "md:[&>*:first-child]:order-2")}>
                <div className="aspect-[36/26] overflow-hidden border-b border-foreground md:border-b-0 md:border-r">
                  <div className="h-full transition duration-700 group-hover:scale-[1.03]"><CaseArt slug={c.slug} steps={c.steps} /></div>
                </div>
                <div className="flex flex-col justify-between gap-8 p-8 md:p-10">
                  <div>
                    <p className="eyebrow text-muted-foreground">{c.index} / {c.kicker}</p>
                    <h3 className="mt-3 text-4xl md:text-5xl"><span className="whitespace-nowrap">{c.name}<span className="text-accent">.</span></span></h3>
                    <p className="mt-3 font-display text-xl italic text-muted-foreground">{c.tagline}</p>
                  </div>
                  <ul className="flex flex-wrap gap-2">
                    {c.steps.map((t) => <li key={t} className="eyebrow rounded-full border border-border px-3 py-1 text-muted-foreground transition group-hover:border-accent group-hover:text-accent">{t}</li>)}
                  </ul>
                  <span className="inline-flex items-center gap-2 text-sm font-medium">Explore the case study <ArrowUpRight className="size-4 transition group-hover:rotate-45" /></span>
                </div>
              </Link></Tilt>
            </Reveal>
          ))}
        </div>
              </div>
    </section>
  );
}

function Paths() {
  const items = [
    { t: "Recover search visibility", href: "#preflight" },
    { t: "Build a genuinely useful AI tool", href: "#lab" },
    { t: "Connect your digital systems", href: "/work/mission-control" },
  ];
  return (
    <section className="bg-secondary py-20">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <p className="eyebrow text-accent">Choose your path / 03</p>
        <h2 className="mt-3 text-4xl md:text-5xl">What are you working on?</h2>
        <div className="mt-10 grid border-t border-foreground md:grid-cols-3">
          {items.map((p, i) => (
            <a key={p.t} href={p.href} className="group flex items-start justify-between gap-6 border-b border-foreground py-8 transition hover:bg-background md:border-b-0 md:border-r md:px-6 md:last:border-r-0">
              <div><span className="font-mono text-sm text-accent">0{i + 1}</span><p className="mt-3 font-display text-2xl">{p.t}</p></div>
              <ArrowUpRight className="size-6 shrink-0 transition group-hover:rotate-45" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function Method() {
  const [step, setStep] = useState(0);
  return (
    <section id="method" className="scroll-mt-16 bg-ink py-28 text-ink-foreground">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <p className="eyebrow text-sun">02 / The method · AI × human judgment</p>
          <h2 className="mt-4 max-w-4xl text-5xl font-light leading-[0.95] md:text-7xl">AI is not the shortcut. <em className="text-accent">It's the system.</em></h2>
          <p className="mt-8 max-w-2xl text-lg text-ink-foreground/70">The advantage is not generating more output. It is connecting research, engineering, distribution and feedback — then using evidence to decide what deserves the next improvement.</p>
        </Reveal>
        <div className="mt-16 grid gap-10 lg:grid-cols-[1fr_1fr]">
          <ol className="border-t border-ink-foreground/20">
            {method.map((m, i) => (
              <li key={m.title}>
                <button onClick={() => setStep(i)} onMouseEnter={() => setStep(i)} className={cn("flex w-full items-center gap-6 border-b border-ink-foreground/20 py-5 text-left transition", step === i ? "text-sun" : "text-ink-foreground/60 hover:text-ink-foreground")} aria-pressed={step === i}>
                  <span className="font-mono text-sm">0{i + 1}</span>
                  <span className="font-display text-2xl md:text-3xl">{m.title}</span>
                  <ArrowUpRight className={cn("ml-auto size-5 transition", step === i && "rotate-45")} />
                </button>
              </li>
            ))}
          </ol>
          <div className="relative flex flex-col justify-between border border-ink-foreground/20 p-10">
            <span className="font-display text-[10rem] leading-none text-ink-foreground/10">0{step + 1}</span>
            <div key={step} className="animate-rise">
              <p className="eyebrow text-accent">Step 0{step + 1} / 05</p>
              <p className="mt-4 font-display text-3xl">{method[step]!.title}.</p>
              <p className="mt-4 text-lg text-ink-foreground/70">{method[step]!.body}</p>
            </div>
          </div>
        </div>
              </div>
    </section>
  );
}

function Lab() {
  const list = cloudflarePicks;
  return (
    <section id="lab" className="scroll-mt-16 py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHead k="Selected Cloudflare deployments" title={<>Tools you can <em>try.</em></>} sub="Explore a rental-car border policy, score a prompt, plan a day or turn an article into a quiz." />
        <ul className="grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {list.map((p) => {
            const href = p.caseStudy ? `/work/${p.caseStudy}` : p.url ?? p.repo;
            const ext = !p.caseStudy;
            const Inner = (
              <>
                <div className="flex items-start justify-between gap-4">
                  <span className="eyebrow text-muted-foreground">{p.category}</span>
                  {href && <ArrowUpRight className="size-5 transition group-hover:rotate-45 group-hover:text-accent" />}
                </div>
                <p className="mt-8 font-display text-2xl">{p.name}</p>
                <p className="mt-2 text-sm text-muted-foreground">{p.blurb}</p>
                <p className="eyebrow mt-6 truncate text-muted-foreground/80">{p.caseStudy ? "Case study" : p.url ? new URL(p.url).host : p.repo ? "Source on GitHub" : "Private"}</p>
              </>
            );
            return (
              <li key={p.name} className="bg-background">
                {href ? (
                  <a href={href} {...(ext ? { target: "_blank", rel: "noreferrer" } : {})} className="group block h-full p-7 transition hover:bg-card">{Inner}</a>
                ) : <div className="h-full p-7">{Inner}</div>}
              </li>
            );
          })}
        </ul>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
          <span />
          <Link to="/projects" className="inline-flex items-center gap-2 font-medium link-underline">Explore the complete atlas <ArrowUpRight className="size-4" /></Link>
        </div>
      </div>
    </section>
  );
}

function Preflight() {
  const [val, setVal] = useState("");
  const [res, setRes] = useState<{ checks: PCheck[]; href?: string | undefined; error?: string | undefined } | null>(null);
  const submit = (e: FormEvent) => {
    e.preventDefault();
    const r = preflight(val);
    setRes({ checks: r.checks, href: r.url?.href, error: r.error });
  };
  const passed = res?.checks.filter((c) => c.ok).length ?? 0;
  return (
    <section id="preflight" className="scroll-mt-16 bg-primary py-28 text-primary-foreground">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 md:px-8 lg:grid-cols-2">
        <Reveal>
          <p className="eyebrow text-sun">A useful first step</p>
          <h2 className="mt-4 text-5xl font-light leading-[0.95] md:text-7xl">Start with <em className="text-sun">one URL.</em></h2>
          <p className="mt-8 max-w-lg text-lg opacity-80">Get a practical indexation preflight checklist, then request a deeper technical review. Runs instantly in your browser.</p>
          <form onSubmit={submit} className="mt-10 flex flex-col gap-3 sm:flex-row">
            <label htmlFor="pf-url" className="sr-only">Your website URL</label>
            <input id="pf-url" value={val} onChange={(e) => setVal(e.target.value)} placeholder="example.com/your-page" className="min-w-0 flex-1 rounded-full border border-primary-foreground/30 bg-transparent px-6 py-3.5 placeholder:text-primary-foreground/40 focus:border-sun focus:outline-none" inputMode="url" autoComplete="url" />
            <button className="inline-flex items-center justify-center gap-2 rounded-full bg-sun px-6 py-3.5 font-medium text-ink transition hover:bg-accent hover:text-accent-foreground">Create checklist <ArrowUpRight className="size-4" /></button>
          </form>
          <p className="eyebrow mt-4 opacity-60">No URL is sent anywhere or stored.</p>
        </Reveal>
        <div className="min-h-[24rem] border border-primary-foreground/25 bg-ink/30 p-8" aria-live="polite">
          {!res && <div className="flex h-full flex-col items-center justify-center text-center opacity-60"><p className="font-display text-3xl italic">Your checklist appears here.</p><p className="eyebrow mt-3">8 structural checks · instant</p></div>}
          {res?.error && <p className="text-sun">{res.error}</p>}
          {res && !res.error && (
            <div className="animate-rise">
              <div className="flex items-baseline justify-between gap-4 border-b border-primary-foreground/20 pb-4">
                <p className="truncate font-mono text-sm opacity-80">{res.href}</p>
                <p className="font-display text-4xl">{passed}<span className="text-xl opacity-60">/{res.checks.length}</span></p>
              </div>
              <ul className="mt-4 space-y-3">
                {res.checks.map((c) => (
                  <li key={c.label} className="flex gap-3">
                    <span className={cn("mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full", c.ok ? "bg-sun text-ink" : "bg-accent text-accent-foreground")}>{c.ok ? <Check className="size-3" /> : <X className="size-3" />}</span>
                    <div><p className="font-medium">{c.label}</p><p className="text-sm opacity-70">{c.note}</p></div>
                  </li>
                ))}
              </ul>
              <a href="#contact" onClick={() => window.dispatchEvent(new CustomEvent("intake:url", { detail: { url: res.href, checklist: res.checks.map((c) => `${c.ok ? "✓" : "✗"} ${c.label}`).join("\n") } }))} className="mt-6 inline-flex items-center gap-2 font-medium text-sun link-underline">Add this URL and checklist to my enquiry <ArrowUpRight className="size-4" /></a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function About() {
  const principles = [
    ["Fix the foundation", "Crawlability, indexation, reliability and clear user value come first."],
    ["Build the real utility", "Make the product answer a concrete need, not a presentation slide."],
    ["Keep the feedback loop alive", "Measure, learn, repair and improve. Avoid claiming results without data."],
  ];
  return (
    <section id="about" className="scroll-mt-16 py-28">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 md:px-8 lg:grid-cols-[1fr_1.4fr]">
        <Reveal>
          <div className="relative w-fit">
            <img src={portrait} alt="Alexios Papaioannou" width={168} height={168} loading="lazy" className="size-40 rounded-full border border-foreground object-cover md:size-52" />
            <span className="absolute -bottom-2 -right-2 flex size-14 items-center justify-center rounded-full bg-accent font-display text-xl text-accent-foreground">AP.</span>
          </div>
          <p className="eyebrow mt-8 text-accent">The person behind the systems</p>
          <p className="mt-2 font-display text-2xl">Alexios Papaioannou</p>
          <p className="text-muted-foreground">Founder · AI & technical SEO systems</p>
        </Reveal>
        <div>
          <Reveal>
            <h2 className="text-5xl font-light leading-[0.95] md:text-6xl">Curiosity builds it. <em className="text-primary">Discipline makes it work.</em></h2>
            <p className="mt-8 text-lg leading-relaxed text-muted-foreground">I'm an independent founder and hands-on operator working across technical SEO, AI-assisted software, WordPress publishing, automation and digital products. My goal is to connect good ideas with reliable execution and measurable improvement.</p>
          </Reveal>
          <div className="mt-12 border-t border-foreground">
            {principles.map(([t, b], i) => (
              <Reveal key={t} delay={i * 80} className="grid gap-2 border-b border-border py-6 md:grid-cols-[60px_1fr_1.3fr]">
                <span className="font-mono text-sm text-accent">0{i + 1}</span><p className="font-display text-xl">{t}</p><p className="text-muted-foreground">{b}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="border-t border-foreground bg-secondary py-28">
      <Reveal className="mx-auto max-w-5xl px-5 text-center md:px-8">
        <p className="eyebrow text-accent">Work with me</p>
        <h2 className="mt-6 text-5xl font-light leading-[0.95] md:text-8xl">What would you like <em className="text-primary">to build?</em></h2>
        <p className="mx-auto mt-8 max-w-2xl text-lg text-muted-foreground">Tell me about the site, tool or search problem you have in mind. This form prepares an email to me with your project details.</p>
        <Intake />
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a href={GITHUB_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-foreground px-7 py-3.5 transition hover:bg-foreground hover:text-background">See public code <ArrowUpRight className="size-4" /></a>
        </div>
      </Reveal>
    </section>
  );
}

function Intake() {
  const [url, setUrl] = useState("");
  const [problem, setProblem] = useState("");
  const [email, setEmail] = useState("");
  const [checklist, setChecklist] = useState("");
  useEffect(() => {
    const on = (e: Event) => {
      const d = (e as CustomEvent<{ url?: string; checklist?: string }>).detail;
      if (d.url) setUrl(d.url);
      if (d.checklist) setChecklist(d.checklist);
    };
    window.addEventListener("intake:url", on);
    return () => window.removeEventListener("intake:url", on);
  }, []);
  const submit = (e: FormEvent) => {
    e.preventDefault();
    const body = `Website: ${url}\nMain bottleneck: ${problem}\nReply to: ${email}${checklist ? `\n\nPreflight checklist:\n${checklist}` : ""}`;
    window.location.href = mailto(`Project enquiry — ${url || "website"}`, body);
  };
  const field = "w-full rounded-2xl border border-border bg-card px-5 py-3.5 focus:border-foreground focus:outline-none";
  return (
    <form onSubmit={submit} className="mx-auto mt-12 grid max-w-2xl gap-3 text-left">
      <div className="grid gap-3 sm:grid-cols-2">
        <label><span className="eyebrow mb-1.5 block text-muted-foreground">Your website (optional)</span><input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="example.com" inputMode="url" className={field} /></label>
        <label><span className="eyebrow mb-1.5 block text-muted-foreground">Your email</span><input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" className={field} /></label>
      </div>
      <label><span className="eyebrow mb-1.5 block text-muted-foreground">What do you want to achieve?</span><textarea required rows={3} value={problem} onChange={(e) => setProblem(e.target.value)} placeholder="Pages not indexed, traffic dropped, need an AI tool…" className={field} /></label>
      {checklist && <p className="eyebrow text-accent">✓ Preflight checklist attached</p>}
      <button className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-ink px-7 py-4 text-ink-foreground transition hover:bg-accent">Open email draft <ArrowUpRight className="size-4" /></button>
    </form>
  );
}
