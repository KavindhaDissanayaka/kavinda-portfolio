import { profile } from "@/data/profile";

/** The current year in the owner's timezone (same offset the live clock uses). */
export function getCurrentYear(now: number = Date.now()): number {
  return new Date(now + profile.timezone.offsetHours * 3_600_000).getUTCFullYear();
}
