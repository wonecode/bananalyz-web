const ADMIN_API_URL = process.env.ADMIN_API_URL;
const ADMIN_API_SECRET = process.env.ADMIN_API_SECRET;

type FetchOptions = {
  method?: 'GET' | 'POST' | 'PATCH' | 'DELETE';
  body?: unknown;
  revalidate?: number;
};

export async function fetchAdmin<T>(
  path: string,
  { method = 'GET', body, revalidate = 30 }: FetchOptions = {}
): Promise<T | null> {
  if (!ADMIN_API_URL || !ADMIN_API_SECRET) {
    console.error('[admin-api] ADMIN_API_URL or ADMIN_API_SECRET not set');
    return null;
  }

  try {
    const res = await fetch(`${ADMIN_API_URL}/api/admin${path}`, {
      method,
      headers: {
        Authorization: `Bearer ${ADMIN_API_SECRET}`,
        ...(body ? { 'Content-Type': 'application/json' } : {}),
      },
      ...(body ? { body: JSON.stringify(body) } : {}),
      next: method === 'GET' ? { revalidate } : undefined,
    });

    if (!res.ok) {
      console.error(`[admin-api] ${method} ${path} → ${res.status}`);
      return null;
    }

    return res.json() as Promise<T>;
  } catch (err) {
    console.error(`[admin-api] fetch error on ${path}:`, err);
    return null;
  }
}
