import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { projects, recentProjects, type Project } from "@/data/portfolio";

const features = recentProjects.filter(
  (project): project is Project & { cover: { src: string; alt: string }; url: string } =>
    Boolean(project.cover && project.url),
);

export function PortfolioIntro() {
  const [active, setActive] = useState(0);
  const feature = features[active]!;
  const change = (direction: number) =>
    setActive((current) => (current + direction + features.length) % features.length);

  return (
    <section className="folio-intro" aria-labelledby="intro-title">
      <div className="folio-spread">
        <div className="folio-intro-copy">
          <p className="folio-kicker"><span /> Alexios Papaioannou · Independent founder</p>
          <h1 id="intro-title">I turn good<br />questions into<br /><em>working tools.</em></h1>
          <p className="folio-deck">I build websites that help people make decisions, and the search and publishing systems that help people find them.</p>
          <div className="folio-actions">
            <a className="folio-primary" href="#latest">Explore my work <ArrowDown size={17} /></a>
            <a className="folio-text-link" href="#contact">Work with me <ArrowUpRight size={16} /></a>
          </div>
        </div>
        <div className="folio-feature" role="region" aria-label="Featured projects">
          <a href={feature.url} target="_blank" rel="noreferrer" className="folio-cover" aria-label={`Visit ${feature.name}`}>
            <img key={feature.cover.src} src={feature.cover.src} alt={feature.cover.alt} width={1200} height={680} fetchPriority="high" />
            <span className="folio-image-label">Featured work</span>
            <span className="folio-cover-caption"><span>{feature.discipline}</span><strong>{feature.name}</strong></span>
            <span className="folio-open"><ArrowUpRight size={22} /></span>
          </a>
          <div className="folio-caption">
            <p aria-live="polite">{feature.blurb}</p>
            <div className="folio-controls">
              <button type="button" onClick={() => change(-1)} aria-label="Previous featured project"><ArrowLeft size={17} /></button>
              <span>{active + 1} / {features.length}</span>
              <button type="button" onClick={() => change(1)} aria-label="Next featured project"><ArrowRight size={17} /></button>
            </div>
          </div>
        </div>
      </div>
      <div className="folio-index">
        <a href="#latest"><strong>{recentProjects.length}</strong> Recent additions <ArrowDown size={14} /></a>
        <Link to="/projects"><strong>{projects.length}</strong> Curated projects <ArrowUpRight size={14} /></Link>
        <a href="#work">Read the case studies <ArrowDown size={14} /></a>
      </div>
    </section>
  );
}

export function LatestWork() {
  const [filter, setFilter] = useState("All");
  const [expanded, setExpanded] = useState(false);
  const categories = ["All", ...new Set(recentProjects.map((project) => project.category))];
  const matches = recentProjects.filter((project) => filter === "All" || project.category === filter);
  const visible = expanded ? matches : matches.slice(0, 6);

  return (
    <section id="latest" className="folio-latest" aria-labelledby="latest-title">
      <div className="folio-section-head">
        <div><p className="folio-kicker"><span /> From the studio</p><h2 id="latest-title">Recent <em>releases.</em></h2></div>
        <Link to="/projects" className="folio-text-link">Full project atlas <ArrowUpRight size={16} /></Link>
      </div>
      <div className="folio-filter" role="group" aria-label="Filter recent projects">
        {categories.map((item) => <button type="button" key={item} aria-pressed={filter === item} onClick={() => { setFilter(item); setExpanded(false); }}>{item}</button>)}
      </div>
      <ul className="release-grid">
        {visible.map((p) => <li key={p.name}>
          <p className="folio-discipline">{p.discipline}</p>
          <h3><a href={p.url} target="_blank" rel="noreferrer">{p.name} <ArrowUpRight size={20} /></a></h3>
          <p className="release-description">{p.blurb}</p>
          <div className="release-links"><a href={p.url} target="_blank" rel="noreferrer" aria-label={`Visit ${p.name}`}>Visit website <ArrowUpRight size={13} /></a><a href={p.repo} target="_blank" rel="noreferrer" aria-label={`View ${p.name} source on GitHub`}>Source</a></div>
        </li>)}
      </ul>
      <div className="folio-results"><span aria-live="polite">{visible.length} of {matches.length} projects</span>
        {visible.length < matches.length && <button type="button" className="folio-text-link" onClick={() => setExpanded(true)}>Show all {matches.length} <ArrowDown size={15} /></button>}
      </div>
    </section>
  );
}
