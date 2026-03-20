"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronLeft, Share2 } from "lucide-react";
import { personas, currentUser } from "@/lib/mock-data";

export default function PersonaPage() {
  const persona = personas[currentUser.persona];
  const allPersonas = Object.values(personas);

  return (
    <div className="px-5 pt-14 pb-4 max-w-lg mx-auto">
      <Link href="/(app)/home" className="flex items-center gap-1 text-sm text-white/40 mb-6">
        <ChevronLeft className="w-4 h-4" /> Back
      </Link>

      {/* Main Persona Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative overflow-hidden rounded-3xl border border-white/[0.08] p-8 mb-8"
      >
        <div className={`absolute inset-0 bg-gradient-to-br ${persona.gradient} opacity-10`} />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.05)_0%,transparent_60%)]" />
        <div className="relative text-center">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", damping: 12, delay: 0.2 }}
            className="text-6xl mb-4"
          >
            {persona.icon}
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-3xl font-bold mb-2"
            style={{ color: persona.color }}
          >
            {persona.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-lg text-white/60 italic mb-4"
          >
            &ldquo;{persona.tagline}&rdquo;
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-sm text-white/40 leading-relaxed max-w-sm mx-auto"
          >
            {persona.description}
          </motion.p>
        </div>
      </motion.div>

      {/* Traits */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mb-6"
      >
        <h3 className="text-xs text-white/40 uppercase tracking-wider mb-3">Style Traits</h3>
        <div className="flex flex-wrap gap-2">
          {persona.traits.map(trait => (
            <span key={trait} className="px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.06] text-xs text-white/60">
              {trait}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Strengths */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mb-8"
      >
        <h3 className="text-xs text-white/40 uppercase tracking-wider mb-3">Strengths</h3>
        <div className="grid grid-cols-2 gap-2">
          {persona.strengths.map((strength, i) => (
            <div key={strength} className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
              <div className="w-1.5 h-1.5 rounded-full mb-2" style={{ backgroundColor: persona.color }} />
              <p className="text-sm font-medium">{strength}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Share */}
      <button className="w-full h-12 rounded-xl bg-gradient-to-r from-[#BFFF00] to-[#9ACC00] flex items-center justify-center gap-2 text-sm font-bold text-black mb-8">
        <Share2 className="w-4 h-4" /> Share Your Persona
      </button>

      {/* All Personas */}
      <div>
        <h3 className="text-sm font-semibold mb-4">All Personas</h3>
        <div className="space-y-3">
          {allPersonas.map(p => (
            <div
              key={p.title}
              className={`p-4 rounded-xl border transition-all ${
                p.title === currentUser.persona
                  ? "bg-white/[0.05] border-white/[0.1]"
                  : "bg-white/[0.02] border-white/[0.06]"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{p.icon}</span>
                <div className="flex-1">
                  <p className="font-semibold text-sm" style={{ color: p.color }}>{p.title}</p>
                  <p className="text-xs text-white/40">{p.tagline}</p>
                </div>
                {p.title === currentUser.persona && (
                  <span className="text-[10px] text-[#BFFF00] font-medium px-2 py-1 rounded-full bg-[#BFFF00]/10">You</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
