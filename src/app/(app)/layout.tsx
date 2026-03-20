"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Compass, Users, User, Search, Bell, MessageSquare } from "lucide-react";

const tabs = [
  { href: "/home", label: "Home", icon: Home },
  { href: "/discover", label: "Explore", icon: Compass },
  { href: "/run", label: "Record", icon: null },
  { href: "/social", label: "Social", icon: Users },
  { href: "/profile", label: "You", icon: User },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const isActive = (href: string) =>
    pathname === href || (href !== "/" && pathname.startsWith(href + "/"));

  return (
    <div className="min-h-screen bg-[#08080A] flex flex-col">
      {/* Top Bar */}
      <header className="fixed top-0 inset-x-0 z-50 bg-[#08080A]/90 backdrop-blur-2xl border-b border-white/[0.04]">
        <div className="max-w-lg mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/profile">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#BFFF00]/80 to-[#00E5FF]/60 flex items-center justify-center text-[10px] font-bold text-black ring-2 ring-white/10">
                AR
              </div>
            </Link>
            <Link href="/home">
              <Search className="w-[18px] h-[18px] text-white/40 hover:text-white/70 transition-colors" />
            </Link>
          </div>

          <Link href="/home" className="flex items-center gap-1.5">
            <div className="w-6 h-6 rounded-lg bg-[#BFFF00] flex items-center justify-center">
              <svg className="w-3 h-3 text-black" viewBox="0 0 24 24" fill="currentColor">
                <path d="M13 2L4.09 12.41C3.74 12.84 3.57 13.06 3.58 13.24C3.58 13.4 3.65 13.56 3.78 13.66C3.92 13.78 4.21 13.78 4.77 13.78H12L11 22L19.91 11.59C20.26 11.16 20.43 10.94 20.42 10.76C20.42 10.6 20.35 10.44 20.22 10.34C20.08 10.22 19.79 10.22 19.23 10.22H12L13 2Z" />
              </svg>
            </div>
            <span className="text-sm font-bold tracking-tight">
              track<span className="text-[#BFFF00]">star</span>
            </span>
          </Link>

          <div className="flex items-center gap-3">
            <button className="relative">
              <MessageSquare className="w-[18px] h-[18px] text-white/40 hover:text-white/70 transition-colors" />
            </button>
            <button className="relative">
              <Bell className="w-[18px] h-[18px] text-white/40 hover:text-white/70 transition-colors" />
              <div className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#BFFF00]" />
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 pt-14 pb-22">
        <AnimatePresence mode="wait">
          <motion.div
            key={pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Bottom Navigation — Strava-style */}
      <nav className="fixed bottom-0 inset-x-0 z-50 bg-[#08080A]/95 backdrop-blur-2xl border-t border-white/[0.05]">
        <div className="max-w-lg mx-auto px-3 h-[72px] flex items-center justify-around">
          {tabs.map((tab) => {
            const active = isActive(tab.href);

            if (tab.label === "Record") {
              return (
                <Link key={tab.href} href={tab.href} className="relative -mt-5">
                  <motion.div
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.92 }}
                    className="w-14 h-14 rounded-full bg-[#BFFF00] flex items-center justify-center shadow-lg shadow-[#BFFF00]/25"
                  >
                    <svg className="w-6 h-6 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <circle cx="12" cy="12" r="9" />
                      <circle cx="12" cy="12" r="3.5" fill="currentColor" />
                    </svg>
                  </motion.div>
                </Link>
              );
            }

            return (
              <Link key={tab.href} href={tab.href} className="flex flex-col items-center gap-0.5 min-w-[52px]">
                <div className="relative">
                  {tab.icon && (
                    <tab.icon
                      className={`w-[22px] h-[22px] transition-all duration-200 ${
                        active ? "text-[#BFFF00]" : "text-white/30"
                      }`}
                      strokeWidth={active ? 2.2 : 1.8}
                    />
                  )}
                  {active && (
                    <motion.div
                      layoutId="navDot"
                      className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#BFFF00]"
                      transition={{ type: "spring", damping: 25, stiffness: 400 }}
                    />
                  )}
                </div>
                <span className={`text-[10px] transition-colors duration-200 ${
                  active ? "text-[#BFFF00] font-semibold" : "text-white/30"
                }`}>
                  {tab.label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
