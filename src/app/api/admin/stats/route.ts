import { NextRequest, NextResponse } from 'next/server';

const ADMIN_API_URL = process.env.ADMIN_API_URL;
const ADMIN_API_SECRET = process.env.ADMIN_API_SECRET;

export async function GET(_req: NextRequest) {
  if (!ADMIN_API_URL || !ADMIN_API_SECRET) {
    return NextResponse.json({ error: 'Not configured' }, { status: 500 });
  }

  const res = await fetch(`${ADMIN_API_URL}/api/admin/stats`, {
    headers: { Authorization: `Bearer ${ADMIN_API_SECRET}` },
    next: { revalidate: 60 },
  });

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
