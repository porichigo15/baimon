"use client";

import { useEffect, useRef } from "react";

export const AD_CLIENT_ID = "ca-pub-XXXXXXXXXXXXXXXX";

export function AdBanner({ slot }: { slot?: string }) {
  const pushed = useRef(false);

  useEffect(() => {
    if (pushed.current) return;
    try {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
    } catch {
      // ignore AdSense errors when no account is configured yet
    }
    pushed.current = true;
  }, []);

  return (
    <ins
      className="adsbygoogle block my-4 min-h-[120px] w-full overflow-hidden rounded border border-gray-100 bg-gray-50 text-center text-xs text-gray-400"
      data-ad-client={AD_CLIENT_ID}
      data-ad-slot={slot ?? "0000000000"}
      data-ad-format="auto"
      data-full-width-responsive="true"
      style={{ display: "block" }}
    >
      โฆษณา (Google AdSense)
    </ins>
  );
}