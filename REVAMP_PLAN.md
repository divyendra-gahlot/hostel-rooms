# Cozy Rooms Website Revamp — Learning Plan

**Your context:** Backend dev (Java/Spring), ~30 min/day, mobile-first users, SEO for "hostel / PG / living space in Kaakdeo, Kanpur, Uttar Pradesh, India", admin to edit room status, Google reviews.

**Principle:** One small deliverable per day. Learn by doing one concept at a time.

---

## Recommended tech stack

Picked for **(a) this use case** and **(b) your career** (Java/Spring at Jio, admin + JWT experience, some JS from frontend intern).

| Layer | Choice | Why |
|-------|--------|-----|
| **Public website** | **Next.js (React)** or, if you want less new tech first, **vanilla HTML/CSS/JS** (as in the plan) | Next.js: SEO (SSR/SSG), fast, mobile-friendly; React/Next is what most "full stack" roles expect. Vanilla first is fine to learn basics, then switch. |
| **Admin backend** | **Spring Boot (Java)** | Fits your strength; you've already built admin + JWT at Jio. Small API (login, rooms CRUD) is a clean, resume-ready story. |
| **Database** | **PostgreSQL** | You already use it; one small schema (rooms, reviews, admin_user) is enough. |
| **Admin frontend** | **React SPA** (e.g. Vite + React) or **Thymeleaf** (Spring) | React: same language as Next.js, good for career. Thymeleaf: stay 100% in Java land, faster to ship if you want to minimise frontend. |
| **Auth** | **JWT** (issued by Spring Boot after password check) | You've done this; reuse the same pattern. |
| **Hosting** | **Frontend:** Vercel or Netlify. **Backend:** Railway, Render, or a small VM. | Static/Next on edge; Spring Boot as a single service; separate URLs for site vs admin. |

