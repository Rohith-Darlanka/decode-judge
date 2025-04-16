import { NextResponse } from 'next/server';
import { db } from '@/lib/db'; // Ensure this is correctly set up

export async function GET() {
  try {
    // Query the database to get submissions for a user
    const [submissions] = await db.execute(
        'SELECT problem_id, status, submitted_at FROM Submissions WHERE user_id = ? ORDER BY submitted_at DESC',
        [1] // Replace with actual user_id
      );
      

    // Return the result as JSON
    return NextResponse.json({ submissions });
  } catch (error) {
    console.error('Error fetching submissions:', error);
    return NextResponse.json({ error: 'Failed to fetch submissions' }, { status: 500 });
  }
}
