"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import {
  Zap, Target, Users, TrendingUp, Star,
  BarChart3, MapPin, Trophy, Flame, ArrowRight, Play,
  Share2
} from "lucide-react";
import { Logo } from "@/components/shared/logo";

const fadeIn = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
});

const whileInView = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
});

const features = [
  { icon: Target, title: "AI Race Plans", desc: "Personalized training that adapts to your pace, schedule, and goals. From 5K to marathon." },
  { icon: Zap, title: "Cinematic Recaps", desc: "Auto-generated share cards with route art, stats, and your runner identity. Post-worthy by default." },
  { icon: BarChart3, title: "Runner Score", desc: "One number that captures your consistency, speed, and race readiness. Updated every run." },
  { icon: Users, title: "Social Racing", desc: "Compete with friends, join run clubs, and find your local running community." },
  { icon: TrendingUp, title: "Race Predictions", desc: "Projected finish times for 5K through marathon. Know exactly where you stand." },
  { icon: Star, title: "Runner Persona", desc: "Are you The Closer, The Diesel, or The Ghost? Discover your running identity." },
];

const stats = [
  { value: "50K+", label: "Runners" },
  { value: "2.4M", label: "Miles Tracked" },
  { value: "92%", label: "Plan Completion" },
  { value: "4.9", label: "App Rating" },
];

function PhoneMockup() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }}
      className="relative mx-auto w-[280px] sm:w-[300px] float"
    >
      <div className="relative rounded-[2.5rem] border border-white/[0.08] bg-[#111113] p-3 shadow-2xl shadow-black/60">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-[#111113] rounded-b-2xl z-10" />
        <div className="rounded-[2rem] bg-[#08080A] overflow-hidden aspect-[9/19.5] p-4 flex flex-col">
          {/* Mini app preview */}
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#BFFF00]/70 to-[#00E5FF]/50 flex items-center justify-center text-[8px] font-bold text-black">AR</div>
              <div>
                <p className="text-[8px] text-white/30">Good morning</p>
                <p className="text-[10px] font-semibold">Alex</p>
              </div>
            </div>
            <div className="w-6 h-6 rounded-lg bg-[#BFFF00] flex items-center justify-center">
              <Zap className="w-3 h-3 text-black" />
            </div>
          </div>

          {/* Streak */}
          <div className="rounded-xl bg-white/[0.03] border border-white/[0.04] p-2.5 mb-2.5">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5">
                <Flame className="w-3 h-3 text-[#BFFF00]" />
                <span className="text-[8px] text-white/50">8 day streak</span>
              </div>
              <span className="text-[7px] text-[#BFFF00]">Record now</span>
            </div>
            <div className="flex gap-1">
              {["M","T","W","T","F","S","S"].map((d, i) => (
                <div key={i} className={`flex-1 h-5 rounded-sm flex items-center justify-center text-[7px] ${i < 5 ? "bg-[#BFFF00]/15 text-[#BFFF00]" : "text-white/20"}`}>{d}</div>
              ))}
            </div>
          </div>

          {/* Today */}
          <div className="rounded-xl bg-[#BFFF00]/[0.06] border border-[#BFFF00]/10 p-2.5 mb-2.5">
            <p className="text-[7px] text-[#BFFF00] font-semibold uppercase">Today</p>
            <p className="text-[10px] font-bold mt-0.5">Tempo Run · 6 mi</p>
            <div className="mt-2 h-5 rounded-full bg-[#BFFF00] flex items-center justify-center text-[7px] font-bold text-black">
              Start Run
            </div>
          </div>

          {/* Stats */}
          <div className="flex gap-1.5 mb-2.5">
            <div className="flex-1 rounded-lg bg-white/[0.03] border border-white/[0.04] p-2">
              <p className="text-[14px] font-bold">1:47</p>
              <p className="text-[7px] text-white/30">Half pred.</p>
            </div>
            <div className="flex-1 rounded-lg bg-white/[0.03] border border-white/[0.04] p-2">
              <p className="text-[14px] font-bold text-[#BFFF00]">84</p>
              <p className="text-[7px] text-white/30">Score</p>
            </div>
            <div className="flex-1 rounded-lg bg-white/[0.03] border border-white/[0.04] p-2">
              <p className="text-[14px] font-bold">58</p>
              <p className="text-[7px] text-white/30">Days out</p>
            </div>
          </div>

          {/* Activity Card Preview */}
          <div className="rounded-xl bg-white/[0.03] border border-white/[0.04] p-2.5 flex-1">
            <div className="flex items-center gap-1.5 mb-1.5">
              <div className="w-5 h-5 rounded-full bg-white/[0.06] flex items-center justify-center text-[6px] font-bold">JC</div>
              <div>
                <p className="text-[8px] font-medium">Jordan Chen</p>
                <p className="text-[6px] text-white/25">2h ago · Tempo</p>
              </div>
            </div>
            <div className="flex gap-3 text-[7px] text-white/40">
              <span className="font-bold text-white text-[9px]">7.2 mi</span>
              <span>7:35/mi</span>
              <span>54:36</span>
            </div>
            <div className="mt-1.5 h-12 rounded-lg bg-[#0d1117] overflow-hidden">
              <svg viewBox="0 0 160 50" className="w-full h-full opacity-30">
                <path d="M5,35 Q25,8 55,25 T105,15 T155,30" fill="none" stroke="#BFFF00" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute -inset-16 bg-gradient-to-r from-[#BFFF00]/15 via-transparent to-[#00E5FF]/15 blur-3xl -z-10 rounded-full" />
    </motion.div>
  );
}

