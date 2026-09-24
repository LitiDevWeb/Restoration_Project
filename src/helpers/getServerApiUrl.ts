import type { IncomingHttpHeaders } from "http";

import { API_URL } from "@webapp/constants";

/**
 * Absolute origin used by server-side fetches (`getServerSideProps`), where a
 * relative URL cannot be resolved.
 *
 * Prefers the configured `NEXT_PUBLIC_API_URL` and otherwise rebuilds the origin
 * from the incoming request, so the call always reaches the app that is actually
 * running — localhost during development, the public domain behind a reverse
 * proxy in production.
 */
export function getServerApiUrl(headers: IncomingHttpHeaders) {
  if (API_URL) return API_URL;

  const host = headers.host ?? `localhost:${process.env.PORT ?? "3000"}`;
  const forwardedProto = headers["x-forwarded-proto"];
  const protocol = (Array.isArray(forwardedProto) ? forwardedProto[0] : forwardedProto)?.split(",")[0]?.trim();
  const isLocal = host.startsWith("localhost") || host.startsWith("127.0.0.1") || host.startsWith("[::1]");

  return `${protocol || (isLocal ? "http" : "https")}://${host}`;
}
