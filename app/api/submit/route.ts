import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import { runCodeWithJudge0 } from '@/lib/judge0';
import { getTestCasesByProblemId } from '@/lib/testcase';
import { saveSubmission } from '@/lib/submission';
import { cookies } from 'next/headers';

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession({ req: { headers: req.headers, cookies: cookies() }, ...authOptions });

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const { code, language, problemId } = await req.json();
    const numericProblemId = Number(problemId);
    
    if (isNaN(numericProblemId)) {
      return NextResponse.json({ error: 'Invalid problem ID' }, { status: 400 });
    }
    
    const testCases = await getTestCasesByProblemId(numericProblemId);
      
    let allPassed = true;
    let lastOutput = '';

    for (const testCase of testCases) {
      const result = await runCodeWithJudge0(code, language, testCase.input); // Use 'language' here
      lastOutput = result.stdout?.trim() || '';

      const passed = lastOutput === testCase.output.trim();
      if (!passed) {
        allPassed = false;
        break;
      }
    }

    await saveSubmission({
      code,
      language, // Ensure you save 'language' here, not 'language_id'
      problemId : numericProblemId,
      userId: Number(session.user.id),
      status: allPassed ? 'Accepted' : 'Wrong Answer',
      output: lastOutput,
    });

    return NextResponse.json({ success: true, result: allPassed ? 'Accepted' : 'Wrong Answer' });
  } catch (error) {
    console.error('Submission error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
