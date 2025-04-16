'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

type Problem = {
  problem_id: number;
  title: string;
  difficulty: string;
  solved: number; // 0 or 1
};

export default function ProblemsPage() {
  const [problems, setProblems] = useState<Problem[]>([]);

  useEffect(() => {
    const fetchProblems = async () => {
      const res = await fetch('/api/problems', { cache: 'no-store' });
      const data = await res.json();
      setProblems(data);
    };
    fetchProblems();
  }, []);

  const difficultyColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'easy':
        return 'text-green-500';
      case 'medium':
        return 'text-yellow-500';
      case 'hard':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-cyan-400 mb-6">All Problems</h1>

        <motion.div
          className="grid gap-6 md:grid-cols-2"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
        >
          {problems.map((problem) => (
            <motion.div
              key={problem.problem_id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <Link href={`/problems/${problem.problem_id}`}>
                <div
                  className={`p-5 rounded-2xl shadow-xl border border-gray-700 transition-transform hover:scale-[1.02] cursor-pointer ${
                    problem.solved
                      ? 'bg-gradient-to-br from-green-500/10 to-green-700/10'
                      : 'bg-[#1e293b]'
                  }`}
                >
                  <h2 className="text-xl font-semibold text-cyan-300 mb-2">
                    {problem.title}
                  </h2>
                  <p className={`text-sm ${difficultyColor(problem.difficulty)}`}>
                    Difficulty: {problem.difficulty}
                  </p>
                  {problem.solved ? (
                    <p className="mt-2 text-green-400 text-sm font-semibold">✓ Solved</p>
                  ) : (
                    <p className="mt-2 text-gray-400 text-sm">Not Solved</p>
                  )}
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
