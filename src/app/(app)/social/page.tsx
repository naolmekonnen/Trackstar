"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  Heart, MessageCircle, Share2, Trophy,
  Flame, Users, Send, Award
} from "lucide-react";
import { feedItems, friends, currentUser } from "@/lib/mock-data";

const challenges = [
  { title: "Weekend Warriors", desc: "Most miles Sat–Sun", participants: 12, timeLeft: "2d", emoji: "🏆", prize: "Badge + bragging rights" },
  { title: "Speed Demon", desc: "Fastest 5K this week", participants: 8, timeLeft: "5d", emoji: "⚡", prize: "Persona boost" },
  { title: "Streak Battle", desc: "Longest active streak", participants: 15, timeLeft: "∞", emoji: "🔥", prize: "Streak crown" },
];

const nudges = [
  "You're behind this week. 👀",
  "Catch me if you can. 🏃",
  "Still sleeping on your long run?",
  "My easy pace > your race pace 😤",
];

export default function SocialPage() {
  const [tab, setTab] = useState<"feed" | "friends" | "challenges">("feed");
  const [liked, setLiked] = useState<Set<string>>(new Set(feedItems.filter(f => f.liked).map(f => f.id)));

  const toggleLike = (id: string) => {
    setLiked(prev => {
      const next = new Set(prev);
      if (next.has(id)) { next.delete(id); } else { next.add(id); }
      return next;
    });
  };

  return (
    <div className="max-w-lg mx-auto">
      {/* Tabs */}
      <div className="px-4 pt-3 pb-2 sticky top-14 z-40 bg-[#08080A]/95 backdrop-blur-2xl">
        <div className="flex gap-1 p-1 rounded-xl bg-white/[0.03]">
          {(["feed", "friends", "challenges"] as const).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 py-2 rounded-lg text-[12px] font-medium capitalize transition-all ${
                tab === t ? "bg-white/[0.08] text-white" : "text-white/35"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {/* Feed */}
        {tab === "feed" && (
          <motion.div key="feed" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="px-4 pt-2 pb-8">
            {/* Who to Follow */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-3">
                <p className="text-[12px] font-semibold text-white/45 uppercase tracking-wider">Who to Follow</p>
                <button className="text-[11px] text-[#BFFF00] font-medium">See All</button>
              </div>
              <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-1">
                {friends.slice(0, 4).map(f => (
                  <div key={f.id} className="shrink-0 w-[140px] p-3 rounded-xl glass-card text-center">
                    <div className="w-12 h-12 rounded-full bg-white/[0.06] flex items-center justify-center text-sm font-bold mx-auto mb-2">
                      {f.avatar}
                    </div>
                    <p className="text-[12px] font-semibold truncate">{f.name}</p>
                    <p className="text-[10px] text-white/30 mb-2.5">{f.persona}</p>
                    <div className="flex gap-1.5">
                      <button className="flex-1 py-1.5 rounded-lg bg-[#BFFF00]/15 text-[10px] text-[#BFFF00] font-semibold hover:bg-[#BFFF00]/20 transition-colors">
                        Follow
                      </button>
                      <button className="flex-1 py-1.5 rounded-lg bg-white/[0.04] text-[10px] text-white/40 hover:bg-white/[0.06] transition-colors">
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Activity Feed */}
            <div className="space-y-3">
              {feedItems.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className="rounded-2xl glass-card overflow-hidden"
                >
                  <div className="flex items-center gap-3 p-4 pb-2.5">
                    <div className="w-9 h-9 rounded-full bg-white/[0.07] flex items-center justify-center text-[11px] font-bold">
                      {item.avatar}
                    </div>
                    <div className="flex-1">
                      <p className="text-[13px] font-semibold">{item.userName}</p>
                      <p className="text-[10px] text-white/30">{item.timestamp}</p>
                    </div>
                    {item.type === "run" && <span className="px-2 py-0.5 rounded-md bg-[#BFFF00]/10 text-[10px] text-[#BFFF00] font-medium">{item.distance} mi</span>}
                    {item.type === "streak" && <Flame className="w-4 h-4 text-orange-400" />}
                    {item.type === "achievement" && <Trophy className="w-4 h-4 text-[#BFFF00]" />}
                    {item.type === "challenge" && <Award className="w-4 h-4 text-[#00E5FF]" />}
                  </div>

                  <p className="px-4 pb-2 text-[13px] text-white/65 leading-relaxed">{item.content}</p>

                  {item.distance && (
                    <div className="px-4 pb-2.5 flex gap-5">
                      <div>
                        <p className="text-[10px] text-white/30">Distance</p>
                        <p className="text-[14px] font-bold">{item.distance} mi</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-white/30">Pace</p>
                        <p className="text-[14px] font-bold">{item.pace}/mi</p>
                      </div>
                      {item.duration && (
                        <div>
                          <p className="text-[10px] text-white/30">Time</p>
                          <p className="text-[14px] font-bold">{Math.floor(item.duration / 60)}:{(item.duration % 60).toString().padStart(2, "0")}</p>
                        </div>
                      )}
                    </div>
                  )}

                  {item.distance && (
                    <div className="mx-4 mb-3 h-24 rounded-lg bg-[#0d1117] border border-white/[0.04] overflow-hidden relative">
                      <svg viewBox="0 0 300 100" className="w-full h-full opacity-30">
                        <path d={`M10,70 Q50,${20 + i * 10} 100,${40 + i * 5} T200,${30 + i * 8} T290,50`} fill="none" stroke="#BFFF00" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    </div>
                  )}

                  <div className="flex items-center gap-1 px-4 py-2.5 border-t border-white/[0.04]">
                    <button
                      onClick={() => toggleLike(item.id)}
                      className="flex items-center gap-1.5 px-3 py-1 rounded-full hover:bg-white/[0.04] transition-colors"
                    >
                      <Heart className={`w-4 h-4 ${liked.has(item.id) ? "fill-red-500 text-red-500" : "text-white/35"}`} />
                      <span className="text-[11px] text-white/35 font-medium">
                        {item.likes + (liked.has(item.id) && !item.liked ? 1 : 0)}
                      </span>
                    </button>
                    <button className="flex items-center gap-1.5 px-3 py-1 rounded-full hover:bg-white/[0.04] transition-colors">
                      <MessageCircle className="w-4 h-4 text-white/35" />
                      <span className="text-[11px] text-white/35 font-medium">{item.comments}</span>
                    </button>
                    <div className="flex-1" />
                    <button className="p-1.5 rounded-full hover:bg-white/[0.04] transition-colors">
                      <Share2 className="w-4 h-4 text-white/30" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Friends */}
        {tab === "friends" && (
          <motion.div key="friends" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="px-4 pt-2 pb-8">
            {/* Weekly Leaderboard */}
            <div className="p-4 rounded-2xl glass-card mb-4">
              <h3 className="text-[13px] font-semibold mb-3 flex items-center gap-2">
                <Trophy className="w-4 h-4 text-[#BFFF00]" /> Weekly Leaderboard
              </h3>
              <div className="space-y-0.5">
                {[...friends].sort((a, b) => b.weeklyMiles - a.weeklyMiles).map((f, i) => (
                  <div key={f.id} className={`flex items-center gap-3 p-2.5 rounded-xl ${i === 0 ? "bg-[#BFFF00]/[0.05]" : ""}`}>
                    <span className={`text-[13px] font-bold w-5 text-center ${i === 0 ? "text-[#BFFF00]" : i === 1 ? "text-white/50" : "text-white/25"}`}>{i + 1}</span>
                    <div className="w-8 h-8 rounded-full bg-white/[0.06] flex items-center justify-center text-[10px] font-bold">{f.avatar}</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-medium">{f.name}</p>
                      <p className="text-[10px] text-white/30">{f.persona} · {f.streak}d streak</p>
                    </div>
                    <p className="text-[14px] font-bold">{f.weeklyMiles} mi</p>
                  </div>
                ))}
                <div className="flex items-center gap-3 p-2.5 rounded-xl bg-[#BFFF00]/[0.04] border border-[#BFFF00]/10">
                  <span className="text-[13px] font-bold w-5 text-center text-white/40">3</span>
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#BFFF00]/70 to-[#00E5FF]/50 flex items-center justify-center text-[10px] font-bold text-black">{currentUser.avatar}</div>
                  <div className="flex-1">
                    <p className="text-[13px] font-medium">You</p>
                    <p className="text-[10px] text-[#BFFF00]">{currentUser.persona}</p>
                  </div>
                  <p className="text-[14px] font-bold">{currentUser.weeklyMileage} mi</p>
                </div>
              </div>
            </div>

            {/* Quick Nudge */}
            <div className="p-4 rounded-2xl glass-card mb-4">
              <p className="text-[12px] font-semibold mb-2.5 flex items-center gap-2">💬 Quick Nudge</p>
              <div className="flex flex-wrap gap-1.5">
                {nudges.map(msg => (
                  <button key={msg} className="px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.05] text-[11px] text-white/50 hover:bg-white/[0.06] hover:text-white/70 transition-all">
                    {msg}
                  </button>
                ))}
              </div>
            </div>

            {/* Friends List */}
            <p className="text-[12px] font-semibold text-white/45 uppercase tracking-wider mb-2.5">Your Friends</p>
            <div className="space-y-1.5">
              {friends.map(f => (
                <div key={f.id} className="flex items-center gap-3 p-3 rounded-xl glass-card hover:bg-white/[0.04] transition-colors">
                  <div className="w-10 h-10 rounded-full bg-white/[0.06] flex items-center justify-center text-[11px] font-bold">{f.avatar}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-medium">{f.name}</p>
                    <p className="text-[10px] text-white/30">Last run: {f.lastRun} · Score: {f.runnerScore}</p>
                  </div>
                  <button className="w-8 h-8 rounded-full bg-white/[0.04] flex items-center justify-center hover:bg-white/[0.06] transition-colors">
                    <Send className="w-3.5 h-3.5 text-white/35" />
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Challenges */}
        {tab === "challenges" && (
          <motion.div key="challenges" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="px-4 pt-2 pb-8">
            <p className="text-[12px] text-white/35 mb-4">Make accountability easier, more fun, and earn rewards!</p>
            <div className="space-y-3">
              {challenges.map((ch, i) => (
                <motion.div
                  key={ch.title}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="p-4 rounded-2xl glass-card"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <span className="text-2xl">{ch.emoji}</span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-[14px] font-bold">{ch.title}</h3>
                        <span className="text-[10px] text-white/25">{ch.timeLeft} left</span>
                      </div>
                      <p className="text-[12px] text-white/40 mt-0.5">{ch.desc}</p>
                      <p className="text-[10px] text-white/25 mt-1">🎁 {ch.prize}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-white/30 flex items-center gap-1">
                      <Users className="w-3 h-3" /> {ch.participants} joined
                    </span>
                    <button className="px-4 py-2 rounded-full bg-[#BFFF00]/15 border border-[#BFFF00]/20 text-[12px] text-[#BFFF00] font-semibold hover:bg-[#BFFF00]/20 transition-colors">
                      Join Challenge
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
