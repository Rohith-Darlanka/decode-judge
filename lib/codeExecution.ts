import axios from 'axios';

const JUDGE0_API_URL = 'https://judge0-ce.p.rapidapi.com/submissions';

export async function runCodeWithJudge0(code: string, languageId: number, stdin: string) {
  try {
    const response = await axios.post(
      JUDGE0_API_URL,
      {
        source_code: code,
        language_id: languageId,
        stdin: stdin,
      },
      {
        params: {
          base64_encoded: 'false',
          wait: 'true',
        },
        headers: {
          'Content-Type': 'application/json',
          'X-RapidAPI-Key': process.env.JUDGE0_API_KEY!,
          'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
        },
      }
    );

    return response.data;
  } catch (error: any) {
    console.error('🔥 Judge0 Error:', error?.response?.data || error.message);
    throw new Error('Judge0 test failed');
  }
}
