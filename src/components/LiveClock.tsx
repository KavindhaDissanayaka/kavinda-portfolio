"use client";

import { useEffect, useState } from "react";
import { profile } from "@/data/profile";

const pad = (n: number) => String(n).padStart(2, "0");

/** A ticking clock in the owner's timezone, showing the real current date. */
function format(now: number) {
  const d = new Date(now + profile.timezone.offsetHours * 3_600_000);
  return `${d.getUTCFullYear()}.${pad(d.getUTCMonth() + 1)}.${pad(d.getUTCDate())} · ${pad(d.getUTCHours())}:${pad(
    d.getUTCMinutes(),
  )}:${pad(d.getUTCSeconds())}`;
}

export default function LiveClock() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    setTime(format(Date.now()));
    const id = setInterval(() => setTime(format(Date.now())), 1000);
    return () => clearInterval(id);
  }, []);

  return <time suppressHydrationWarning>{time ?? "----.--.-- · --:--:--"}</time>;
}
