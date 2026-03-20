"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Zap, Target, Users, TrendingUp, Star, ChevronRight,
  BarChart3, MapPin, Trophy, Flame, ArrowRight
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

const features = [
  {
    icon: Target,
    title: "AI Race Plans",
    description: "Personalized training that adapts to your pace, schedule, and race goals.",
  },
  {
    icon: Zap,
    title: "Cinematic Recaps",
    description: "Beautiful share-worthy run cards with route art, stats, and your runner identity.",
  },
  {
    icon: BarChart3,
    title: "Runner Score",
    description: "A single number that captures your consistency, speed, and race readiness.",
  },
  {
    icon: Users,
    title: "Social Racing",
    description: "Compete with friends, join run clubs, and find your local running community.",
  },
  {
    icon: TrendingUp,
    title: "Race Predictions",
    description: "Know your projected finish time for 5K through marathon, updated every week.",
  },
  {
    icon: Star,
    title: "Runner Persona",
    description: "Discover your running identity — are you The Closer, The Diesel, or The Ghost?",
  },
];

const stats = [
  { value: "50K+", label: "Active Runners" },
  { value: "2.4M", label: "Miles Tracked" },
  { value: "92%", label: "Plan Completion" },
  { value: "4.9★", label: "App Rating" },
];

function PhoneMockup() {
  return (
    <div className="relative mx-auto w-[280px] sm:w-[320px]">
      <div className="relative rounded-[2.5rem] border border-white/10 bg-[#111113] p-3 shadow-2xl shadow-black/50">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-7 bg-[#111113] rounded-b-2xl z-10" />
        <div className="rounded-[2rem] bg-[#0A0A0C] overflow-hidden aspect-[9/19.5] p-5 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-[10px] text-white/40 uppercase tracking-wider">Good morning</p>
              <p className="text-sm font-semibold text-white">Alex Rivera</p>
            </div>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#BFFF00] to-[#00E5FF] flex items-center justify-center text-[10px] font-bold text-black">84</div>
          </div>

          <div className="rounded-2xl bg-white/[0.04] border border-white/[0.06] p-4 mb-3">
            <p className="text-[10px] text-[#BFFF00] font-medium uppercase tracking-wider mb-1">Today&apos;s Run</p>
            <p className="text-sm font-semibold">Tempo Run · 6 mi</p>
            <p className="text-[10px] text-white/50 mt-1">Target pace: 7:45/mi</p>
            <div className="mt-3 h-7 rounded-full bg-gradient-to-r from-[#BFFF00] to-[#9ACC00] flex items-center justify-center text-[10px] font-bold text-black">
              Start Run
            </div>
          </div>

          <div className="flex gap-2 mb-3">
            <div className="flex-1 rounded-xl bg-white/[0.04] border border-white/[0.06] p-3">
              <p className="text-[9px] text-white/40 uppercase">Streak</p>
              <p className="text-lg font-bold text-[#BFFF00]">8</p>
              <p className="text-[9px] text-white/40">days</p>
            </div>
            <div className="flex-1 rounded-xl bg-white/[0.04] border border-white/[0.06] p-3">
              <p className="text-[9px] text-white/40 uppercase">Race</p>
              <p className="text-lg font-bold">58</p>
              <p className="text-[9px] text-white/40">days out</p>
            </div>
          </div>

          <div className="rounded-xl bg-gradient-to-br from-[#BFFF00]/10 to-[#00E5FF]/5 border border-white/[0.06] p-3 mb-3">
            <p className="text-[9px] text-white/50 uppercase">Predicted Half</p>
            <p className="text-xl font-bold tracking-tight">1:47:32</p>
            <p className="text-[9px] text-[#BFFF00]">↑ 2:14 faster than last month</p>
          </div>

          <div className="rounded-xl bg-white/[0.04] border border-white/[0.06] p-3">
            <div className="flex items-center gap-2">
              <div className="text-base">⚡</div>
              <div>
                <p className="text-[10px] font-semibold">The Closer</p>
                <p className="text-[9px] text-white/40">You finish stronger than you start</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute -inset-20 bg-gradient-to-r from-[#BFFF00]/20 via-transparent to-[#00E5FF]/20 blur-3xl -z-10 rounded-full" />
    </div>
  );
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0C] overflow-hidden">
      {/* Nav */}
      <nav className="fixed top-0 inset-x-0 z-50 border-b border-white/[0.04] bg-[#0A0A0C]/80 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#BFFF00] to-[#00E5FF] flex items-center justify-center">
              <Zap className="w-4 h-4 text-black" />
            </div>
            <span className="text-lg font-bold tracking-tight">Trackstar</span>
          </Link>
          <div className="hidden md:flex items-center gap-8 text-sm text-white/60">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#social" className="hover:text-white transition-colors">Community</a>
            <a href="#personas" className="hover:text-white transition-colors">Personas</a>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/auth"
              className="hidden sm:inline-flex text-sm text-white/70 hover:text-white transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/onboarding"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-[#BFFF00] to-[#9ACC00] text-sm font-semibold text-black hover:shadow-lg hover:shadow-[#BFFF00]/20 transition-all"
            >
              Start Training
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial="hidden"
              animate="visible"
              className="text-center lg:text-left"
            >
              <motion.div custom={0} variants={fadeUp} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.05] border border-white/[0.08] text-xs text-white/60 mb-6">
                <Flame className="w-3 h-3 text-[#BFFF00]" />
                Now in early access
              </motion.div>
              <motion.h1 custom={1} variants={fadeUp} className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-6">
                Train for your next race like a{" "}
                <span className="text-gradient">Trackstar</span>
              </motion.h1>
              <motion.p custom={2} variants={fadeUp} className="text-lg text-white/50 max-w-lg mx-auto lg:mx-0 mb-8 leading-relaxed">
                AI plans, cinematic run recaps, social motivation, and premium performance insights — for runners who care about more than just miles.
              </motion.p>
              <motion.div custom={3} variants={fadeUp} className="flex flex-col sm:flex-row items-center gap-3 justify-center lg:justify-start">
                <Link
                  href="/onboarding"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#BFFF00] to-[#9ACC00] text-base font-bold text-black hover:shadow-xl hover:shadow-[#BFFF00]/25 transition-all"
                >
                  Start Training
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/(app)/home"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full border border-white/10 text-base font-medium text-white/80 hover:bg-white/[0.04] transition-all"
                >
                  Explore Demo
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="hidden lg:block"
            >
              <PhoneMockup />
            </motion.div>
          </div>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-[#BFFF00]/[0.04] to-[#00E5FF]/[0.04] blur-[120px] rounded-full -z-10" />
      </section>

      {/* Social Proof */}
      <section className="py-12 border-y border-white/[0.04]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="text-center"
              >
                <p className="text-2xl sm:text-3xl font-bold text-gradient">{stat.value}</p>
                <p className="text-sm text-white/40 mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-sm text-[#BFFF00] font-medium uppercase tracking-wider mb-3">Everything you need</p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Train smarter. Share better. Run harder.
            </h2>
            <p className="text-white/40 max-w-2xl mx-auto">
              Every feature designed to make you a better runner and make running feel better.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="group p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.04] hover:border-white/[0.1] transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#BFFF00]/20 to-[#00E5FF]/10 flex items-center justify-center mb-4 group-hover:shadow-lg group-hover:shadow-[#BFFF00]/10 transition-shadow">
                  <feature.icon className="w-5 h-5 text-[#BFFF00]" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-white/40 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Persona Preview */}
      <section id="personas" className="py-24 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-sm text-[#00E5FF] font-medium uppercase tracking-wider mb-3">Runner Identity</p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Discover your persona
            </h2>
            <p className="text-white/40 max-w-2xl mx-auto">
              Every runner has a style. Trackstar identifies yours based on how you train, race, and recover.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: "⚡", name: "The Closer", desc: "Finishes stronger than they start", color: "#BFFF00" },
              { icon: "🔥", name: "The Diesel", desc: "Never stops running", color: "#FF6B35" },
              { icon: "👻", name: "The Ghost", desc: "Silent. Fast. Gone.", color: "#8B5CF6" },
              { icon: "💪", name: "The Grinder", desc: "Every. Single. Day.", color: "#EF4444" },
            ].map((persona, i) => (
              <motion.div
                key={persona.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="relative overflow-hidden rounded-2xl bg-white/[0.02] border border-white/[0.06] p-6 text-center hover:border-white/[0.12] transition-all group"
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: `radial-gradient(circle at center, ${persona.color}10 0%, transparent 70%)` }} />
                <div className="relative">
                  <div className="text-4xl mb-3">{persona.icon}</div>
                  <p className="font-bold text-lg mb-1" style={{ color: persona.color }}>{persona.name}</p>
                  <p className="text-sm text-white/40">{persona.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[400px] h-[400px] bg-[#8B5CF6]/[0.06] blur-[100px] rounded-full -z-10" />
      </section>

      {/* Social / Community */}
      <section id="social" className="py-24 px-6 border-t border-white/[0.04]">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-sm text-[#BFFF00] font-medium uppercase tracking-wider mb-3">Community</p>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
                Running is better together
              </h2>
              <p className="text-white/40 mb-8 leading-relaxed">
                Find local run clubs, compete with friends, share cinematic recaps, and stay accountable with your crew.
              </p>
              <div className="space-y-4">
                {[
                  { icon: MapPin, text: "Discover run clubs and races near you" },
                  { icon: Trophy, text: "Weekly challenges and friendly competitions" },
                  { icon: Users, text: "Accountability buddies and sync runs" },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-3 text-sm text-white/60">
                    <div className="w-8 h-8 rounded-lg bg-white/[0.05] flex items-center justify-center shrink-0">
                      <item.icon className="w-4 h-4 text-[#BFFF00]" />
                    </div>
                    {item.text}
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="space-y-3"
            >
              {[
                { name: "Brooklyn Track Club", members: "340 members", next: "Saturday 7AM", vibe: "🏃 Social & Competitive" },
                { name: "Morning Runners NYC", members: "520 members", next: "Tue & Thu 6:30AM", vibe: "🌅 Early Birds" },
                { name: "Prospect Park Pacers", members: "180 members", next: "Sunday 8AM", vibe: "🌳 Beginner Friendly" },
              ].map((club) => (
                <div key={club.name} className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.05] transition-colors">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-sm">{club.name}</p>
                      <p className="text-xs text-white/40 mt-0.5">{club.members} · {club.next}</p>
                    </div>
                    <span className="text-xs text-white/50">{club.vibe}</span>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#BFFF00]/10 to-[#00E5FF]/10 blur-[80px] rounded-full -z-10" />
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight mb-6">
            Become the runner you said you&apos;d be.
          </h2>
          <p className="text-lg text-white/40 mb-10 max-w-xl mx-auto">
            Your next PR starts today. Join thousands of runners training with purpose, style, and community.
          </p>
          <Link
            href="/onboarding"
            className="inline-flex items-center gap-2 px-10 py-4 rounded-full bg-gradient-to-r from-[#BFFF00] to-[#9ACC00] text-base font-bold text-black hover:shadow-xl hover:shadow-[#BFFF00]/25 transition-all"
          >
            Start Training Free
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/[0.04] py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-[#BFFF00] to-[#00E5FF] flex items-center justify-center">
              <Zap className="w-3 h-3 text-black" />
            </div>
            <span className="text-sm font-semibold">Trackstar</span>
          </div>
          <p className="text-xs text-white/30">© 2026 Trackstar. Built for runners who care about more.</p>
        </div>
      </footer>
    </div>
  );
}
