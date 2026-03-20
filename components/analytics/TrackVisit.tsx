"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { trackVisit } from "@/lib/track";

export function TrackVisit() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname && !pathname.startsWith("/admin")) {
      const origin = pathname === "/" ? "home" : pathname.replace(/^\//, "") || "home";
      trackVisit(origin);
    }
  }, [pathname]);

  return null;
}
