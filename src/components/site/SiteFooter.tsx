import { Link } from "@tanstack/react-router";
import { CONTACT_EMAIL, GITHUB_URL, mailto } from "@/data/portfolio";

export function SiteFooter() {
  return (
    <footer className="bg-ink text-ink-foreground">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8">
        <div className="flex flex-col justify-between gap-10 md:flex-row md:items-end">
          <p className="max-w-xl font-display text-4xl leading-tight md:text-5xl">Alexios<br /><em className="text-sun">Papaioannou.</em></p>
          <div className="grid grid-cols-2 gap-x-12 gap-y-2 text-sm">
            <Link to="/" hash="work" className="link-underline">Case studies</Link>
            <Link to="/projects" className="link-underline">Project atlas</Link>
            <a href={GITHUB_URL} target="_blank" rel="noreferrer" className="link-underline">GitHub ↗</a>
            <a href={mailto("Website Growth Inquiry")} className="link-underline">{CONTACT_EMAIL}</a>
          </div>
        </div>
        <div className="eyebrow mt-14 flex flex-col justify-between gap-2 border-t border-ink-foreground/15 pt-6 text-ink-foreground/60 sm:flex-row">
          <span>© {new Date().getFullYear()} Alexios Papaioannou</span>
          <span>Independent publishing · Product engineering</span>
        </div>
      </div>
    </footer>
  );
}
