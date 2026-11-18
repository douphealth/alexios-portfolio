# Alexios Papaioannou’s portfolio

The public portfolio brings together ten independent websites, a collection of decision tools, Cloudflare deployments and implementation case studies.

**[Open the portfolio](https://alexios-portfolio.pages.dev/) · [Browse the project atlas](https://alexios-portfolio.pages.dev/projects)**

## Explore the work

| Website | Focus |
| --- | --- |
| [GearUpToFit](https://gearuptofit.com/) | Running gear, training tools and calculators |
| [Affiliate Marketing for Success](https://affiliatemarketingforsuccess.com/) | Affiliate publishing, SEO and monetization |
| [FrenchyFab](https://frenchyfab.com/) | French Bulldog care and training |
| [Efficient GPT Prompts](https://efficientgptprompts.com/) | Prompt libraries and AI workflows |
| [Plantastic Haven](https://plantastichaven.com/) | Indoor plants and care guides |
| [Mystical Digits](https://mysticaldigits.com/) | Numerology and number calculators |
| [Mice Gone Guide](https://micegoneguide.com/) | Home inspection and mouse prevention |
| [GearUpToGrow](https://gearuptogrow.com/) | Focus, habits and learning |
| [ImageAlchemy](https://imagealchemy.app/) | Private image compression and conversion |
| [OpenClaw Skills Hub](https://openclaw-skillshub.com/) | Agent skills and installation guides |

## Development

Use Bun with the committed lockfile. The application uses TanStack Start, React, TypeScript and Tailwind CSS.

~~~sh
bun install --frozen-lockfile
bun run dev
~~~

Before publishing, run the type check, interaction tests and production build.

~~~sh
bunx tsc --noEmit
bun run test
bun run build
~~~

## Portfolio data

The featured work, main websites, project descriptions, contact links and case studies live in [portfolio.ts](src/data/portfolio.ts). Each main website has a destination, a reader task and a matching image. Optimized website artwork lives in [public/network](public/network). Historical repository and Pages records live separately in [inventory.ts](src/data/inventory.ts).

The homepage renders the main website links on the server. Visitors can filter the collection, preview a project, or open its website directly. The searchable atlas is available at **/projects**, and case studies have permanent **/work/** routes.

## Deployment

The existing Cloudflare Pages project builds from GitHub. After pushing to **main**, check the Cloudflare Pages result on that commit and open the production URL above. To roll back a release, revert its commit and push the revert. The [Lovable project](https://lovable.dev/projects/e7da7d2b-43a7-4547-bf6c-a4ae6d407d4e) remains connected to this repository.
