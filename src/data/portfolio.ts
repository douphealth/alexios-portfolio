export const CONTACT_EMAIL = "papalexios@gmail.com";
export const GITHUB_URL = "https://github.com/douphealth";
export const mailto = (subject: string, body = "") =>
  `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}${body ? `&body=${encodeURIComponent(body)}` : ""}`;

export type Category = "Search & publishing" | "AI products" | "Operations" | "Decision tools" | "Web design";

export type Project = {
  name: string;
  url?: string;
  repo?: string;
  category: Category;
  blurb: string;
  caseStudy?: string;
  flagship?: boolean;
  discipline?: string;
  cover?: { src: string; alt: string };
};

export const recentProjects: Project[] = [
  {"name": "Signalroom", "url": "https://signalroom.store/", "repo": "https://github.com/douphealth/signal-room", "category": "Operations", "discipline": "Status monitoring", "blurb": "See which AI and developer services are reporting incidents, then open the provider’s own status report."},
  {"name": "Stain Solver", "url": "https://stainsolver.shop/", "repo": "https://github.com/douphealth/stain-solver", "category": "Decision tools", "discipline": "Textile care", "blurb": "Choose the spill and fabric to find the first step to take before you wash."},
  {"name": "TenderAtlas", "url": "https://tenderatlas.shop/", "repo": "https://github.com/douphealth/tender-atlas", "category": "Decision tools", "discipline": "Procurement", "blurb": "Find public procurement notices across official sources and follow each opportunity back to its publisher."},
  {"name": "SolarPayback", "url": "https://solarpayback.shop/", "repo": "https://github.com/douphealth/solar-payback", "category": "Decision tools", "discipline": "Energy modelling", "blurb": "Compare the payback period of a rooftop solar quote using local production estimates and your electricity costs.", "cover": {"src": "/work/solarpayback.webp", "alt": "Solar panels on a roof at sunset"}},
  {"name": "Check The Tag", "url": "https://checkthetag.shop/", "repo": "https://github.com/douphealth/check-the-tag", "category": "Decision tools", "discipline": "Laundry care", "blurb": "Match the symbols on a garment label to plain-language washing and drying instructions."},
  {"name": "STOP THAT!", "url": "https://stopthat.shop/", "repo": "https://github.com/douphealth/stop-that", "category": "Decision tools", "discipline": "Digital privacy", "blurb": "Look up the setting that controls an unwanted notification, pop-up or autoplay feature."},
  {"name": "CabinVolt", "url": "https://cabinvolt.shop/", "repo": "https://github.com/douphealth/cabin-volt", "category": "Decision tools", "discipline": "Air travel", "blurb": "Check a power bank against published airline policies and model-specific recall records before packing."},
  {"name": "BuyOnce", "url": "https://buyonce.site/", "repo": "https://github.com/douphealth/buy-once", "category": "Decision tools", "discipline": "Consumer technology", "blurb": "See which smart-device features keep working when you cancel the subscription.", "cover": {"src": "/work/buyonce.webp", "alt": "A video doorbell, security camera and smart ring"}},
  {"name": "Fix or Refund?", "url": "https://fixorrefund.shop/", "repo": "https://github.com/douphealth/fix-or-refund", "category": "Decision tools", "discipline": "Consumer rights", "blurb": "Explore repair and seller-remedy options for a faulty purchase using EU consumer guidance."},
  {"name": "BorderCover Atlas", "url": "https://bordercover.shop/", "repo": "https://github.com/douphealth/border-cover", "category": "Decision tools", "discipline": "Insurance research", "blurb": "Research whether a motor policy covers a cross-border trip and trace each condition to its source.", "cover": {"src": "/work/bordercover.webp", "alt": "A car following a winding Mediterranean coast road"}},
  {"name": "Offramp", "url": "https://offramp-xkm.pages.dev/", "repo": "https://github.com/douphealth/offramp", "category": "Decision tools", "discipline": "Subscription management", "blurb": "Find the cancellation steps for a subscription based on where you signed up and who bills you."},
  {"name": "Archontiko Tsikari", "url": "https://tsikari.pages.dev/", "repo": "https://github.com/papalexios01/tsikari", "category": "Web design", "discipline": "Hospitality design", "blurb": "Explore five studios inside a restored 1901 mansion in Varos, Lemnos, through a bilingual hospitality website.", "cover": {"src": "/work/tsikari.webp", "alt": "The mansion facade on the village square in Varos"}},
];

