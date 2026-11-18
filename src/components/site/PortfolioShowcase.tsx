import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { mainSites, recentProjects, type Project } from "@/data/portfolio";

const features = [...mainSites, ...recentProjects].filter(
  (project): project is Project & { cover: { src: string; alt: string }; url: string } =>
    Boolean(project.cover && project.url),
);

export function PortfolioIntro() {
  const [active, setActive] = useState(0);
  const feature = features[active]!;
  const change = (direction: number) =>
    setActive((current) => (current + direction + features.length) % features.length);

  return (
    <section className="studio-hero" aria-labelledby="intro-title">
      <div className="studio-stage" role="region" aria-label="Featured projects">
        <a
          className="studio-photo"
          href={feature.url}
          target="_blank"
          rel="noreferrer"
          aria-label={`Visit ${feature.name}`}
        >
          <img
            key={feature.url}
            src={feature.cover.src}
            alt={feature.cover.alt}
            width={1280}
            height={800}
            fetchPriority="high"
          />
          <span className="studio-credit">
            <small>{feature.discipline}</small>
            <strong>
              {feature.name} <ArrowUpRight size={20} />
            </strong>
          </span>
        </a>
        <div className="studio-message">
          <p className="studio-byline">
            <span /> Alexios Papaioannou · Founder & operator
          </p>
          <h1 id="intro-title">
            Independent sites.
            <br />
            <em>Practical tools.</em>
          </h1>
          <p className="studio-lede">
            I publish websites, build decision tools and engineer the search systems that help
            people discover them.
          </p>
          <div className="studio-actions">
            <a href="#websites">
              Explore my websites <ArrowDown size={16} />
            </a>
            <a href="#contact">
              Work with me <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
        <div className="studio-filmstrip">
          <div className="studio-caption" aria-live="polite">
            <span>In the portfolio</span>
            <p>{feature.blurb}</p>
          </div>
          <div className="folio-controls">
            <button type="button" onClick={() => change(-1)} aria-label="Previous featured project">
              <ArrowLeft size={18} />
            </button>
            <span>
              {active + 1} / {features.length}
            </span>
            <button type="button" onClick={() => change(1)} aria-label="Next featured project">
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
      <nav aria-label="Explore the portfolio" className="studio-shortcuts">
        <a href="#websites">
          Main websites <span>{mainSites.length}</span>
        </a>
        <a href="#latest">
          Recent releases <span>{recentProjects.length}</span>
        </a>
        <a href="#lab">
          Cloudflare builds <ArrowDown size={14} />
        </a>
        <Link to="/projects">
          Project atlas <ArrowUpRight size={14} />
        </Link>
      </nav>
    </section>
  );
}

export function LatestWork() {
  const [filter, setFilter] = useState("All");
  const [expanded, setExpanded] = useState(false);
  const categories = ["All", ...new Set(recentProjects.map((project) => project.category))];
  const matches = recentProjects.filter(
    (project) => filter === "All" || project.category === filter,
  );
  const visible = expanded ? matches : matches.slice(0, 6);

  return (
    <section id="latest" className="folio-latest" aria-labelledby="latest-title">
      <div className="folio-section-head">
        <div>
          <p className="folio-kicker">
            <span /> From the studio
          </p>
          <h2 id="latest-title">
            Recent <em>releases.</em>
          </h2>
        </div>
        <Link to="/projects" className="folio-text-link">
          Full project atlas <ArrowUpRight size={16} />
        </Link>
      </div>
      <div className="folio-filter" role="group" aria-label="Filter recent projects">
        {categories.map((item) => (
          <button
            type="button"
            key={item}
            aria-pressed={filter === item}
            onClick={() => {
              setFilter(item);
              setExpanded(false);
            }}
          >
            {item}
          </button>
        ))}
      </div>
      <ul className="release-grid">
        {visible.map((p) => (
          <li key={p.name}>
            <p className="folio-discipline">{p.discipline}</p>
            <h3>
              <a href={p.url} target="_blank" rel="noreferrer">
                {p.name} <ArrowUpRight size={20} />
              </a>
            </h3>
            <p className="release-description">{p.blurb}</p>
            <div className="release-links">
              <a href={p.url} target="_blank" rel="noreferrer" aria-label={`Visit ${p.name}`}>
                Visit website <ArrowUpRight size={13} />
              </a>
              <a
                href={p.repo}
                target="_blank"
                rel="noreferrer"
                aria-label={`View ${p.name} source on GitHub`}
              >
                Source
              </a>
            </div>
          </li>
        ))}
      </ul>
      <div className="folio-results">
        <span aria-live="polite">
          {visible.length} of {matches.length} projects
        </span>
        {visible.length < matches.length && (
          <button type="button" className="folio-text-link" onClick={() => setExpanded(true)}>
            Show all {matches.length} <ArrowDown size={15} />
          </button>
        )}
      </div>
    </section>
  );
}
