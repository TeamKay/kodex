"use client";

import { useState } from "react";
import { X, Sparkles } from "lucide-react";

export function AnnouncementBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="relative isolate flex items-center border-b gap-x-6 overflow-hidden bg-background px-6 py-2.5 sm:px-3.5 sm:before:flex-1">
      {/* Background Decorative Glow */}
      <div className="absolute left-[max(-7rem,50%)] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl" aria-hidden="true">
        <div
          className="aspect-577/310 w-144.25 bg-linear-to-r from-[#ff80b5] to-[#9089fc] opacity-30"
          style={{
            clipPath:
              'polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 52.7% 23.5%, 74.8% 41.9%)',
          }}
        />
      </div>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <p className="text-sm leading-6 text-black dark:text-white  flex items-center gap-2">
          <Sparkles className="h-4 w-4 fill-white/20" />
          <strong className="font-semibold">2026 Masterclass</strong>
          <svg viewBox="0 0 2 2" className="mx-2 inline h-0.5 w-0.5 fill-current" aria-hidden="true">
            <circle cx={1} cy={1} r={1} />
          </svg>
          Join the Advanced React cohort and save 20% this week.
        </p>
        
      </div>
      <div className="flex flex-1 justify-end">
        <button 
          type="button" 
          onClick={() => setIsVisible(false)}
          className="-m-3 p-3 focus-visible:-outline-offset-4">
          <span className="sr-only">Dismiss</span>
          <X className="h-5 w-5 text-black dark:text-white" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}