"use client";

import { useEffect } from "react";

export function MobileCtaGuard() {
  useEffect(() => {
    const reserve = document.getElementById("reserve");
    const cta = document.querySelector<HTMLElement>(".fixed.inset-x-0.bottom-0.z-40");
    if (!reserve || !cta || !("IntersectionObserver" in window)) return;

    const media = window.matchMedia("(max-width: 767px)");
    const setVisibility = (visible: boolean) => {
      if (!media.matches) {
        cta.removeAttribute("data-reserve-visible");
        return;
      }
      if (visible) cta.setAttribute("data-reserve-visible", "true");
      else cta.removeAttribute("data-reserve-visible");
    };

    const observer = new IntersectionObserver(
      ([entry]) => setVisibility(Boolean(entry?.isIntersecting)),
      { threshold: 0, rootMargin: "0px 0px -12% 0px" },
    );

    observer.observe(reserve);
    const onMediaChange = () => {
      if (!media.matches) cta.removeAttribute("data-reserve-visible");
    };
    media.addEventListener?.("change", onMediaChange);

    return () => {
      observer.disconnect();
      media.removeEventListener?.("change", onMediaChange);
      cta.removeAttribute("data-reserve-visible");
    };
  }, []);

  return null;
}
