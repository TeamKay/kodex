"use client";

import { useEffect, useRef, useState } from "react";
import { BookOpen } from "lucide-react";

interface Props {
  categories: string[];
  speed?: number;
}

export default function CategorySlider({ categories, speed = 0.5 }: Props) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);

  // 6x duplication ensures no gaps on ultra-wide screens
  const slides = [...categories, ...categories, ...categories, ...categories, ...categories, ...categories];

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    let x = 0;
    let raf: number;

    const animate = () => {
      if (!paused) {
        x += speed;
        // Reset point adjusted for 6x duplication
        if (x >= slider.scrollWidth / 6) {
          x = 0;
        }
        slider.style.transform = `translate3d(-${x}px, 0, 0)`;
      }
      raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [paused, speed]);

  return (
    // Background adapts to dark mode
    <div className="w-full py-12 bg-white dark:bg-zinc-950">
      
      {/* VIEWPORT: Controls the side padding/gutter */}
      <div 
        className="relative mx-auto max-w-7xl px-8 md:px-16 overflow-hidden"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        
        {/* Left Shadow Fade - Adapts to dark mode */}
        <div className="pointer-events-none absolute left-0 top-0 h-full w-24 z-20 
          bg-linear-to-r from-white via-white/80 to-transparent 
          dark:from-zinc-950 dark:via-zinc-950/80 dark:to-transparent" 
        />

        {/* Right Shadow Fade - Adapts to dark mode */}
        <div className="pointer-events-none absolute right-0 top-0 h-full w-24 z-20 
          bg-linear-to-l from-white via-white/80 to-transparent 
          dark:from-zinc-950 dark:via-zinc-950/80 dark:to-transparent" 
        />

        <div className="flex py-4">
          <div 
            ref={sliderRef} 
            className="flex gap-4 will-change-transform"
          >
            {slides.map((category, i) => (
              <button 
                key={i} 
                className={`
                  flex items-center gap-3 px-6 py-3 border rounded-xl whitespace-nowrap shadow-sm
                  transition-all duration-300 ease-out
                  
                  /* LIGHT MODE STYLES */
                  bg-white border-gray-200 text-gray-700
                  
                  /* DARK MODE STYLES */
                  dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-300
                  
                  /* HOVER POP ANIMATION */
                  hover:-translate-y-2 hover:scale-105 hover:shadow-xl
                  hover:border-blue-400 dark:hover:border-blue-500
                  hover:bg-gray-50 dark:hover:bg-zinc-800
                `}
              >
                <BookOpen size={18} className="text-blue-500 dark:text-blue-400" />
                <span className="text-sm font-semibold">{category}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}