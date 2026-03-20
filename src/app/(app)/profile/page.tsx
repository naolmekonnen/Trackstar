"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Settings, Share2, MapPin, Flame, Trophy,
  Calendar, TrendingUp, Award, Watch, Users, ChevronRight
} from "lucide-react";
import { currentUser, recentRuns, weeklyStats } from "@/lib/mock-data";

export default function ProfilePage() {
  return (
    <div className="px-5 pt-14 pb-4 max-w-lg mx-auto">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Profile</h1>
          <Link href="/settings" className="w-9 h-9 rounded-full bg-white/[0.05] flex items-center justify-center">
            <Settings className="w-4 h-4 text-white/40" />
          </Link>
        </div>

        {/* Profile Card */}
        <div className="relative overflow-hidden rounded-2xl bg-white/[0.03] border border-white/[0.06] p-6 mb-6">
          <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-[#BFFF00]/8 to-transparent rounded-full -mr-10 -mt-10" />
          <div className="relative flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#BFFF00] to-[#00E5FF] flex items-center justify-center text-lg font-bold text-black">
              {currentUser.avatar}
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold">{currentUser.name}</h2>
              <div className="flex items-center gap-1.5 mt-1">
                <MapPin className="w-3 h-3 text-white/30" />
                <span className="text-sm text-white/40">{currentUser.location}</span>
              </div>
              <p className="text-xs text-white/30 mt-0.5">Member since {currentUser.memberSince}</p>
            </div>
          </div>

          {/* Persona & Score */}
          <div className="flex gap-3 mt-5">
            <Link href="/persona" className="flex-1 p-3 rounded-xl bg-white/[0.04] border border-white/[0.06]">
              <div className="flex items-center gap-2">
                <span className="text-lg">⚡</span>
                <div>
                  <p className="text-xs font-semibold">{currentUser.persona}</p>
                  <p className="text-[10px] text-white/30">Your persona</p>
                </div>
              </div>
            </Link>
            <Link href="/aura" className="flex-1 p-3 rounded-xl bg-gradient-to-r from-[#BFFF00]/8 to-[#00E5FF]/5 border border-white/[0.06]">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#BFFF00]/40 to-[#00E5FF]/30 flex items-center justify-center text-xs font-bold">
                  {currentUser.runnerScore}
                </div>
                <div>
                  <p className="text-xs font-semibold">Runner Score</p>
                  <p className="text-[10px] text-[#BFFF00]">+{currentUser.runnerScoreChange} this week</p>
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-4 gap-2 mb-6">
          {[
            { icon: Flame, label: "Streak", value: `${currentUser.streak}d`, color: "text-orange-400" },
            { icon: TrendingUp, label: "Total Runs", value: currentUser.totalRuns, color: "text-[#BFFF00]" },
            { icon: MapPin, label: "Total Miles", value: `${currentUser.totalMiles}`, color: "text-[#00E5FF]" },
            { icon: Trophy, label: "Best Half", value: currentUser.bestHalf.split(":").slice(0, 2).join(":"), color: "text-white" },
          ].map(stat => (
            <div key={stat.label} className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.04] text-center">
              <stat.icon className={`w-4 h-4 mx-auto mb-1 ${stat.color}`} />
              <p className="text-lg font-bold">{stat.value}</p>
              <p className="text-[9px] text-white/30 uppercase">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Goals */}
        <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] mb-6">
          <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-white/40" /> Current Goal
          </h3>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">{currentUser.raceName}</p>
              <p className="text-xs text-white/40">May 17, 2026 · Half Marathon</p>
            </div>
            <Link href="/predictions" className="text-xs text-[#BFFF00]">
              Prediction →
            </Link>
          </div>
        </div>

        {/* Weekly Progress Chart */}
        <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] mb-6">
          <h3 className="text-sm font-semibold mb-4">Weekly Progress</h3>
          <div className="flex items-end gap-1 h-20">
            {weeklyStats.map((week, i) => (
              <div key={week.week} className="flex-1 flex flex-col items-center gap-1">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${(week.miles / 35) * 100}%` }}
                  transition={{ delay: i * 0.05, duration: 0.4 }}
                  className={`w-full rounded-t-md ${
                    i === weeklyStats.length - 1
                      ? "bg-gradient-to-t from-[#BFFF00] to-[#BFFF00]/60"
                      : "bg-white/[0.08]"
                  }`}
                />
                <span className="text-[8px] text-white/30">{week.week}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-[10px] text-white/30">
            <span>8 weeks ago</span>
            <span>This week: {weeklyStats[weeklyStats.length - 1].miles} mi</span>
          </div>
        </div>

        {/* Best Times */}
        <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] mb-6">
          <h3 className="text-sm font-semibold mb-3">Personal Bests</h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              { race: "5K", time: "22:48" },
              { race: "10K", time: "47:22" },
              { race: "Half Marathon", time: "1:52:14" },
              { race: "Marathon", time: "—" },
            ].map(pb => (
              <div key={pb.race} className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                <p className="text-xs text-white/40 mb-0.5">{pb.race}</p>
                <p className="text-lg font-bold">{pb.time}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Recaps */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold">Recent Recaps</h3>
            <Link href="/recap" className="text-xs text-[#BFFF00]">View all</Link>
          </div>
          <div className="flex gap-3 overflow-x-auto hide-scrollbar">
            {recentRuns.map(run => (
              <Link key={run.id} href="/recap" className="shrink-0 w-32 rounded-xl bg-gradient-to-b from-white/[0.04] to-white/[0.02] border border-white/[0.06] p-3 hover:border-white/[0.1] transition-all">
                <div className="h-16 rounded-lg bg-gradient-to-br from-[#BFFF00]/10 to-[#00E5FF]/5 mb-2 flex items-center justify-center">
                  <svg viewBox="0 0 100 50" className="w-16 opacity-40">
                    <path d="M5,35 Q15,5 35,25 T65,15 T95,30" fill="none" stroke="#BFFF00" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>
                <p className="text-xs font-semibold">{run.distance} mi</p>
                <p className="text-[10px] text-white/30">{run.pace}/mi</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Badges */}
        <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] mb-6">
          <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
            <Award className="w-4 h-4 text-[#BFFF00]" /> Badges
          </h3>
          <div className="flex flex-wrap gap-2">
            {currentUser.badges.map(badge => (
              <span key={badge} className="px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.06] text-xs text-white/60">
                {badge}
              </span>
            ))}
          </div>
        </div>

        {/* Connected Devices */}
        <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] mb-6">
          <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
            <Watch className="w-4 h-4 text-white/40" /> Connected Devices
          </h3>
          <div className="space-y-2">
            {currentUser.connectedDevices.map(device => (
              <div key={device} className="flex items-center justify-between py-2">
                <span className="text-sm">{device}</span>
                <span className="text-[10px] text-[#BFFF00]">Connected</span>
              </div>
            ))}
          </div>
        </div>

        {/* Clubs */}
        <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
          <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
            <Users className="w-4 h-4 text-white/40" /> Your Clubs
          </h3>
          {currentUser.clubs.map(club => (
            <Link key={club} href="/discover" className="flex items-center justify-between py-2 group">
              <span className="text-sm">{club}</span>
              <ChevronRight className="w-4 h-4 text-white/20 group-hover:text-white/40 transition-colors" />
            </Link>
          ))}
        </div>

        {/* Share Profile */}
        <button className="w-full mt-6 h-12 rounded-xl bg-white/[0.05] border border-white/[0.06] flex items-center justify-center gap-2 text-sm font-medium text-white/60">
          <Share2 className="w-4 h-4" /> Share Profile
        </button>
      </motion.div>
    </div>
  );
}
