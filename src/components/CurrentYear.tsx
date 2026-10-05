"use client";

import { useEffect, useState } from "react";
import { getCurrentYear } from "@/lib/year";

/**
 * Prints the current year. It renders the year known at build/render time first
 * (so server and browser HTML match), then corrects itself in the browser, so a
 * long-lived static build never shows an out-of-date year.
 */
export default function CurrentYear() {
  const [year, setYear] = useState(getCurrentYear);

  useEffect(() => {
    setYear(getCurrentYear());
  }, []);

  return <span suppressHydrationWarning>{year}</span>;
}
