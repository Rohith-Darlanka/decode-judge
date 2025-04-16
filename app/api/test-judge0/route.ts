// app/api/test-judge0/route.ts
import { NextResponse } from 'next/server'

export async function GET() {
  const submission = {
    source_code: 'print("Hello World")',
    language_id: 71, // Python 3
    stdin: '',
  }

  const expectedOutput = 'Hello World' // ✅ Set this based on the problem

  try {
    const res = await fetch('https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
        'X-RapidAPI-Key': process.env.JUDGE0_API_KEY!,
      },
      body: JSON.stringify(submission),
    })

    const data = await res.json()

    // 🧠 Check output match
    const actualOutput = (data.stdout || '').trim()
    const expected = expectedOutput.trim()
    const isCorrect = actualOutput === expected
    const verdict = isCorrect ? 'Accepted' : 'Wrong Answer'

    return NextResponse.json({
      result: data,
      actualOutput,
      expectedOutput,
      verdict,
    })
  } catch (err) {
    return NextResponse.json({ error: 'Judge0 test failed', details: err })
  }
}
