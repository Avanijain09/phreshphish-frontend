const DEFAULT_API = 'https://phreshphish.onrender.com'

/** API base URL. Override with VITE_API_BASE_URL at build time. */
export const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL?.trim() || DEFAULT_API).replace(/\/+$/, '')

/** Free hosting can cold-start slowly, so allow a full minute before timing out. */
export const REQUEST_TIMEOUT_MS = 60_000
/** Show a "server is waking up" hint after this long. */
export const SLOW_NOTICE_MS = 6_000
