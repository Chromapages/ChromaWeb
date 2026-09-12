"use client";

import {useCallback, useEffect, useRef, useState} from "react";
import {usePathname} from "next/navigation";

function ApertureIntroInner() {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const isDismissing = useRef(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const dismiss = useCallback(() => {
    if (isDismissing.current) {
      return;
    }

    isDismissing.current = true;
    setIsAnimating(false);
    closeTimer.current = setTimeout(() => {
      setIsVisible(false);
    }, 300);
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      return;
    }

    try {
      const hasSeenIntro = sessionStorage.getItem("chromapages_intro_seen");
      if (hasSeenIntro) {
        return;
      }
      sessionStorage.setItem("chromapages_intro_seen", "1");
    } catch {
      return;
    }

    const startTimer = setTimeout(() => {
      setIsVisible(true);
      setIsAnimating(true);
    }, 0);

    const safetyTimer = setTimeout(dismiss, 2500);

    return () => {
      clearTimeout(startTimer);
      clearTimeout(safetyTimer);
      if (closeTimer.current) {
        clearTimeout(closeTimer.current);
      }
    };
  }, [dismiss]);

  if (!isVisible) {
    return null;
  }

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none fixed inset-0 z-50 flex items-center justify-center bg-white transition-opacity duration-300 ease-out ${
        isAnimating ? "opacity-100" : "opacity-0"
      }`}
    >
      <video
        autoPlay
        className="h-full w-full object-contain"
        disablePictureInPicture
        muted
        onEnded={dismiss}
        onError={dismiss}
        playsInline
        preload="auto"
        src="/media/chromapages-loader.mp4"
      />
    </div>
  );
}

export function ApertureIntro() {
  const pathname = usePathname();

  if (
    pathname === "/studio" ||
    pathname.startsWith("/studio/") ||
    pathname === "/portal" ||
    pathname.startsWith("/portal/") ||
    pathname === "/admin" ||
    pathname.startsWith("/admin/") ||
    pathname === "/login" ||
    pathname.startsWith("/login/") ||
    pathname.startsWith("/invite/") ||
    pathname.startsWith("/reset-password")
  ) {
    return null;
  }

  return <ApertureIntroInner />;
}
