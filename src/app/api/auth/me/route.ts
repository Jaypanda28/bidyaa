import { NextResponse } from 'next/server';
import { getCurrentUser, getFullUserRecord } from '@/lib/auth';

export async function GET() {
  const session = await getCurrentUser();
  if (!session) {
    return NextResponse.json({ authenticated: false, user: null }, { status: 401 });
  }

  const user = await getFullUserRecord(session.id);
  return NextResponse.json({
    authenticated: true,
    session,
    user,
  });
}

