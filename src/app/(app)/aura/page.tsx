"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronLeft, Share2 } from "lucide-react";
import { currentUser, runnerScoreBreakdown } from "@/lib/mock-data";

const auraMetrics = [
  { label: "Momentum", value: "High", color: "#BFFF00", description: "Strong training consistency this week" },
  { label: "Consistency Glow", value: "Active", color: "#00E5FF", description: "8-day streak powering your aura" },
  { label: "Recovery State", value: "Moderate", color: "#8B5CF6", description: "Slightly fatigued from long run" },
  { label: "Performance Trend", value: "↑ Rising", color: "#BFFF00", description: "Tempo pace improving week over week" },
];

export default function AuraPage() {
  return (
    <div className="px-5 pt-14 pb-4 max-w-lg mx-auto">
      <Link href="/(app)/home" className="flex items-center gap-1 text-sm text-white/40 mb-6">
        <ChevronLeft className="w-4 h-4" /> Back
      </Link>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold mb-2">Your Aura</h1>
        <p className="text-sm text-white/40 mb-8">A visual representation of your training state.</p>

        {/* Main Aura Visualization */}
        <div className="relative h-80 rounded-3xl overflow-hidden mb-8">
          <div className="absolute inset-0 bg-[#0A0A0C]" />

          {/* Animated aura rings */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute w-64 h-64 rounded-full border border-[#BFFF00]/10"
            />
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute w-48 h-48 rounded-full border border-[#00E5FF]/15"
            />
            <motion.div
              animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.7, 0.4] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute w-32 h-32 rounded-full bg-gradient-to-br from-[#BFFF00]/20 to-[#00E5FF]/15 blur-sm"
            />
            <motion.div
              animate={{ scale: [0.95, 1.05, 0.95] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute w-20 h-20 rounded-full bg-gradient-to-br from-[#BFFF00]/40 to-[#00E5FF]/30 blur-[2px]"
            />

            {/* Center score */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", damping: 12, delay: 0.3 }}
              className="relative z-10 w-16 h-16 rounded-full bg-gradient-to-br from-[#BFFF00] to-[#00E5FF] flex items-center justify-center"
            >
              <span className="text-xl font-bold text-black">{currentUser.runnerScore}</span>
            </motion.div>
          </div>

          {/* Floating labels */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="absolute top-6 left-6"
          >
            <p className="text-xs text-white/40 uppercase tracking-wider">This Week</p>
            <p className="text-sm font-semibold text-[#BFFF00]">Momentum: High</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="absolute bottom-6 right-6 text-right"
          >
            <p className="text-xs text-white/40">Consistency Glow</p>
            <p className="text-sm font-semibold text-[#00E5FF]">Active</p>
          </motion.div>
        </div>

        {/* Aura Metrics */}
        <div className="space-y-3 mb-8">
          {auraMetrics.map((metric, i) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]"
            >
              <div className="flex items-center justify-between mb-1">
                <p className="text-sm font-medium">{metric.label}</p>
                <span className="text-sm font-bold" style={{ color: metric.color }}>{metric.value}</span>
              </div>
              <p className="text-xs text-white/40">{metric.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Runner Score Breakdown */}
        <h3 className="text-sm font-semibold mb-3">Score Breakdown</h3>
        <div className="space-y-2 mb-8">
          {Object.values(runnerScoreBreakdown).map((item, i) => (
            <div key={item.label} className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">{item.label}</span>
                <div className="flex items-center gap-2">
                  <span className={`text-xs ${item.change > 0 ? "text-[#BFFF00]" : "text-orange-400"}`}>
                    {item.change > 0 ? "+" : ""}{item.change}
                  </span>
                  <span className="text-sm font-bold">{item.score}</span>
                </div>
              </div>
              <div className="h-1.5 rounded-full bg-white/[0.06]">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${item.score}%` }}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.6 }}
                  className="h-full rounded-full bg-gradient-to-r from-[#BFFF00] to-[#00E5FF]"
                />
              </div>
              <p className="text-[10px] text-white/30 mt-1">{item.description}</p>
            </div>
          ))}
        </div>

        {/* Share */}
        <button className="w-full h-12 rounded-xl bg-gradient-to-r from-[#BFFF00] to-[#9ACC00] flex items-center justify-center gap-2 text-sm font-bold text-black">
          <Share2 className="w-4 h-4" /> Share Your Aura
        </button>
      </motion.div>
    </div>
  );
}
