import { NextResponse } from 'next/server';
import { getLatestSubmissionStatus } from '@/lib/submission';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = Number(searchParams.get('userId'));
  const problemId = Number(searchParams.get('problemId'));

  if (!userId || !problemId) {
    return NextResponse.json({ status: null });
  }

  const status = await getLatestSubmissionStatus(userId, problemId);
  return NextResponse.json({ status });
}
