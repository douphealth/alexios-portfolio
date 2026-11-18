import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Search } from "lucide-react";
import { cn } from "@/lib/utils";
const CommandPalette = lazy(() => import("./CommandPalette").then((module) => ({ default: module.CommandPalette })));


const nav = [
  { label: "Websites", hash: "websites" },
  { label: "Latest", hash: "latest" },
  { label: "Case studies", hash: "work" },

  { label: "About", hash: "about" },
] as const;

export function SiteHeader() {
  const searchButton = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    function shortcut(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((previous) => !previous);
      }
    }
    window.addEventListener("keydown", shortcut);
    return () => window.removeEventListener("keydown", shortcut);
  }, []);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-ink focus:px-4 focus:py-2 focus:text-ink-foreground">Skip to content</a>
      <header className={cn("fixed inset-x-0 top-0 z-50 transition-all duration-500", scrolled ? "border-b border-border bg-background/85 backdrop-blur-md" : "bg-background")}>
        <div className="scroll-progress absolute inset-x-0 bottom-0 h-0.5 bg-accent" aria-hidden />
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-5 md:px-8">
          <Link to="/" className="group flex items-center gap-2.5" aria-label="Alexios Papaioannou — home">
            <span className="folio-monogram" aria-hidden="true">ap<span>.</span></span>
            <span className="folio-wordmark">Alexios Papaioannou</span>
          </Link>
          <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary">
            {nav.map((n) => (
              <Link key={n.hash} to="/" hash={n.hash} className="link-underline text-sm">{n.label}</Link>
            ))}
            <Link to="/projects" className="link-underline text-sm">Atlas</Link>
          </nav>
          <div className="flex items-center gap-2">
            <button ref={searchButton} aria-haspopup="dialog" onClick={() => setOpen(true)} className="flex items-center gap-2 rounded-full border border-border px-3 py-1.5 text-sm text-muted-foreground transition hover:border-foreground hover:text-foreground" aria-label="Open command palette">
              <Search className="size-3.5" /> <span>Search</span>
            </button>
            <a href="/#contact" className="hidden items-center gap-1 rounded-full bg-ink px-4 py-1.5 text-sm text-ink-foreground transition hover:bg-accent sm:inline-flex">
              Work with me <ArrowUpRight className="size-3.5" />
            </a>
          </div>
        </div>
      </header>
      {open && <Suspense fallback={<span role="status" className="sr-only">Opening search</span>}><CommandPalette open={open} setOpen={(value) => {setOpen(value); if (!value) searchButton.current?.focus();}} /></Suspense>}
    </>
  );
}
