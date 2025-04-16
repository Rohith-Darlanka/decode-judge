'use client';

import { useEffect, useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Card, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import CodeEditor from '@/components/CodeEditor';
import { Button } from '@/components/ui/button';

const languages = ['cpp', 'python', 'java'];

export default function ProblemPage() {
  const { id } = useParams();
  const { data: session } = useSession();
  const [problem, setProblem] = useState<any>(null);
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('cpp');
  const [darkMode, setDarkMode] = useState(true);
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(true);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleTyping = () => {
    if (videoRef.current) {
      videoRef.current.play();
    }

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.pause();
      }
    }, 3000);
  };

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/problem/${id}`);
        const data = await res.json();
        setProblem(data);
      } catch (error) {
        console.error("Error fetching problem:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProblem();
  }, [id]);

  const fetchStatus = async () => {
    if (session?.user?.id) {
      const res = await fetch(`/api/submission/status?userId=${session.user.id}&problemId=${id}`);
      const data = await res.json();
      if (data.status === 'Accepted') {
        setStatus('✅ All testcases passed!');
      } else if (data.status) {
        setStatus('❌ Some testcases failed.');
      }
    }
  };

  const handleSubmit = async () => {
    setStatus('Submitting...');
    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ problemId: id, code, language }),
      });

      if (!res.ok) {
        setStatus('Server Error ❌');
        return;
      }

      setTimeout(fetchStatus, 1000);
    } catch (err) {
      console.error('Submission failed:', err);
      setStatus('Failed to submit ❌');
    }
  };

  if (loading) {
    return (
      <div className="text-center p-6">
        <img src="/luff.gif" alt="Loading..." className="mx-auto" />
      </div>
    );
  }

  if (!problem) return <div className="text-white p-6">Problem not found</div>;

  return (
    <div className="relative min-h-screen p-6 bg-[#0f172a] text-white">
      {/* Video in background */}
      <video
        ref={videoRef}
        className="fixed top-0 left-0 w-full h-full object-cover opacity-20 z-0 pointer-events-none"
        muted
        playsInline
        preload="auto"
      >
        <source src="/luffy-bg.mp4" type="video/mp4" />
      </video>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-[#1e293b] border-none shadow-xl">
          <CardContent className="space-y-4 p-6">
            <h1 className="text-3xl font-bold text-cyan-400">{problem.title}</h1>
            <p className="whitespace-pre-wrap text-gray-300">{problem.description}</p>
            <div className="mt-4">
              <p className="font-semibold text-sm text-blue-300">Input Format</p>
              <p className="whitespace-pre-wrap text-gray-400 text-sm">{problem.input_format}</p>

              <p className="font-semibold text-sm mt-2 text-blue-300">Output Format</p>
              <p className="whitespace-pre-wrap text-gray-400 text-sm">{problem.output_format}</p>
            </div>
            <p className="text-sm text-pink-400 mt-4">Difficulty: {problem.difficulty}</p>
          </CardContent>
        </Card>

        <Card className="bg-[#1e293b] border-none shadow-xl">
          <CardContent className="space-y-4 p-4">
            <div className="flex items-center justify-between">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-[#334155] text-white px-3 py-1 rounded"
              >
                {languages.map((lang) => (
                  <option key={lang} value={lang}>
                    {lang}
                  </option>
                ))}
              </select>

              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-300">Dark Mode</span>
                <Switch checked={darkMode} onCheckedChange={setDarkMode} />
              </div>
            </div>

            <CodeEditor
              code={code}
              setCode={setCode}
              language={language}
              darkMode={darkMode}
              onType={handleTyping}
            />

            <Button onClick={handleSubmit} className="bg-cyan-500 hover:bg-cyan-600 text-white">
              Submit
            </Button>
            <p className="text-sm text-green-400">{status}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
