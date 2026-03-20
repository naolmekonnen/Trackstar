"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import {
  Play, Pause, Square, MapPin, Clock, Zap,
  TrendingUp, Heart, Mountain, Share2, ChevronDown
} from "lucide-react";
import { recentRuns, formatDuration } from "@/lib/mock-data";

type RunMode = "idle" | "active" | "paused" | "complete";

export default function RunPage() {
  const [mode, setMode] = useState<RunMode>("idle");
  const [selectedRun, setSelectedRun] = useState<number | null>(null);
  const [elapsed, setElapsed] = useState(0);
  const [workoutType, setWorkoutType] = useState("tempo");

  const types = ["easy", "tempo", "interval", "long", "recovery", "race"];

  if (selectedRun !== null) {
    const run = recentRuns[selectedRun];
    return (
      <div className="px-5 pt-14 pb-4 max-w-lg mx-auto">
        <button onClick={() => setSelectedRun(null)} className="text-xs text-white/40 mb-4 flex items-center gap-1">
          ← Back to runs
        </button>

        {/* Run Detail */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          {/* Map Placeholder */}
          <div className="relative h-48 rounded-2xl bg-gradient-to-br from-[#1a1a2e] to-[#0f0f1a] border border-white/[0.06] mb-6 overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                <svg viewBox="0 0 200 120" className="w-48 opacity-40">
                  <path d="M20,80 Q40,20 80,60 T140,40 T180,70" fill="none" stroke="#BFFF00" strokeWidth="2.5" strokeLinecap="round" />
                  <circle cx="20" cy="80" r="4" fill="#BFFF00" />
                  <circle cx="180" cy="70" r="4" fill="#00E5FF" />
                </svg>
              </div>
            </div>
            <div className="absolute bottom-3 left-3 right-3 flex justify-between">
              <span className="text-[10px] text-white/30 flex items-center gap-1"><MapPin className="w-3 h-3" /> Brooklyn, NY</span>
              <span className="text-[10px] text-white/30">{run.weather}</span>
            </div>
          </div>

          {/* Main Stats */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] text-center">
              <p className="text-2xl font-bold">{run.distance}</p>
              <p className="text-[10px] text-white/40 uppercase">Miles</p>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] text-center">
              <p className="text-2xl font-bold">{run.pace}</p>
              <p className="text-[10px] text-white/40 uppercase">Pace</p>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] text-center">
              <p className="text-2xl font-bold">{formatDuration(run.duration)}</p>
              <p className="text-[10px] text-white/40 uppercase">Time</p>
            </div>
          </div>

          {/* Secondary Stats */}
          <div className="grid grid-cols-4 gap-2 mb-6">
            {[
              { icon: Heart, label: "HR", value: `${run.heartRate}` },
              { icon: Mountain, label: "Elev", value: `${run.elevation}ft` },
              { icon: Zap, label: "Cal", value: `${run.calories}` },
              { icon: TrendingUp, label: "Effort", value: `${run.effortScore}` },
            ].map(s => (
              <div key={s.label} className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.04] text-center">
                <s.icon className="w-3.5 h-3.5 text-white/30 mx-auto mb-1" />
                <p className="text-sm font-semibold">{s.value}</p>
                <p className="text-[9px] text-white/30 uppercase">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Splits */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold mb-3">Splits</h3>
            <div className="space-y-1">
              {run.splits.map((split, i) => {
                const paceMinutes = parseInt(split.pace.split(":")[0]) * 60 + parseInt(split.pace.split(":")[1]);
                const barWidth = Math.max(40, Math.min(100, ((600 - paceMinutes) / 120) * 100));
                return (
                  <div key={i} className="flex items-center gap-3 py-1">
                    <span className="text-xs text-white/30 w-4">{split.mile}</span>
                    <div className="flex-1 h-6 rounded-md bg-white/[0.02] overflow-hidden relative">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${barWidth}%` }}
                        transition={{ delay: i * 0.1, duration: 0.4 }}
                        className="absolute inset-y-0 left-0 rounded-md bg-gradient-to-r from-[#BFFF00]/30 to-[#BFFF00]/10"
                      />
                      <span className="absolute inset-0 flex items-center px-2 text-xs font-medium">{split.pace}</span>
                    </div>
                    <span className="text-[10px] text-white/20 w-10 text-right">
                      {split.elevation > 0 ? "+" : ""}{split.elevation}ft
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Notes */}
          {run.notes && (
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] mb-6">
              <p className="text-xs text-white/40 mb-1">Notes</p>
              <p className="text-sm text-white/70">{run.notes}</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Link
              href="/(app)/recap"
              className="flex-1 h-12 rounded-xl bg-gradient-to-r from-[#BFFF00] to-[#9ACC00] flex items-center justify-center gap-2 text-sm font-bold text-black"
            >
              <Share2 className="w-4 h-4" />
              Share Recap
            </Link>
            <button className="h-12 px-4 rounded-xl bg-white/[0.05] border border-white/[0.06] text-sm text-white/60">
              Save
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  if (mode === "active" || mode === "paused") {
    return (
      <div className="px-5 pt-14 pb-4 max-w-lg mx-auto flex flex-col items-center min-h-[80vh] justify-center">
        {/* Active Run Screen */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full text-center">
          <div className="relative h-44 rounded-2xl bg-gradient-to-br from-[#1a1a2e] to-[#0f0f1a] border border-white/[0.06] mb-8 overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <svg viewBox="0 0 200 120" className="w-40 opacity-30">
                <path d="M20,80 Q40,20 80,60 T140,40 T180,70" fill="none" stroke="#BFFF00" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="4 4">
                  <animate attributeName="stroke-dashoffset" from="8" to="0" dur="1s" repeatCount="indefinite" />
                </path>
              </svg>
            </div>
            <div className="absolute top-3 left-3 px-2 py-1 rounded-md bg-[#BFFF00]/20 text-[10px] text-[#BFFF00] font-medium">
              {mode === "paused" ? "PAUSED" : "LIVE"}
            </div>
          </div>

          <p className="text-6xl font-bold tabular-nums tracking-tight mb-2">
            {formatDuration(elapsed || 1847)}
          </p>
          <p className="text-white/30 text-sm mb-8">Duration</p>

          <div className="grid grid-cols-3 gap-4 mb-10">
            <div>
              <p className="text-2xl font-bold">3.42</p>
              <p className="text-xs text-white/30">Miles</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-[#BFFF00]">8:12</p>
              <p className="text-xs text-white/30">Pace</p>
            </div>
            <div>
              <p className="text-2xl font-bold">152</p>
              <p className="text-xs text-white/30">HR</p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-6">
            <button
              onClick={() => setMode(mode === "paused" ? "active" : "paused")}
              className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/15 transition-colors"
            >
              {mode === "paused" ? <Play className="w-6 h-6 ml-1" /> : <Pause className="w-6 h-6" />}
            </button>
            <button
              onClick={() => { setMode("idle"); setSelectedRun(0); }}
              className="w-20 h-20 rounded-full bg-gradient-to-r from-red-500 to-red-600 flex items-center justify-center hover:shadow-lg hover:shadow-red-500/20 transition-all"
            >
              <Square className="w-7 h-7" fill="currentColor" />
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="px-5 pt-14 pb-4 max-w-lg mx-auto">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold mb-6">Run</h1>

        {/* Workout Type Selector */}
        <div className="mb-6">
          <p className="text-xs text-white/40 uppercase tracking-wider mb-3">Workout type</p>
          <div className="flex gap-2 flex-wrap">
            {types.map(t => (
              <button
                key={t}
                onClick={() => setWorkoutType(t)}
                className={`px-4 py-2 rounded-lg text-xs font-medium capitalize transition-all ${
                  workoutType === t
                    ? "bg-[#BFFF00]/15 border border-[#BFFF00]/30 text-[#BFFF00]"
                    : "bg-white/[0.04] border border-white/[0.06] text-white/40"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Start Run Button */}
        <button
          onClick={() => setMode("active")}
          className="w-full h-16 rounded-2xl bg-gradient-to-r from-[#BFFF00] to-[#9ACC00] flex items-center justify-center gap-3 text-lg font-bold text-black hover:shadow-xl hover:shadow-[#BFFF00]/20 transition-all mb-8"
        >
          <Play className="w-5 h-5" fill="currentColor" />
          Start {workoutType.charAt(0).toUpperCase() + workoutType.slice(1)} Run
        </button>

        {/* Recent Runs */}
        <div>
          <h2 className="text-sm font-semibold mb-3 text-white/60">Recent Runs</h2>
          <div className="space-y-2">
            {recentRuns.map((run, i) => (
              <motion.button
                key={run.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => setSelectedRun(i)}
                className="w-full p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.05] transition-all text-left"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      run.type === "tempo" ? "bg-orange-500/20" : run.type === "long" ? "bg-blue-500/20" : "bg-green-500/20"
                    }`}>
                      <Zap className={`w-4 h-4 ${
                        run.type === "tempo" ? "text-orange-400" : run.type === "long" ? "text-blue-400" : "text-green-400"
                      }`} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{run.distance} mi · <span className="capitalize">{run.type}</span></p>
                      <p className="text-xs text-white/40">{run.pace}/mi · {formatDuration(run.duration)}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-white/30">{run.date === "2026-03-20" ? "Today" : run.date === "2026-03-18" ? "2 days ago" : "5 days ago"}</p>
                    <p className="text-xs text-[#BFFF00]/60">Effort {run.effortScore}</p>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