export default function LandingPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

  return (
    <div className="min-h-screen bg-[#08080A] overflow-hidden">
      {/* Nav */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-[#08080A]/80 backdrop-blur-2xl border-b border-white/[0.03]">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Logo size="sm" />
          <div className="hidden md:flex items-center gap-8 text-[13px] text-white/40">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#personas" className="hover:text-white transition-colors">Personas</a>
            <a href="#community" className="hover:text-white transition-colors">Community</a>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/auth" className="hidden sm:inline-flex text-[13px] text-white/50 hover:text-white transition-colors">
              Log In
            </Link>
            <Link href="/onboarding" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#BFFF00] text-[13px] font-bold text-black hover:shadow-lg hover:shadow-[#BFFF00]/20 transition-all">
              Get Started
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section ref={heroRef} className="relative pt-28 pb-16 px-6">
        <motion.div style={{ opacity: heroOpacity, scale: heroScale }}>
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="text-center lg:text-left">
                <motion.div {...fadeIn(0.1)} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.06] text-[11px] text-white/45 mb-6">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#BFFF00] animate-pulse" />
                  Now in early access
                </motion.div>

                <motion.h1 {...fadeIn(0.2)} className="text-[42px] sm:text-[56px] lg:text-[64px] font-bold tracking-[-0.03em] leading-[1.05] mb-6">
                  Train for your
                  <br />
                  next race like a
                  <br />
                  <span className="text-gradient">Trackstar</span>
                </motion.h1>

                <motion.p {...fadeIn(0.3)} className="text-[16px] sm:text-[18px] text-white/40 max-w-lg mx-auto lg:mx-0 mb-8 leading-relaxed">
                  AI-powered training plans, cinematic run recaps, social motivation, and premium performance insights.
                </motion.p>

                <motion.div {...fadeIn(0.4)} className="flex flex-col sm:flex-row items-center gap-3 justify-center lg:justify-start">
                  <Link href="/onboarding" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[#BFFF00] text-[15px] font-bold text-black hover:shadow-xl hover:shadow-[#BFFF00]/20 transition-all">
                    Start Training Free
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link href="/home" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full border border-white/[0.08] text-[15px] font-medium text-white/60 hover:bg-white/[0.03] transition-all">
                    <Play className="w-4 h-4" /> Explore Demo
                  </Link>
                </motion.div>
              </div>

              <div className="hidden lg:flex justify-center">
                <PhoneMockup />
              </div>
            </div>

            <motion.div {...fadeIn(0.5)} className="lg:hidden mt-8 flex justify-center">
              <PhoneMockup />
            </motion.div>
          </div>
        </motion.div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-gradient-to-r from-[#BFFF00]/[0.03] to-[#00E5FF]/[0.03] blur-[150px] rounded-full -z-10" />
      </section>

      {/* Social Proof */}
      <section className="py-10 border-y border-white/[0.03]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <motion.div key={stat.label} {...whileInView(i * 0.08)} className="text-center">
                <p className="text-[28px] sm:text-[32px] font-bold text-gradient">{stat.value}</p>
                <p className="text-[12px] text-white/30 mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div {...whileInView()} className="text-center mb-14">
            <p className="text-[11px] text-[#BFFF00] font-semibold uppercase tracking-[0.2em] mb-3">Features</p>
            <h2 className="text-[32px] sm:text-[40px] font-bold tracking-tight mb-4">
              Train smarter. Share better. Run harder.
            </h2>
            <p className="text-white/35 max-w-xl mx-auto text-[15px]">
              Every feature designed to make you a better runner and make running feel better.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {features.map((f, i) => (
              <motion.div key={f.title} {...whileInView(i * 0.06)} className="group p-5 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.04] hover:border-white/[0.08] transition-all duration-300">
                <div className="w-10 h-10 rounded-xl bg-[#BFFF00]/[0.08] border border-[#BFFF00]/10 flex items-center justify-center mb-4 group-hover:shadow-md group-hover:shadow-[#BFFF00]/10 transition-shadow">
                  <f.icon className="w-5 h-5 text-[#BFFF00]" />
                </div>
                <h3 className="text-[15px] font-bold mb-1.5">{f.title}</h3>
                <p className="text-[13px] text-white/35 leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Personas */}
      <section id="personas" className="py-20 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <motion.div {...whileInView()} className="text-center mb-14">
            <p className="text-[11px] text-[#00E5FF] font-semibold uppercase tracking-[0.2em] mb-3">Identity</p>
            <h2 className="text-[32px] sm:text-[40px] font-bold tracking-tight mb-4">
              Discover your runner persona
            </h2>
            <p className="text-white/35 max-w-xl mx-auto text-[15px]">
              Every runner has a style. Trackstar identifies yours based on how you train, race, and recover.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { icon: "⚡", name: "The Closer", desc: "Finishes stronger than they start", color: "#BFFF00" },
              { icon: "🔥", name: "The Diesel", desc: "Never stops running", color: "#FF6B35" },
              { icon: "👻", name: "The Ghost", desc: "Silent. Fast. Gone.", color: "#8B5CF6" },
              { icon: "💪", name: "The Grinder", desc: "Every. Single. Day.", color: "#EF4444" },
            ].map((p, i) => (
              <motion.div
                key={p.name}
                {...whileInView(i * 0.08)}
                className="relative overflow-hidden rounded-2xl bg-white/[0.02] border border-white/[0.05] p-6 text-center group hover:border-white/[0.1] transition-all"
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: `radial-gradient(circle at center, ${p.color}08 0%, transparent 70%)` }} />
                <div className="relative">
                  <motion.span
                    className="text-4xl block mb-3"
                    whileHover={{ scale: 1.2, rotate: [0, -5, 5, 0] }}
                    transition={{ duration: 0.4 }}
                  >
                    {p.icon}
                  </motion.span>
                  <p className="font-bold text-[16px] mb-1" style={{ color: p.color }}>{p.name}</p>
                  <p className="text-[12px] text-white/35">{p.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[400px] h-[400px] bg-[#8B5CF6]/[0.04] blur-[100px] rounded-full -z-10" />
      </section>

      {/* Community */}
      <section id="community" className="py-20 px-6 border-t border-white/[0.03]">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <motion.div {...whileInView()}>
              <p className="text-[11px] text-[#BFFF00] font-semibold uppercase tracking-[0.2em] mb-3">Community</p>
              <h2 className="text-[32px] sm:text-[40px] font-bold tracking-tight mb-4">
                Running is better together
              </h2>
              <p className="text-white/35 mb-8 text-[15px] leading-relaxed">
                Find local run clubs, compete with friends, share cinematic recaps, and stay accountable with your crew.
              </p>
              <div className="space-y-3">
                {[
                  { icon: MapPin, text: "Discover run clubs and races near you" },
                  { icon: Trophy, text: "Weekly challenges and friendly competitions" },
                  { icon: Users, text: "Accountability buddies and sync runs" },
                  { icon: Share2, text: "Share-worthy recap cards and cinematic stories" },
                ].map(item => (
                  <div key={item.text} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.05] flex items-center justify-center shrink-0">
                      <item.icon className="w-4 h-4 text-[#BFFF00]" />
                    </div>
                    <span className="text-[13px] text-white/50">{item.text}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div {...whileInView(0.15)} className="space-y-2.5">
              {[
                { name: "Brooklyn Track Club", members: "340 members", next: "Saturday 7AM", vibe: "🏃 Social" },
                { name: "Morning Runners NYC", members: "520 members", next: "Tue & Thu 6:30AM", vibe: "🌅 Early Birds" },
                { name: "Prospect Park Pacers", members: "180 members", next: "Sunday 8AM", vibe: "🌳 Beginner Friendly" },
              ].map((club) => (
                <div key={club.name} className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.04] transition-colors">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[14px] font-semibold">{club.name}</p>
                      <p className="text-[11px] text-white/30 mt-0.5">{club.members} · {club.next}</p>
                    </div>
                    <span className="text-[11px] text-white/40">{club.vibe}</span>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6">
        <motion.div {...whileInView()} className="max-w-3xl mx-auto text-center relative">
          <div className="absolute inset-0 bg-gradient-to-r from-[#BFFF00]/[0.06] to-[#00E5FF]/[0.06] blur-[100px] rounded-full -z-10" />
          <h2 className="text-[36px] sm:text-[48px] font-bold tracking-tight mb-6 leading-[1.1]">
            Become the runner
            <br />
            you said you&apos;d be.
          </h2>
          <p className="text-[16px] text-white/35 mb-10 max-w-md mx-auto">
            Your next PR starts today. Join thousands of runners training with purpose, style, and community.
          </p>
          <Link href="/onboarding" className="inline-flex items-center gap-2 px-10 py-4 rounded-full bg-[#BFFF00] text-[15px] font-bold text-black hover:shadow-xl hover:shadow-[#BFFF00]/20 transition-all">
            Start Training Free
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/[0.03] py-10 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <Logo size="sm" />
          <p className="text-[11px] text-white/20">© 2026 Trackstar. Built for runners who care about more.</p>
        </div>
      </footer>
    </div>
  );
}
