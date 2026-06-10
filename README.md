# danostrowski.com

Personal portfolio site for Dan Ostrowski — UX Leader, Strategist, Innovator.

## Stack

- Static HTML/CSS/JS — no framework, no build step
- GitHub Pages — auto-deploys on push to `main`
- Decap CMS — browser-based content editing at `/admin`
- GoDaddy DNS → GitHub Pages

## Local Development

No build step required. Open files directly or use a local server:

```bash
# Python
python3 -m http.server 8000

# Node (if you have npx)
npx serve .
```

Then open `http://localhost:8000`

## Deployment

Push to `main` — GitHub Actions deploys automatically via `.github/workflows/deploy.yml`.

## Domain Setup (GoDaddy)

1. Add CNAME: `www` → `danostrowski.github.io`
2. Add A records for apex domain:
   ```
   185.199.108.153
   185.199.109.153
   185.199.110.153
   185.199.111.153
   ```
3. GitHub repo Settings → Pages → Custom domain: `danostrowski.com`
4. Enable "Enforce HTTPS"

## Password Protection

Protected case studies use client-side SHA-256 hashing.

To update the password:
1. Open browser console on any page
2. Run: `crypto.subtle.digest('SHA-256', new TextEncoder().encode('newpassword')).then(b => console.log(Array.from(new Uint8Array(b)).map(x => x.toString(16).padStart(2,'0')).join('')))`
3. Copy the hash output
4. Replace `PASSWORD_HASH` in `/assets/js/password.js`

Current password: `password` (change before launch)

## Content Structure

```
_content/
  cases/          # Markdown files for each case study (Decap CMS)
  settings/       # Site-wide settings (hello page, nav)
```

## Adding a New Case Study

1. Create `/cases/[slug]/index.html` (copy from an existing case)
2. Add card to `/work/index.html` in the appropriate chapter
3. Add card to `/index.html` featured section if priority
4. Add to `_content/cases/[slug].md` for CMS editing

## Image Conventions

- All images in `/assets/images/[project]/`
- Hero images: 1600×900px minimum, WebP preferred
- Cards: 16:9 ratio, 800×450px minimum
- File naming: `hero.jpg`, `screen-1.jpg`, `screen-2.jpg`

## Protected Case Studies

- `/cases/gemini-tl/` — password required
- `/cases/prompt-city/` — password required
- `/cases/mendel/` — password required
- `/cases/lemonade/` — public (password optional)
