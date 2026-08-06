"use client";

import { useEffect, useRef } from "react";
import { useSyncExternalStore } from "react";
import { getConsent, subscribeConsent } from "../lib/consent";
import { AD_CLIENT_ID } from "../lib/config";

export function AdBanner({ slot }: { slot?: string }) {
  const consent = useSyncExternalStore(subscribeConsent, getConsent, () => null);
  const pushed = useRef(false);

  useEffect(() => {
    if (pushed.current || consent !== "accepted") return;
    try {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
      pushed.current = true;
    } catch {
      // AdSense unavailable; keep the placeholder visible
    }
  }, [consent]);

  return (
    <section className="fixed inset-x-0 bottom-0 z-40 border-t border-outline-variant/40 bg-surface/90 p-2 backdrop-blur-md">
      <div className="mx-auto flex h-14 w-full max-w-150 items-center justify-center gap-3 rounded-lg border border-dashed border-outline-variant/30 bg-surface-container-low px-4 text-center">
        <span className="label-caps text-on-surface-variant/40">
          Advertisement
        </span>
        <ins
          className="adsbygoogle block w-full text-sm italic text-on-surface-variant/20"
          data-ad-client={AD_CLIENT_ID}
          data-ad-slot={slot ?? "0000000000"}
          data-ad-format="auto"
          data-full-width-responsive="true"
          style={{ display: "block" }}
        >
          โฆษณา (Google AdSense)
        </ins>
      </div>
    </section>
  );
}