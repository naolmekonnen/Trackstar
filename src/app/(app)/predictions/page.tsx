"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronLeft, TrendingUp, Target, ArrowUp, ArrowDown } from "lucide-react";
import { currentUser, predictionHistory } from "@/lib/mock-data";

const predictions = [
  { race: "5K", time: currentUser.predicted5k, pace: "7:09/mi", goal: "22:00", ahead: true, diff: "−0:14" },
  { race: "10K", time: currentUser.predicted10k, pace: "7:30/mi", goal: "46:00", ahead: false, diff: "+0:38" },
  { race: "Half Marathon", time: currentUser.predictedHalf, pace: "8:10/mi", goal: "1:48:00", ahead: true, diff: "−0:28" },
  { race: "Marathon", time: currentUser.predictedMarathon, pace: "8:44/mi", goal: "3:45:00", ahead: false, diff: "+3:05" },
];

export default function PredictionsPage() {
  return (
    <div className="max-w-lg mx-auto px-4 pt-4 pb-8">
      <Link href="/home" className="flex items-center gap-1 text-sm text-white/40 mb-6">
        <ChevronLeft className="w-4 h-4" /> Back
      </Link>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold mb-2">Race Predictions</h1>
        <p className="text-sm text-white/40 mb-8">Based on your training data and recent performance.</p>

        {/* Featured Prediction */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-[#BFFF00]/10 to-[#00E5FF]/5 border border-white/[0.08] mb-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#BFFF00]/10 rounded-full blur-[40px]" />
          <div className="relative">
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-4 h-4 text-[#BFFF00]" />
              <span className="text-xs text-[#BFFF00] font-medium uppercase tracking-wider">Target Race</span>
            </div>
            <h2 className="text-lg font-semibold mb-1">{currentUser.raceName}</h2>
            <p className="text-xs text-white/40 mb-4">Half Marathon · May 17, 2026</p>
            <p className="text-5xl font-bold tracking-tight mb-1">{currentUser.predictedHalf}</p>
            <div className="flex items-center gap-2 mt-2">
              <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-[#BFFF00]/15 text-[10px] text-[#BFFF00] font-medium">
                <ArrowUp className="w-3 h-3" /> 2:14 faster than last month
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <div className="flex-1 h-2 rounded-full bg-white/[0.06]">
                <div className="h-full w-[82%] rounded-full bg-gradient-to-r from-[#BFFF00] to-[#00E5FF]" />
              </div>
              <span className="text-xs text-white/40">82% confidence</span>
            </div>
          </div>
        </div>

        {/* Prediction Trend */}
        <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] mb-6">
          <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-[#00E5FF]" />
            Half Marathon Trend
          </h3>
          <div className="flex items-end gap-1 h-24">
            {predictionHistory.map((point, i) => {
              const height = ((120 - point.time) / 15) * 100;
              return (
                <div key={point.week} className="flex-1 flex flex-col items-center gap-1">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${Math.max(20, height)}%` }}
                    transition={{ delay: i * 0.05, duration: 0.4 }}
                    className={`w-full rounded-t-md ${
                      i === predictionHistory.length - 1
                        ? "bg-gradient-to-t from-[#BFFF00] to-[#BFFF00]/60"
                        : "bg-white/[0.08]"
                    }`}
                  />
                  <span className="text-[8px] text-white/30">{point.week}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* All Predictions */}
        <h3 className="text-sm font-semibold mb-3">All Distances</h3>
        <div className="space-y-3">
          {predictions.map((pred, i) => (
            <motion.div
              key={pred.race}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]"
            >
              <div className="flex items-center justify-between mb-2">
                <p className="font-semibold">{pred.race}</p>
                <span className={`flex items-center gap-1 text-xs font-medium ${
                  pred.ahead ? "text-[#BFFF00]" : "text-orange-400"
                }`}>
                  {pred.ahead ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                  {pred.diff} vs goal
                </span>
              </div>
              <div className="flex items-baseline gap-4">
                <div>
                  <p className="text-2xl font-bold">{pred.time}</p>
                  <p className="text-[10px] text-white/30 uppercase">Predicted</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-white/40">{pred.pace}</p>
                  <p className="text-[10px] text-white/30">Goal: {pred.goal}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
