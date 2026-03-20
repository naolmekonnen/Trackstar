"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Zap, Flame, TrendingUp, ChevronRight, Play,
  Calendar, MapPin, Heart, MessageCircle, Share2,
  Clock, Award
} from "lucide-react";
import { currentUser, getDaysUntilRace, recentRuns, coachMessages, runClubs, formatDuration } from "@/lib/mock-data";

const today = new Date("2026-03-20");
const weekDays = ["M", "T", "W", "T", "F", "S", "S"];
const weekDates = Array.from({ length: 7 }, (_, i) => {
  const d = new Date(today);
  d.setDate(today.getDate() - today.getDay() + 1 + i);
  return { day: weekDays[i], date: d.getDate(), active: i < 5, isToday: d.getDate() === today.getDate() };
});

const stagger = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

export default function HomePage() {
  const daysUntil = getDaysUntilRace();

  return (
    <div className="max-w-lg mx-auto">
      {/* Streak Section */}
      <motion.div {...stagger} transition={{ delay: 0.05 }} className="px-4 pt-4">
        <div className="p-4 rounded-2xl glass-card">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#BFFF00]/15 flex items-center justify-center">
                <Flame className="w-4 h-4 text-[#BFFF00]" />
              </div>
              <div>
                <p className="text-sm font-semibold">Your Streak</p>
                <p className="text-[11px] text-white/40">{currentUser.streak} days — keep it going</p>
              </div>
            </div>
            <Link href="/run" className="text-xs text-[#BFFF00] font-medium">Record now</Link>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 mr-3">
              <div className="text-center mr-1">
                <p className="text-xl font-bold text-[#BFFF00]">{currentUser.streak}</p>
                <p className="text-[9px] text-white/30 uppercase">Weeks</p>
              </div>
            </div>
            <div className="flex-1 flex justify-between">
              {weekDates.map((d, i) => (
                <div key={i} className="flex flex-col items-center gap-1">
                  <span className="text-[10px] text-white/30">{d.day}</span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-all ${
                    d.isToday
                      ? "ring-2 ring-[#BFFF00] text-white"
                      : d.active
                      ? "bg-[#BFFF00]/15 text-[#BFFF00]"
                      : "text-white/25"
                  }`}>
                    {d.date}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Today's Workout Card */}
      <motion.div {...stagger} transition={{ delay: 0.1 }} className="px-4 pt-3">
        <Link href="/plan" className="block">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#BFFF00]/[0.08] to-[#00E5FF]/[0.04] border border-[#BFFF00]/10 p-4">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#BFFF00]/[0.06] rounded-full blur-2xl -mr-6 -mt-6" />
            <div className="relative flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-[#BFFF00]/20 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-[#BFFF00]" />
                </div>
                <div>
                  <p className="text-[10px] text-[#BFFF00] font-semibold uppercase tracking-wider">Today</p>
                  <p className="text-[15px] font-bold">Tempo Run · 6 mi</p>
                  <p className="text-[11px] text-white/40 mt-0.5">7:45–8:00/mi target</p>
                </div>
              </div>
              <Link href="/run">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-11 h-11 rounded-full bg-[#BFFF00] flex items-center justify-center shadow-lg shadow-[#BFFF00]/20"
                >
                  <Play className="w-4 h-4 text-black ml-0.5" fill="currentColor" />
                </motion.div>
              </Link>
            </div>
          </div>
        </Link>
      </motion.div>

      {/* Quick Stats Bar */}
      <motion.div {...stagger} transition={{ delay: 0.15 }} className="px-4 pt-3">
        <div className="flex gap-2">
          <Link href="/predictions" className="flex-1 p-3 rounded-xl glass-card hover:bg-white/[0.05] transition-colors">
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp className="w-3.5 h-3.5 text-[#00E5FF]" />
              <span className="text-[10px] text-white/35 uppercase tracking-wide">Prediction</span>
            </div>
            <p className="text-lg font-bold tracking-tight">{currentUser.predictedHalf}</p>
            <p className="text-[10px] text-[#BFFF00]">Half Marathon</p>
          </Link>
          <Link href="/aura" className="flex-1 p-3 rounded-xl glass-card hover:bg-white/[0.05] transition-colors">
            <div className="flex items-center gap-2 mb-1">
              <Award className="w-3.5 h-3.5 text-[#BFFF00]" />
              <span className="text-[10px] text-white/35 uppercase tracking-wide">Score</span>
            </div>
            <p className="text-lg font-bold tracking-tight">{currentUser.runnerScore}</p>
            <p className="text-[10px] text-[#BFFF00]">+{currentUser.runnerScoreChange} this week</p>
          </Link>
          <Link href="/plan" className="flex-1 p-3 rounded-xl glass-card hover:bg-white/[0.05] transition-colors">
            <div className="flex items-center gap-2 mb-1">
              <Calendar className="w-3.5 h-3.5 text-white/35" />
              <span className="text-[10px] text-white/35 uppercase tracking-wide">Race</span>
            </div>
            <p className="text-lg font-bold tracking-tight">{daysUntil}</p>
            <p className="text-[10px] text-white/40">days out</p>
          </Link>
        </div>
      </motion.div>

      {/* AI Coach */}
      <motion.div {...stagger} transition={{ delay: 0.2 }} className="px-4 pt-3">
        <div className="p-3.5 rounded-xl bg-gradient-to-r from-[#BFFF00]/[0.06] to-transparent border border-[#BFFF00]/[0.08]">
          <div className="flex items-start gap-3">
            <div className="w-7 h-7 rounded-lg bg-[#BFFF00]/15 flex items-center justify-center shrink-0 mt-0.5">
              <Zap className="w-3.5 h-3.5 text-[#BFFF00]" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[10px] text-[#BFFF00] font-semibold uppercase tracking-wider mb-0.5">AI Coach</p>
              <p className="text-[13px] text-white/65 leading-relaxed">{coachMessages[0]}</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Divider */}
      <div className="h-px bg-white/[0.04] mx-4 my-4" />

      {/* Activity Feed */}
      <div className="px-4">
        <div className="flex items-center justify-between mb-3">
          <p className="text-[13px] font-semibold text-white/50 uppercase tracking-wider">Recent Activity</p>
        </div>

        {/* Your Recent Run — Featured */}
        <motion.div {...stagger} transition={{ delay: 0.25 }}>
          <ActivityCard
            userName={currentUser.name}
            avatar="AR"
            isUser
            timestamp="Today at 7:12 AM"
            location="Prospect Park, Brooklyn"
            title="Morning Tempo Run"
            distance={recentRuns[0].distance}
            pace={recentRuns[0].pace}
            time={formatDuration(recentRuns[0].duration)}
            effort={recentRuns[0].effortScore}
            likes={23}
            comments={4}
            runType={recentRuns[0].type}
            achievement="Fastest tempo in 5 weeks"
          />
        </motion.div>

        {/* Friend Activity */}
        <motion.div {...stagger} transition={{ delay: 0.3 }}>
          <ActivityCard
            userName="Jordan Chen"
            avatar="JC"
            timestamp="2h ago"
            location="Central Park, Manhattan"
            title="Morning Tempo"
            distance={7.2}
            pace="7:35"
            time="54:36"
            likes={14}
            comments={3}
            runType="tempo"
          />
        </motion.div>

        <motion.div {...stagger} transition={{ delay: 0.35 }}>
          <ActivityCard
            userName="Lena Park"
            avatar="LP"
            timestamp="3h ago"
            location="Hudson River Greenway"
            title="Long Run"
            distance={12.4}
            pace="8:15"
            time="1:42:18"
            likes={32}
            comments={8}
            runType="long"
            achievement="21 day streak 🔥"
          />
        </motion.div>
      </div>

      {/* Persona Card */}
      <motion.div {...stagger} transition={{ delay: 0.4 }} className="px-4 pt-2">
        <Link href="/persona" className="block p-4 rounded-2xl glass-card group relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#BFFF00]/[0.04] to-[#00E5FF]/[0.03]" />
          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl">⚡</span>
              <div>
                <p className="text-[10px] text-white/35 uppercase tracking-wider">Your Persona</p>
                <p className="text-[15px] font-bold">{currentUser.persona}</p>
                <p className="text-[11px] text-white/40">You finish stronger than you start</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-white/20 group-hover:text-white/40 transition-colors" />
          </div>
        </Link>
      </motion.div>

      {/* Nearby Run Clubs */}
      <motion.div {...stagger} transition={{ delay: 0.45 }} className="pt-5 pb-4">
        <div className="px-4 flex items-center justify-between mb-3">
          <p className="text-[13px] font-semibold text-white/50 uppercase tracking-wider">Run Clubs Near You</p>
          <Link href="/discover" className="text-xs text-[#BFFF00] font-medium">See All</Link>
        </div>
        <div className="flex gap-3 overflow-x-auto hide-scrollbar px-4">
          {runClubs.slice(0, 4).map((club) => (
            <Link key={club.id} href="/discover" className="shrink-0 w-[200px]">
              <div className="p-3.5 rounded-xl glass-card hover:bg-white/[0.05] transition-all">
                <div className="flex items-center gap-2.5 mb-2.5">
                  <div className="w-10 h-10 rounded-xl bg-white/[0.05] flex items-center justify-center text-lg">
                    {club.image}
                  </div>
                  <div className="min-w-0">
                    <p className="text-[13px] font-semibold truncate">{club.name}</p>
                    <p className="text-[10px] text-white/35">{club.members} members</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 mb-1.5">
                  <Clock className="w-3 h-3 text-white/25" />
                  <span className="text-[11px] text-white/50">{club.nextRun}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-white/25" />
                  <span className="text-[11px] text-white/35">{club.pace}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </motion.div>

      {/* Suggested Challenges */}
      <motion.div {...stagger} transition={{ delay: 0.5 }} className="px-4 pb-8">
        <div className="flex items-center justify-between mb-3">
          <p className="text-[13px] font-semibold text-white/50 uppercase tracking-wider">Suggested Challenges</p>
          <Link href="/social" className="text-xs text-[#BFFF00] font-medium">See All</Link>
        </div>
        <div className="p-4 rounded-2xl glass-card">
          <p className="text-[12px] text-white/40 mb-3">Make accountability easier and more fun.</p>
          {[
            { emoji: "🏆", title: "Weekend Warriors", desc: "20+ miles this weekend", joined: "12 friends joined" },
            { emoji: "⚡", title: "Speed Week", desc: "Fastest 5K this week wins", joined: "8 friends joined" },
          ].map(ch => (
            <div key={ch.title} className="flex items-center gap-3 py-2.5 border-t border-white/[0.04] first:border-0 first:pt-0">
              <span className="text-xl">{ch.emoji}</span>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-semibold">{ch.title}</p>
                <p className="text-[11px] text-white/35">{ch.desc} · {ch.joined}</p>
              </div>
              <button className="px-3 py-1.5 rounded-full bg-[#BFFF00]/10 border border-[#BFFF00]/20 text-[11px] text-[#BFFF00] font-semibold hover:bg-[#BFFF00]/20 transition-colors">
                Join
              </button>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

function ActivityCard({
  userName, avatar, isUser, timestamp, location, title,
  distance, pace, time, effort, likes, comments, achievement,
}: {
  userName: string; avatar: string; isUser?: boolean; timestamp: string;
  location: string; title: string; distance: number; pace: string;
  time: string; effort?: number; likes: number; comments: number;
  runType?: string; achievement?: string;
}) {
  return (
    <div className="mb-4 rounded-2xl glass-card overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 pb-3">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold ${
          isUser
            ? "bg-gradient-to-br from-[#BFFF00]/80 to-[#00E5FF]/60 text-black"
            : "bg-white/[0.08] text-white/60"
        }`}>
          {avatar}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[13px] font-semibold">{userName}</p>
          <p className="text-[11px] text-white/35">{timestamp} · <MapPin className="w-3 h-3 inline -mt-0.5" /> {location}</p>
        </div>
      </div>

      {/* Title */}
      <div className="px-4 pb-3">
        <p className="text-[16px] font-bold">{title}</p>
      </div>

      {/* Stats Row */}
      <div className="px-4 pb-3 flex gap-6">
        <div>
          <p className="text-[11px] text-white/35">Distance</p>
          <p className="text-[15px] font-bold">{distance} mi</p>
        </div>
        <div>
          <p className="text-[11px] text-white/35">Pace</p>
          <p className="text-[15px] font-bold">{pace}/mi</p>
        </div>
        <div>
          <p className="text-[11px] text-white/35">Time</p>
          <p className="text-[15px] font-bold">{time}</p>
        </div>
        {effort && (
          <div>
            <p className="text-[11px] text-white/35">Effort</p>
            <p className="text-[15px] font-bold text-[#BFFF00]">{effort}</p>
          </div>
        )}
      </div>

      {/* Achievement Badge */}
      {achievement && (
        <div className="mx-4 mb-3 px-3 py-2 rounded-lg bg-[#BFFF00]/[0.06] border border-[#BFFF00]/10 flex items-center gap-2">
          <Award className="w-3.5 h-3.5 text-[#BFFF00]" />
          <span className="text-[12px] text-[#BFFF00] font-medium">{achievement}</span>
        </div>
      )}

      {/* Route Map */}
      <div className="mx-4 mb-3 h-36 rounded-xl bg-[#0f1118] border border-white/[0.04] overflow-hidden relative">
        <div className="absolute inset-0 opacity-40">
          <svg viewBox="0 0 400 160" className="w-full h-full" preserveAspectRatio="none">
            <defs>
              <linearGradient id={`route-${avatar}`} x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#BFFF00" />
                <stop offset="100%" stopColor="#00E5FF" />
              </linearGradient>
            </defs>
            <path
              d={`M20,120 Q60,30 120,80 T220,50 T320,90 T380,40`}
              fill="none"
              stroke={`url(#route-${avatar})`}
              strokeWidth="3"
              strokeLinecap="round"
            />
            <circle cx="20" cy="120" r="5" fill="#BFFF00" />
            <circle cx="380" cy="40" r="5" fill="#00E5FF" />
          </svg>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f1118] via-transparent to-transparent" />
        <div className="absolute bottom-2 left-3 text-[10px] text-white/25 flex items-center gap-1">
          <MapPin className="w-3 h-3" /> {location}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1 px-4 py-3 border-t border-white/[0.04]">
        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:bg-white/[0.04] transition-colors">
          <Heart className="w-4 h-4 text-white/40" />
          <span className="text-[12px] text-white/40 font-medium">{likes}</span>
        </button>
        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:bg-white/[0.04] transition-colors">
          <MessageCircle className="w-4 h-4 text-white/40" />
          <span className="text-[12px] text-white/40 font-medium">{comments}</span>
        </button>
        <div className="flex-1" />
        <Link href="/recap" className="flex items-center gap-1 px-3 py-1.5 rounded-full hover:bg-white/[0.04] transition-colors">
          <Share2 className="w-4 h-4 text-white/40" />
        </Link>
      </div>
    </div>
  );
}
