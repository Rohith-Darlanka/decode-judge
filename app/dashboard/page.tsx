'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type Problem = {
  problem_id: number;
  title: string;
  difficulty: string;
  solved: boolean;
};

export default function Dashboard() {
  const [problems, setProblems] = useState<Problem[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const response = await fetch('/api/problems');
        if (!response.ok) throw new Error('Failed to fetch problems');
        const data = await response.json();
        setProblems(data);
      } catch (error) {
        console.error("Error fetching problems:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProblems();
  }, []);

  const handleProblemClick = (id: number) => {
    router.push(`/problems/${id}`);
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-cyan-400 mb-8 text-center">
          🚀 Your Problems
        </h1>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <img
              src="/luffy-running.gif"
              alt="Loading..."
              className="w-32 h-32 animate-running"
            />
            <style jsx>{`
              @keyframes running {
                0% {
                  transform: translateX(0px);
                }
                50% {
                  transform: translateX(20px);
                }
                100% {
                  transform: translateX(0px);
                }
              }
              .animate-running {
                animation: running 0.6s ease-in-out infinite;
              }
            `}</style>
          </div>
        ) : problems.length === 0 ? (
          <div className="text-center text-gray-400 mt-10">
            <p>No problems found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {problems.map((problem) => (
              <div
                key={problem.problem_id}
                onClick={() => handleProblemClick(problem.problem_id)}
                className={`cursor-pointer p-5 rounded-xl shadow transition duration-200 hover:scale-105 ${
                  problem.solved
                    ? 'bg-green-600 text-white'
                    : 'bg-[#1e293b] hover:bg-[#334155]'
                }`}
              >
                <h3 className="text-xl font-semibold mb-2">{problem.title}</h3>
                <p className="text-sm text-gray-300">Difficulty: {problem.difficulty}</p>
                {problem.solved && (
                  <span className="mt-2 inline-block px-2 py-1 bg-green-800 text-xs rounded-full">
                    ✅ Solved
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
