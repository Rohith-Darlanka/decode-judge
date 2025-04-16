import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(req: NextRequest, context: { params: { id: string } }) {
  const { params } = context;
  const id = params?.id;

  if (!id) {
    return NextResponse.json({ message: 'Missing problem ID' }, { status: 400 });
  }

  const [result] = await db.query('SELECT * FROM Problems WHERE problem_id = ?', [id]);
  const problems = result as any[];

  if (problems.length === 0) {
    return NextResponse.json({ message: 'Problem not found' }, { status: 404 });
  }

  return NextResponse.json(problems[0]);
}
