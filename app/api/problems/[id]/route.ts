import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const problemId = params.id;
    const [rows] = await db.query('SELECT * FROM problems WHERE problem_id = ?', [problemId]);

    if (!Array.isArray(rows) || rows.length === 0) {
      return NextResponse.json({ message: 'Problem not found' }, { status: 404 });
    }

    return NextResponse.json({ problem: rows[0] });
  } catch (error) {
    console.error('Error fetching problem:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
