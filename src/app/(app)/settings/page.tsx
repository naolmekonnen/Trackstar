"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ChevronLeft, ChevronRight, Watch, Bell, Lock,
  Share2, Zap, Globe, LogOut, Moon
} from "lucide-react";
import { useState } from "react";

const settingSections = [
  {
    title: "Integrations",
    items: [
      { icon: Watch, label: "Apple Watch", subtitle: "Connected", connected: true },
      { icon: Zap, label: "Strava", subtitle: "Sync runs automatically", connected: true },
      { icon: Watch, label: "Garmin", subtitle: "Not connected", connected: false },
      { icon: Watch, label: "Fitbit", subtitle: "Not connected", connected: false },
    ],
  },
  {
    title: "Preferences",
    items: [
      { icon: Bell, label: "Notifications", subtitle: "Workout reminders, social updates" },
      { icon: Globe, label: "Units", subtitle: "Miles" },
      { icon: Zap, label: "AI Coach Tone", subtitle: "Motivating" },
      { icon: Moon, label: "Appearance", subtitle: "Dark mode" },
    ],
  },
  {
    title: "Privacy & Sharing",
    items: [
      { icon: Lock, label: "Privacy", subtitle: "Profile visible to friends" },
      { icon: Share2, label: "Share Defaults", subtitle: "Story format, gradient style" },
    ],
  },
];

export default function SettingsPage() {
  const [units, setUnits] = useState<"miles" | "km">("miles");

  return (
    <div className="max-w-lg mx-auto px-4 pt-4 pb-8">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-8">
          <Link href="/profile" className="w-8 h-8 rounded-full bg-white/[0.05] flex items-center justify-center">
            <ChevronLeft className="w-4 h-4 text-white/40" />
          </Link>
          <h1 className="text-2xl font-bold">Settings</h1>
        </div>

        {settingSections.map((section) => (
          <div key={section.title} className="mb-6">
            <h2 className="text-xs text-white/40 uppercase tracking-wider mb-3 px-1">{section.title}</h2>
            <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] overflow-hidden divide-y divide-white/[0.04]">
              {section.items.map((item) => (
                <button key={item.label} className="w-full flex items-center gap-3 p-4 hover:bg-white/[0.02] transition-colors text-left">
                  <div className="w-9 h-9 rounded-lg bg-white/[0.05] flex items-center justify-center shrink-0">
                    <item.icon className="w-4 h-4 text-white/40" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{item.label}</p>
                    <p className="text-xs text-white/40 truncate">{item.subtitle}</p>
                  </div>
                  {"connected" in item ? (
                    <span className={`text-xs font-medium ${item.connected ? "text-[#BFFF00]" : "text-white/30"}`}>
                      {item.connected ? "Connected" : "Connect"}
                    </span>
                  ) : (
                    <ChevronRight className="w-4 h-4 text-white/20 shrink-0" />
                  )}
                </button>
              ))}
            </div>
          </div>
        ))}

        {/* Units Toggle */}
        <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] mb-6">
          <p className="text-sm font-medium mb-3">Distance Units</p>
          <div className="flex gap-2">
            {(["miles", "km"] as const).map(u => (
              <button
                key={u}
                onClick={() => setUnits(u)}
                className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                  units === u
                    ? "bg-[#BFFF00]/15 border border-[#BFFF00]/30 text-[#BFFF00]"
                    : "bg-white/[0.04] border border-white/[0.06] text-white/40"
                }`}
              >
                {u === "miles" ? "Miles" : "Kilometers"}
              </button>
            ))}
          </div>
        </div>

        {/* Account */}
        <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] overflow-hidden">
          <Link href="/" className="flex items-center gap-3 p-4 hover:bg-white/[0.02] transition-colors">
            <div className="w-9 h-9 rounded-lg bg-red-500/10 flex items-center justify-center">
              <LogOut className="w-4 h-4 text-red-400" />
            </div>
            <span className="text-sm font-medium text-red-400">Sign Out</span>
          </Link>
        </div>

        <p className="text-center text-[10px] text-white/20 mt-8 mb-4">Trackstar v1.0.0 · Built for runners who care about more.</p>
      </motion.div>
    </div>
  );
}