**Summary:**  
- **Best for use case:** Next.js (or static site) for SEO + speed; Spring Boot + PostgreSQL for admin and data; minimal, secure APIs.  
- **Best for career:** Spring Boot + PostgreSQL (reinforce backend), plus **React/Next.js** (frontend that's in demand and rounds out "full stack" on your resume).  

**If you want to minimise new tech:** Keep the plan's Phase 0–4 in **vanilla HTML/CSS/JS** and serve `rooms.json`/`reviews.json` from Spring Boot later. Build admin as **Spring Boot + Thymeleaf** (all Java). Add React/Next in a later iteration when you're ready.

---

## Phase 0: Setup & Local Dev (Days 1–2)

**Goal:** Get a clean project and a way to run it locally so you can see changes every day.

| Day | Task | What you’ll learn | Time |
|-----|------|-------------------|------|
| 1 | Create a new folder (e.g. `cozy-rooms-v2`), init git, add a single `index.html` with "Hello" and open it in the browser. Optional: use a simple static server (e.g. `npx serve .` or VS Code Live Server). | HTML is just a file; browsers render it. | ~30 min |
| 2 | Add one CSS file, link it in HTML, change background color and font. Add one `script.js`, link it, do `console.log('hi')`. Confirm: HTML + CSS + JS are three separate files that work together. | Separation of structure (HTML), style (CSS), behavior (JS). | ~30 min |

**Checkpoint:** You can open the site locally and change one thing in each of HTML/CSS/JS and see the result.

---

## Phase 1: Mobile-First Page + Fast Loading (Days 3–8)

**Goal:** One page that shows rooms in a mobile-centric way and loads very fast (no heavy images/videos on first load).

| Day | Task | What you’ll learn | Time |
|-----|------|-------------------|------|
| 3 | **Semantic HTML:** Build the shell of the page: `<header>`, `<main>`, `<section>`, `<article>`, `<footer>`. No styling yet. Put placeholder text for "Cozy Rooms", one room title, one price. | Semantic tags help SEO and accessibility. | ~30 min |
| 4 | **Mobile-first CSS:** Style only for a small screen (e.g. 375px wide). Single column, big tap targets (buttons/links ~44px), readable font size. Get the layout looking good on your phone or DevTools mobile view. | Mobile-first = design for small screen first, then add breakpoints for larger. | ~30 min |
| 5 | **Critical content first:** Ensure the visible part of the page (hero + first room cards) doesn’t depend on huge images. Use small placeholder or one tiny image; keep text and structure in HTML so content "paints" instantly. | First Contentful Paint (FCP); content in HTML loads before images. | ~30 min |
| 6 | **Lazy loading images:** Add `<img loading="lazy">` and optionally `width`/`height` to avoid layout shift. Load only 1–2 images per room initially; rest load as user scrolls. | `loading="lazy"` and dimensions for performance. | ~30 min |
| 7 | **Defer videos:** Don’t load `<video>` until the user scrolls near it or taps "Play". Use a poster image and load `src` only on interaction (you can do this with a small JS snippet). | Non-critical assets (video) load on demand. | ~30 min |
| 8 | **Responsive tweak:** Add one media query (e.g. `min-width: 768px`) to make the layout 2 columns on tablet. No need for 3 columns yet. | One breakpoint; still mobile-first. | ~30 min |

**Checkpoint:** On a slow 3G simulation, the page shows text and structure quickly; images and videos don’t block the first paint.

---

## Phase 2: Data + Room Display (Days 9–12)

**Goal:** Rooms come from data (file or API later); page shows metadata, price, USPs clearly.

| Day | Task | What you’ll learn | Time |
|-----|------|-------------------|------|
| 9 | **Static data file:** Create `rooms.json` (or keep using `data.json`) with 2–3 rooms: name, price, available, "ideal for", short USP list, image URLs. No backend yet. | Data as JSON; same structure you might use for an API later. | ~30 min |
| 10 | **Fetch and render:** In JS, `fetch('rooms.json')`, then loop and build room cards with DOM APIs (`createElement`, `textContent`, `append`). No framework. | Fetch API; generating HTML from data. | ~30 min |
| 11 | **Metadata + USPs:** For each room, display: "Ideal for" (e.g. Single/Double), "Available" / "Booked", price, and a short bullet list of USPs (from description or a new `usp` array in JSON). | Structuring and displaying metadata and lists. | ~30 min |
| 12 | **Filter "Available only":** Add a checkbox "Show only available". When toggled, filter the list in JS and re-render. | Simple state (checkbox) and filtering. | ~30 min |

**Checkpoint:** Room list is driven by JSON; you can change availability in the file and see it on the page. Mobile layout and fast load still hold.

---

## Phase 3: SEO Foundation (Days 13–18)

**Goal:** Search engines understand the site and rank it for "hostel / PG / student living in Kaakdeo, Kanpur, Uttar Pradesh, India".

| Day | Task | What you’ll learn | Time |
|-----|------|-------------------|------|
| 13 | **Title and meta description:** Set `<title>` and `<meta name="description" content="...">` with a clear, keyword-rich sentence (e.g. "Cozy Rooms – Hostel & PG for Students & Professionals in Kaakdeo, Kanpur, UP"). Keep it under ~155 characters. | Title and description are the main SEO levers. | ~30 min |
| 14 | **Headings and keywords:** One `<h1>` with your main offer (e.g. "Hostel & PG in Kaakdeo, Kanpur"). Use `<h2>` for sections (e.g. "Available Rooms", "Why Choose Us"). Use natural phrases: "student hostel Kanpur", "PG in Kaakdeo", "living space for working professionals Uttar Pradesh". | Heading hierarchy and keyword placement. | ~30 min |
| 15 | **Structured data (JSON-LD):** Add a `<script type="application/ld+json">` with LocalBusiness (or Accommodation) schema: name, address (Kaakdeo, Kanpur, Uttar Pradesh, India), description, optionally price range. Validate with Google’s Rich Results Test. | Schema.org helps Google show rich results. | ~30 min |
| 16 | **URL and sitemap:** If you have a single page, use a clean URL (e.g. `/` or `/index.html`). Create a minimal `sitemap.xml` with that URL and lastmod. Optional: `robots.txt` allowing crawlers. | Sitemap and robots for indexing. | ~30 min |
| 17 | **Semantic content block:** Add a short, text-heavy section (e.g. "About Cozy Rooms – Hostel & PG in Kaakdeo, Kanpur") with 2–3 sentences mentioning Kaakdeo, Kanpur, students, working professionals, amenities. No keyword stuffing. | On-page content for relevance. | ~30 min |
| 18 | **Performance check:** Run Lighthouse (Chrome DevTools) for Performance and SEO. Fix any quick wins (e.g. image dimensions, meta viewport already set). | Measuring and improving Core Web Vitals and SEO score. | ~30 min |

**Checkpoint:** Rich result validator shows no errors; title/description and headings target your location and audience.

---

## Phase 4: Google Reviews (Days 19–23)

**Goal:** Show real Google reviews (fetched or copied) in a dedicated section.

| Day | Task | What you’ll learn | Time |
|-----|------|-------------------|------|
| 19 | **Reviews data:** Google doesn’t give a free public API for reviews. Options: (A) Manual: copy 5–10 reviews into a `reviews.json` (name, rating, text, date). (B) Later: use a third-party or backend scrape (out of scope for now). Create `reviews.json` with 3–5 reviews. | Where review data comes from; manual vs API. | ~30 min |
| 20 | **Reviews section HTML/CSS:** Add a section "What Our Residents Say" (or similar). Style review cards: star rating (★★★★☆), quote text, name/date. Mobile-first: one column, readable text. | New section and card layout. | ~30 min |
| 21 | **Fetch and show reviews:** Fetch `reviews.json`, render review cards with stars (text or simple SVG/icons). | Reuse fetch + render pattern. | ~30 min |
| 22 | **Star display:** Show rating as 5 stars (filled/empty). You can use Unicode (★/☆) or a simple inline SVG repeated. | Simple component: rating display. | ~30 min |
| 23 | **Attribution:** Add a line like "Reviews from Google" or "Source: Google Maps" and link to your Google Maps listing (if you have one). Keeps you compliant and builds trust. | Crediting the source of reviews. | ~30 min |

**Checkpoint:** Reviews section looks good on mobile and loads from data; you can add more entries to the JSON later.

---

## Phase 5: Admin — Separate App + Auth (Days 24–32)

**Goal:** Admin is a **separate** small app (or separate route). Only admins can log in and change room status/metadata.

| Day | Task | What you’ll learn | Time |
|-----|------|-------------------|------|
| 24 | **Separate admin entry:** Create `admin/` folder. Inside it: `admin/index.html` (login page) and `admin/dashboard.html` (room list + edit). The main site stays at the root; no mixing. | Separation of public vs admin. | ~30 min |
| 25 | **Backend choice:** Decide: (A) Serverless (e.g. Vercel/Netlify functions + DB), (B) Small Node/Python backend you’re comfortable with, or (C) Static + GitHub/CI to rebuild from JSON. For learning, (B) or (C) is fine. Pick one. | Where admin data will live. | ~30 min |
| 26 | **Auth design:** Plan: one admin user (you) or a few. Option 1: Simple password-only (e.g. one env var), check in a serverless function or small API. Option 2: Use a provider (e.g. Firebase Auth, Auth0). Don’t implement yet—just choose. | Auth without building from scratch. | ~30 min |
| 27 | **Login page UI:** Build `admin/index.html`: form with email (or username) and password, "Log in" button. On submit, for now just `console.log` or show "Not implemented". Style it simply; mobile-friendly. | Form and submit handling. | ~30 min |
| 28 | **Backend login endpoint:** Implement one route: POST `/api/login` (or similar). Check credentials (e.g. against env vars or a small DB). Return a simple token (e.g. JWT) or session cookie. Use HTTPS in production. | First backend endpoint for admin. | ~30 min |
| 29 | **Admin dashboard list:** After "login", show a list of rooms (fetch from your API or from the same JSON the site uses). Each row: name, status (Available/Booked), maybe "Edit" button. No edit yet. | Protected list view. | ~30 min |
| 30 | **Edit room status:** Add "Edit" for one room: form or inline toggle for "available" (and optionally price, "ideal for"). Save to your backend (update JSON or DB). | CRUD: update one resource. | ~30 min |
| 31 | **Public site reads from same source:** Ensure the main site’s room data comes from the same place the admin edits (e.g. same JSON file served by the backend, or same API). So when you flip "Available" in admin, the main site reflects it. | Single source of truth. | ~30 min |
| 32 | **Admin guard:** Ensure dashboard and edit pages are not accessible without login (redirect to login or return 401). | Protecting admin routes. | ~30 min |

**Checkpoint:** You can log in to admin, change a room’s status (and maybe price/ideal for), and see the change on the public site. Admin is separate and protected.

---

## Phase 6: Polish + Deploy (Days 33–38)

**Goal:** Final UX touches and put the site live so Google can index it.

| Day | Task | What you’ll learn | Time |
|-----|------|-------------------|------|
| 33 | **Contact CTA:** Prominent "Call" and "WhatsApp" buttons (like current site); ensure they work on mobile (tap-to-call, open WhatsApp). | Conversion and mobile UX. | ~30 min |
| 34 | **Loading state:** When fetching rooms or reviews, show a small loading message or skeleton (e.g. gray blocks). Avoid blank screen. | Perceived performance. | ~30 min |
| 35 | **Error state:** If `rooms.json` or `reviews.json` fail to load, show a short message and maybe "Retry". | Graceful degradation. | ~30 min |
| 36 | **Hosting:** Deploy static part (root site) to Vercel, Netlify, or GitHub Pages. Point a domain or use the free subdomain. Ensure HTTPS. | Static deployment. | ~30 min |
| 37 | **Admin hosting:** If admin uses a backend, deploy it (same or different service). Keep admin URL separate (e.g. `admin.yoursite.com` or `yoursite.com/admin`). Never expose admin to search engines (noindex if needed). | Backend and admin deployment. | ~30 min |
| 38 | **Submit to Google:** Use Google Search Console, add the property, submit sitemap. Optional: Bing Webmaster Tools. | Getting indexed. | ~30 min |

**Checkpoint:** Site is live, mobile-friendly, fast, and submitted to search engines; admin is separate and secure.

---

## Summary Table

| Phase | Focus | Days | Main outcome |
|-------|--------|-----|--------------|
| 0 | Setup | 1–2 | Local dev, HTML/CSS/JS split |
| 1 | Mobile + speed | 3–8 | Mobile-first, lazy images, deferred video |
| 2 | Data + rooms | 9–12 | JSON-driven rooms, filter, metadata + USPs |
| 3 | SEO | 13–18 | Title, meta, schema, content, sitemap |
| 4 | Reviews | 19–23 | Reviews section from JSON, stars, attribution |
| 5 | Admin | 24–32 | Separate admin app, login, edit room status |
| 6 | Polish + deploy | 33–38 | CTA, loading/error, deploy, Search Console |

---

## Tips for Learning (Backend → Frontend)

- **One concept per day:** Don’t combine "SEO + admin" in one session. Do one table row per day.
- **Inspect and copy:** Use DevTools to see how other mobile sites structure HTML/CSS. Copy small patterns, not whole themes.
- **Reuse your backend habits:** Treat `rooms.json` like a small "table"; admin is just an API that updates that table. Same mental model.
- **SEO is content + structure:** Good title, one clear H1, a bit of text about Kaakdeo/Kanpur, and schema will take you 80% of the way. No magic.
- **Keep the old site:** Leave the current `index.html` in a branch or backup until the new one is live. Less stress.

---

## Optional Later (After Day 38)

- Add more schema types (e.g. FAQ, Review) if you have FAQ or more reviews.
- Automate review sync (e.g. a weekly script that pulls from a source and updates `reviews.json`).
- Add a simple analytics (e.g. Plausible or Google Analytics) to see search and traffic.
- Add a "Request callback" form that sends to your email or a sheet.

You can start with **Phase 0, Day 1** whenever you’re ready. If you tell me which day you’re on, I can give you the exact next steps (and only the minimal code needed for that step) so you stay within 30 minutes.
