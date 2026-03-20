"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import { Share2, Download, ChevronLeft, Zap, Flame, Trophy } from "lucide-react";
import { recentRuns, currentUser, formatDuration } from "@/lib/mock-data";

type Format = "story" | "square";

export default function RecapPage() {
  const [format, setFormat] = useState<Format>("story");
  const [selectedBg, setSelectedBg] = useState(0);
  const run = recentRuns[0];

  const backgrounds = [
    "from-[#0A0A0C] via-[#1a1a2e] to-[#0A0A0C]",
    "from-[#0f1f0f] via-[#1a2e1a] to-[#0a140a]",
    "from-[#1a0a2e] via-[#2a1a3e] to-[#0a0a1e]",
    "from-[#2e1a0a] via-[#3e2a1a] to-[#1e0a0a]",
  ];

  return (
    <div className="max-w-lg mx-auto px-4 pt-4 pb-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <Link href="/run" className="flex items-center gap-1 text-sm text-white/40">
          <ChevronLeft className="w-4 h-4" /> Back
        </Link>
        <h1 className="text-lg font-bold">Run Recap</h1>
        <div className="w-16" />
      </div>

      {/* Format Toggle */}
      <div className="flex gap-2 mb-4 justify-center">
        {(["story", "square"] as const).map(f => (
          <button
            key={f}
            onClick={() => setFormat(f)}
            className={`px-4 py-2 rounded-lg text-xs font-medium capitalize transition-all ${
              format === f ? "bg-white/10 text-white" : "text-white/40"
            }`}
          >
            {f === "story" ? "Story (9:16)" : "Post (1:1)"}
          </button>
        ))}
      </div>

      {/* Recap Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="mx-auto mb-6"
        style={{ maxWidth: format === "story" ? 300 : 340 }}
      >
        <div
          className={`relative overflow-hidden rounded-3xl bg-gradient-to-b ${backgrounds[selectedBg]} border border-white/[0.08] ${
            format === "story" ? "aspect-[9/16]" : "aspect-square"
          } p-6 flex flex-col justify-between`}
        >
          {/* Glow effects */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-40 h-40 bg-[#BFFF00]/10 rounded-full blur-[60px]" />
          <div className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-[#00E5FF]/8 rounded-full blur-[50px]" />

          {/* Top */}
          <div className="relative">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 rounded-md bg-gradient-to-br from-[#BFFF00] to-[#00E5FF] flex items-center justify-center">
                <Zap className="w-3 h-3 text-black" />
              </div>
              <span className="text-xs font-semibold tracking-wider">TRACKSTAR</span>
            </div>

            {/* Route Art */}
            <div className="my-6">
              <svg viewBox="0 0 240 100" className="w-full opacity-60">
                <path
                  d="M10,70 Q30,10 70,50 T130,30 T190,55 T230,40"
                  fill="none"
                  stroke="url(#routeGradient)"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#BFFF00" />
                    <stop offset="100%" stopColor="#00E5FF" />
                  </linearGradient>
                </defs>
                <circle cx="10" cy="70" r="4" fill="#BFFF00" />
                <circle cx="230" cy="40" r="4" fill="#00E5FF" />
              </svg>
            </div>
          </div>

          {/* Stats */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <p className="text-5xl font-bold tracking-tight mb-1">{run.distance}</p>
              <p className="text-white/40 text-sm mb-6">miles</p>
            </motion.div>

            <div className="grid grid-cols-3 gap-3 mb-6">
              <div>
                <p className="text-lg font-bold">{run.pace}</p>
                <p className="text-[10px] text-white/40 uppercase">Pace</p>
              </div>
              <div>
                <p className="text-lg font-bold">{formatDuration(run.duration)}</p>
                <p className="text-[10px] text-white/40 uppercase">Time</p>
              </div>
              <div>
                <p className="text-lg font-bold">{run.effortScore}</p>
                <p className="text-[10px] text-white/40 uppercase">Effort</p>
              </div>
            </div>

            {/* Badges */}
            <div className="flex gap-2 flex-wrap mb-4">
              <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-[#BFFF00]/15 text-[10px] text-[#BFFF00] font-medium">
                <Flame className="w-3 h-3" /> 8 day streak
              </div>
              <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-[#00E5FF]/15 text-[10px] text-[#00E5FF] font-medium">
                <Trophy className="w-3 h-3" /> Fastest tempo
              </div>
            </div>

            {/* Persona */}
            <div className="flex items-center gap-2 p-3 rounded-xl bg-white/[0.04] border border-white/[0.06]">
              <span className="text-lg">⚡</span>
              <div>
                <p className="text-xs font-semibold">{currentUser.persona}</p>
                <p className="text-[9px] text-white/40">Score: {currentUser.runnerScore}</p>
              </div>
            </div>
          </div>

          {/* Bottom tagline */}
          <div className="relative flex items-center justify-between mt-4">
            <p className="text-[10px] text-white/20">{currentUser.name}</p>
            <p className="text-[10px] text-white/20">{run.date}</p>
          </div>
        </div>
      </motion.div>

      {/* Background Selector */}
      <div className="flex items-center justify-center gap-3 mb-6">
        <p className="text-xs text-white/30">Style:</p>
        {backgrounds.map((_, i) => (
          <button
            key={i}
            onClick={() => setSelectedBg(i)}
            className={`w-8 h-8 rounded-full bg-gradient-to-br ${backgrounds[i]} border-2 transition-all ${
              selectedBg === i ? "border-[#BFFF00] scale-110" : "border-white/10"
            }`}
          />
        ))}
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <button className="flex-1 h-12 rounded-xl bg-gradient-to-r from-[#BFFF00] to-[#9ACC00] flex items-center justify-center gap-2 text-sm font-bold text-black">
          <Share2 className="w-4 h-4" /> Share to Story
        </button>
        <button className="h-12 px-4 rounded-xl bg-white/[0.05] border border-white/[0.06] flex items-center justify-center">
          <Download className="w-4 h-4 text-white/60" />
        </button>
      </div>

      {/* Cinematic Recap Preview */}
      <div className="mt-8 p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
        <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
          <Zap className="w-4 h-4 text-[#BFFF00]" />
          Cinematic Recap
        </h3>
        <p className="text-xs text-white/40 mb-4">An animated version of your run, perfect for stories.</p>
        <div className="rounded-xl bg-gradient-to-b from-[#1a1a2e] to-[#0A0A0C] border border-white/[0.06] p-6 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <p className="text-white/30 text-xs mb-4">Preview</p>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="text-2xl font-bold mb-1"
            >
              {run.distance} miles today.
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="text-sm text-[#BFFF00]"
            >
              Fastest tempo in 5 weeks.
            </motion.p>
          </motion.div>
        </div>
        <button className="w-full mt-4 h-10 rounded-xl bg-white/[0.05] border border-white/[0.06] text-xs font-medium text-white/60">
          Generate Cinematic Recap
        </button>
      </div>
    </div>
  );
}
