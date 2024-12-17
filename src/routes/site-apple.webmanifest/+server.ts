import { getWebmanifest } from '$lib/utils/webmanifest';
import manifestRaw from '../site.webmanifest/site.webmanifest?raw';

export function GET() {
  const newManifest = getWebmanifest(manifestRaw, true);
  return new Response(newManifest);
}

export const prerender = true;
