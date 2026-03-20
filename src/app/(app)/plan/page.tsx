"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import {
  Zap, Check, SkipForward, AlertCircle
} from "lucide-react";
import { trainingPlan, currentUser, coachMessages, getDaysUntilRace } from "@/lib/mock-data";

const typeColors: Record<string, string> = {
  easy: "bg-green-500/20 text-green-400",
  tempo: "bg-orange-500/20 text-orange-400",
  interval: "bg-red-500/20 text-red-400",
  long: "bg-blue-500/20 text-blue-400",
  recovery: "bg-purple-500/20 text-purple-400",
  rest: "bg-white/5 text-white/30",
  race: "bg-[#BFFF00]/20 text-[#BFFF00]",
  cross: "bg-cyan-500/20 text-cyan-400",
};

export default function PlanPage() {
  const [view, setView] = useState<"week" | "calendar">("week");
  const [selectedWeek, setSelectedWeek] = useState(2);
  const week = trainingPlan[selectedWeek];

  return (
    <div className="px-5 pt-14 pb-4 max-w-lg mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <div className="flex items-center justify-between mb-1">
          <h1 className="text-2xl font-bold">Training Plan</h1>
          <div className="text-right">
            <p className="text-xs text-white/40">{currentUser.raceName}</p>
            <p className="text-xs text-[#BFFF00]">{getDaysUntilRace()} days away</p>
          </div>
        </div>
        <p className="text-sm text-white/40">Half Marathon · 12-week plan</p>
      </motion.div>

      {/* View Toggle */}
      <div className="flex gap-2 mb-4">
        {(["week", "calendar"] as const).map(v => (
          <button
            key={v}
            onClick={() => setView(v)}
            className={`px-4 py-2 rounded-lg text-xs font-medium transition-all ${
              view === v ? "bg-white/10 text-white" : "text-white/40 hover:text-white/60"
            }`}
          >
            {v === "week" ? "Weekly" : "Calendar"}
          </button>
        ))}
      </div>

      {/* Week Selector */}
      <div className="flex gap-2 mb-6 overflow-x-auto hide-scrollbar pb-2">
        {trainingPlan.map((w, i) => (
          <button
            key={w.weekNumber}
            onClick={() => setSelectedWeek(i)}
            className={`shrink-0 px-4 py-2 rounded-xl border text-xs font-medium transition-all ${
              selectedWeek === i
                ? "bg-[#BFFF00]/10 border-[#BFFF00]/30 text-[#BFFF00]"
                : "bg-white/[0.03] border-white/[0.06] text-white/40 hover:bg-white/[0.05]"
            }`}
          >
            <p>W{w.weekNumber}</p>
            <p className="text-[10px] opacity-60 mt-0.5">{w.phase}</p>
          </button>
        ))}
      </div>

      {/* AI Coach */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="p-4 rounded-xl bg-gradient-to-r from-[#BFFF00]/8 to-transparent border border-white/[0.06] mb-6"
      >
        <div className="flex items-start gap-3">
          <div className="w-7 h-7 rounded-lg bg-[#BFFF00]/15 flex items-center justify-center shrink-0">
            <Zap className="w-3.5 h-3.5 text-[#BFFF00]" />
          </div>
          <div>
            <p className="text-[10px] text-[#BFFF00] font-medium uppercase tracking-wider mb-0.5">AI Coach</p>
            <p className="text-xs text-white/60 leading-relaxed">{coachMessages[2]}</p>
          </div>
        </div>
      </motion.div>

      {/* Week Summary */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="font-bold">Week {week.weekNumber} — {week.phase}</h2>
          <p className="text-xs text-white/40">{week.totalMileage} miles planned</p>
        </div>
        <div className="flex items-center gap-1.5 text-xs">
          <div className="w-2 h-2 rounded-full bg-[#BFFF00]" />
          <span className="text-white/40">
            {week.days.filter(d => d.completed).length}/{week.days.length} complete
          </span>
        </div>
      </div>

      {/* Daily Workouts */}
      {view === "week" ? (
        <div className="space-y-2">
          {week.days.map((day, i) => (
            <motion.div
              key={day.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className={`p-4 rounded-xl border transition-all ${
                day.completed
                  ? "bg-white/[0.02] border-white/[0.04] opacity-60"
                  : "bg-white/[0.03] border-white/[0.06] hover:bg-white/[0.05]"
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className="text-center min-w-[36px]">
                    <p className="text-[10px] text-white/30 uppercase">{day.dayOfWeek}</p>
                    <p className="text-sm font-bold">{new Date(day.date).getDate()}</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-medium ${typeColors[day.type]}`}>
                        {day.type}
                      </span>
                      <span className="text-sm font-semibold">{day.title}</span>
                    </div>
                    <p className="text-xs text-white/40">{day.description}</p>
                    {day.targetDistance && (
                      <p className="text-xs text-white/30 mt-1">
                        {day.targetDistance} mi · {day.targetPace}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  {day.completed ? (
                    <div className="w-7 h-7 rounded-full bg-[#BFFF00]/20 flex items-center justify-center">
                      <Check className="w-3.5 h-3.5 text-[#BFFF00]" />
                    </div>
                  ) : day.type !== "rest" ? (
                    <div className="flex gap-1">
                      <button className="w-7 h-7 rounded-full bg-[#BFFF00]/10 flex items-center justify-center hover:bg-[#BFFF00]/20 transition-colors">
                        <Check className="w-3 h-3 text-[#BFFF00]" />
                      </button>
                      <button className="w-7 h-7 rounded-full bg-white/[0.05] flex items-center justify-center hover:bg-white/[0.08] transition-colors">
                        <SkipForward className="w-3 h-3 text-white/30" />
                      </button>
                    </div>
                  ) : (
                    <div className="w-7 h-7 rounded-full bg-white/[0.03] flex items-center justify-center">
                      <span className="text-xs text-white/20">—</span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-7 gap-1">
          <div className="text-center text-[10px] text-white/30 pb-2">M</div>
          <div className="text-center text-[10px] text-white/30 pb-2">T</div>
          <div className="text-center text-[10px] text-white/30 pb-2">W</div>
          <div className="text-center text-[10px] text-white/30 pb-2">T</div>
          <div className="text-center text-[10px] text-white/30 pb-2">F</div>
          <div className="text-center text-[10px] text-white/30 pb-2">S</div>
          <div className="text-center text-[10px] text-white/30 pb-2">S</div>
          {trainingPlan.flatMap(w => w.days).map((day) => (
            <div
              key={day.id}
              className={`aspect-square rounded-lg flex flex-col items-center justify-center text-[10px] ${
                day.completed
                  ? "bg-[#BFFF00]/15 text-[#BFFF00]"
                  : day.type === "rest"
                  ? "bg-white/[0.02] text-white/20"
                  : "bg-white/[0.04] text-white/50"
              }`}
            >
              <p className="font-medium">{new Date(day.date).getDate()}</p>
              {day.targetDistance && <p className="text-[8px] opacity-60">{day.targetDistance}mi</p>}
            </div>
          ))}
        </div>
      )}

      {/* Plan Intelligence */}
      <div className="mt-6 p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
        <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-[#00E5FF]" />
          Smart Plan Insights
        </h3>
        <div className="space-y-2 text-xs text-white/50">
          <p>• Taper begins in 2 weeks — long runs will reduce</p>
          <p>• Your tempo pace is 15s/mi faster than target — consider race pace adjustment</p>
          <p>• Recovery balance is slightly low — prioritize sleep this week</p>
        </div>
      </div>
    </div>
  );
}
