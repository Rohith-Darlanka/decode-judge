import axios from 'axios';

const JUDGE0_API_URL = 'https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true';

// Map friendly language names to Judge0 language IDs
const languageMap: Record<string, number> = {
  cpp: 76,
  python: 71,
  java: 62,
  javascript: 63
};

export async function runCodeWithJudge0(code: string, language: string, stdin: string) {
  try {
    const languageId = languageMap[language];
    if (!languageId) {
      throw new Error(`Unsupported language: ${language}`);
    }

    const response = await axios.post(
      JUDGE0_API_URL,
      {
        source_code: code,
        language_id: languageId,
        stdin,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-RapidAPI-Key': process.env.JUDGE0_API_KEY!,
          'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
        },
      }
    );

    const { token } = response.data;

    // Wait for result
    const resultResponse = await axios.get(
      `https://judge0-ce.p.rapidapi.com/submissions/${token}?base64_encoded=false`,
      {
        headers: {
          'X-RapidAPI-Key': process.env.JUDGE0_API_KEY!,
          'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
        },
      }
    );

    return resultResponse.data;
  } catch (error: any) {
    console.error('Judge0 API error:', error.response?.data || error.message);
    throw new Error('Judge0 test failed');
  }
}