export const projects: Project[] = [
  ...recentProjects,
  { name: "Index Engine", flagship: true, repo: "https://github.com/douphealth/index-engine", category: "Search & publishing", blurb: "Discovers, diagnoses and prioritizes URL indexation problems.", caseStudy: "index-engine" },
  { name: "Open FoodScan", flagship: true, url: "https://food-scan.gearuptofit.com/", repo: "https://github.com/douphealth/foodscan", category: "AI products", blurb: "Barcode intelligence with nutrition, allergens and honest price sources.", caseStudy: "foodscan" },
  { name: "Mission Control", flagship: true, url: "https://mission-control-21072026.pages.dev/", repo: "https://github.com/douphealth/mission-control-21072026", category: "Operations", blurb: "One timeline for websites, builds, tasks and infrastructure.", caseStudy: "mission-control" },
  { name: "ImageAlchemy", flagship: true, url: "https://imagealchemy.app/", repo: "https://github.com/douphealth/image-alchemy-pro", category: "AI products", blurb: "AI image generation and transformation studio." },
  { name: "GearUpToFit", flagship: true, url: "https://gearuptofit.com/", repo: "https://github.com/douphealth/gearuptofit", category: "Search & publishing", blurb: "Fitness and running publication with interactive tools." },
  { name: "Affiliate Marketing for Success", url: "https://affiliatemarketingforsuccess.com/", repo: "https://github.com/douphealth/affiliatemarketingforsuccess", category: "Search & publishing", blurb: "Guides on affiliate marketing, SEO and online business." },
  { name: "Plantastic Haven", url: "https://plantastichaven.com/", repo: "https://github.com/douphealth/plantastichaven", category: "Search & publishing", blurb: "Houseplant and gardening publication." },
  { name: "Plantastic Haven Pro", url: "https://procare.plantastichaven.com/", category: "AI products", blurb: "Plant care planning companion." },
  { name: "GearUpToGrow", url: "https://gearuptogrow.com/", repo: "https://github.com/douphealth/gearuptogrow", category: "Search & publishing", blurb: "Personal growth and productivity publication." },
  { name: "Mystical Digits", url: "https://mysticaldigits.com/", repo: "https://github.com/douphealth/mystical-digits", category: "Search & publishing", blurb: "Numerology and angel number publication." },
  { name: "Mystic Blueprint", url: "https://blueprint.mysticaldigits.com/", category: "AI products", blurb: "Personal numerology blueprint generator." },
  { name: "FrenchyFab", url: "https://frenchyfab.com/", repo: "https://github.com/douphealth/frenchyfab", category: "Search & publishing", blurb: "French Bulldog care and lifestyle publication." },
  { name: "Frenchie Care Compass", url: "https://care-plan.frenchyfab.com/", repo: "https://github.com/douphealth/frenchie-care-compass", category: "AI products", blurb: "Personalized French Bulldog care plans." },
  { name: "Mice Gone Guide", url: "https://micegoneguide.com/", repo: "https://github.com/douphealth/micegoneguide", category: "Search & publishing", blurb: "Practical pest control guides." },
  { name: "Mice Solver Pro", url: "https://elimination.micegoneguide.com/", category: "AI products", blurb: "Step-by-step rodent elimination planner." },
  { name: "Efficient GPT Prompts", url: "https://efficientgptprompts.com/", category: "AI products", blurb: "Prompt library for practical AI work." },
  { name: "OpenClaw Skills Hub", url: "https://openclaw-skillshub.com/", repo: "https://github.com/douphealth/claw-skills-hub", category: "AI products", blurb: "Directory of skills for AI agents." },
  { name: "RunMatch", flagship: true, url: "https://runmatch.gearup-flow-master.pages.dev/", repo: "https://github.com/douphealth/gearuptofit-runmatch-ai-buddy", category: "AI products", blurb: "AI running companion and matcher." },
  { name: "Fitness Plan", url: "https://fitness-plan.gearup-flow-master.pages.dev/", category: "AI products", blurb: "Personalized fitness plan builder." },
  { name: "Shoe Match", url: "https://gearuptofit.com/shoe-match", category: "AI products", blurb: "Find the right running shoe." },
  { name: "Watch Match", url: "https://gearuptofit.com/watch-match", category: "AI products", blurb: "Find the right fitness watch." },
  { name: "Supplement Match", url: "https://gearuptofit.com/supplement-match", category: "AI products", blurb: "Supplement recommendations with context." },
  { name: "GearUpToFit Fitness Plan", url: "https://gearuptofit.com/fitness-plan", category: "AI products", blurb: "On-site fitness planning tool." },
  { name: "Backlink Command Center", repo: "https://github.com/douphealth/backlink-command-center", category: "Operations", blurb: "Backlink tracking and outreach operations." },
];

