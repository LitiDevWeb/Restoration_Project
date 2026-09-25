/**
 * Domain types for the crew-availability calendar.
 *
 * The database is SQLite, and the Prisma version in use (4.x) does not support
 * Prisma `enum` or `Json` columns on SQLite, so `Unavailabilities.type` is stored
 * as TEXT and `Unavailabilities.value` as a JSON string. These definitions are the
 * single source of truth for the allowed values, shared by the API routes, the
 * admin tool and the public calendar.
 */

export const UNAVAILABILITY_TYPES = ["DAY", "WEEK", "MONTH", "FROM_TO", "WEEK_END"] as const;

export type UnavailabilityType = (typeof UNAVAILABILITY_TYPES)[number];

/** Mirrors the former Prisma enum so `UnavailabilityType.DAY` keeps working. */
export const UnavailabilityType: Record<UnavailabilityType, UnavailabilityType> = {
  DAY: "DAY",
  WEEK: "WEEK",
  MONTH: "MONTH",
  FROM_TO: "FROM_TO",
  WEEK_END: "WEEK_END",
};

export type UnavailabilityValue = {
  day?: string;
  from?: string;
  to?: string;
};

/** A row of `Unavailabilities` after `value` has been parsed back into an object. */
export type Unavailability = {
  id: number;
  type: UnavailabilityType;
  value: UnavailabilityValue;
};

export function isUnavailabilityType(value: unknown): value is UnavailabilityType {
  return typeof value === "string" && UNAVAILABILITY_TYPES.includes(value as UnavailabilityType);
}

/** Reads the persisted `value` column, which holds JSON text on SQLite. */
export function parseUnavailabilityValue(value: unknown): UnavailabilityValue {
  if (value && typeof value === "object") return value as UnavailabilityValue;

  if (typeof value !== "string") return {};

  try {
    const parsed = JSON.parse(value);

    return parsed && typeof parsed === "object" ? (parsed as UnavailabilityValue) : {};
  } catch {
    return {};
  }
}

/** Serialises a payload for the `value` column. */
export function serializeUnavailabilityValue(value: unknown): string {
  return JSON.stringify(value ?? {});
}
