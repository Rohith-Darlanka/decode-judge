'use client';

export default function Loading() {
  return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center">
      <img
        src="/luff.gif"
        alt="Loading..."
        className="w-32 h-32"
      />
    </div>
  );
}
