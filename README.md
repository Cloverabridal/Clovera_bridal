# Clovera Bridal

Marketing website for Clovera Bridal, a luxury bridal atelier in Da Nang, Vietnam. Built with Next.js 16 (App Router), TypeScript, Tailwind CSS v4, and `next-intl` (English/Vietnamese).

## Stack

- **Next.js 16** (App Router, Turbopack) + TypeScript
- **Tailwind CSS v4** — design tokens in [`src/app/globals.css`](src/app/globals.css)
- **next-intl** — EN (default, unprefixed) / VI (`/vi`) routing
- **Framer Motion** — scroll reveals, respects `prefers-reduced-motion`
- **Nodemailer** — sends the "Book an Appointment" form to a studio inbox

> **Next.js 16 note**: this project is on a very recent Next.js release with real breaking changes from older docs/training data (renamed `middleware` → `proxy`, `global-not-found.js`, async `params`, etc). If you ask an AI coding assistant to modify this project, point it at `AGENTS.md` and the bundled docs in `node_modules/next/dist/docs/` before it edits routing/layout code.

## Local development

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`. Without SMTP credentials configured, appointment requests submitted through `/book` are logged to the server console instead of emailed — see below.

## Editing content

All copy is hardcoded and translated, so there's no CMS to log into — content changes are code changes:

- **Text (both languages)**: [`src/messages/en.json`](src/messages/en.json) and [`src/messages/vi.json`](src/messages/vi.json). Every string on the site lives here, namespaced by section (`home`, `services`, `collections`, `about`, `contact`, `legal`, etc).
- **Services / collections list & structure**: [`src/content/collections.ts`](src/content/collections.ts) (slugs, and how many placeholder "look" tiles render per collection gallery).
- **Nav links, social links**: [`src/content/site.ts`](src/content/site.ts).

## Photography & video

Real photography and video from the client's shoot are in place:

- **Collection photos**: `public/collections/venus-in-bloom/lookNN.jpg` and `public/collections/venus-in-flight/lookNN.jpg` — 20 curated shots per collection (selected from a 50-image shoot to avoid near-duplicate frames), resized from the ~55MB camera originals down to 1600×2000 JPEGs (~300–450KB each). Referenced via `getLookImage()` / `getLookImages()` in [`src/content/collections.ts`](src/content/collections.ts). The originals are **not** committed to the repo — only the client's Drive folder holds full-resolution masters.
- **Video**: `public/video/*.mp4` + `public/video/posters/*.jpg` — transcoded from the client's raw `.mov`/`.mp4` footage (H.264, ~900px wide, faststart) down to a few MB each. Used for the home hero (`intro-1.mp4`), the About page ("Inside the Atelier", `bts-look-1.mp4`), and a "Filmed" section on each collection page (`collectionVideos` in `src/content/collections.ts`). Playback goes through [`src/components/ui/VideoClip.tsx`](src/components/ui/VideoClip.tsx), which falls back to the poster image when `prefers-reduced-motion` is set.
- The `services` page still uses `<MediaFrame>` ([`src/components/ui/MediaFrame.tsx`](src/components/ui/MediaFrame.tsx)) placeholder tiles, since no service-specific photography was provided — swap the same way (`next/image` pointing at a `public/` file) if that's supplied later.

## The booking form

`Book Now` → `/book` → `BookingForm` (client component) → `POST /api/book` → `src/lib/mailer.ts`.

Copy `.env.example` to `.env.local` and fill in SMTP credentials to actually send emails:

```bash
cp .env.example .env.local
```

Until `SMTP_HOST` / `SMTP_USER` / `SMTP_PASS` / `BOOKING_TO_EMAIL` are all set, submissions are logged to the console instead of sent — safe for local development, but **must be configured before launch**.

The route also includes a honeypot field and a simple in-memory rate limit (5 requests / 10 minutes per IP) — sufficient for a single persistent Node.js process (see deployment below), not a distributed setup.

## Brand assets

- **Logo**: `public/logo.png` (full lockup, used in the footer) and `public/logo-icon.png` (cropped mark, used in the header and as the site favicon/`apple-icon`) — sourced from the client's Drive folder.
- **Typeface**: the brand's own **Displace** family (Light/Regular/Medium/Bold/Black) is self-hosted via `next/font/local` in [`src/lib/fonts.ts`](src/lib/fonts.ts) and mapped to `--font-serif` — used for all headings sitewide.
- **Gold accent**: `--color-gold` (`#7D5F12`) is a darkened, AA-contrast-safe tint sampled from the logo's actual brand gold; `--color-gold-soft` (`#F3DB9F`) is the exact brand gold, kept for decorative use only since it fails text contrast on the ivory background.

## Before launch — things intentionally left as placeholders

- [ ] Service page photography (`services` page still uses placeholder tiles — see above)
- [ ] Real Privacy Policy / Terms content (`legal` namespace in the messages files — currently placeholder text)
- [ ] SMTP credentials for the booking form (see above) — required before launch so appointment requests actually reach `cloverabridal@gmail.com`

## Deploying to Hostinger

This app needs a Node.js runtime — Hostinger's **basic Shared hosting does not run Node.js**. Use a plan with the **Node.js Application** feature in hPanel (Business Web Hosting or Cloud Startup and above), or a VPS.

### Option A — hPanel Node.js Application (recommended to start)

1. In hPanel, go to **Advanced → Node.js** and create a new application.
   - Node.js version: 20.x or later (project requires 20.9+)
   - Application root: the repo folder (e.g. `clovera-bridal`)
   - Application startup file: not applicable for Next.js — instead set the **Start command** to `npm run start` (after a build step, see below)
2. Set the environment variables from `.env.example` (SMTP + `BOOKING_TO_EMAIL`) in the Node.js app's environment variable panel.
3. Connect the app to this GitHub repository (hPanel supports Git-based deploys), or upload the build output manually.
4. Build command: `npm install && npm run build`. Start command: `npm run start` (runs `next start`, which needs the Node.js process to stay running — hPanel's Node.js app feature keeps it alive; don't use static export).
5. Point the domain (see DNS below) at this hosting account.

### Option B — VPS (more control, recommended if traffic grows)

1. Provision a Hostinger VPS (KVM 2 or higher), install Node.js 20+, and clone this repo.
2. `npm install && npm run build`
3. Run persistently with PM2: `pm2 start npm --name clovera-bridal -- start`
4. Put Nginx in front as a reverse proxy to `localhost:3000`, and issue an SSL certificate with Let's Encrypt (`certbot --nginx`).

### DNS — pointing cloverabridal.com from Mắt Bão to Hostinger

The domain is registered at Mắt Bão. Once hosting is provisioned on Hostinger:

1. In the Hostinger hPanel for this hosting account, find the **nameservers** or the **A record / IP address** to point to (hPanel → Domains → DNS, or the Node.js app's assigned IP).
2. In the Mắt Bão domain management panel, either:
   - **Simplest**: change the domain's nameservers to Hostinger's nameservers, and manage all DNS from hPanel afterward, or
   - **Keep DNS at Mắt Bão**: add/edit an `A` record for `@` (and `www`) pointing at Hostinger's IP address instead of changing nameservers.
3. DNS propagation can take a few hours. Once it resolves, issue/attach SSL for `cloverabridal.com` and `www.cloverabridal.com` in hPanel (or via `certbot` on a VPS).

## Deploying — GitHub

```bash
git init
git add .
git commit -m "Initial Clovera Bridal site"
git remote add origin <your-repo-url>
git push -u origin main
```

From there, either connect the repo to Hostinger's Git deploy feature (Option A above), or set up a simple CI step that builds and deploys to the VPS (Option B).
