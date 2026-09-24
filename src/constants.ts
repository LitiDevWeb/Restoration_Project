/**
 * Base URL prepended to every browser-side API call.
 *
 * The pages and the API routes are served by the same Next.js app, so the default
 * is a relative (same-origin) URL: `/api/login`, `/api/unavailabilities`, ...
 * An absolute domain here made every request cross-origin, which forces a CORS
 * preflight that the production host never answers — the sign-in button then
 * spun forever as soon as the app was opened on any other host (localhost,
 * staging, a preview deployment).
 * Set NEXT_PUBLIC_API_URL only when the API really lives on another host.
 */
export const API_URL = (process.env.NEXT_PUBLIC_API_URL ?? "").replace(/\/+$/, "");

/** Requests are aborted after this delay so a slow/unreachable API can never lock the UI. */
export const REQUEST_TIMEOUT = 15000;

