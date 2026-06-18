# TEZ AI — Session Notes

_Last updated: 2026-06-18_

A running log of what's been done and decided while standing up **TEZ AI**
(a self-hosted chat app based on LibreChat). Newest context at the bottom of
each section.

---

## Project Summary

- **Goal:** Build "TEZ AI" — our own chat application, using
  [LibreChat](https://github.com/danny-avila/LibreChat) (MIT licensed) as the
  base/starting point.
- **Our repo:** https://github.com/SOGtez/TEZ-AI.git
- **Local working dir:** `/Users/emmanmerino/TEZ-AI`
- **Branding source:** https://github.com/SOGtez/TEZ-Creations (to be applied)

---

## 1. Repo Import (done)

Imported the LibreChat codebase as our own fresh repo — **not a fork**, no
connection to the upstream project.

- Cloned LibreChat, then **deleted its `.git`** entirely (no upstream link, no
  shared history).
- **Kept `LICENSE`** intact — LibreChat is MIT, so we retain their copyright
  notice as required. The file still reads `Copyright (c) 2026 LibreChat`.
- Committed everything into our existing empty `SOGtez/TEZ-AI` repo as commit #1:
  > `Initial commit: TEZ AI base from LibreChat (MIT)`
  > commit `5bf67cf`, 3346 files
- **Pushed and verified** on `origin/main` — this is the safe checkpoint.

---

## 2. Running Locally via Docker (done)

Got the app rendering in the browser **without configuring any AI models or
API keys**.

- Created `.env` from `.env.example` (ships with working default secrets:
  `PORT`, `MONGO_URI`, `MEILI_MASTER_KEY`, `JWT_SECRET`, `CREDS_KEY`, etc.).
- Appended `UID`/`GID` (501/20) for the Docker `user:` directive.
- Set `APP_TITLE=TEZ AI` so our branding shows in the tab/header.
- Started the full stack with `docker compose up -d`. **5 containers run:**
  | Container | Role |
  |---|---|
  | `LibreChat` (api) | the web app → port **3080** |
  | `chat-mongodb` | database (auto-started, no manual install) |
  | `chat-meilisearch` | search index |
  | `vectordb` + `rag_api` | file / RAG backend |
- **App URL:** **http://localhost:3080** — confirmed HTTP 200, JS bundle loads,
  user confirmed it opened.
- **No AI keys configured** by design — UI renders, but sending messages to a
  model isn't wired up yet (deferred to a later step).

### Handy commands
- Stop: `docker compose down` (from `/Users/emmanmerino/TEZ-AI`)
- Start: `docker compose up -d`
- Logs: `docker logs -f LibreChat`

---

## 3. Login / Auth Notes

- **Login is required** — LibreChat always gates behind an account. First visit
  shows a login screen; click **Sign up** to create one.
- **It's a local-only account.** Where the info goes:
  - Stored **only** in the local `chat-mongodb` container, on disk at
    `/Users/emmanmerino/TEZ-AI/data-node/`. Nothing leaves the machine.
  - Password is **bcrypt-hashed**, not plain text.
  - **No third-party login** (Google/GitHub/OpenID keys are all blank).
  - **No email server** (`EMAIL_HOST` blank) → no email verification, so any
    address works (e.g. `me@test.com`).
- To reset users: stop containers, delete `data-node/`.
- Optional hardening (not yet applied): set `ALLOW_REGISTRATION=false` after
  creating our account so no one else can register.

---

## 4. Branding — TEZ AI (studied)

Source: https://github.com/SOGtez/TEZ-Creations (a static marketing site built
with Antigravity, deployed on Vercel). It contains a **dedicated TEZ AI launch
page** at `ai/index.html` — the most authoritative source for our app's brand.

### Identity & voice
- **Product name:** TEZ AI — a product of **TEZ Creations** (sibling brand:
  "Moltorino", which uses orange; TEZ's green "parallels" it).
- **Tagline:** **"Your AI. Not theirs."**
- **Positioning:** "An AI app that runs on a brain you choose — your own API key
  or a local model, with TEZ's own hosted model on the way." Clean, fast,
  **chat-first**, privacy/ownership-forward ("your conversations").
- **Roadmap claim:** TEZ's own hosted model is "on the way," built on **GLM 5.1**.
- **Footer:** © 2026 TEZ Creations · tezcreations.com

### Wordmark / logo
- Hero wordmark: **`TEZ Ai`** — "TEZ" in solid text, **"Ai"** rendered with an
  animated green gradient **sheen**, followed by a blinking terminal **cursor `▍`**.
- Small header lockup: **`TEZ✦`** (star `✦` in bright green `--c2`).
- Wordmark font: **Space Grotesk 700**, tight tracking (`letter-spacing: -0.02em`).
- No raster logo/SVG file in the repo — the wordmark is pure CSS/HTML type.

### Color tokens (canonical — from `ai/index.html`)
| Token | Hex / value | Use |
|---|---|---|
| `--bg` | `#050806` | near-black background, faint green cast |
| `--bg-2` | `#0a0f0b` | secondary dark surface |
| `--ink` / text | `#eaf2ec` | mint-tinted off-white text |
| `--muted` | `#8fa394` | secondary / muted text |
| `--c1` (accent) | `#2BD46A` | primary green |
| `--c2` (accent-bright) | `#4ADE80` | bright green (highlights, links) |
| `--c1-deep` | `#16a34a` | deep green (gradient bottoms) |
| `--gold` | `#FFD66B` | rare secondary accent |
| accent glow | `rgba(43,212,106,0.16)` | glow/shadow |
| on-accent text | `#04160b` | text on green buttons |
| error/red | `#f78a8a` | error messages |
| `--edge` | `rgba(255,255,255,.10)` | borders |
| `--panel` | `rgba(255,255,255,.04)` | glass panel fill |

### Typography
- **Display / wordmark:** `Space Grotesk` (500, 700)
- **Body / UI:** `Plus Jakarta Sans` (400, 500, 600)
- **Labels / eyebrows / mono:** `Space Mono` (700) — uppercase, wide tracking
  (`letter-spacing: .32em`)
- All via Google Fonts.

### Visual style cues (to echo in the app theme)
- **Dark theme**, near-black green-tinted background.
- **Breathing green "orb"** radial glow as a backdrop centerpiece.
- Subtle **film-grain** noise overlay (~5% opacity) + radial **vignette**.
- **Glassmorphic cards:** `--panel` fill, 1px `--edge` border, ~18px radius,
  `backdrop-filter: blur`, soft deep shadow.
- **Primary button:** vertical green gradient (`--c2 → --c1-deep`), `#04160b`
  text, green glow shadow, lifts on hover.
- Motion: gentle **rise** fade-ins, gradient **sheen** on "Ai", blinking cursor,
  breathing orb. Respects `prefers-reduced-motion`.

### How this maps to applying brand in the app (next step)
- App name / `APP_TITLE` → **TEZ AI** (already set).
- LibreChat theme accent → green `#2BD46A` / `#4ADE80`; dark bg `#050806`.
- Replace logo/favicon with a `TEZ Ai` / `TEZ✦` treatment.
- Fonts → Space Grotesk (headings) + Plus Jakarta Sans (UI).

---

## Open / Next Steps

- [x] Study TEZ branding from `TEZ-Creations` and document it here. _(done — see §4)_
- [ ] Apply branding (logo, colors, app name) to the LibreChat UI.
- [ ] (Later) Configure an AI model + API key so messages work.
- [ ] (Optional) Lock down registration after first account.
