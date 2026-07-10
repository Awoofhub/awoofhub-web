"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const SPLASH_DURATION_MS = 2500;

let hasCheckedThisSession = false;

export function useSplashScreen() {
  const pathname = usePathname();
  const [showSplash, setShowSplash] = useState(false);

  useEffect(() => {
    if (hasCheckedThisSession) return;
    hasCheckedThisSession = true;

    const isSmallScreen = window.innerWidth < 640;
    const isHomepage = pathname === "/";

    if (!isSmallScreen || !isHomepage) return;

    queueMicrotask(() => {
      setShowSplash(true);
    });

    const t = setTimeout(() => setShowSplash(false), SPLASH_DURATION_MS);
    return () => clearTimeout(t);
  }, [pathname]);

  return showSplash;
}