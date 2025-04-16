'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function Home() {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const features = [
    {
      title: "🔥 Solve Coding Challenges",
      desc: "Practice problems to improve your coding skills.",
    },
    {
      title: "⚡ Real-time Code Execution",
      desc: "Instantly run code using Judge0 integration.",
    },
    {
      title: "📈 Track Your Progress",
      desc: "View solved problems in your personal dashboard.",
    },
    {
      title: "🌙 Light/Dark Mode",
      desc: "Switch between beautiful themes with one click.",
    },
    {
      title: "🔐 Secure Auth",
      desc: "Login and Sign Up with JWT-powered NextAuth.",
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300 overflow-x-hidden">

      {/* Nav */}
      <div className="absolute top-5 right-5 sm:right-10 flex space-x-3 sm:space-x-6 text-sm sm:text-base z-50">
        <a href="/problems" className="px-3 py-1 rounded-lg text-white bg-gradient-to-r from-blue-500 to-purple-600 shadow-md hover:scale-105 transition-all duration-200">Problems</a>
        <a href="/login" className="px-3 py-1 rounded-lg text-white bg-gradient-to-r from-green-400 to-blue-500 shadow-md hover:scale-105 transition-all duration-200">Login</a>
        <a href="/signup" className="px-3 py-1 rounded-lg text-white bg-gradient-to-r from-pink-500 to-red-500 shadow-md hover:scale-105 transition-all duration-200">Sign Up</a>
        <button onClick={() => setDarkMode(!darkMode)} className="px-3 py-1 rounded-lg text-white bg-gradient-to-r from-gray-600 to-gray-800 shadow-md hover:scale-105 transition-all duration-200">
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>

      {/* Hero */}
      <section className="flex flex-col items-center justify-center h-screen px-4">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl sm:text-7xl font-bold text-blue-600 dark:text-white glow"
        >
          Decode
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mt-4 text-center text-gray-600 dark:text-gray-300 text-base sm:text-lg"
        >
          A place to solve coding challenges and level up your skills.
        </motion.p>
      </section>

      {/* Feature Highlights */}
      <section className="px-6 py-16 bg-white dark:bg-gray-900 space-y-16">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.2 }}
            className="max-w-4xl mx-auto bg-gradient-to-r from-blue-100 to-blue-200 dark:from-gray-800 dark:to-gray-700 p-6 rounded-2xl shadow-xl"
          >
            <h2 className="text-xl sm:text-2xl font-bold text-blue-800 dark:text-white">{f.title}</h2>
            <p className="text-gray-700 dark:text-gray-300 mt-2">{f.desc}</p>
          </motion.div>
        ))}
      </section>

      {/* Floating BG */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="floating-circle bg-blue-300 dark:bg-blue-700 opacity-20 top-1/4 left-10 w-32 h-32" />
        <div className="floating-circle bg-purple-300 dark:bg-purple-700 opacity-20 top-1/2 right-10 w-24 h-24" />
        <div className="floating-circle bg-pink-300 dark:bg-pink-600 opacity-20 bottom-10 left-1/3 w-16 h-16" />
      </div>

      {/* Style */}
      <style jsx>{`
        .glow {
          text-shadow: 0 0 10px rgba(59, 130, 246, 0.7),
                       0 0 20px rgba(59, 130, 246, 0.5);
        }
        .floating-circle {
          position: absolute;
          border-radius: 9999px;
          animation: float 6s ease-in-out infinite;
        }
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
      `}</style>
    </main>
  );
}
