const WINDOW_MS = 60_000;
const MAX_REQUESTS = 3;

const ipMap = new Map<string, { count: number; start: number }>();

export function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = ipMap.get(ip);

  if (!entry || now - entry.start > WINDOW_MS) {
    ipMap.set(ip, { count: 1, start: now });
    return true;
  }

  if (entry.count >= MAX_REQUESTS) {
    return false;
  }

  entry.count++;
  return true;
}
