import { NextRequest, NextResponse } from 'next/server';

const ADMIN_API_URL = process.env.ADMIN_API_URL;
const ADMIN_API_SECRET = process.env.ADMIN_API_SECRET;

export async function PATCH(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (!ADMIN_API_URL || !ADMIN_API_SECRET) {
    return NextResponse.json({ error: 'Not configured' }, { status: 500 });
  }

  const res = await fetch(`${ADMIN_API_URL}/api/admin/leagues/${id}/toggle`, {
    method: 'PATCH',
    headers: { Authorization: `Bearer ${ADMIN_API_SECRET}` },
  });

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
