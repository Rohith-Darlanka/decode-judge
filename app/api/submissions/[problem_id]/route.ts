import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';
import type { RowDataPacket } from 'mysql2';

export async function GET(
  req: NextRequest,
  { params }: { params: { problem_id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const [userRows] = await db.query(
    'SELECT user_id FROM Users WHERE email = ?',
    [session.user.email]
  );
  const user = (userRows as RowDataPacket[])[0];

  const [subs] = await db.query(
    'SELECT code, is_correct, created_at FROM Submissions WHERE user_id = ? AND problem_id = ? ORDER BY created_at DESC',
    [user.user_id, params.problem_id]
  );

  return NextResponse.json({ submissions: subs });
}
