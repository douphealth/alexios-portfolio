import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

const reduced = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function Tilt({ children, className, max = 6 }: { children: ReactNode; className?: string; max?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: React.PointerEvent) => {
    const el = ref.current; if (!el || reduced() || e.pointerType !== "mouse") return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(1100px) rotateY(${x * max}deg) rotateX(${-y * max}deg)`;
    el.style.setProperty("--gx", `${(x + 0.5) * 100}%`); el.style.setProperty("--gy", `${(y + 0.5) * 100}%`);
  };
  const reset = () => { if (ref.current) ref.current.style.transform = ""; };
  return (
    <div ref={ref} onPointerMove={onMove} onPointerLeave={reset} className={cn("tilt relative transition-transform duration-300 ease-out will-change-transform", className)}>
      {children}
      <div className="tilt-glare pointer-events-none absolute inset-0" aria-hidden />
    </div>
  );
}

export function Magnetic({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  return (
    <span ref={ref} className={cn("inline-block transition-transform duration-300 ease-out", className)}
      onPointerMove={(e) => {
        const el = ref.current; if (!el || reduced() || e.pointerType !== "mouse") return;
        const r = el.getBoundingClientRect();
        el.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.25}px, ${(e.clientY - r.top - r.height / 2) * 0.35}px)`;
      }}
      onPointerLeave={() => { if (ref.current) ref.current.style.transform = ""; }}>
      {children}
    </span>
  );
}

/** Soft light that follows the pointer inside the parent section. */
export function Spotlight() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current; const parent = el?.parentElement; if (!el || !parent || reduced()) return;
    const move = (e: PointerEvent) => {
      const r = parent.getBoundingClientRect();
      el.style.setProperty("--sx", `${e.clientX - r.left}px`); el.style.setProperty("--sy", `${e.clientY - r.top}px`);
      el.style.opacity = "1";
    };
    parent.addEventListener("pointermove", move);
    return () => parent.removeEventListener("pointermove", move);
  }, []);
  return <div ref={ref} className="spotlight pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700" aria-hidden />;
}

export function RotatingWord({ words, className }: { words: string[]; className?: string }) {
  const [i, setI] = useState(0);
  useEffect(() => { if (reduced()) return; const t = setInterval(() => setI((v) => (v + 1) % words.length), 2400); return () => clearInterval(t); }, [words.length]);
  return (
    <span className={cn("relative inline-grid overflow-hidden align-bottom", className)}>
      {words.map((w, n) => (
        <span key={w} aria-hidden={n !== i} className={cn("col-start-1 row-start-1 transition-all duration-700 ease-[cubic-bezier(.2,.7,.1,1)]", n === i ? "translate-y-0 opacity-100" : n === (i + words.length - 1) % words.length ? "-translate-y-full opacity-0" : "translate-y-full opacity-0")}>{w}</span>
      ))}
    </span>
  );
}

export function Counter({ to, className }: { to: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [v, setV] = useState(0);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    if (reduced()) { setV(to); return; }
    const io = new IntersectionObserver(([e]) => {
      if (!e?.isIntersecting) return; io.disconnect();
      const start = performance.now();
      const tick = (t: number) => { const p = Math.min(1, (t - start) / 1400); setV(Math.round(to * (1 - Math.pow(1 - p, 3)))); if (p < 1) requestAnimationFrame(tick); };
      requestAnimationFrame(tick);
    }, { threshold: 0.4 });
    io.observe(el); return () => io.disconnect();
  }, [to]);
  return <span ref={ref} className={cn("tabular-nums", className)}>{v}</span>;
}

/** Splits text into words that rise in sequence. */
export function SplitWords({ text, delay = 0, className }: { text: string; delay?: number; className?: string }) {
  return (
    <span className={className} aria-label={text}>
      {text.split(" ").map((w, i) => (
        <span key={i} aria-hidden className="inline-block overflow-hidden pb-[0.08em] align-bottom">
          <span className="word-rise inline-block" style={{ animationDelay: `${delay + i * 70}ms` }}>{w}&nbsp;</span>
        </span>
      ))}
    </span>
  );
}
