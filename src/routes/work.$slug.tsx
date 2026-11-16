import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { caseStudies, mailto } from "@/data/portfolio";
import { CaseArt } from "@/components/site/Illustrations";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/work/$slug")({
  loader: ({ params }) => {
    const study = caseStudies.find((c) => c.slug === params.slug);
    if (!study) throw notFound();
    return { study };
  },
  head: ({ loaderData }) => {
    const s = loaderData?.study;
    const title = s ? `${s.title} | Alexios Papaioannou` : "Case study | Alexios Papaioannou";
    const desc = s?.tagline ?? "Source-backed case study.";
    return { meta: [{ title }, { name: "description", content: desc }, { property: "og:title", content: title }, { property: "og:description", content: desc }, { property: "og:type", content: "article" }, { name: "twitter:card", content: "summary_large_image" }] };
  },
  component: CaseStudyPage,
});

function CaseStudyPage() {
  const { study: s } = Route.useLoaderData();
  const i = caseStudies.findIndex((c) => c.slug === s.slug);
  const next = caseStudies[(i + 1) % caseStudies.length]!;
  const sections = [
    { k: "01 / The problem", h: "Why it matters", b: s.why },
    { k: "02 / The implementation", h: "What was built", b: s.implementation },
    { k: "03 / The evidence", h: "What is verified", b: s.evidence },
  ];
  return (
    <article className="pt-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Link to="/" hash="work" className="eyebrow inline-flex items-center gap-2 text-muted-foreground hover:text-foreground"><ArrowLeft className="size-3" /> All case studies</Link>
        <div className="mt-10 grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:items-end">
          <div className="animate-rise">
            <p className="eyebrow text-accent">Case study {s.index} · {s.kicker}</p>
            <h1 className="mt-5 text-5xl font-light leading-[0.95] md:text-7xl">{s.name}<span className="text-accent">.</span></h1>
            <p className="mt-6 max-w-xl font-display text-2xl italic text-muted-foreground">{s.tagline}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={s.repo} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm text-ink-foreground transition hover:bg-accent">View source code <ArrowUpRight className="size-4" /></a>
              {s.live && <a href={s.live} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-foreground px-5 py-2.5 text-sm transition hover:bg-foreground hover:text-background">Visit project <ArrowUpRight className="size-4" /></a>}
            </div>
          </div>
          <figure className="overflow-hidden border border-foreground shadow-card">
            <CaseArt slug={s.slug} steps={s.steps} />
            <figcaption className="eyebrow border-t border-foreground bg-secondary px-4 py-2 text-muted-foreground">Illustrative system diagram · not live metrics</figcaption>
          </figure>
        </div>

        <div className="mt-24 divide-y divide-border border-y border-border">
          {sections.map((x) => (
            <Reveal key={x.k} className="grid gap-6 py-12 md:grid-cols-[220px_1fr_1.4fr]">
              <p className="eyebrow text-accent">{x.k}</p>
              <h2 className="text-3xl">{x.h}</h2>
              <p className="text-lg leading-relaxed text-muted-foreground">{x.b}</p>
            </Reveal>
          ))}
        </div>

        <Reveal className="my-20 bg-primary p-10 text-primary-foreground md:p-14">
          <p className="eyebrow text-sun">Measurement plan</p>
          <h2 className="mt-4 text-4xl md:text-5xl">Results should be measured, <em>not invented.</em></h2>
          <p className="mt-6 max-w-2xl text-lg opacity-85">{s.measurement}</p>
          <a href={mailto(`Project like ${s.name}`)} className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm text-accent-foreground transition hover:bg-sun hover:text-ink">Discuss a related project <ArrowUpRight className="size-4" /></a>
        </Reveal>

        <Link to="/work/$slug" params={{ slug: next.slug }} className="group mb-24 flex items-end justify-between border-t border-foreground pt-8">
          <div><p className="eyebrow text-muted-foreground">Next case study</p><p className="mt-2 font-display text-4xl transition group-hover:text-accent md:text-6xl">{next.name}</p></div>
          <ArrowUpRight className="size-10 transition group-hover:rotate-45" />
        </Link>
      </div>
    </article>
  );
}
