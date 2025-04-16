// app/api/problems/[id]/submit/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route'; // Adjust if path differs
import { db } from '@/lib/db';
import { executeCode } from '@/lib/codeExecution';

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const user_id = (session.user as any).id; // Extract user ID from session
    const { code } = await req.json();
    const problem_id = parseInt(params.id);

    if (!code) {
      return NextResponse.json({ message: 'Code is required' }, { status: 400 });
    }

    const result = await executeCode(code, problem_id);

    const execution_time = result.execution_time || null;
    const memory_usage = result.memory_usage || null;

    await db.query(
      'INSERT INTO Submissions (user_id, problem_id, code, result, execution_time, memory_usage) VALUES (?, ?, ?, ?, ?, ?)',
      [user_id, problem_id, code, JSON.stringify(result), execution_time, memory_usage]
    );

    return NextResponse.json({ message: 'Code submitted successfully', result });
  } catch (error) {
    console.error('Error submitting code:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
