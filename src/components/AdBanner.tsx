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
    <section className="mx-auto mb-12 mt-6 w-full max-w-150 px-6">
      <div className="flex min-h-30 w-full flex-col items-center justify-center rounded-lg border border-dashed border-outline-variant/30 bg-surface-container-low p-4 text-center">
        <span className="label-caps mb-2 text-on-surface-variant/40">
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