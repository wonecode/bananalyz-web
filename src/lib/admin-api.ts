const ADMIN_API_URL = process.env.ADMIN_API_URL;
const ADMIN_API_SECRET = process.env.ADMIN_API_SECRET;

export async function fetchAdmin<T>(path: string): Promise<T | null> {
  if (!ADMIN_API_URL || !ADMIN_API_SECRET) {
    console.error('[admin-api] ADMIN_API_URL or ADMIN_API_SECRET not set');
    return null;
  }

  try {
    const res = await fetch(`${ADMIN_API_URL}/api/admin${path}`, {
      headers: { Authorization: `Bearer ${ADMIN_API_SECRET}` },
      next: { revalidate: 30 },
    });

    if (!res.ok) {
      console.error(`[admin-api] ${path} → ${res.status}`);
      return null;
    }

    return res.json() as Promise<T>;
  } catch (err) {
    console.error(`[admin-api] fetch error on ${path}:`, err);
    return null;
  }
}
