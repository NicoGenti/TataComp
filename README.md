# TataComp 🎂

A personal birthday web app — a heartfelt digital gift built with React, TypeScript, and a touch of magic. It walks someone special through a greeting card, a timeline of shared memories, redeemable gift coupons, and two secret photo galleries unlocked through the coupon flow.

---

## What's inside

| Route | Description |
|---|---|
| `/` | Animated greeting card — the entry point |
| `/journey` | Scrollable timeline of shared memories |
| `/coupons` | Interactive gift coupon grid |
| `/secret` | 🚀 Secret page unlocked via the "Grogu Force" coupon |
| `/magic` | ✨ Photo gallery unlocked via the "Harry Potter" coupon |

When a coupon is redeemed, the app sends a Telegram notification to a configured chat so you know the moment it happens.

---

## Tech stack

- **React 19** + **TypeScript**
- **Vite 6** — bundler and dev server
- **Express** — thin Node.js server for the `/api/notify` endpoint
- **Tailwind CSS v4** — utility-first styling
- **Motion (Framer Motion)** — page and component animations
- **React Router v7** — client-side routing
- **Google Gemini SDK** — available in the environment (not yet wired to UI)
- **Telegram Bot API** — coupon redemption notifications

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
| `GEMINI_API_KEY` | No | Gemini AI API key (injected automatically by AI Studio) |
| `APP_URL` | No | Deployment URL of the app |
| `TELEGRAM_BOT_TOKEN` | Yes* | Token from [@BotFather](https://t.me/botfather) |
| `TELEGRAM_CHAT_ID` | Yes* | Your **numeric** Telegram user ID (not your username) |

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

This generates a `dist/` folder with the compiled frontend. The Express server (`server.ts`) will serve the static files when `NODE_ENV=production`.

To start the production server:

```bash
NODE_ENV=production npm run dev
```

Or compile `server.ts` with `tsc` and run the output directly.

---

## Adding or editing content

### Memories timeline

Edit `src/components/Timeline.tsx` to add, remove, or reorder timeline entries.

### Coupons

Edit `src/constants.ts` to define the available coupons. Each coupon has:

- `id` — unique string identifier
- `title` — displayed name
- `description` — what the coupon is for
- `icon` — emoji

Two coupon IDs have special behaviour hardcoded in `CouponGrid.tsx`:
- `grogu-force` → triggers the hyperspace transition and navigates to `/secret`
- `harry-potter` → triggers the "Alohomora" transition and navigates to `/magic`

All other coupons trigger the Telegram notification via `POST /api/notify`.

### Photos (Magic gallery)

Add photos to `public/images/imgBeauty/` and register them in the `MAGIC_PHOTOS` array in `src/pages/Magic.tsx`.

---

## API

### `GET /api/health`

Returns `{ "status": "ok", "time": "<ISO timestamp>" }`. Useful for deployment health checks.

### `POST /api/notify`

Sends a Telegram message when a coupon is redeemed.

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

---

## License

Apache 2.0 — see [LICENSE](./LICENSE).
