/** Original explanatory diagrams. Illustrative only — not live metrics. */
export function SystemGraphic() {
  const nodes = [
    { x: 200, y: 70, l: "SEARCH", s: "Find the signal" },
    { x: 330, y: 200, l: "PRODUCT", s: "Make it useful" },
    { x: 200, y: 330, l: "SYSTEM", s: "Connect the parts" },
    { x: 70, y: 200, l: "IMPROVE", s: "Learn / iterate" },
  ];
  return (
    <svg viewBox="0 0 400 400" className="draw h-full w-full" role="img" aria-label="Diagram: search, product, system and improve connected in a continuous loop">
      <circle cx="200" cy="200" r="130" fill="none" stroke="var(--primary)" strokeWidth="1" strokeDasharray="3 6" />
      <circle cx="200" cy="200" r="60" fill="none" stroke="var(--accent)" strokeWidth="1.5" />
      {nodes.map((n, i) => <line key={i} x1="200" y1="200" x2={n.x} y2={n.y} stroke="var(--primary)" strokeOpacity="0.35" />)}
      <g className="origin-center animate-spin-slow" style={{ transformBox: "view-box" }}>
        <circle cx="330" cy="200" r="5" fill="var(--accent)" transform="rotate(45 200 200)" />
      </g>
      <text x="200" y="196" textAnchor="middle" className="fill-foreground font-display" fontSize="22" fontStyle="italic">engineer</text>
      <text x="200" y="218" textAnchor="middle" className="fill-accent font-mono" fontSize="9" letterSpacing="2">/ GROW</text>
      {nodes.map((n) => (
        <g key={n.l}>
          <circle cx={n.x} cy={n.y} r="30" fill="var(--card)" stroke="var(--foreground)" strokeWidth="1.2" />
          <text x={n.x} y={n.y + 3} textAnchor="middle" className="fill-foreground font-mono" fontSize="8.5" letterSpacing="1.5">{n.l}</text>
        </g>
      ))}
    </svg>
  );
}

export function CaseArt({ slug, steps }: { slug: string; steps: [string, string, string] }) {
  const tone = slug === "foodscan" ? "var(--sun)" : slug === "mission-control" ? "var(--accent)" : "var(--primary)";
  return (
    <svg viewBox="0 0 360 260" className="h-full w-full" role="img" aria-label={`Illustrative workflow: ${steps.join(", ")}`}>
      <rect x="0" y="0" width="360" height="260" fill="var(--card)" />
      <g stroke="var(--border)">{Array.from({ length: 9 }).map((_, i) => <line key={i} x1={i * 45} y1="0" x2={i * 45} y2="260" />)}</g>
      {slug === "index-engine" && (
        <g fill="none" stroke="var(--foreground)" strokeWidth="1.2">
          {Array.from({ length: 6 }).map((_, i) => <rect key={i} x={30 + i * 12} y={40 + i * 10} width="90" height="14" fill={i === 3 ? tone : "var(--background)"} />)}
          <path d="M160 100 C200 100 200 60 240 60 M160 100 C200 100 200 140 240 140" />
          <circle cx="270" cy="60" r="22" fill="var(--background)" /><circle cx="270" cy="140" r="22" fill={tone} />
        </g>
      )}
      {slug === "foodscan" && (
        <g fill="none" stroke="var(--foreground)" strokeWidth="1.2">
          <rect x="40" y="40" width="110" height="140" rx="6" fill="var(--background)" />
          {Array.from({ length: 14 }).map((_, i) => <line key={i} x1={55 + i * 6} y1="70" x2={55 + i * 6} y2={i % 3 ? 130 : 140} strokeWidth={i % 2 ? 1 : 2.5} />)}
          <circle cx="250" cy="100" r="58" fill={tone} /><path d="M225 100 l18 18 l32 -36" strokeWidth="3" stroke="var(--ink)" />
        </g>
      )}
      {slug === "mission-control" && (
        <g fill="none" stroke="var(--foreground)" strokeWidth="1.2">
          <rect x="30" y="35" width="300" height="150" fill="var(--background)" />
          <rect x="30" y="35" width="70" height="150" fill="var(--secondary)" />
          {[60, 95, 130].map((y, i) => <rect key={y} x="115" y={y} width={190 - i * 40} height="18" fill={i === 0 ? tone : "var(--card)"} />)}
        </g>
      )}
      {steps.map((s, i) => (
        <g key={s}>
          <text x={24 + i * 115} y="230" className="fill-foreground font-mono" fontSize="8.5" letterSpacing="1.5">{`0${i + 1} ${s.toUpperCase()}`}</text>
        </g>
      ))}
    </svg>
  );
}
