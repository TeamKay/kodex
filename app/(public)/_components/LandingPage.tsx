"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative w-full min-h-[70vh] bg-background text-foreground overflow-hidden font-sans">
      
      {/* 1. Adaptive Grid Background with Bottom Fade */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] 
        bg-size-[20px_20px] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" 
      />

      {/* 2. THE HERO GLOW */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-75
        bg-blue-400/20 dark:bg-blue-600/15 blur-[120px] rounded-full pointer-events-none" 
      />

      <div className="relative z-10 container mx-auto px-4 md:px-8 pt-24 pb-12 text-center">
        
        {/* Floating AI Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 mb-8 animate-bounce-slow">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          <span className="text-xs font-medium text-blue-700 dark:text-blue-300 uppercase tracking-wider">
            New: AI-Powered Tutors
          </span>
        </div>

       <h1 className="text-5xl md:text-6xl font-bold tracking-tight leading-[0.95] text-[#a1a1a1]">
          Turn What You Know 
          <span className="italic font-serif font-light text-white mr-4"> Into <br/></span> 
          <br className="md:hidden" />
          <span className="text-[#e39064]">
            Courses and Community
          </span>
        </h1>

        <p className="mt-8 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Create courses, host live classes, build communities, and teach with AI-powered tutors.
          Build and grow AI-powered courses and communities.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12">
         <Link href="/signup">
          <Button className="group rounded-xl px-10 py-6 text-base w-full max-w-xs sm:w-auto font-semibold shadow-lg shadow-blue-500/20 hover:scale-105 transition-all">
            Get Started For Free 
            <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
          </Button>
        </Link>

          <Link href="/communities">
          <Button
            variant="outline"
            className="relative rounded-xl px-10 py-6 text-base w-full max-w-xs sm:w-auto font-semibold hover:bg-accent transition-all overflow-hidden">
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
              Browse Community
            </span>
          </Button>
          </Link>
        </div>

        {/* SOCIAL PROOF SECTION */}
        <div className="mt-12 flex flex-col items-center gap-4 animate-fade-in">
          <div className="flex -space-x-3 overflow-hidden">
            {[1, 2, 3, 4].map((i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={i}
                className="inline-block h-10 w-10 rounded-full border-2 border-background ring-2 ring-transparent hover:ring-blue-500 transition-all"
                src={`https://i.pravatar.cc/100?img=${i + 10}`}
                alt="User avatar"
              />
            ))}
            <div className="flex items-center justify-center h-10 w-10 rounded-full border-2 border-background bg-muted text-[10px] font-bold">
              +10k
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Joined by <span className="text-foreground font-semibold">10,000+ creators</span> worldwide
          </p>
        </div>
      </div>
    </section>
  );
}




