"use client";

import { motion } from "framer-motion";

interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  showText?: boolean;
  className?: string;
}

export function Logo({ size = "md", showText = true, className = "" }: LogoProps) {
  const sizes = {
    sm: { icon: "w-6 h-6", bolt: "w-3 h-3", text: "text-sm" },
    md: { icon: "w-8 h-8", bolt: "w-4 h-4", text: "text-lg" },
    lg: { icon: "w-10 h-10", bolt: "w-5 h-5", text: "text-xl" },
    xl: { icon: "w-14 h-14", bolt: "w-7 h-7", text: "text-3xl" },
  };

  const s = sizes[size];

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className={`${s.icon} rounded-xl bg-[#BFFF00] flex items-center justify-center relative overflow-hidden`}>
        <div className="absolute inset-0 bg-gradient-to-br from-[#BFFF00] via-[#BFFF00] to-[#7ACC00]" />
        <svg className={`${s.bolt} relative z-10 text-black`} viewBox="0 0 24 24" fill="currentColor">
          <path d="M13 2L4.09 12.41C3.74 12.84 3.57 13.06 3.58 13.24C3.58 13.4 3.65 13.56 3.78 13.66C3.92 13.78 4.21 13.78 4.77 13.78H12L11 22L19.91 11.59C20.26 11.16 20.43 10.94 20.42 10.76C20.42 10.6 20.35 10.44 20.22 10.34C20.08 10.22 19.79 10.22 19.23 10.22H12L13 2Z" />
        </svg>
      </div>
      {showText && (
        <span className={`${s.text} font-bold tracking-tight`}>
          track<span className="text-[#BFFF00]">star</span>
        </span>
      )}
    </div>
  );
}

export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`w-8 h-8 rounded-xl bg-[#BFFF00] flex items-center justify-center relative overflow-hidden ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#BFFF00] via-[#BFFF00] to-[#7ACC00]" />
      <svg className="w-4 h-4 relative z-10 text-black" viewBox="0 0 24 24" fill="currentColor">
        <path d="M13 2L4.09 12.41C3.74 12.84 3.57 13.06 3.58 13.24C3.58 13.4 3.65 13.56 3.78 13.66C3.92 13.78 4.21 13.78 4.77 13.78H12L11 22L19.91 11.59C20.26 11.16 20.43 10.94 20.42 10.76C20.42 10.6 20.35 10.44 20.22 10.34C20.08 10.22 19.79 10.22 19.23 10.22H12L13 2Z" />
      </svg>
    </motion.div>
  );
}
