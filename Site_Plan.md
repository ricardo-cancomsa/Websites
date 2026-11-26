# U CANFINE Site — Build Plan

Source of truth for copy and requirements: `U CANFINE Website — Design & Build Brief.md`.
This file records how the site is built, the decisions taken, and the implementation tasks.

## Decisions

| # | Decision | Choice |
|---|---|---|
| 1 | Generator | Eleventy (static output, no client framework) |
| 2 | Old legal versions | Not published. Each published version is tagged in git (`terms-v1.0`, `privacy-v1.0`). The app records which version each user accepted. |
| 3 | Dark mode | Cut from v1 |
| 4 | Clause anchors | Sections only (`/terms/#disclaimer`); sub-clauses (4.1) are cited in text |
| 5 | Contact | `mailto:` links only; no form |
| 6 | JavaScript | None. FAQ and "On this page" (mobile) use `<details>`; header nav wraps instead of a menu |
| 7 | Fonts | Self-hosted woff2 (Montserrat 700, Inter 400/600); no Google Fonts request |
| 8 | Hosting | IIS 10, one site with HTTP (80) and HTTPS (443) bindings. URL Rewrite module handles all redirects. |
| 9 | URL style | Trailing slash (`/terms/`), IIS default for folders. `/terms` 301s to `/terms/`, so the app's hard links keep working. |

## Data and lifecycle

| Data | Lives in | Unresolved state | Resolved by |
|---|---|---|---|
| Section 9 facts (entity, contacts, store URLs) and text repeated on 2+ pages | `src/_data/site.json` | Literal bracket text, e.g. `"companyName": "[REGISTERED COMPANY NAME]"` | Editing one value |
| One-off editorial notes (`[confirm]`, `[7 / 60]`, `[X] months`) | Inline in the page copy, exactly as in the brief | Bracketed | Editing that line |
| Legal version and date | Front matter: `version: "1.0"`, `updated: "[DATE]"` | Bracketed | Editing at publish |
| Legal body text | `privacy-policy.md`, `terms.md`, verbatim from the brief with `{{ site.x }}` in place of `site.json` placeholders | — | Attorney edits the Markdown |
| Home and Delete Account copy | `index.njk`, `delete-account.md` | Same convention | — |
| Header and footer | `_includes/base.njk`, written once | — | — |
| Server behaviour (redirects, headers, MIME) | `src/web.config`, deployed with the site | — | — |

Unresolved values render visibly bracketed (brief rule 1). The unresolved-placeholder report is a search
of `_site/` for `[`.

The free-legal-support wording differs between Home and Terms 7, so it is two separate keys until one
wording is chosen.

## Files

```
.gitignore                    node_modules/, _site/
package.json                  @11ty/eleventy, markdown-it-anchor
eleventy.config.js            input src, markdown anchors, "On this page" filter, passthrough copy
src/
  _data/site.json
  _includes/base.njk          head/SEO, header, footer
  _includes/legal.njk         extends base: version line, "On this page", body
  _includes/icons/*.svg       Lucide icons, inlined with {% include %}
  index.njk
  privacy-policy.md
  terms.md
  delete-account.md
  sitemap.njk                 → /sitemap.xml from collections.all
  robots.txt
  web.config                  HTTPS + /disclaimer redirects, security headers, woff2 MIME
  assets/
    site.css
    fonts/
    img/                      wordmark, favicons, OG image, labelled placeholders
```

## Mechanics

- **Heading anchors:** `markdown-it-anchor` with a slugify that strips the leading number:
  "12. Disclaimer" → `#disclaimer`. Anchors are word-based and survive renumbering. The brief's
  `{#disclaimer}` marker is dropped.
- **"On this page":** one filter collects `<h2 id>` + text from the rendered content. The layout renders
  that list twice: a collapsed `<details>` shown below 960 px, and a `position: sticky` `<nav>` shown
  from 960 px. One source, two presentations, no JS. No fixed overlays (in-app browser).
- **Header:** wordmark left; links Home · How it works · FAQ · Contact and "Get the app" right. Below
  ~640 px the links wrap to a second row under the wordmark. Links use `/#how-it-works` etc. so they work
  from every page.
- **Heading levels:** legal title `<h1>`, sections `<h2>` (the brief jumps `#` → `###`).
- **Cross-references:** "see Account Deletion", "Privacy Policy" and similar become links. Wording unchanged.
- **Brief clean-up:** export artefacts (`&#91;`, `\[`, `\]`) are removed when copying text; wording unchanged.
- **Store badges:** `site.appStoreUrl` / `site.playStoreUrl` empty → badge area reads "Coming soon" and
  links to `/#contact` (brief section 4). Filled → official badges linking to the stores.
- **URLs:** Eleventy writes `terms/index.html`; IIS serves it at `/terms/`. Canonical tags and the sitemap
  use the trailing slash (`page.url` already has it).
- **Deploy:** `npm run build`, then `robocopy _site <site folder> /MIR`. Certificate and bindings are
  server-side, outside the repo.

## Colours

The status colours in the brief fail WCAG AA as text (green 3.45:1, red 4.38:1 on white; blue 4.32:1 on
mist). They are replaced outright with darker shades that pass on both white and mist. One token each,
used for text and badge fills; white text on each fill also passes.

| Token | Brief | Site | on white | on mist |
|---|---|---|---|---|
| `--green` | `#1E9E5A` | `#187E48` | 5.10 | 4.67 |
| `--red` | `#D64545` | `#D13030` | 5.03 | 4.60 |
| `--blue` | `#2F6FDE` | `#2669DD` | 5.06 | 4.64 |

Unchanged: `--navy #0B1F3A`, `--amber #FFB400`, `--white #FFFFFF`, `--mist #F3F5F8`, `--slate #5B6B7F`
(5.45 on white, 4.99 on mist).

Rule: amber is a fill only (buttons, logo), always with navy text. Amber text on white is 1.78:1.

If the app's own status colours are supplied, the brief says the app wins; re-check contrast before
swapping them in.
