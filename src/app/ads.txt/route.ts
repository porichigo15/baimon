import { AD_CLIENT_ID } from "../../lib/config";

export function GET() {
  const pubId = AD_CLIENT_ID.replace(/^ca-/, "");
  return new Response(`google.com, ${pubId}, DIRECT, f08c47fec0942fa0\n`, {
    headers: { "Content-Type": "text/plain" },
  });
}
