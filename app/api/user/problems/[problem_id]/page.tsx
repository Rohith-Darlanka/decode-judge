'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

type Problem = {
  problem_id: number;
  title: string;
  description: string;
  difficulty: string;
};

export default function ProblemDetailPage() {
  const [problem, setProblem] = useState<Problem | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const { problem_id } = router.query; // Get problem_id from URL

  useEffect(() => {
    const fetchProblemDetails = async () => {
      if (!problem_id) return; // If no problem_id in the URL, do nothing

      try {
        setLoading(true);
        setError(null); // Reset error state

        // Make a fetch request to get the problem details
        const res = await fetch(`/api/problems/${problem_id}`);

        if (!res.ok) {
          throw new Error(`Failed to fetch problem details: ${res.status}`);
        }

        const data = await res.json();
        setProblem(data); // Set the fetched problem data
      } catch (error) {
        console.error('Error fetching problem details:', error);
        setError('Failed to load problem details.');
      } finally {
        setLoading(false);
      }
    };

    fetchProblemDetails();
  }, [problem_id]); // Refetch whenever problem_id changes

  if (loading) {
    return <div>Loading problem details...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!problem) {
    return <div>Problem not found.</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">{problem.title}</h1>
      <p className="text-sm text-gray-500">Difficulty: {problem.difficulty}</p>
      <div className="mt-4">
        <h2 className="text-xl font-semibold">Description</h2>
        <p className="mt-2">{problem.description}</p>
      </div>
      {/* Add a solution editor or any additional functionality */}
    </div>
  );
}
