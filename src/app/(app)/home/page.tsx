"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Zap, Flame, TrendingUp, ChevronRight, Play,
  Calendar, MapPin, Trophy
} from "lucide-react";
import { currentUser, getDaysUntilRace, recentRuns, coachMessages, runClubs } from "@/lib/mock-data";

const fadeUp = (i: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { delay: i * 0.06, duration: 0.4, ease: [0.22, 1, 0.36, 1] as const },
});

export default function HomePage() {
  const daysUntil = getDaysUntilRace();
  const latestRun = recentRuns[0];

  return (
    <div className="px-5 pt-14 pb-4 max-w-lg mx-auto">
      {/* Header */}
      <motion.div {...fadeUp(0)} className="flex items-center justify-between mb-8">
        <div>
          <p className="text-xs text-white/40 uppercase tracking-wider">Good morning</p>
          <h1 className="text-2xl font-bold mt-0.5">{currentUser.name.split(" ")[0]}</h1>
        </div>
        <Link href="/(app)/profile" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#BFFF00] to-[#00E5FF] flex items-center justify-center text-xs font-bold text-black">
            {currentUser.runnerScore}
          </div>
        </Link>
      </motion.div>

      {/* Today's Workout */}
      <motion.div {...fadeUp(1)}>
        <Link href="/(app)/run" className="block p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06] mb-4 group">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#BFFF00]/15 flex items-center justify-center">
                <Zap className="w-4 h-4 text-[#BFFF00]" />
              </div>
              <span className="text-xs text-[#BFFF00] font-medium uppercase tracking-wider">Today&apos;s Run</span>
            </div>
            <ChevronRight className="w-4 h-4 text-white/20 group-hover:text-white/40 transition-colors" />
          </div>
          <h3 className="text-lg font-bold mb-1">Tempo Run · 6 mi</h3>
          <p className="text-sm text-white/40 mb-4">Target pace: 7:45–8:00/mi · Build to half marathon pace</p>
          <div className="flex items-center gap-2">
            <div className="flex-1 h-12 rounded-xl bg-gradient-to-r from-[#BFFF00] to-[#9ACC00] flex items-center justify-center gap-2 text-sm font-bold text-black group-hover:shadow-lg group-hover:shadow-[#BFFF00]/20 transition-all">
              <Play className="w-4 h-4" fill="currentColor" />
              Start Run
            </div>
          </div>
        </Link>
      </motion.div>

      {/* Quick Stats Row */}
      <motion.div {...fadeUp(2)} className="grid grid-cols-3 gap-3 mb-4">
        <Link href="/(app)/plan" className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
          <Calendar className="w-4 h-4 text-white/30 mb-2" />
          <p className="text-2xl font-bold">{daysUntil}</p>
          <p className="text-[10px] text-white/40 uppercase mt-0.5">Days to Race</p>
        </Link>
        <Link href="/(app)/profile" className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
          <Flame className="w-4 h-4 text-orange-400 mb-2" />
          <p className="text-2xl font-bold text-[#BFFF00]">{currentUser.streak}</p>
          <p className="text-[10px] text-white/40 uppercase mt-0.5">Day Streak</p>
        </Link>
        <Link href="/(app)/predictions" className="p-4 rounded-xl bg-gradient-to-br from-[#BFFF00]/8 to-[#00E5FF]/5 border border-white/[0.06]">
          <TrendingUp className="w-4 h-4 text-[#00E5FF] mb-2" />
          <p className="text-2xl font-bold">{currentUser.predictedHalf.split(":").slice(0, 2).join(":")}</p>
          <p className="text-[10px] text-white/40 uppercase mt-0.5">Half Pred.</p>
        </Link>
      </motion.div>

      {/* AI Coach Message */}
      <motion.div {...fadeUp(3)} className="p-4 rounded-xl bg-gradient-to-r from-[#BFFF00]/8 to-transparent border border-white/[0.06] mb-4">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#BFFF00]/15 flex items-center justify-center shrink-0 mt-0.5">
            <Zap className="w-4 h-4 text-[#BFFF00]" />
          </div>
          <div>
            <p className="text-xs text-[#BFFF00] font-medium mb-1">AI Coach</p>
            <p className="text-sm text-white/70 leading-relaxed">{coachMessages[0]}</p>
          </div>
        </div>
      </motion.div>

      {/* Runner Persona Card */}
      <motion.div {...fadeUp(4)}>
        <Link href="/(app)/persona" className="block p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] mb-4 group">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl">⚡</span>
              <div>
                <p className="font-semibold text-sm">{currentUser.persona}</p>
                <p className="text-xs text-white/40">You finish stronger than you start</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-white/20 group-hover:text-white/40 transition-colors" />
          </div>
        </Link>
      </motion.div>

      {/* Latest Run Recap */}
      <motion.div {...fadeUp(5)}>
        <Link href="/(app)/recap" className="block p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] mb-4 group">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-white/40 uppercase tracking-wider">Latest Run</span>
            <span className="text-xs text-[#BFFF00]">Share →</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#BFFF00]/20 to-[#00E5FF]/10 flex items-center justify-center">
              <Zap className="w-6 h-6 text-[#BFFF00]" />
            </div>
            <div className="flex-1">
              <p className="font-semibold">{latestRun.distance} mi · Tempo</p>
              <p className="text-sm text-white/40">{latestRun.pace}/mi · {Math.floor(latestRun.duration / 60)}:{(latestRun.duration % 60).toString().padStart(2, "0")}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-white/30">Today</p>
              <p className="text-xs text-[#BFFF00]">Effort {latestRun.effortScore}</p>
            </div>
          </div>
        </Link>
      </motion.div>

      {/* Runner Aura */}
      <motion.div {...fadeUp(6)}>
        <Link href="/(app)/aura" className="block p-5 rounded-xl relative overflow-hidden mb-4 group">
          <div className="absolute inset-0 bg-gradient-to-br from-[#BFFF00]/10 via-[#00E5FF]/8 to-[#8B5CF6]/10" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(191,255,0,0.15)_0%,transparent_60%)]" />
          <div className="relative flex items-center justify-between">
            <div>
              <p className="text-xs text-white/50 uppercase tracking-wider mb-1">Your Aura</p>
              <p className="font-bold text-lg">Momentum: High</p>
              <p className="text-xs text-[#BFFF00] mt-0.5">Consistency glow active</p>
            </div>
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#BFFF00]/30 to-[#00E5FF]/20 blur-sm" />
          </div>
        </Link>
      </motion.div>

      {/* Upcoming Club Run */}
      <motion.div {...fadeUp(7)}>
        <Link href="/(app)/discover" className="block p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] group">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-white/40 uppercase tracking-wider">Nearby this weekend</span>
            <ChevronRight className="w-4 h-4 text-white/20 group-hover:text-white/40 transition-colors" />
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-white/[0.05] flex items-center justify-center text-lg">
              {runClubs[0].image}
            </div>
            <div>
              <p className="font-semibold text-sm">{runClubs[0].name}</p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <MapPin className="w-3 h-3 text-white/30" />
                <span className="text-xs text-white/40">{runClubs[0].nextRun} · {runClubs[0].distance}</span>
              </div>
            </div>
          </div>
        </Link>
      </motion.div>

      {/* Motivation */}
      <motion.div {...fadeUp(8)} className="mt-6 text-center">
        <p className="text-sm text-white/20 italic">&quot;Today&apos;s run matters.&quot;</p>
      </motion.div>
    </div>
  );
}
