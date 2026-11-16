export type Check = { label: string; ok: boolean; note: string };

/** Browser-only URL-structure preflight. Does not crawl or query Google. */
export function preflight(input: string): { url: URL | null; checks: Check[]; error?: string } {
  let raw = input.trim();
  if (!raw) return { url: null, checks: [], error: "Enter a URL to check." };
  if (!/^https?:\/\//i.test(raw)) raw = `https://${raw}`;
  let url: URL;
  try {
    url = new URL(raw);
  } catch {
    return { url: null, checks: [], error: "That doesn't look like a valid URL." };
  }
  if (!url.hostname.includes(".")) return { url: null, checks: [], error: "Include a full domain, e.g. example.com." };
  const path = url.pathname;
  const params = [...url.searchParams.keys()];
  const tracking = params.filter((p) => /^(utm_|gclid|fbclid|ref$|mc_)/i.test(p));
  const checks: Check[] = [
    { label: "Served over HTTPS", ok: url.protocol === "https:", note: "Search engines prefer the HTTPS version; confirm HTTP redirects with a 301." },
    { label: "No tracking parameters", ok: tracking.length === 0, note: tracking.length ? `Remove ${tracking.join(", ")} — canonicalize to the clean URL.` : "Clean of utm/gclid/fbclid parameters." },
    { label: "Few query parameters", ok: params.length - tracking.length <= 1, note: "Parameter-heavy URLs often create duplicate or crawl-trap variants." },
    { label: "Lowercase path", ok: path === path.toLowerCase(), note: "Mixed-case paths can split signals between duplicates." },
    { label: "No fragment dependence", ok: !url.hash, note: "Content behind #fragments is not indexed as a separate page." },
    { label: "Readable, hyphenated slug", ok: !/[_ ]|%20/.test(path), note: "Prefer hyphens over underscores or encoded spaces." },
    { label: "Reasonable depth", ok: path.split("/").filter(Boolean).length <= 4, note: "Deep URLs are often far from internal links; check click depth." },
    { label: "Reasonable length", ok: url.href.length <= 115, note: `URL is ${url.href.length} characters.` },
  ];
  return { url, checks };
}
