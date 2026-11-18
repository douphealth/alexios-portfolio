import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, Search } from "lucide-react";
import { projects } from "@/data/portfolio";
import { repos, pagesProjects } from "@/data/inventory";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Project Atlas — Websites, Apps & Source Code | Alexios Papaioannou" },
      { name: "description", content: "Searchable index of curated websites and apps, public GitHub repositories and Cloudflare Pages projects by Alexios Papaioannou." },
      { property: "og:title", content: "Project Atlas | Alexios Papaioannou" },
      { property: "og:description", content: "Explore websites, decision tools, source code and deployment records." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Atlas,
});

type Row = { name: string; url: string; kind: "Selected" | "GitHub" | "Pages"; meta: string };
const rows: Row[] = [
  ...projects.filter((p) => p.url || p.repo).map((p) => ({ name: p.name, url: (p.url ?? p.repo)!, kind: "Selected" as const, meta: [p.category, p.discipline, p.blurb].filter(Boolean).join(" · ") })),
  ...repos.map((r) => ({ name: r.name, url: r.url, kind: "GitHub" as const, meta: r.owner })),
  ...pagesProjects.map((p) => ({ name: p.name, url: p.url, kind: "Pages" as const, meta: new URL(p.url).host })),
];
const kinds = ["All", "Selected", "GitHub", "Pages"] as const;
const PAGE = 30;

function Atlas() {
  const [q, setQ] = useState("");
  const [kind, setKind] = useState<(typeof kinds)[number]>("All");
  const [sort, setSort] = useState<"relevant" | "az">("relevant");
  const [shown, setShown] = useState(PAGE);
  const list = useMemo(() => {
    const s = q.trim().toLowerCase();
    let r = rows.filter((x) => (kind === "All" || x.kind === kind) && (!s || `${x.name} ${x.meta} ${x.url}`.toLowerCase().includes(s)));
    if (sort === "az") r = [...r].sort((a, b) => a.name.localeCompare(b.name));
    return r;
  }, [q, kind, sort]);

  return (
    <section className="pb-28 pt-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <p className="eyebrow text-accent">Portfolio directory</p>
        <h1 className="mt-4 text-6xl font-light leading-[0.92] md:text-8xl">The project <em className="text-muted-foreground">atlas.</em></h1>
        <p className="mt-8 max-w-2xl text-lg text-muted-foreground">Explore websites and apps by purpose, or switch to source repositories and deployment records. Selected projects updated 18 November 2026. The historical Pages inventory is dated 3 November 2026.</p>

        <div className="md:sticky md:top-16 z-10 mt-12 flex flex-col gap-3 border-y border-foreground bg-background/95 py-4 backdrop-blur md:flex-row md:items-center">
          <label className="relative flex-1">
            <span className="sr-only">Search records</span>
            <Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input value={q} onChange={(e) => { setQ(e.target.value); setShown(PAGE); }} placeholder={`Search ${rows.length} records…`} className="w-full rounded-full border border-border bg-card py-2.5 pl-11 pr-4 focus:border-foreground focus:outline-none" />
          </label>
          <div className="flex flex-wrap gap-2">
            {kinds.map((k) => (
              <button key={k} onClick={() => { setKind(k); setShown(PAGE); }} aria-pressed={kind === k} className={cn("rounded-full border px-4 py-2 text-sm transition", kind === k ? "border-ink bg-ink text-ink-foreground" : "border-border hover:border-foreground")}>
                {k} <span className="font-mono text-xs opacity-60">{k === "All" ? rows.length : rows.filter((r) => r.kind === k).length}</span>
              </button>
            ))}
            <select value={sort} onChange={(e) => setSort(e.target.value as "relevant" | "az")} className="rounded-full border border-border bg-card px-4 py-2 text-sm" aria-label="Sort">
              <option value="relevant">Most relevant</option>
              <option value="az">Name A–Z</option>
            </select>
          </div>
        </div>

        <p className="eyebrow mt-6 text-muted-foreground" aria-live="polite">{list.length} matching records</p>
        {list.length === 0 ? (
          <div className="py-24 text-center"><p className="font-display text-3xl italic">Nothing matched those filters.</p><button onClick={() => { setQ(""); setKind("All"); }} className="mt-4 link-underline">Clear filters</button></div>
        ) : (
          <ul className="mt-4 divide-y divide-border border-b border-border">
            {list.slice(0, shown).map((r) => (
              <li key={r.kind + r.url}>
                <a href={r.url} target="_blank" rel="noreferrer" className="group grid grid-cols-[1fr_auto] items-center gap-4 py-4 transition hover:bg-card md:grid-cols-[110px_1fr_1fr_auto] md:px-3">
                  <span className={cn("eyebrow hidden md:block", r.kind === "Selected" ? "text-accent" : "text-muted-foreground")}>{r.kind}</span>
                  <span className="font-display text-xl">{r.name}</span>
                  <span className="hidden truncate font-mono text-xs text-muted-foreground md:block">{r.meta}</span>
                  <ArrowUpRight className="size-4 transition group-hover:rotate-45 group-hover:text-accent" />
                </a>
              </li>
            ))}
          </ul>
        )}
        {shown < list.length && (
          <div className="mt-10 text-center"><button onClick={() => setShown((s) => s + PAGE)} className="rounded-full border border-foreground px-6 py-3 transition hover:bg-foreground hover:text-background">Load more · {list.length - shown} remaining</button></div>
        )}
        <p className="eyebrow mt-12 max-w-3xl text-muted-foreground">The Pages archive lists historical deployments. Use the Selected filter for the curated portfolio.</p>
      </div>
    </section>
  );
}
