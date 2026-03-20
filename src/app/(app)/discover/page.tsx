"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import {
  MapPin, Users, Calendar, ChevronRight, Search,
  Filter, Star, Clock
} from "lucide-react";
import { runClubs, races } from "@/lib/mock-data";

const filters = ["All", "Beginner", "Social", "Competitive", "Morning", "Evening"];

export default function DiscoverPage() {
  const [tab, setTab] = useState<"clubs" | "races">("clubs");
  const [activeFilter, setActiveFilter] = useState("All");
  const [search, setSearch] = useState("");

  return (
    <div className="px-5 pt-14 pb-4 max-w-lg mx-auto">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold mb-2">Discover</h1>
        <p className="text-sm text-white/40 mb-6">Find run clubs, races, and events near you.</p>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search clubs, races, events..."
            className="w-full h-11 pl-10 pr-4 rounded-xl bg-white/[0.04] border border-white/[0.06] text-sm placeholder:text-white/25 focus:outline-none focus:border-white/15 transition-all"
          />
        </div>

        {/* Tab Toggle */}
        <div className="flex gap-1 p-1 rounded-xl bg-white/[0.04] mb-4">
          {(["clubs", "races"] as const).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 py-2 rounded-lg text-xs font-medium capitalize transition-all ${
                tab === t ? "bg-white/[0.08] text-white" : "text-white/40"
              }`}
            >
              {t === "clubs" ? "Run Clubs" : "Races & Events"}
            </button>
          ))}
        </div>

        {/* Filters */}
        <div className="flex gap-2 overflow-x-auto hide-scrollbar mb-6 pb-1">
          {filters.map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                activeFilter === filter
                  ? "bg-[#BFFF00]/15 border border-[#BFFF00]/30 text-[#BFFF00]"
                  : "bg-white/[0.04] border border-white/[0.06] text-white/40"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Run Clubs */}
        {tab === "clubs" && (
          <div className="space-y-3">
            {/* Featured */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-[#BFFF00]/8 to-[#00E5FF]/5 border border-white/[0.08] mb-2">
              <div className="flex items-center gap-2 mb-2">
                <Star className="w-4 h-4 text-[#BFFF00]" />
                <span className="text-xs text-[#BFFF00] font-medium uppercase tracking-wider">Featured</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-white/[0.05] flex items-center justify-center text-2xl">
                  {runClubs[0].image}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold">{runClubs[0].name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-white/40 flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> {runClubs[0].city}
                    </span>
                    <span className="text-xs text-white/40 flex items-center gap-1">
                      <Users className="w-3 h-3" /> {runClubs[0].members}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className="text-xs text-[#BFFF00]">{runClubs[0].nextRun}</span>
                    <span className="text-xs text-white/30">· {runClubs[0].pace}</span>
                  </div>
                </div>
              </div>
              <button className="w-full mt-4 h-10 rounded-xl bg-[#BFFF00]/15 border border-[#BFFF00]/20 text-xs font-semibold text-[#BFFF00]">
                Join This Run
              </button>
            </div>

            {runClubs.slice(1).map((club, i) => (
              <motion.div
                key={club.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.04] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-white/[0.05] flex items-center justify-center text-xl">
                    {club.image}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm">{club.name}</h3>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs text-white/40">{club.city}</span>
                      <span className="text-xs text-white/30">· {club.members} members</span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <Clock className="w-3 h-3 text-white/25" />
                      <span className="text-xs text-white/50">{club.nextRun}</span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-[10px] text-white/30 block mb-1">{club.pace}</span>
                    <span className="px-2 py-1 rounded-md bg-white/[0.04] text-[10px] text-white/40">{club.vibe}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Races */}
        {tab === "races" && (
          <div className="space-y-3">
            {races.map((race, i) => (
              <motion.div
                key={race.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className={`p-4 rounded-xl border transition-all ${
                  race.registered
                    ? "bg-[#BFFF00]/5 border-[#BFFF00]/15"
                    : "bg-white/[0.03] border-white/[0.06] hover:bg-white/[0.04]"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-xl bg-white/[0.05] flex items-center justify-center text-xl">
                    {race.image}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-sm">{race.name}</h3>
                      {race.registered && (
                        <span className="px-1.5 py-0.5 rounded-md bg-[#BFFF00]/20 text-[9px] text-[#BFFF00] font-medium">Registered</span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <Calendar className="w-3 h-3 text-white/25" />
                      <span className="text-xs text-white/50">{new Date(race.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <MapPin className="w-3 h-3 text-white/25" />
                      <span className="text-xs text-white/40">{race.city}</span>
                      <span className="text-xs text-white/30">· {race.type}</span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-xs text-white/30">{race.participants.toLocaleString()}</span>
                    <p className="text-[10px] text-white/20">runners</p>
                  </div>
                </div>
                {!race.registered && (
                  <button className="w-full mt-3 h-9 rounded-lg bg-white/[0.05] border border-white/[0.06] text-xs font-medium text-white/60 hover:bg-white/[0.08] transition-colors">
                    Register
                  </button>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
