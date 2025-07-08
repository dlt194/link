# URL Shortener

A lightweight, configurable URL shortener with:

- React + Vite frontend (Shadcn UI)
- Supabase backend (for storage + realtime)
- Nginx-friendly redirect setup
- Docker-ready build for deployment anywhere

---

## Features

- Shorten URLs with custom 8-character alphanumeric IDs
- Auto-sync sidebar with Supabase Realtime
- Supports per-user Supabase instance + domain configuration
- Docker build — easy to deploy

---

## Environment Variables

Create a `.env` file in `frontend/` or pass these at build/runtime:

| Variable                 | Description                                                         |
| ------------------------ | ------------------------------------------------------------------- |
| `VITE_SUPABASE_URL`      | Your Supabase project URL (e.g. `https://xyz.supabase.co`)          |
| `VITE_SUPABASE_ANON_KEY` | Your Supabase anon public API key                                   |
| `VITE_BASE_URL`          | Base URL for generating short links (e.g. `https://link.xyz.me.uk`) |

Example `.env`:

```env
VITE_SUPABASE_URL=https://xyz.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_BASE_URL=https://link.xyz.com
```
