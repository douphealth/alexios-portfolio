import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { mailto } from "@/data/portfolio";
import { CommandPalette } from "./CommandPalette";
import logoAp from "@/assets/logo-ap-monogram.png";

const nav = [
  { label: "Work", hash: "work" },
  { label: "Method", hash: "method" },
  { label: "Lab", hash: "lab" },
  { label: "About", hash: "about" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-ink focus:px-4 focus:py-2 focus:text-ink-foreground">Skip to content</a>
      <header className={cn("fixed inset-x-0 top-0 z-50 transition-all duration-500", scrolled ? "border-b border-border bg-background/85 backdrop-blur-md" : "bg-transparent")}>
        <div className="scroll-progress absolute inset-x-0 bottom-0 h-0.5 bg-accent" aria-hidden />
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-5 md:px-8">
          <Link to="/" className="group flex items-center gap-2.5" aria-label="Alexios Papaioannou — home">
            <img src={logoAp} alt="" width={1024} height={1024} className="h-9 w-auto transition-transform duration-500 group-hover:-rotate-3" />
            <span className="eyebrow hidden text-muted-foreground sm:inline">Alexios Papaioannou</span>
          </Link>
          <nav className="hidden items-center gap-7 md:flex" aria-label="Primary">
            {nav.map((n) => (
              <Link key={n.hash} to="/" hash={n.hash} className="link-underline text-sm">{n.label}</Link>
            ))}
            <Link to="/projects" className="link-underline text-sm">Atlas</Link>
          </nav>
          <div className="flex items-center gap-2">
            <button onClick={() => setOpen(true)} className="flex items-center gap-2 rounded-full border border-border px-3 py-1.5 text-sm text-muted-foreground transition hover:border-foreground hover:text-foreground" aria-label="Open command palette">
              <Search className="size-3.5" /> <kbd className="font-mono text-xs">⌘K</kbd>
            </button>
            <a href={mailto("Website Growth Inquiry")} className="hidden items-center gap-1 rounded-full bg-ink px-4 py-1.5 text-sm text-ink-foreground transition hover:bg-accent sm:inline-flex">
              Work with me <ArrowUpRight className="size-3.5" />
            </a>
          </div>
        </div>
      </header>
      <CommandPalette open={open} setOpen={setOpen} />
    </>
  );
}
