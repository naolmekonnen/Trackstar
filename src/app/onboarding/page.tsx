"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Zap, ArrowRight, ArrowLeft, Check, MapPin, Target,
  Calendar, Gauge, Timer, Users, Watch, Bell
} from "lucide-react";

const steps = [
  { id: "welcome", title: "Let's build your plan", subtitle: "Tell us about yourself" },
  { id: "basics", title: "The basics", subtitle: "Name and location" },
  { id: "level", title: "Running experience", subtitle: "Where are you now?" },
  { id: "race", title: "Your target race", subtitle: "What are you training for?" },
  { id: "details", title: "Current fitness", subtitle: "Help us personalize your plan" },
  { id: "goals", title: "Your goals", subtitle: "What drives you?" },
  { id: "schedule", title: "Training schedule", subtitle: "When do you run?" },
  { id: "connect", title: "Connect devices", subtitle: "Sync your wearables" },
  { id: "result", title: "You're ready", subtitle: "Your personalized plan is set" },
];

const raceTy = ["5K", "10K", "Half Marathon", "Marathon"];
const levels = ["Beginner", "Intermediate", "Advanced"];
const goals = ["Finish my race", "Set a PR", "Build consistency", "Lose weight", "Social running", "Stay accountable"];
const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    name: "", location: "", level: "", race: "", raceDate: "",
    weeklyMiles: "", bestPace: "", selectedGoals: [] as string[],
    trainingDays: ["Mon", "Wed", "Thu", "Sat"] as string[],
    accountability: true,
  });

  const next = () => step < steps.length - 1 && setStep(step + 1);
  const prev = () => step > 0 && setStep(step - 1);
  const toggleGoal = (g: string) => {
    setForm(f => ({
      ...f,
      selectedGoals: f.selectedGoals.includes(g) ? f.selectedGoals.filter(x => x !== g) : [...f.selectedGoals, g],
    }));
  };
  const toggleDay = (d: string) => {
    setForm(f => ({
      ...f,
      trainingDays: f.trainingDays.includes(d) ? f.trainingDays.filter(x => x !== d) : [...f.trainingDays, d],
    }));
  };

  const progress = ((step + 1) / steps.length) * 100;

  return (
    <div className="min-h-screen bg-[#0A0A0C] flex flex-col">
      {/* Progress */}
      <div className="fixed top-0 inset-x-0 z-50 bg-[#0A0A0C]/90 backdrop-blur-xl">
        <div className="h-1 bg-white/[0.04]">
          <motion.div
            className="h-full bg-gradient-to-r from-[#BFFF00] to-[#00E5FF]"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
        <div className="max-w-lg mx-auto px-6 h-14 flex items-center justify-between">
          <button
            onClick={prev}
            disabled={step === 0}
            className="w-8 h-8 rounded-full flex items-center justify-center text-white/40 hover:text-white disabled:opacity-0 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-[#BFFF00]" />
            <span className="text-sm font-semibold">Trackstar</span>
          </div>
          <span className="text-xs text-white/30">{step + 1}/{steps.length}</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center px-6 pt-20 pb-32">
        <div className="w-full max-w-lg">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {step === 0 && (
                <div className="text-center">
                  <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#BFFF00] to-[#00E5FF] flex items-center justify-center mx-auto mb-8"
                  >
                    <Zap className="w-10 h-10 text-black" />
                  </motion.div>
                  <h1 className="text-3xl font-bold mb-3">Welcome to Trackstar</h1>
                  <p className="text-white/40 mb-2">In just a few steps, we&apos;ll create your:</p>
                  <div className="space-y-2 mt-6 text-left max-w-xs mx-auto">
                    {["AI training plan", "Runner persona", "Race prediction", "Runner score baseline"].map(item => (
                      <div key={item} className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                        <div className="w-6 h-6 rounded-full bg-[#BFFF00]/20 flex items-center justify-center">
                          <Check className="w-3 h-3 text-[#BFFF00]" />
                        </div>
                        <span className="text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {step === 1 && (
                <div>
                  <h2 className="text-2xl font-bold mb-1">{steps[step].title}</h2>
                  <p className="text-sm text-white/40 mb-8">{steps[step].subtitle}</p>
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs text-white/50 uppercase tracking-wider mb-2 block">Your name</label>
                      <input value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="Alex Rivera" className="w-full h-12 px-4 rounded-xl bg-white/[0.05] border border-white/[0.08] text-sm placeholder:text-white/20 focus:outline-none focus:border-[#BFFF00]/30 transition-all" />
                    </div>
                    <div>
                      <label className="text-xs text-white/50 uppercase tracking-wider mb-2 block">Location</label>
                      <div className="relative">
                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                        <input value={form.location} onChange={e => setForm({...form, location: e.target.value})} placeholder="Brooklyn, NY" className="w-full h-12 pl-10 pr-4 rounded-xl bg-white/[0.05] border border-white/[0.08] text-sm placeholder:text-white/20 focus:outline-none focus:border-[#BFFF00]/30 transition-all" />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div>
                  <h2 className="text-2xl font-bold mb-1">{steps[step].title}</h2>
                  <p className="text-sm text-white/40 mb-8">{steps[step].subtitle}</p>
                  <div className="space-y-3">
                    {levels.map(level => (
                      <button
                        key={level}
                        onClick={() => setForm({...form, level})}
                        className={`w-full p-4 rounded-xl border text-left transition-all ${form.level === level ? "bg-[#BFFF00]/10 border-[#BFFF00]/30" : "bg-white/[0.03] border-white/[0.06] hover:bg-white/[0.05]"}`}
                      >
                        <p className="font-semibold text-sm">{level}</p>
                        <p className="text-xs text-white/40 mt-0.5">
                          {level === "Beginner" && "New to running or coming back after a break"}
                          {level === "Intermediate" && "Running regularly, comfortable with 5K-10K"}
                          {level === "Advanced" && "Experienced racer with consistent training"}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 3 && (
                <div>
                  <h2 className="text-2xl font-bold mb-1">{steps[step].title}</h2>
                  <p className="text-sm text-white/40 mb-8">{steps[step].subtitle}</p>
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {raceTy.map(race => (
                      <button
                        key={race}
                        onClick={() => setForm({...form, race})}
                        className={`p-4 rounded-xl border text-center transition-all ${form.race === race ? "bg-[#BFFF00]/10 border-[#BFFF00]/30" : "bg-white/[0.03] border-white/[0.06] hover:bg-white/[0.05]"}`}
                      >
                        <Target className={`w-5 h-5 mx-auto mb-2 ${form.race === race ? "text-[#BFFF00]" : "text-white/30"}`} />
                        <p className="font-semibold text-sm">{race}</p>
                      </button>
                    ))}
                  </div>
                  <div>
                    <label className="text-xs text-white/50 uppercase tracking-wider mb-2 block">Race date</label>
                    <div className="relative">
                      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                      <input type="date" value={form.raceDate} onChange={e => setForm({...form, raceDate: e.target.value})} className="w-full h-12 pl-10 pr-4 rounded-xl bg-white/[0.05] border border-white/[0.08] text-sm focus:outline-none focus:border-[#BFFF00]/30 transition-all [color-scheme:dark]" />
                    </div>
                  </div>
                </div>
              )}

              {step === 4 && (
                <div>
                  <h2 className="text-2xl font-bold mb-1">{steps[step].title}</h2>
                  <p className="text-sm text-white/40 mb-8">{steps[step].subtitle}</p>
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs text-white/50 uppercase tracking-wider mb-2 block">Current weekly mileage</label>
                      <div className="relative">
                        <Gauge className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                        <input value={form.weeklyMiles} onChange={e => setForm({...form, weeklyMiles: e.target.value})} placeholder="e.g. 20 miles" className="w-full h-12 pl-10 pr-4 rounded-xl bg-white/[0.05] border border-white/[0.08] text-sm placeholder:text-white/20 focus:outline-none focus:border-[#BFFF00]/30 transition-all" />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs text-white/50 uppercase tracking-wider mb-2 block">Best recent pace (per mile)</label>
                      <div className="relative">
                        <Timer className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                        <input value={form.bestPace} onChange={e => setForm({...form, bestPace: e.target.value})} placeholder="e.g. 8:30" className="w-full h-12 pl-10 pr-4 rounded-xl bg-white/[0.05] border border-white/[0.08] text-sm placeholder:text-white/20 focus:outline-none focus:border-[#BFFF00]/30 transition-all" />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {step === 5 && (
                <div>
                  <h2 className="text-2xl font-bold mb-1">{steps[step].title}</h2>
                  <p className="text-sm text-white/40 mb-8">{steps[step].subtitle}</p>
                  <div className="grid grid-cols-2 gap-3">
                    {goals.map(goal => (
                      <button
                        key={goal}
                        onClick={() => toggleGoal(goal)}
                        className={`p-3 rounded-xl border text-sm transition-all ${form.selectedGoals.includes(goal) ? "bg-[#BFFF00]/10 border-[#BFFF00]/30 text-white" : "bg-white/[0.03] border-white/[0.06] text-white/60 hover:bg-white/[0.05]"}`}
                      >
                        {goal}
                      </button>
                    ))}
                  </div>
                  <div className="mt-6 p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">Accountability pressure</p>
                        <p className="text-xs text-white/40">Get reminders and nudges when you miss runs</p>
                      </div>
                      <button
                        onClick={() => setForm({...form, accountability: !form.accountability})}
                        className={`w-10 h-6 rounded-full transition-colors ${form.accountability ? "bg-[#BFFF00]" : "bg-white/10"}`}
                      >
                        <motion.div
                          className="w-4 h-4 rounded-full bg-white shadow-sm mx-1"
                          animate={{ x: form.accountability ? 16 : 0 }}
                          transition={{ duration: 0.2 }}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {step === 6 && (
                <div>
                  <h2 className="text-2xl font-bold mb-1">{steps[step].title}</h2>
                  <p className="text-sm text-white/40 mb-8">{steps[step].subtitle}</p>
                  <div className="flex gap-2 mb-8">
                    {days.map(day => (
                      <button
                        key={day}
                        onClick={() => toggleDay(day)}
                        className={`flex-1 py-3 rounded-xl border text-xs font-medium transition-all ${form.trainingDays.includes(day) ? "bg-[#BFFF00]/10 border-[#BFFF00]/30 text-[#BFFF00]" : "bg-white/[0.03] border-white/[0.06] text-white/40 hover:bg-white/[0.05]"}`}
                      >
                        {day}
                      </button>
                    ))}
                  </div>
                  <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                    <div className="flex items-center gap-3">
                      <Users className="w-5 h-5 text-[#BFFF00]" />
                      <div>
                        <p className="text-sm font-medium">Local run club recommendations</p>
                        <p className="text-xs text-white/40">We&apos;ll suggest clubs and events near you</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {step === 7 && (
                <div>
                  <h2 className="text-2xl font-bold mb-1">{steps[step].title}</h2>
                  <p className="text-sm text-white/40 mb-8">{steps[step].subtitle}</p>
                  <div className="space-y-3">
                    {[
                      { name: "Apple Watch", icon: Watch, connected: false },
                      { name: "Garmin", icon: Gauge, connected: false },
                      { name: "Strava", icon: Zap, connected: false },
                      { name: "Fitbit", icon: Watch, connected: false },
                    ].map(device => (
                      <button
                        key={device.name}
                        className="w-full p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.05] transition-colors flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <device.icon className="w-5 h-5 text-white/40" />
                          <span className="text-sm font-medium">{device.name}</span>
                        </div>
                        <span className="text-xs text-white/30">Connect</span>
                      </button>
                    ))}
                  </div>
                  <div className="mt-6 p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center gap-3">
                    <Bell className="w-5 h-5 text-white/40" />
                    <div>
                      <p className="text-sm font-medium">Enable notifications</p>
                      <p className="text-xs text-white/40">Get workout reminders and coaching updates</p>
                    </div>
                  </div>
                </div>
              )}

              {step === 8 && (
                <div className="text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", damping: 12 }}
                    className="w-20 h-20 rounded-full bg-gradient-to-br from-[#BFFF00] to-[#00E5FF] flex items-center justify-center mx-auto mb-8"
                  >
                    <Check className="w-10 h-10 text-black" />
                  </motion.div>
                  <h1 className="text-3xl font-bold mb-3">You&apos;re all set</h1>
                  <p className="text-white/40 mb-8">Your personalized plan is ready.</p>

                  <div className="space-y-3 text-left max-w-xs mx-auto mb-8">
                    <div className="p-4 rounded-xl bg-gradient-to-r from-[#BFFF00]/10 to-[#00E5FF]/5 border border-white/[0.08]">
                      <p className="text-xs text-white/50 uppercase tracking-wider">Runner Score</p>
                      <p className="text-3xl font-bold text-[#BFFF00]">84</p>
                    </div>
                    <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                      <p className="text-xs text-white/50 uppercase tracking-wider">Your Persona</p>
                      <p className="text-lg font-bold">⚡ The Closer</p>
                      <p className="text-xs text-white/40">You finish stronger than you start</p>
                    </div>
                    <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                      <p className="text-xs text-white/50 uppercase tracking-wider">Predicted Half Marathon</p>
                      <p className="text-2xl font-bold">1:47:32</p>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="fixed bottom-0 inset-x-0 p-6 bg-gradient-to-t from-[#0A0A0C] via-[#0A0A0C] to-transparent">
        <div className="max-w-lg mx-auto">
          <button
            onClick={() => step === steps.length - 1 ? router.push("/(app)/home") : next()}
            className="w-full flex items-center justify-center gap-2 h-14 rounded-2xl bg-gradient-to-r from-[#BFFF00] to-[#9ACC00] text-base font-bold text-black hover:shadow-lg hover:shadow-[#BFFF00]/20 transition-all"
          >
            {step === steps.length - 1 ? "Enter Trackstar" : "Continue"}
            <ArrowRight className="w-4 h-4" />
          </button>
          {step > 0 && step < steps.length - 1 && (
            <button onClick={next} className="w-full mt-3 text-sm text-white/30 hover:text-white/50 transition-colors">
              Skip for now
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
