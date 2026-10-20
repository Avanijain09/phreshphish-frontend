# PhreshPhish – Frontend

React + Vite + TypeScript + Tailwind CSS frontend for the deployed PhreshPhish URL phishing detection API.
It calls the real backend only. There is no mock data and no fallback result.

## API contract (unchanged)

| Method | Path       | Body                    | Used for                |
|--------|------------|-------------------------|-------------------------|
| GET    | `/health`  | –                       | API and model status    |
| POST   | `/predict` | `{ "url": "https://…" }` | Scan result             |

`/predict` returns `verdict` (`phishing` | `benign` | `uncertain`), `risk_score`, `confidence`, `evidence[]`, `explanation`.
`risk_score` is read as 0–1 (shown as a percentage) or, if above 1, as 0–100. It is labelled as a model score, not a calibrated probability.
If your backend uses a different scale, adjust `toPercent` in `src/lib/verdict.ts`.

## Run locally

Requires Node.js 18+.

```bash
npm install
cp .env.example .env     # optional; defaults to https://phreshphish.onrender.com
npm run dev              # http://localhost:5173
```

Other commands: `npm run typecheck`, `npm run build`, `npm run preview`.

## Configuration

`VITE_API_BASE_URL` sets the API base URL (default `https://phreshphish.onrender.com`). It is baked in at build time, so it is public. Never put secrets in a Vite env variable.

## Project structure

```
src/
  lib/        api.ts (all network calls), config.ts, url.ts (validation), verdict.ts (labels, advice)
  hooks/      useHealth.ts, useScan.ts
  components/ Navbar, HealthBadge, ScanForm, UrlAnatomy, ScoreMeter, ResultPanel, StatusPanels, Sections
```

Error handling lives in `src/lib/api.ts`: network failure, 60 s timeout, non-2xx responses (FastAPI `detail` is shown when present) and responses that fail validation. The first request can be slow if the Render service is idle, and the UI says so.

## Deploy (static hosting)

```bash
npm run build            # outputs dist/
```

- **Vercel**: import the repo. Framework preset Vite, build command `npm run build`, output directory `dist`.
- **Netlify**: build command `npm run build`, publish directory `dist`.
- **Render Static Site**: build command `npm install && npm run build`, publish directory `dist`.
- **GitHub Pages**: build, then publish `dist/`. If served from a sub-path, set `base: '/<repo-name>/'` in `vite.config.ts`.

Set `VITE_API_BASE_URL` in the host's environment settings only if you need a non-default API.

## CORS

Browsers block the requests if the backend does not allow your frontend's origin. Symptoms: the health badge shows "API unreachable" while `https://phreshphish.onrender.com/health` opens fine in a tab, and the browser console mentions CORS.

If the backend is FastAPI, add this (the smallest change; it does not alter any response):

```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://YOUR-FRONTEND-DOMAIN",   # e.g. https://phreshphish.vercel.app
    ],
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["Content-Type"],
)
```

Redeploy the backend afterwards. Prefer explicit origins over `"*"`.

## Notes

- The scanned URL is only ever rendered as text, never as a link.
- The URL breakdown under the input is computed in the browser from what you type. It is not model output.
- The model analyses URL structure only. It does not fetch the page. A "Likely benign" result is not a safety guarantee.
