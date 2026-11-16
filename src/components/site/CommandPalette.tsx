import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { caseStudies, projects, mailto, GITHUB_URL } from "@/data/portfolio";

export function CommandPalette({ open, setOpen }: { open: boolean; setOpen: (o: boolean) => void }) {
  const navigate = useNavigate();
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); setOpen(!open); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, setOpen]);
  const go = (fn: () => void) => { setOpen(false); fn(); };
  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Search case studies, projects, actions…" />
      <CommandList>
        <CommandEmpty>Nothing matched.</CommandEmpty>
        <CommandGroup heading="Case studies">
          {caseStudies.map((c) => (
            <CommandItem key={c.slug} value={`case ${c.name}`} onSelect={() => go(() => navigate({ to: "/work/$slug", params: { slug: c.slug } }))}>
              <span className="font-mono text-xs text-accent">{c.index}</span> {c.name}
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandGroup heading="Pages & actions">
          <CommandItem onSelect={() => go(() => navigate({ to: "/projects" }))}>Project atlas — every public record</CommandItem>
          <CommandItem onSelect={() => go(() => navigate({ to: "/", hash: "preflight" }))}>Run a URL preflight checklist</CommandItem>
          <CommandItem onSelect={() => go(() => window.open(GITHUB_URL, "_blank"))}>Open GitHub</CommandItem>
          <CommandItem onSelect={() => go(() => (window.location.href = mailto("Website Growth Inquiry")))}>Email Alexios</CommandItem>
        </CommandGroup>
        <CommandGroup heading="Live projects">
          {projects.filter((p) => p.url).map((p) => (
            <CommandItem key={p.name} value={`project ${p.name}`} onSelect={() => go(() => window.open(p.url, "_blank"))}>
              {p.name} <span className="ml-auto text-xs text-muted-foreground">{p.category}</span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