export type CaseStudy = {
  slug: string;
  index: string;
  name: string;
  kicker: string;
  title: string;
  tagline: string;
  problem: string;
  built: string;
  steps: [string, string, string];
  why: string;
  implementation: string;
  evidence: string;
  measurement: string;
  repo: string;
  live?: string;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "index-engine", index: "01", name: "Index Engine", kicker: "Technical search",
    title: "Index Engine — Search Indexation Architecture",
    tagline: "From scattered URL issues to an organized system of decisions.",
    problem: "Important URLs can disappear from search without an obvious reason.",
    built: "URL discovery, prioritized diagnosis and a protected dashboard connected to a scheduled agent.",
    steps: ["Discover", "Diagnose", "Prioritize"],
    why: "Large publishing portfolios can contain indexable pages that do not appear in Google Search. Manual diagnosis is difficult to scale across properties.",
    implementation: "The documented architecture inventories URLs, evaluates indexing obstacles, prioritizes recoverable issues, and exchanges work requests with a scheduled Windows agent using a Cloudflare-hosted dashboard.",
    evidence: "The public README describes a protected dashboard, D1 and KV persistence, and a PC agent that polls roughly every ten minutes. This documents architecture, not a live-indexing success measurement.",
    measurement: "Reconcile GSC indexed URL counts and Search Analytics clicks before and after deployment for defined properties and periods. No validated uplift is claimed here.",
    repo: "https://github.com/douphealth/index-engine",
  },
  {
    slug: "foodscan", index: "02", name: "Open FoodScan", kicker: "Everyday intelligence",
    title: "Open FoodScan — Food Intelligence",
    tagline: "Food decisions made clearer — without pretending uncertain data is fact.",
    problem: "Labels, allergens and prices are difficult to compare reliably.",
    built: "Barcode intelligence with nutrition context, allergen checks and transparent price-source rules.",
    steps: ["Scan", "Understand", "Choose"],
    why: "Shoppers need to interpret product nutrition grades, ingredient warnings, alternatives and supermarket price information without confusing estimates with verified observations.",
    implementation: "The public repository documents a barcode-driven consumer app that distinguishes recent recorded prices, historical prices, estimates and records without verified pricing.",
    evidence: "The repository README identifies version 80.0.0 and a daily price-refresh workflow. These are source-reported implementation details; scan volume and production reliability are not measured here.",
    measurement: "Measure successful product scans, resolved alternatives, incomplete-record refusals and conversion events using real instrumentation.",
    repo: "https://github.com/douphealth/foodscan", live: "https://food-scan.gearuptofit.com/",
  },
  {
    slug: "mission-control", index: "03", name: "Mission Control", kicker: "Operating systems",
    title: "Mission Control — Digital Operations Platform",
    tagline: "One place to see the work, the priorities and the next decision.",
    problem: "Websites, builds, tasks and infrastructure were fragmented across multiple tools.",
    built: "Unified capture, explainable priorities and a dashboard for specialized management modules.",
    steps: ["Capture", "Prioritize", "Review"],
    why: "Repository changes, publishing workflows, tasks, content audits, cloud deployments and personal operations can fragment decision making.",
    implementation: "The documented platform unifies a central timeline, capture actions, prioritized tasks, and modular views for websites, GitHub and Cloudflare resources.",
    evidence: "The public README documents explainable priorities, task capture, weekly review and module navigation. It does not independently prove that every integration is live and healthy.",
    measurement: "Review authenticated inventory completeness, cross-device synchronization durability, uptime and task completion metrics before reporting measured gains.",
    repo: "https://github.com/douphealth/mission-control-21072026", live: "https://mission-control-21072026.pages.dev/",
  },
];

export const method = [
  { title: "Find the real signal", body: "Start with the questions people actually ask and the bottlenecks preventing existing pages and products from being found." },
  { title: "Design the useful solution", body: "Define the smallest product or fix that answers a concrete need — not a presentation slide." },
  { title: "Build and connect", body: "Ship code, content and infrastructure as one system, with traceable source and deployments." },
  { title: "Make it discoverable", body: "Crawlable architecture, clean indexation and publishing that matches real search intent." },
  { title: "Measure and improve", body: "Use real instrumentation to decide what deserves the next improvement. No results claimed without data." },
];
