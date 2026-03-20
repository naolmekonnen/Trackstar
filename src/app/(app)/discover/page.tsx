"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  MapPin, Calendar, Search,
  Star, Clock, ChevronDown, Filter, Map, Route
} from "lucide-react";
import { runClubs, races } from "@/lib/mock-data";

const chipFilters = ["Routes", "Length", "Elevation", "Surface", "Difficulty"];
const clubFilters = ["All", "Beginner", "Social", "Competitive", "Morning", "Evening"];

export default function DiscoverPage() {
  const [tab, setTab] = useState<"map" | "clubs" | "races">("map");
  const [activeChip, setActiveChip] = useState("Routes");
  const [activeFilter, setActiveFilter] = useState("All");
  const [search, setSearch] = useState("");

  return (
    <div className="max-w-lg mx-auto">
      {/* Search */}
      <div className="px-4 pt-3 pb-2">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search locations, routes, clubs..."
            className="w-full h-10 pl-10 pr-10 rounded-xl bg-white/[0.05] border border-white/[0.06] text-[13px] placeholder:text-white/25 focus:outline-none focus:border-[#BFFF00]/20 transition-all"
          />
          <button className="absolute right-3 top-1/2 -translate-y-1/2">
            <Filter className="w-4 h-4 text-white/30" />
          </button>
        </div>
      </div>

      {/* Tab Bar */}
      <div className="px-4 pb-2">
        <div className="flex gap-1 p-1 rounded-xl bg-white/[0.03]">
          {(["map", "clubs", "races"] as const).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 py-2 rounded-lg text-[12px] font-medium capitalize transition-all ${
                tab === t ? "bg-white/[0.08] text-white" : "text-white/35"
              }`}
            >
              {t === "map" ? "Routes & Maps" : t === "clubs" ? "Run Clubs" : "Races"}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {/* Map / Routes Tab */}
        {tab === "map" && (
          <motion.div key="map" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {/* Filter Chips */}
            <div className="flex gap-2 overflow-x-auto hide-scrollbar px-4 pb-3">
              {chipFilters.map(chip => (
                <button
                  key={chip}
                  onClick={() => setActiveChip(chip)}
                  className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-medium border transition-all ${
                    activeChip === chip
                      ? "bg-[#BFFF00]/15 border-[#BFFF00]/25 text-[#BFFF00]"
                      : "bg-white/[0.03] border-white/[0.06] text-white/45"
                  }`}
                >
                  {chip}
                  <ChevronDown className="w-3 h-3" />
                </button>
              ))}
            </div>

            {/* Map Placeholder */}
            <div className="mx-4 h-56 rounded-2xl bg-[#0d1117] border border-white/[0.05] overflow-hidden relative mb-3">
              <div className="absolute inset-0">
                {/* Simulated map grid */}
                <svg viewBox="0 0 400 240" className="w-full h-full opacity-20">
                  {Array.from({ length: 20 }).map((_, i) => (
                    <line key={`h${i}`} x1="0" y1={i * 12} x2="400" y2={i * 12} stroke="white" strokeWidth="0.3" />
                  ))}
                  {Array.from({ length: 34 }).map((_, i) => (
                    <line key={`v${i}`} x1={i * 12} y1="0" x2={i * 12} y2="240" stroke="white" strokeWidth="0.3" />
                  ))}
                  <path d="M80,180 Q120,100 180,140 T280,80 T380,120" fill="none" stroke="#BFFF00" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
                  <circle cx="200" cy="120" r="6" fill="#BFFF00" opacity="0.8" />
                  <circle cx="200" cy="120" r="20" fill="#BFFF00" opacity="0.1" />
                </svg>
              </div>
              <div className="absolute bottom-3 left-3 px-2 py-1 rounded-md bg-black/60 backdrop-blur-sm">
                <div className="flex items-center gap-1">
                  <Route className="w-3 h-3 text-[#BFFF00]" />
                  <span className="text-[10px] text-white/60">3 Routes nearby</span>
                </div>
              </div>
              <div className="absolute bottom-3 right-3">
                <button className="w-8 h-8 rounded-lg bg-black/60 backdrop-blur-sm flex items-center justify-center">
                  <Map className="w-4 h-4 text-white/50" />
                </button>
              </div>
            </div>

            {/* Route Suggestions */}
            <div className="px-4">
              <p className="text-[12px] font-semibold text-white/45 uppercase tracking-wider mb-3">Popular Routes</p>
              {[
                { name: "Prospect Park Full Loop", dist: "3.4 mi", elev: "120 ft", rating: 4.8, runners: 2400 },
                { name: "Brooklyn Bridge & Back", dist: "5.2 mi", elev: "85 ft", rating: 4.6, runners: 1800 },
                { name: "East River Greenway", dist: "4.8 mi", elev: "35 ft", rating: 4.5, runners: 3200 },
              ].map((route, i) => (
                <motion.div
                  key={route.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center gap-3 p-3 mb-2 rounded-xl glass-card hover:bg-white/[0.04] transition-colors"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#0d1117] border border-white/[0.05] flex items-center justify-center overflow-hidden">
                    <svg viewBox="0 0 48 48" className="w-full h-full">
                      <path d={`M8,35 Q16,10 28,25 T40,15`} fill="none" stroke="#BFFF00" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-semibold truncate">{route.name}</p>
                    <p className="text-[11px] text-white/35">{route.dist} · {route.elev} gain</p>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="flex items-center gap-0.5 text-[11px] text-[#BFFF00]">
                      <Star className="w-3 h-3" fill="currentColor" />
                      {route.rating}
                    </div>
                    <p className="text-[10px] text-white/25">{route.runners.toLocaleString()} runs</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Run Clubs Tab */}
        {tab === "clubs" && (
          <motion.div key="clubs" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="flex gap-2 overflow-x-auto hide-scrollbar px-4 pb-3">
              {clubFilters.map(f => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`shrink-0 px-3 py-1.5 rounded-full text-[12px] font-medium transition-all ${
                    activeFilter === f
                      ? "bg-[#BFFF00]/15 border border-[#BFFF00]/25 text-[#BFFF00]"
                      : "bg-white/[0.03] border border-white/[0.06] text-white/40"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>

            <div className="px-4 space-y-2">
              {/* Featured Club */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-[#BFFF00]/[0.06] to-[#00E5FF]/[0.03] border border-[#BFFF00]/10 mb-1">
                <div className="flex items-center gap-2 mb-3">
                  <Star className="w-3.5 h-3.5 text-[#BFFF00]" />
                  <span className="text-[10px] text-[#BFFF00] font-semibold uppercase tracking-wider">Featured</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-xl bg-white/[0.05] flex items-center justify-center text-2xl">{runClubs[0].image}</div>
                  <div className="flex-1">
                    <h3 className="text-[15px] font-bold">{runClubs[0].name}</h3>
                    <p className="text-[11px] text-white/40 mt-0.5">{runClubs[0].members} members · {runClubs[0].pace}</p>
                    <p className="text-[11px] text-[#BFFF00] mt-0.5">{runClubs[0].nextRun}</p>
                  </div>
                </div>
                <button className="w-full mt-3 h-9 rounded-xl bg-[#BFFF00]/15 border border-[#BFFF00]/20 text-[12px] font-semibold text-[#BFFF00] hover:bg-[#BFFF00]/20 transition-colors">
                  Join This Run
                </button>
              </div>

              {runClubs.slice(1).map((club, i) => (
                <motion.div
                  key={club.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className="p-3.5 rounded-xl glass-card hover:bg-white/[0.04] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-white/[0.05] flex items-center justify-center text-lg">{club.image}</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-semibold">{club.name}</p>
                      <p className="text-[11px] text-white/35 mt-0.5">{club.city} · {club.members} members</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[11px] text-white/45 flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {club.nextRun}
                        </span>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-[10px] text-white/30">{club.pace}</p>
                      <span className="inline-block mt-1 px-2 py-0.5 rounded-md bg-white/[0.04] text-[10px] text-white/35">{club.vibe}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Races Tab */}
        {tab === "races" && (
          <motion.div key="races" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="px-4 space-y-2">
              {races.map((race, i) => (
                <motion.div
                  key={race.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className={`p-4 rounded-xl border transition-all ${
                    race.registered
                      ? "bg-[#BFFF00]/[0.04] border-[#BFFF00]/12"
                      : "glass-card hover:bg-white/[0.04]"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-xl bg-white/[0.05] flex items-center justify-center text-xl">{race.image}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="text-[13px] font-semibold">{race.name}</h3>
                        {race.registered && (
                          <span className="px-1.5 py-0.5 rounded-md bg-[#BFFF00]/15 text-[9px] text-[#BFFF00] font-semibold">Registered</span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <Calendar className="w-3 h-3 text-white/25" />
                        <span className="text-[11px] text-white/45">
                          {new Date(race.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 mt-0.5">
                        <span className="text-[11px] text-white/35 flex items-center gap-1">
                          <MapPin className="w-3 h-3" /> {race.city}
                        </span>
                        <span className="text-[11px] text-white/25">{race.type}</span>
                      </div>
                    </div>
                    <p className="text-[11px] text-white/25 shrink-0">{race.participants.toLocaleString()}</p>
                  </div>
                  {!race.registered && (
                    <button className="w-full mt-3 h-9 rounded-lg bg-white/[0.04] border border-white/[0.06] text-[12px] font-medium text-white/50 hover:bg-white/[0.06] transition-colors">
                      Register
                    </button>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
