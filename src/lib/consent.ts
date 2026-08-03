export const CONSENT_COOKIE = "baimon_cookie_consent";

export type ConsentChoice = "accepted" | "declined";

const listeners = new Set<() => void>();

export function readConsent(): ConsentChoice | null {
  if (typeof window === "undefined") return null;
  const match = document.cookie.match(
    new RegExp(`(?:^|;\\s*)${CONSENT_COOKIE}=([^;]+)`)
  );
  const value = match ? match[1] : null;
  return value === "accepted" || value === "declined" ? value : null;
}

export function getConsent(): ConsentChoice | null {
  return readConsent();
}

export function writeConsent(value: ConsentChoice): void {
  document.cookie = `${CONSENT_COOKIE}=${value}; Path=/; Max-Age=31536000; SameSite=Lax`;
  listeners.forEach((listener) => listener());
}

export function subscribeConsent(listener: () => void): () => void {
  listeners.add(listener);
  if (typeof window === "undefined") {
    return () => {
      listeners.delete(listener);
    };
  }
  const onStorage = () => listeners.forEach((emit) => emit());
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}
