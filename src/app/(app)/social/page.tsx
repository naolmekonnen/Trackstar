"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import {
  Heart, MessageCircle, Share2, Zap, Trophy,
  Flame, Users, ChevronRight, Send
} from "lucide-react";
import { feedItems, friends, currentUser } from "@/lib/mock-data";

const challenges = [
  { title: "Weekend Warriors", desc: "Most miles this weekend", participants: 12, timeLeft: "2d left", prize: "🏆" },
  { title: "Speed Demon", desc: "Fastest 5K this week", participants: 8, timeLeft: "5d left", prize: "⚡" },
  { title: "Streak Battle", desc: "Longest active streak", participants: 15, timeLeft: "Ongoing", prize: "🔥" },
];

const trashTalk = [
  "You're behind this week. 👀",
  "Catch me if you can. 🏃",
  "Still sleeping on your long run?",
  "My easy pace is your race pace. 😤",
];

export default function SocialPage() {
  const [tab, setTab] = useState<"feed" | "friends" | "challenges">("feed");
  const [likedItems, setLikedItems] = useState<Set<string>>(new Set(feedItems.filter(f => f.liked).map(f => f.id)));

  const toggleLike = (id: string) => {
    setLikedItems(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <div className="px-5 pt-14 pb-4 max-w-lg mx-auto">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold mb-6">Social</h1>

        {/* Tab Toggle */}
        <div className="flex gap-1 p-1 rounded-xl bg-white/[0.04] mb-6">
          {(["feed", "friends", "challenges"] as const).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 py-2 rounded-lg text-xs font-medium capitalize transition-all ${
                tab === t ? "bg-white/[0.08] text-white" : "text-white/40"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Feed */}
        {tab === "feed" && (
          <div className="space-y-4">
            {feedItems.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center text-xs font-bold">
                    {item.avatar}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold">{item.userName}</p>
                    <p className="text-[10px] text-white/30">{item.timestamp}</p>
                  </div>
                  {item.type === "run" && (
                    <span className="px-2 py-1 rounded-md bg-[#BFFF00]/10 text-[10px] text-[#BFFF00] font-medium">
                      {item.distance} mi
                    </span>
                  )}
                  {item.type === "streak" && (
                    <Flame className="w-4 h-4 text-orange-400" />
                  )}
                  {item.type === "achievement" && (
                    <Trophy className="w-4 h-4 text-[#BFFF00]" />
                  )}
                </div>
                <p className="text-sm text-white/70 mb-3">{item.content}</p>
                {item.distance && (
                  <div className="flex gap-4 mb-3 text-xs text-white/40">
                    <span>{item.distance} mi</span>
                    <span>{item.pace}/mi</span>
                    <span>{item.duration ? `${Math.floor(item.duration / 60)}:${(item.duration % 60).toString().padStart(2, "0")}` : ""}</span>
                  </div>
                )}
                <div className="flex items-center gap-4 pt-2 border-t border-white/[0.04]">
                  <button
                    onClick={() => toggleLike(item.id)}
                    className="flex items-center gap-1.5 text-xs text-white/40 hover:text-white/60 transition-colors"
                  >
                    <Heart className={`w-4 h-4 ${likedItems.has(item.id) ? "fill-red-500 text-red-500" : ""}`} />
                    {item.likes + (likedItems.has(item.id) && !item.liked ? 1 : 0)}
                  </button>
                  <button className="flex items-center gap-1.5 text-xs text-white/40 hover:text-white/60 transition-colors">
                    <MessageCircle className="w-4 h-4" /> {item.comments}
                  </button>
                  <button className="flex items-center gap-1.5 text-xs text-white/40 hover:text-white/60 transition-colors ml-auto">
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Friends */}
        {tab === "friends" && (
          <div>
            {/* Weekly Leaderboard */}
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] mb-6">
              <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                <Trophy className="w-4 h-4 text-[#BFFF00]" /> Weekly Leaderboard
              </h3>
              <div className="space-y-2">
                {[...friends].sort((a, b) => b.weeklyMiles - a.weeklyMiles).map((friend, i) => (
                  <div key={friend.id} className="flex items-center gap-3 py-2">
                    <span className={`text-sm font-bold w-5 ${i === 0 ? "text-[#BFFF00]" : "text-white/30"}`}>{i + 1}</span>
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center text-[10px] font-bold">
                      {friend.avatar}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{friend.name}</p>
                      <p className="text-[10px] text-white/40">{friend.persona}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold">{friend.weeklyMiles} mi</p>
                      <p className="text-[10px] text-white/30">{friend.streak}d streak</p>
                    </div>
                  </div>
                ))}
                {/* Current user in leaderboard */}
                <div className="flex items-center gap-3 py-2 px-2 -mx-2 rounded-lg bg-[#BFFF00]/5 border border-[#BFFF00]/10">
                  <span className="text-sm font-bold w-5 text-white/50">3</span>
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#BFFF00] to-[#00E5FF] flex items-center justify-center text-[10px] font-bold text-black">
                    {currentUser.avatar}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">You</p>
                    <p className="text-[10px] text-[#BFFF00]">{currentUser.persona}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold">{currentUser.weeklyMileage} mi</p>
                    <p className="text-[10px] text-white/30">{currentUser.streak}d streak</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Friends List */}
            <h3 className="text-sm font-semibold mb-3">Your Friends</h3>
            <div className="space-y-2">
              {friends.map(friend => (
                <div key={friend.id} className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center text-xs font-bold">
                    {friend.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{friend.name}</p>
                    <p className="text-xs text-white/40 truncate">Last run: {friend.lastRun} · Score: {friend.runnerScore}</p>
                  </div>
                  <button className="shrink-0 px-3 py-1.5 rounded-lg bg-white/[0.05] border border-white/[0.06] text-[10px] font-medium text-white/60">
                    <Send className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>

            {/* Trash Talk */}
            <div className="mt-6 p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
              <h3 className="text-sm font-semibold mb-3">Quick Nudge 💬</h3>
              <div className="flex gap-2 flex-wrap">
                {trashTalk.map(msg => (
                  <button key={msg} className="px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.06] text-xs text-white/60 hover:bg-white/[0.08] transition-colors">
                    {msg}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Challenges */}
        {tab === "challenges" && (
          <div className="space-y-4">
            {challenges.map((challenge, i) => (
              <motion.div
                key={challenge.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="p-5 rounded-xl bg-white/[0.03] border border-white/[0.06]"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{challenge.prize}</span>
                    <h3 className="font-semibold">{challenge.title}</h3>
                  </div>
                  <span className="text-xs text-white/30">{challenge.timeLeft}</span>
                </div>
                <p className="text-sm text-white/40 mb-3">{challenge.desc}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-xs text-white/30">
                    <Users className="w-3 h-3" /> {challenge.participants} joined
                  </div>
                  <button className="px-4 py-1.5 rounded-lg bg-[#BFFF00]/10 border border-[#BFFF00]/20 text-xs text-[#BFFF00] font-medium hover:bg-[#BFFF00]/15 transition-colors">
                    Join
                  </button>
                </div>
              </motion.div>
            ))}

            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] text-center">
              <p className="text-sm text-white/40 mb-3">Create your own challenge</p>
              <button className="px-6 py-2 rounded-lg bg-white/[0.06] border border-white/[0.08] text-sm font-medium text-white/60 hover:bg-white/[0.08] transition-colors">
                + New Challenge
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
