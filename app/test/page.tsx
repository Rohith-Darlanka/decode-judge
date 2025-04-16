'use client';

export default function TestVideoPage() {
  return (
    <div className="relative h-screen bg-black">
      <video
        src="/luffy-bg.mp4"
        className="absolute top-0 left-0 w-full h-full object-cover opacity-40"
        muted
        autoPlay
        loop
        playsInline
      />
      <div className="relative z-10 flex items-center justify-center h-full">
        <h1 className="text-white text-4xl font-bold">Video Test</h1>
      </div>
    </div>
  );
}
