# TataComp

A personal birthday web app — a heartfelt digital gift built with React, TypeScript, and a touch of magic. It walks someone special through a greeting card, a timeline of shared memories, redeemable gift coupons, and three secret pages unlocked through the coupon flow.

---

## What's inside

| Route | Description |
|---|---|
| `/` | Animated greeting card — the entry point |
| `/journey` | Scrollable timeline of shared memories |
| `/coupons` | Interactive gift coupon grid |
| `/secret` | Secret page unlocked via the "Grogu Force" coupon |
| `/magic` | Photo gallery unlocked via the "Harry Potter" coupon |
| `/flowers` | Interactive SVG bouquet unlocked via the "Flowers" coupon |

When a standard coupon is redeemed, the app sends a Telegram notification to a configured chat so you know the moment it happens. Special coupons trigger animated transitions and navigate to their dedicated page instead.

---

## Tech stack

- **React 19** + **TypeScript**
- **Vite 6** — bundler and dev server
- **Express** — thin Node.js server for the `/api/notify` endpoint (dev/self-hosted only)
- **Tailwind CSS v4** — utility-first styling
- **Motion (Framer Motion)** — page and component animations
- **React Router v7** — client-side routing (HashRouter for GitHub Pages compatibility)
- **Telegram Bot API** — coupon redemption notifications
- **vite-plugin-image-optimizer** — automatic JPG/PNG compression at build time

---

## Getting started

### Prerequisites

- Node.js 18+
- npm

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Copy the example file and fill in your values:

```bash
cp .env.example .env
```

| Variable | Required | Description |
|---|---|---|
| `GEMINI_API_KEY` | No | Gemini AI API key |
| `APP_URL` | No | Deployment URL of the app |
| `TELEGRAM_BOT_TOKEN` | Yes* | Token from [@BotFather](https://t.me/botfather) — used server-side in dev |
| `TELEGRAM_CHAT_ID` | Yes* | Your **numeric** Telegram user ID — used server-side in dev |
| `VITE_TELEGRAM_BOT_TOKEN` | Yes* | Same token as above — baked into the client bundle for GitHub Pages builds |
| `VITE_TELEGRAM_CHAT_ID` | Yes* | Same chat ID — baked into the client bundle for GitHub Pages builds |
| `VITE_IMAGES_BASE_URL` | No | Azure Blob Storage base URL for images in production; falls back to `/` (public folder) if unset |

*Required only if you want coupon redemption notifications via Telegram.

> **How to get your numeric Telegram ID:** message [@userinfobot](https://t.me/userinfobot) on Telegram — it replies with your ID.

### 3. Run in development

```bash
npm run dev
```

Opens at [http://localhost:3000](http://localhost:3000). The Express server handles API routes; Vite serves the React frontend with HMR.

---

## Building for production

```bash
npm run build
```

This generates a `dist/` folder with the compiled frontend. Images are automatically compressed (quality 80) by `vite-plugin-image-optimizer`. The Express server (`server.ts`) will serve the static files when `NODE_ENV=production`.

To start the production server:

```bash
NODE_ENV=production npm run dev
```

---

## Deploy on GitHub Pages

The project includes a GitHub Actions workflow at `.github/workflows/deploy.yml` that automatically deploys to GitHub Pages on every push to `main`.

The app is served at `/<repo-name>/` (configured via `base: '/TataComp/'` in `vite.config.ts`). Because GitHub Pages serves static files only, Telegram notifications in this deployment mode are sent directly from the client browser using `VITE_TELEGRAM_BOT_TOKEN` and `VITE_TELEGRAM_CHAT_ID`, bypassing the Express server entirely.

Required GitHub repository secrets:

| Secret | Description |
|---|---|
| `VITE_TELEGRAM_BOT_TOKEN` | Telegram bot token |
| `VITE_TELEGRAM_CHAT_ID` | Telegram numeric chat ID |
| `VITE_IMAGES_BASE_URL` | Azure Blob Storage base URL for images |

---

## Telegram notification architecture

| Deployment mode | How notifications are sent |
|---|---|
| Local dev (`npm run dev`) | Client calls `POST /api/notify` → Express → Telegram API (token stays server-side) |
| GitHub Pages (static) | Client calls `api.telegram.org` directly using `VITE_*` env vars baked into the bundle |

---

## Adding or editing content

### Memories timeline

Edit `src/components/Timeline.tsx` to add, remove, or reorder timeline entries. The memory data itself (`MEMORIES` array) is defined in `src/constants.ts`.

### Coupons

Edit `src/constants.ts` to define the available coupons. Each coupon has:

- `id` — unique string identifier
- `title` — displayed name
- `description` — what the coupon is for
- `icon` — emoji

Three coupon IDs have special behaviour hardcoded in `CouponGrid.tsx`:

| Coupon ID | Transition | Destination |
|---|---|---|
| `grogu-force` | Hyperspace jump | `/secret` |
| `harry-potter` | "Alohomora!" spell | `/magic` |
| `flowers` | Falling petals | `/flowers` |

All other coupons trigger the Telegram notification.

### Photos (Magic gallery)

Add photos to `public/images/imgBeauty/` and register them in the `MAGIC_PHOTOS` array in `src/constants.ts`.

### Photos (Secret gallery)

Add photos to `public/images/imgSecret/` and register them in the `FUNNY_PHOTOS` array in `src/constants.ts`.

---

## Photo protection system

All photos in the app are rendered through the `ProtectedImage` component, which applies multiple layers to prevent easy downloading:

1. **Canvas rendering** — images are drawn onto a `<canvas>` element instead of an `<img>` tag, so there is no `src` attribute in the DOM and right-click save is blocked.
2. **One-shot Blob URL** — the image is fetched with `cache: no-store`, converted to a Blob URL, drawn to the canvas, and the URL is immediately revoked so it cannot be reused.
3. **DevTools detection** — a heuristic detects when browser DevTools are open (window size delta > 160 px or `console` Proxy getter). When detected, the canvas is cleared and replaced with a placeholder message.
4. **Input blocking overlay** — a transparent overlay on top of the canvas suppresses `contextmenu`, `drag`, `mousedown`, and `pointerdown` events.
5. **Keyboard shortcut blocking** — `App.tsx` intercepts Ctrl+S, Ctrl+U, Ctrl+Shift+I, and F12 globally.

---

## API

### `GET /api/health`

Returns `{ "status": "ok", "time": "<ISO timestamp>" }`. Useful for deployment health checks.

### `POST /api/notify`

Sends a Telegram message when a coupon is redeemed. Only used in local/self-hosted deployments; GitHub Pages deployments call the Telegram API directly from the client.

**Request body:**
```json
{ "couponName": "Name of the redeemed coupon" }
```

**Response:**
```json
{ "success": true }
```
or
```json
{ "success": false, "error": "Human-readable error message" }
```

> Note: The endpoint always returns HTTP 200 to avoid proxy interception — check the `success` field instead.

---

## Common issues

**Telegram error 403** — The bot can't reach you. Make sure you've started a conversation with your bot on Telegram before trying to receive messages.

**Telegram error 400** — The `TELEGRAM_CHAT_ID` is invalid. It must be a plain number (e.g. `12345678`), with no `@`, letters, or surrounding spaces.

**HMR not working** — If running inside AI Studio, HMR is intentionally disabled via `DISABLE_HMR=true`. This is expected.

**Images not loading in production** — Check that `VITE_IMAGES_BASE_URL` is set correctly and points to the root of the Azure Blob Storage container where images are stored.

---

## License

Apache 2.0 — see [LICENSE](./LICENSE).
