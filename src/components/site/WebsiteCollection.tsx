import { Fragment, useState } from "react";
import { ArrowRight, ArrowUpRight, Search, X } from "lucide-react";
import { mainSites } from "@/data/portfolio";

const topics = ["All websites", ...new Set(mainSites.map((site) => site.topic))];

export function WebsiteCollection() {
  const [topic, setTopic] = useState(topics[0]);
  const [query, setQuery] = useState("");
  const [selection, setSelection] = useState("Plantastic Haven");
  const words = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  const sites = mainSites.filter((site) => {
    const text = [site.name, site.url, site.discipline, site.blurb, site.action.label]
      .join(" ")
      .toLowerCase();
    return (
      (topic === topics[0] || topic === site.topic) && words.every((word) => text.includes(word))
    );
  });
  const active = sites.find((site) => site.name === selection) ?? sites[0];

  return (
    <section id="websites" aria-labelledby="websites-title" className="site-collection">
      <header className="collection-heading">
        <div>
          <p className="folio-kicker">
            <span /> Independent publishing & software
          </p>
          <h2 id="websites-title">
            My website <em>collection.</em>
          </h2>
        </div>
        <label className="collection-search">
          <Search size={17} aria-hidden="true" />
          <span className="sr-only">Search my websites</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Find a website or topic"
          />
        </label>
      </header>
      <div className="collection-topics" role="group" aria-label="Website topics">
        {topics.map((item) => (
          <button
            key={item}
            type="button"
            aria-pressed={topic === item}
            onClick={() => setTopic(item)}
          >
            {item}
          </button>
        ))}
        <span role="status">
          {sites.length} {sites.length === 1 ? "website" : "websites"}
        </span>
      </div>
      {active ? (
        <div className="collection-explorer">
          {sites.map((site) => (
            <Fragment key={site.url}>
              <div className="collection-row" data-selected={active === site}>
                <button
                  type="button"
                  aria-label={`Preview ${site.name}`}
                  aria-pressed={active === site}
                  onClick={() => setSelection(site.name)}
                >
                  <img src={site.image} alt="" width={70} height={48} loading="lazy" />
                  <span>
                    <strong>{site.name}</strong>
                    <small>{site.discipline}</small>
                  </span>
                </button>
                <a
                  href={site.url}
                  aria-label={`Open ${site.name}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <ArrowUpRight size={18} />
                </a>
              </div>
              {active === site && (
                <article
                  className="collection-preview"
                  style={{ gridRowEnd: `span ${sites.length}` }}
                  aria-label={`${site.name} preview`}
                >
                  <div className="collection-sticky" key={site.url}>
                    <div className="collection-art">
                      <img
                        src={site.image}
                        alt={site.alt}
                        width={530}
                        height={295}
                        loading="lazy"
                      />
                    </div>
                    <div className="collection-preview-copy">
                      <p className="folio-kicker">
                        <span /> {new URL(site.url).hostname}
                      </p>
                      <h3>{site.name}</h3>
                      <p>{site.blurb}</p>
                      <div className="collection-links">
                        <a
                          className="folio-primary"
                          href={site.url}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Visit website <ArrowUpRight size={16} />
                        </a>
                        <a
                          className="folio-text-link"
                          href={site.action.url}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {site.action.label} <ArrowRight size={15} />
                        </a>
                      </div>
                    </div>
                  </div>
                </article>
              )}
            </Fragment>
          ))}
        </div>
      ) : (
        <div className="collection-empty">
          <p>No websites match those filters.</p>
          <button
            type="button"
            className="folio-text-link"
            onClick={() => {
              setQuery("");
              setTopic(topics[0]);
            }}
          >
            Reset filters <X size={15} />
          </button>
        </div>
      )}
    </section>
  );
}
