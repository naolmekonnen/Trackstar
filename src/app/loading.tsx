export default function Loading() {
  return (
    <div className="min-h-screen bg-[#0A0A0C] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#BFFF00] to-[#00E5FF] flex items-center justify-center animate-pulse">
          <svg className="w-6 h-6 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
          </svg>
        </div>
        <div className="w-8 h-0.5 rounded-full bg-gradient-to-r from-[#BFFF00] to-[#00E5FF] animate-pulse" />
      </div>
    </div>
  );
}
