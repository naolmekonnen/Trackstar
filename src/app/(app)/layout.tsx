"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Home, Calendar, Activity, Users, User } from "lucide-react";

const tabs = [
  { href: "/(app)/home", label: "Home", icon: Home },
  { href: "/(app)/plan", label: "Plan", icon: Calendar },
  { href: "/(app)/run", label: "Run", icon: Activity },
  { href: "/(app)/social", label: "Social", icon: Users },
  { href: "/(app)/profile", label: "Profile", icon: User },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[#0A0A0C] flex flex-col">
      <main className="flex-1 pb-24 overflow-y-auto">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 inset-x-0 z-50 bg-[#0A0A0C]/95 backdrop-blur-xl border-t border-white/[0.04]">
        <div className="max-w-lg mx-auto px-2 h-20 flex items-start pt-2">
          {tabs.map((tab) => {
            const isActive = pathname.startsWith(tab.href);
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className="relative flex-1 flex flex-col items-center gap-1 py-2"
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute -top-2 w-8 h-0.5 rounded-full bg-[#BFFF00]"
                    transition={{ type: "spring", damping: 20, stiffness: 300 }}
                  />
                )}
                <tab.icon
                  className={`w-5 h-5 transition-colors ${
                    isActive ? "text-[#BFFF00]" : "text-white/30"
                  }`}
                />
                <span
                  className={`text-[10px] transition-colors ${
                    isActive ? "text-[#BFFF00] font-medium" : "text-white/30"
                  }`}
                >
                  {tab.label}
                </span>
              </Link>
            );
          })}
        </div>
        <div className="h-safe-area-inset-bottom" />
      </nav>
    </div>
  );
}
