"use client";

import { useEffect, useRef } from "react";
import { Calculator, Code, BarChart3 } from "lucide-react";

interface Slide {
  icon: React.ReactNode;
  content: string;
}

const slidesData: Slide[] = [
  { icon: <Calculator size={20} />, content: "Live and interactive online sessions that quarantee success" },
  { icon: <Code size={20} />, content: "Explore comprehensive course catelog, and learn something new" },
  { icon: <BarChart3 size={20} />, content: "Join a community of smart and educated professionals" },
];

const InfiniteSlider: React.FC = () => {
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    let x = 0;
    let rafId: number;
    const speed = 1.2;
    const totalWidth = slider.scrollWidth / 2;

    const animate = () => {
      x += speed;
      if (x >= totalWidth) x = 0;
      slider.style.transform = `translateX(-${x}px)`;
      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <div className="w-full overflow-hidden mb-10">
      <div ref={sliderRef} className="flex">
        {[...slidesData, ...slidesData].map((slide, i) => (
          <div
            key={i}
            className="shrink-0 px-2"
            style={{ width: "520px" }}>
            <div className="h-10 flex items-center gap-3 border rounded-lg px-4 text-gray-800">
              {/* Icon */}
              <span className="text-gray-600">
                {slide.icon}
              </span>

              {/* Content */}
              <span className="text-sm text-primary dark:text-white/50 font-medium whitespace-nowrap">
                {slide.content}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfiniteSlider;