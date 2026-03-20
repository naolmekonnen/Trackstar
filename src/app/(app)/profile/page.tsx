"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Settings, Share2, MapPin, Flame, Trophy,
  Award, Watch, Users, ChevronRight,
  BarChart2
} from "lucide-react";
import { currentUser, recentRuns, weeklyStats } from "@/lib/mock-data";

export default function ProfilePage() {
  return (
    <div className="max-w-lg mx-auto pb-8">
      {/* Profile Header */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative"
      >
        {/* Banner */}
        <div className="h-28 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#BFFF00]/15 via-[#00E5FF]/8 to-[#8B5CF6]/10" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#08080A] to-transparent" />
        </div>

        {/* Avatar + Name */}
        <div className="px-4 -mt-10 relative z-10">
          <div className="flex items-end gap-4">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#BFFF00] to-[#00E5FF] flex items-center justify-center text-xl font-bold text-black ring-4 ring-[#08080A]">
              {currentUser.avatar}
            </div>
            <div className="flex-1 pb-1">
              <h1 className="text-xl font-bold">{currentUser.name}</h1>
              <div className="flex items-center gap-1.5 mt-0.5">
                <MapPin className="w-3 h-3 text-white/30" />
                <span className="text-[12px] text-white/40">{currentUser.location}</span>
              </div>
            </div>
            <div className="flex gap-2 pb-1">
              <Link href="/settings" className="w-8 h-8 rounded-full bg-white/[0.06] flex items-center justify-center">
                <Settings className="w-4 h-4 text-white/40" />
              </Link>
              <button className="w-8 h-8 rounded-full bg-white/[0.06] flex items-center justify-center">
                <Share2 className="w-4 h-4 text-white/40" />
              </button>
            </div>
          </div>

          {/* Persona & Score Chips */}
          <div className="flex gap-2 mt-3">
            <Link href="/persona" className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.06] hover:bg-white/[0.06] transition-colors">
              <span className="text-sm">⚡</span>
              <span className="text-[12px] font-semibold">{currentUser.persona}</span>
            </Link>
            <Link href="/aura" className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#BFFF00]/[0.06] border border-[#BFFF00]/10 hover:bg-[#BFFF00]/10 transition-colors">
              <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#BFFF00]/50 to-[#00E5FF]/40 flex items-center justify-center text-[9px] font-bold">{currentUser.runnerScore}</div>
              <span className="text-[12px] font-semibold text-[#BFFF00]">Score</span>
            </Link>
            <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.06]">
              <Flame className="w-3.5 h-3.5 text-orange-400" />
              <span className="text-[12px] font-semibold">{currentUser.streak}d</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="px-4 mt-5"
      >
        <div className="grid grid-cols-4 gap-px rounded-xl overflow-hidden bg-white/[0.04]">
          {[
            { label: "Runs", value: currentUser.totalRuns },
            { label: "Miles", value: currentUser.totalMiles.toLocaleString() },
            { label: "Streak", value: `${currentUser.streak}d` },
            { label: "Clubs", value: currentUser.clubs.length },
          ].map(stat => (
            <div key={stat.label} className="bg-[#08080A] p-3 text-center">
              <p className="text-[16px] font-bold">{stat.value}</p>
              <p className="text-[10px] text-white/30 uppercase mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Weekly Progress */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="px-4 mt-4"
      >
        <div className="p-4 rounded-2xl glass-card">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-[13px] font-semibold flex items-center gap-2">
              <BarChart2 className="w-4 h-4 text-white/40" /> Training Progress
            </h3>
            <span className="text-[11px] text-white/30">Last 8 weeks</span>
          </div>
          <div className="flex items-end gap-1.5 h-20 mb-2">
            {weeklyStats.map((w, i) => (
              <div key={w.week} className="flex-1 flex flex-col items-center gap-1">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${(w.miles / 35) * 100}%` }}
                  transition={{ delay: 0.2 + i * 0.04, duration: 0.5 }}
                  className={`w-full rounded-t-sm ${
                    i === weeklyStats.length - 1
                      ? "bg-gradient-to-t from-[#BFFF00] to-[#BFFF00]/50"
                      : "bg-white/[0.07]"
                  }`}
                />
              </div>
            ))}
          </div>
          <div className="flex justify-between text-[9px] text-white/20">
            {weeklyStats.map(w => <span key={w.week}>{w.week}</span>)}
          </div>
          <div className="flex justify-between items-center mt-2 pt-2 border-t border-white/[0.04]">
            <span className="text-[11px] text-white/35">This week</span>
            <span className="text-[13px] font-bold">{weeklyStats[weeklyStats.length - 1].miles} mi</span>
          </div>
        </div>
      </motion.div>

      {/* Personal Bests */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="px-4 mt-4"
      >
        <div className="p-4 rounded-2xl glass-card">
          <h3 className="text-[13px] font-semibold mb-3 flex items-center gap-2">
            <Trophy className="w-4 h-4 text-[#BFFF00]" /> Personal Bests
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {[
              { race: "5K", time: "22:48", pace: "7:20/mi" },
              { race: "10K", time: "47:22", pace: "7:38/mi" },
              { race: "Half Marathon", time: "1:52:14", pace: "8:35/mi" },
              { race: "Marathon", time: "—", pace: "—" },
            ].map(pb => (
              <div key={pb.race} className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                <p className="text-[10px] text-white/30 uppercase">{pb.race}</p>
                <p className="text-[17px] font-bold mt-0.5">{pb.time}</p>
                <p className="text-[10px] text-white/25 mt-0.5">{pb.pace}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Current Goal */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="px-4 mt-4"
      >
        <Link href="/predictions" className="block p-4 rounded-2xl bg-gradient-to-r from-[#BFFF00]/[0.05] to-[#00E5FF]/[0.03] border border-[#BFFF00]/10 group">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] text-[#BFFF00] font-semibold uppercase tracking-wider">Current Goal</p>
              <p className="text-[15px] font-bold mt-0.5">{currentUser.raceName}</p>
              <p className="text-[11px] text-white/35 mt-0.5">May 17, 2026 · Predicted: {currentUser.predictedHalf}</p>
            </div>
            <ChevronRight className="w-4 h-4 text-white/20 group-hover:text-white/40 transition-colors" />
          </div>
        </Link>
      </motion.div>

      {/* Recent Recaps */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-5"
      >
        <div className="px-4 flex items-center justify-between mb-3">
          <p className="text-[12px] font-semibold text-white/45 uppercase tracking-wider">Recent Activities</p>
          <Link href="/run" className="text-[11px] text-[#BFFF00] font-medium">View All</Link>
        </div>
        <div className="flex gap-3 overflow-x-auto hide-scrollbar px-4">
          {recentRuns.map(run => (
            <Link key={run.id} href="/run" className="shrink-0 w-[160px]">
              <div className="rounded-xl glass-card overflow-hidden hover:bg-white/[0.04] transition-all">
                <div className="h-20 bg-[#0d1117] relative overflow-hidden">
                  <svg viewBox="0 0 160 80" className="w-full h-full opacity-40">
                    <path d="M10,60 Q30,15 60,45 T120,25 T150,50" fill="none" stroke="#BFFF00" strokeWidth="2" strokeLinecap="round" />
                    <circle cx="10" cy="60" r="3" fill="#BFFF00" />
                    <circle cx="150" cy="50" r="3" fill="#00E5FF" />
                  </svg>
                </div>
                <div className="p-3">
                  <p className="text-[12px] font-semibold capitalize">{run.type} Run</p>
                  <p className="text-[13px] font-bold mt-0.5">{run.distance} mi · {run.pace}</p>
                  <p className="text-[10px] text-white/25 mt-0.5">
                    {run.date === "2026-03-20" ? "Today" : run.date === "2026-03-18" ? "2d ago" : "5d ago"}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </motion.div>

      {/* Badges */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="px-4 mt-5"
      >
        <div className="p-4 rounded-2xl glass-card">
          <h3 className="text-[13px] font-semibold mb-3 flex items-center gap-2">
            <Award className="w-4 h-4 text-[#BFFF00]" /> Badges
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {currentUser.badges.map(badge => (
              <span key={badge} className="px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.05] text-[11px] text-white/50">
                {badge}
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Connected Devices + Clubs */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="px-4 mt-4 space-y-3"
      >
        <div className="rounded-2xl glass-card overflow-hidden divide-y divide-white/[0.04]">
          <div className="p-4">
            <h3 className="text-[12px] font-semibold text-white/45 uppercase tracking-wider mb-2.5">Connected Devices</h3>
            {currentUser.connectedDevices.map(d => (
              <div key={d} className="flex items-center justify-between py-1.5">
                <div className="flex items-center gap-2">
                  <Watch className="w-3.5 h-3.5 text-white/25" />
                  <span className="text-[13px]">{d}</span>
                </div>
                <span className="text-[10px] text-[#BFFF00] font-medium">Synced</span>
              </div>
            ))}
          </div>
          <div className="p-4">
            <h3 className="text-[12px] font-semibold text-white/45 uppercase tracking-wider mb-2.5">Your Clubs</h3>
            {currentUser.clubs.map(c => (
              <Link key={c} href="/discover" className="flex items-center justify-between py-1.5 group">
                <div className="flex items-center gap-2">
                  <Users className="w-3.5 h-3.5 text-white/25" />
                  <span className="text-[13px]">{c}</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-white/15 group-hover:text-white/30 transition-colors" />
              </Link>
            ))}
          </div>
        </div>

        <p className="text-center text-[10px] text-white/15 mt-4">Member since September 2025</p>
      </motion.div>
    </div>
  );
}
