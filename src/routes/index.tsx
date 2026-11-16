import { useState, type FormEvent } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Check, X, ArrowDown } from "lucide-react";
import portrait from "@/assets/alexios-portrait.webp.asset.json";
import { caseStudies, method, projects, mailto, GITHUB_URL, type Category } from "@/data/portfolio";
import { repos, pagesProjects } from "@/data/inventory";
import { SystemGraphic, CaseArt } from "@/components/site/Illustrations";
import { Reveal } from "@/components/site/Reveal";
import { preflight, type Check as PCheck } from "@/lib/preflight";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Alexios Papaioannou — Technical SEO & AI Growth Systems" },
      { name: "description", content: "I fix what holds websites back and build what moves them forward: technical SEO, indexation and AI product engineering with source-backed work." },
      { property: "og:title", content: "Alexios Papaioannou — Technical SEO & AI Growth Systems" },
      { property: "og:description", content: "Fix what holds sites back. Build what moves them forward. Source-backed case studies, no invented metrics." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <Work />
      <Paths />
      <Method />
      <Lab />
      <Preflight />
      <About />
      <Contact />
    </>
  );
}

function Hero() {
  const [tab, setTab] = useState(0);
  const c = caseStudies[tab]!;
  return (
    <section className="relative overflow-hidden pt-28 md:pt-36">
      <div className="grain pointer-events-none absolute inset-0 opacity-60" aria-hidden />
      <div className="relative mx-auto grid max-w-7xl gap-14 px-5 pb-20 md:px-8 lg:grid-cols-[1.25fr_1fr]">
        <div>
          <div className="flex animate-rise items-center gap-4">
            <img src={portrait.url} alt="Portrait of Alexios Papaioannou" width={56} height={56} className="size-14 rounded-full border-2 border-background object-cover shadow-card" />
            <div>
              <p className="text-sm font-medium">Hello, I'm Alexios Papaioannou.</p>
              <p className="eyebrow text-muted-foreground">Founder · Technical SEO · AI engineering</p>
            </div>
          </div>
          <h1 className="mt-10 animate-rise text-[clamp(3rem,8vw,7rem)] font-light leading-[0.92]" style={{ animationDelay: "120ms" }}>
            Fix what holds <br className="hidden sm:block" />sites <em className="text-accent">back.</em>
            <span className="mt-2 block text-muted-foreground">Build what moves them <em className="text-primary">forward.</em></span>
          </h1>
          <p className="mt-8 max-w-xl animate-rise text-lg leading-relaxed text-muted-foreground" style={{ animationDelay: "240ms" }}>
            I combine technical SEO and AI product engineering to solve real website problems — then connect the code, content and infrastructure into systems that keep improving.
          </p>
          <div className="mt-10 flex animate-rise flex-wrap items-center gap-3" style={{ animationDelay: "360ms" }}>
            <a href={mailto("Website Growth and SEO Inquiry")} className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-ink-foreground transition hover:bg-accent">Work with me <ArrowUpRight className="size-4" /></a>
            <a href="#work" className="inline-flex items-center gap-2 rounded-full border border-foreground px-6 py-3 transition hover:bg-foreground hover:text-background">Explore the evidence <ArrowDown className="size-4" /></a>
          </div>
          <p className="eyebrow mt-6 text-muted-foreground">Real products · traceable source code · no invented performance claims</p>
        </div>

        <div className="relative animate-rise border border-foreground bg-card shadow-card" style={{ animationDelay: "200ms" }}>
          <div className="eyebrow flex justify-between border-b border-foreground px-4 py-2"><span>AP / The system</span><span className="text-accent">Fig. 001</span></div>
          <div className="aspect-square p-4"><SystemGraphic /></div>
          <div className="border-t border-foreground">
            <div className="grid grid-cols-3" role="tablist" aria-label="Operating model">
              {["Search", "Products", "Systems"].map((l, i) => (
                <button key={l} role="tab" aria-selected={tab === i} onClick={() => setTab(i)} className={cn("eyebrow border-r border-foreground py-3 transition last:border-r-0", tab === i ? "bg-ink text-ink-foreground" : "hover:bg-secondary")}>
                  0{i + 1} / {l}
                </button>
              ))}
            </div>
            <Link to="/work/$slug" params={{ slug: c.slug }} className="group flex items-center justify-between gap-4 p-5" role="tabpanel">
              <div><p className="font-display text-2xl">{c.name}</p><p className="text-sm text-muted-foreground">{c.tagline}</p></div>
              <ArrowUpRight className="size-6 shrink-0 transition group-hover:rotate-45 group-hover:text-accent" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function Marquee() {
  const words = ["Technical SEO", "Indexation", "AI products", "WordPress publishing", "Automation", "Cloudflare", "Source-backed", "Measure & improve"];
  return (
    <div className="overflow-hidden border-y border-foreground bg-ink py-4 text-ink-foreground" aria-hidden>
      <div className="flex w-max animate-marquee gap-10 whitespace-nowrap font-display text-2xl italic">
        {[...words, ...words].map((w, i) => <span key={i} className="flex items-center gap-10">{w}<span className="text-accent">✳</span></span>)}
      </div>
    </div>
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
        <SectionHead k="01 / Selected case studies" title={<>Proof in the <em>things I build.</em></>} sub="Different problems. One discipline: understand what matters, engineer a useful response, and keep the implementation traceable." />
        <div className="space-y-8">
          {caseStudies.map((c, i) => (
            <Reveal key={c.slug}>
              <Link to="/work/$slug" params={{ slug: c.slug }} className={cn("group grid overflow-hidden border border-foreground bg-card transition duration-500 hover:shadow-card md:grid-cols-2", i % 2 && "md:[&>*:first-child]:order-2")}>
                <div className="aspect-[36/26] overflow-hidden border-b border-foreground md:border-b-0 md:border-r">
                  <div className="h-full transition duration-700 group-hover:scale-[1.03]"><CaseArt slug={c.slug} steps={c.steps} /></div>
                </div>
                <div className="flex flex-col justify-between gap-8 p-8 md:p-10">
                  <div>
                    <p className="eyebrow text-muted-foreground">{c.index} / {c.kicker}</p>
                    <h3 className="mt-3 text-4xl md:text-5xl">{c.name}<span className="text-accent">.</span></h3>
                    <p className="mt-3 font-display text-xl italic text-muted-foreground">{c.tagline}</p>
                  </div>
                  <dl className="grid gap-5 text-sm sm:grid-cols-2">
                    <div><dt className="eyebrow text-accent">The problem</dt><dd className="mt-2">{c.problem}</dd></div>
                    <div><dt className="eyebrow text-accent">What I built</dt><dd className="mt-2">{c.built}</dd></div>
                  </dl>
                  <span className="inline-flex items-center gap-2 text-sm font-medium">Explore the case study <ArrowUpRight className="size-4 transition group-hover:rotate-45" /></span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
        <p className="eyebrow mt-8 text-muted-foreground">Case studies describe documented architecture. They do not imply independently verified traffic or revenue gains.</p>
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
        <p className="eyebrow mt-8 text-ink-foreground/50">A working model, not a claim that every connected product is autonomous or verified live.</p>
      </div>
    </section>
  );
}

const cats: ("All" | Category)[] = ["All", "Search & publishing", "AI products", "Operations"];
function Lab() {
  const [cat, setCat] = useState<(typeof cats)[number]>("All");
  const list = projects.filter((p) => cat === "All" || p.category === cat);
  return (
    <section id="lab" className="scroll-mt-16 py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHead k="03 / The product lab" title={<>Beyond the <em>headlines.</em></>} sub="Useful products, search-led publishing and operating systems — each a piece of a larger practice: build intelligently, make it discoverable, improve what matters." />
        <div className="mb-8 flex flex-wrap gap-2" role="group" aria-label="Filter projects">
          {cats.map((c) => (
            <button key={c} onClick={() => setCat(c)} aria-pressed={cat === c} className={cn("rounded-full border px-4 py-1.5 text-sm transition", cat === c ? "border-ink bg-ink text-ink-foreground" : "border-border hover:border-foreground")}>
              {c} <span className="ml-1 font-mono text-xs opacity-60">{c === "All" ? projects.length : projects.filter((p) => p.category === c).length}</span>
            </button>
          ))}
        </div>
        <ul className="grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
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
        <Reveal className="mt-16 grid gap-px border border-foreground bg-foreground sm:grid-cols-3">
          {[[projects.length, "Curated websites & apps"], [repos.length, "Public GitHub repositories"], [pagesProjects.length, "Cloudflare Pages records*"]].map(([n, l]) => (
            <div key={l as string} className="bg-card p-8"><p className="font-display text-6xl font-light">{n}</p><p className="eyebrow mt-2 text-muted-foreground">{l}</p></div>
          ))}
        </Reveal>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
          <p className="eyebrow text-muted-foreground">*One connected Cloudflare account. Counts do not imply uptime or traffic.</p>
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
          <p className="mt-8 max-w-lg text-lg opacity-80">Get a practical indexation preflight checklist, then request a deeper technical review. This browser-only tool checks URL structure; it does not query Google or claim a page is indexed.</p>
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
              <a href={mailto("Website SEO review", `Website: ${res.href}\nMain problem: `)} className="mt-6 inline-flex items-center gap-2 font-medium text-sun link-underline">Request a deeper review <ArrowUpRight className="size-4" /></a>
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
            <img src={portrait.url} alt="Alexios Papaioannou" width={168} height={168} loading="lazy" className="size-40 rounded-full border border-foreground object-cover md:size-52" />
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
        <p className="eyebrow text-accent">Ready to fix what matters?</p>
        <h2 className="mt-6 text-5xl font-light leading-[0.95] md:text-8xl">Make your site easier to find. <em className="text-accent">And worth finding.</em></h2>
        <p className="mx-auto mt-8 max-w-2xl text-lg text-muted-foreground">For site owners who need an indexation diagnosis, an AI-powered utility, or a practical WordPress growth system. Share the URL and the problem; the first step is defining what can actually be measured.</p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <a href={mailto("Website Growth Inquiry")} className="inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3.5 text-ink-foreground transition hover:bg-accent">Work with me <ArrowUpRight className="size-4" /></a>
          <a href={GITHUB_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-foreground px-7 py-3.5 transition hover:bg-foreground hover:text-background">See public code <ArrowUpRight className="size-4" /></a>
        </div>
      </Reveal>
    </section>
  );
}
