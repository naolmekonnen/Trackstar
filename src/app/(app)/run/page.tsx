"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import {
  Play, Pause, Square, MapPin, Zap,
  TrendingUp, Heart, Mountain, Share2
} from "lucide-react";
import { recentRuns, formatDuration } from "@/lib/mock-data";

type RunMode = "idle" | "active" | "paused";

export default function RunPage() {
  const [mode, setMode] = useState<RunMode>("idle");
  const [selectedRun, setSelectedRun] = useState<number | null>(null);
  const [elapsed] = useState(0);
  const [workoutType, setWorkoutType] = useState("tempo");

  const types = ["easy", "tempo", "interval", "long", "recovery", "race"];

  if (selectedRun !== null) {
    const run = recentRuns[selectedRun];
    return (
      <div className="max-w-lg mx-auto px-4 pt-4 pb-8">
        <button onClick={() => setSelectedRun(null)} className="text-[12px] text-white/35 mb-4 flex items-center gap-1 hover:text-white/50 transition-colors">
          ← Back to runs
        </button>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          {/* Route Map */}
          <div className="relative h-48 rounded-2xl bg-[#0d1117] border border-white/[0.05] mb-5 overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <svg viewBox="0 0 300 150" className="w-64 opacity-40">
                <path d="M20,100 Q60,20 120,70 T220,40 T280,80" fill="none" stroke="url(#detailGrad)" strokeWidth="3" strokeLinecap="round" />
                <defs>
                  <linearGradient id="detailGrad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#BFFF00" />
                    <stop offset="100%" stopColor="#00E5FF" />
                  </linearGradient>
                </defs>
                <circle cx="20" cy="100" r="5" fill="#BFFF00" />
                <circle cx="280" cy="80" r="5" fill="#00E5FF" />
              </svg>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117] via-transparent to-transparent" />
            <div className="absolute bottom-3 left-3 right-3 flex justify-between">
              <span className="text-[10px] text-white/25 flex items-center gap-1"><MapPin className="w-3 h-3" /> Brooklyn, NY</span>
              <span className="text-[10px] text-white/25">{run.weather}</span>
            </div>
          </div>

          {/* Main Stats */}
          <div className="grid grid-cols-3 gap-2 mb-5">
            {[
              { value: `${run.distance}`, unit: "mi", label: "Distance" },
              { value: run.pace, unit: "/mi", label: "Pace" },
              { value: formatDuration(run.duration), unit: "", label: "Time" },
            ].map(s => (
              <div key={s.label} className="p-3.5 rounded-xl glass-card text-center">
                <p className="text-[22px] font-bold tracking-tight">{s.value}<span className="text-[13px] text-white/30 font-normal">{s.unit}</span></p>
                <p className="text-[10px] text-white/30 uppercase mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Secondary Stats */}
          <div className="grid grid-cols-4 gap-1.5 mb-5">
            {[
              { icon: Heart, label: "HR", value: `${run.heartRate}` },
              { icon: Mountain, label: "Elev", value: `${run.elevation}ft` },
              { icon: Zap, label: "Cal", value: `${run.calories}` },
              { icon: TrendingUp, label: "Effort", value: `${run.effortScore}`, highlight: true },
            ].map(s => (
              <div key={s.label} className="p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.04] text-center">
                <s.icon className={`w-3.5 h-3.5 mx-auto mb-1 ${s.highlight ? "text-[#BFFF00]" : "text-white/25"}`} />
                <p className={`text-[14px] font-bold ${s.highlight ? "text-[#BFFF00]" : ""}`}>{s.value}</p>
                <p className="text-[9px] text-white/25 uppercase">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Splits */}
          <div className="mb-5">
            <h3 className="text-[13px] font-semibold mb-3">Splits</h3>
            <div className="space-y-1">
              {run.splits.map((split, i) => {
                const paceMinutes = parseInt(split.pace.split(":")[0]) * 60 + parseInt(split.pace.split(":")[1]);
                const barWidth = Math.max(40, Math.min(100, ((600 - paceMinutes) / 120) * 100));
                return (
                  <div key={i} className="flex items-center gap-2.5 py-0.5">
                    <span className="text-[11px] text-white/25 w-4 text-right">{split.mile}</span>
                    <div className="flex-1 h-7 rounded-md bg-white/[0.02] overflow-hidden relative">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${barWidth}%` }}
                        transition={{ delay: i * 0.08, duration: 0.4 }}
                        className="absolute inset-y-0 left-0 rounded-md bg-gradient-to-r from-[#BFFF00]/25 to-[#BFFF00]/8"
                      />
                      <span className="absolute inset-0 flex items-center px-2.5 text-[12px] font-medium">{split.pace}</span>
                    </div>
                    <span className="text-[10px] text-white/15 w-10 text-right">
                      {split.elevation > 0 ? "+" : ""}{split.elevation}ft
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {run.notes && (
            <div className="p-3.5 rounded-xl glass-card mb-5">
              <p className="text-[10px] text-white/30 uppercase tracking-wider mb-1">Notes</p>
              <p className="text-[13px] text-white/60 leading-relaxed">{run.notes}</p>
            </div>
          )}

          <div className="flex gap-2.5">
            <Link href="/recap" className="flex-1 h-12 rounded-xl bg-[#BFFF00] flex items-center justify-center gap-2 text-[13px] font-bold text-black">
              <Share2 className="w-4 h-4" /> Share Recap
            </Link>
            <button className="h-12 px-5 rounded-xl bg-white/[0.04] border border-white/[0.06] text-[13px] text-white/50">
              Save
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  if (mode === "active" || mode === "paused") {
    return (
      <div className="max-w-lg mx-auto px-4 flex flex-col items-center min-h-[80vh] justify-center">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full text-center">
          <div className="relative h-40 rounded-2xl bg-[#0d1117] border border-white/[0.05] mb-8 overflow-hidden">
            <svg viewBox="0 0 300 120" className="w-full h-full opacity-25">
              <path d="M20,80 Q60,20 120,60 T220,30 T280,70" fill="none" stroke="#BFFF00" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="6 4">
                <animate attributeName="stroke-dashoffset" from="10" to="0" dur="1s" repeatCount="indefinite" />
              </path>
            </svg>
            <div className="absolute top-3 left-3 px-2 py-1 rounded-md bg-[#BFFF00]/20 text-[10px] text-[#BFFF00] font-semibold">
              {mode === "paused" ? "PAUSED" : "● LIVE"}
            </div>
          </div>

          <p className="text-[64px] font-bold tabular-nums tracking-tight mb-1">
            {formatDuration(elapsed || 1847)}
          </p>
          <p className="text-white/25 text-[13px] mb-8">Duration</p>

          <div className="grid grid-cols-3 gap-6 mb-10">
            <div>
              <p className="text-[24px] font-bold">3.42</p>
              <p className="text-[11px] text-white/30">Miles</p>
            </div>
            <div>
              <p className="text-[24px] font-bold text-[#BFFF00]">8:12</p>
              <p className="text-[11px] text-white/30">Pace</p>
            </div>
            <div>
              <p className="text-[24px] font-bold">152</p>
              <p className="text-[11px] text-white/30">HR</p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-6">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setMode(mode === "paused" ? "active" : "paused")}
              className="w-16 h-16 rounded-full bg-white/[0.08] flex items-center justify-center hover:bg-white/[0.12] transition-colors"
            >
              {mode === "paused" ? <Play className="w-6 h-6 ml-0.5" /> : <Pause className="w-6 h-6" />}
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => { setMode("idle"); setSelectedRun(0); }}
              className="w-20 h-20 rounded-full bg-red-500 flex items-center justify-center hover:shadow-lg hover:shadow-red-500/20 transition-all"
            >
              <Square className="w-7 h-7" fill="currentColor" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto px-4 pt-4 pb-8">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        {/* Workout Type */}
        <div className="mb-5">
          <p className="text-[11px] text-white/35 uppercase tracking-wider mb-2.5">Workout Type</p>
          <div className="flex gap-2 flex-wrap">
            {types.map(t => (
              <button
                key={t}
                onClick={() => setWorkoutType(t)}
                className={`px-4 py-2 rounded-lg text-[12px] font-medium capitalize transition-all ${
                  workoutType === t
                    ? "bg-[#BFFF00]/15 border border-[#BFFF00]/25 text-[#BFFF00]"
                    : "bg-white/[0.03] border border-white/[0.05] text-white/35"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Start Run */}
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setMode("active")}
          className="w-full h-16 rounded-2xl bg-[#BFFF00] flex items-center justify-center gap-3 text-[16px] font-bold text-black shadow-lg shadow-[#BFFF00]/15 mb-8"
        >
          <Play className="w-5 h-5" fill="currentColor" />
          Start {workoutType.charAt(0).toUpperCase() + workoutType.slice(1)} Run
        </motion.button>

        {/* Recent Runs */}
        <p className="text-[12px] font-semibold text-white/45 uppercase tracking-wider mb-3">Recent Runs</p>
        <div className="space-y-2">
          {recentRuns.map((run, i) => (
            <motion.button
              key={run.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              onClick={() => setSelectedRun(i)}
              className="w-full rounded-xl glass-card overflow-hidden text-left hover:bg-white/[0.04] transition-colors"
            >
              <div className="flex items-center gap-3 p-3.5">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  run.type === "tempo" ? "bg-orange-500/15" : run.type === "long" ? "bg-blue-500/15" : "bg-emerald-500/15"
                }`}>
                  <Zap className={`w-4 h-4 ${
                    run.type === "tempo" ? "text-orange-400" : run.type === "long" ? "text-blue-400" : "text-emerald-400"
                  }`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-semibold">{run.distance} mi · <span className="capitalize">{run.type}</span></p>
                  <p className="text-[11px] text-white/35">{run.pace}/mi · {formatDuration(run.duration)}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-[11px] text-white/25">{run.date === "2026-03-20" ? "Today" : run.date === "2026-03-18" ? "2d ago" : "5d ago"}</p>
                  <p className="text-[11px] text-[#BFFF00]/50">Effort {run.effortScore}</p>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
