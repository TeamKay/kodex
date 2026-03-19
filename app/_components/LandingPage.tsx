"use client";

import Link from "next/link";
import { Button } from "./ui/button";

export default function Hero() {
  return (
    <section className="relative w-full min-h-[70vh] bg-background text-foreground overflow-hidden font-sans">
      
      {/* Background Stethoscope Image */}
      <div className="absolute inset-0 z-0 flex items-center justify-end opacity-[0.1] dark:opacity-[0.1] pointer-events-none">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src="https://images.unsplash.com/photo-1505751172876-fa1923c5c528?q=80&w=2070&auto=format&fit=crop" 
          alt="Stethoscope background"
          className="h-full w-auto object-contain translate-x-1/4 rotate-12"
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 md:px-8 pt-24 pb-12 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 mb-8 animate-bounce-slow">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-xs font-medium text-emerald-700 dark:text-emerald-300 uppercase tracking-wider">
            State-Approved Curriculum
          </span>
        </div>

        <h1 className="font-extrabold text-3xl dark:text-blue-400 text-black-600 space-y-3">
          Become a Certified <br/>
          <span className="text-5xl md:text-7xl font-bold tracking-tight leading-[0.95] dark:text-[#f1f1f1] text-blue-600"> Nursing Assistant<br/></span> 
          <br className="md:hidden" />
          <span className="italic font-serif text-emerald-600 dark:text-emerald-400">
             in Just 5 Weeks
          </span>
        </h1>

        <p className="mt-8 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Launch your healthcare career with hands-on clinical training, flexible schedules, and expert-led instruction designed for your success.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12">
          <Link href="/signup">
            <Button className="group rounded-xl px-10 py-6 text-base w-full max-w-xs sm:w-auto font-semibold shadow-lg shadow-emerald-500/20 hover:scale-105 transition-all bg-emerald-600 hover:bg-emerald-700 text-white border-none">
              Enroll Now 
              <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
            </Button>
          </Link>

          <Link href="/schedule">
            <Button
              variant="outline"
              className="relative rounded-xl px-10 py-6 text-base w-full max-w-xs sm:w-auto font-semibold hover:bg-accent transition-all overflow-hidden">
              <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-xl bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
                View Class Schedule
              </span>
            </Button>
          </Link>
        </div>

        {/* SOCIAL PROOF SECTION */}
        <div className="mt-12 flex flex-col items-center gap-4 animate-fade-in">
          <div className="flex -space-x-3 overflow-hidden">
            {[10, 15, 22, 31].map((i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={i}
                className="inline-block h-10 w-10 rounded-full border-2 border-background ring-2 ring-transparent hover:ring-emerald-500 transition-all"
                src={`https://i.pravatar.cc/100?img=${i}`}
                alt="Student graduate"
              />
            ))}
            <div className="flex items-center justify-center h-10 w-10 rounded-full border-2 border-background bg-muted text-[10px] font-bold">
              98%
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Over <span className="text-foreground font-semibold">500+ Graduates</span> with a 98% state exam pass rate
          </p>
        </div>
      </div>
    </section>
  );
}

// "use client";

// import Link from "next/link";
// import { Button } from "./ui/button";

// export default function Hero() {
//   return (
//     <section className="relative w-full min-h-[70vh] bg-background text-foreground overflow-hidden font-sans">
//       <div className="relative z-10 container mx-auto px-4 md:px-8 pt-24 pb-12 text-center">
//         <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 mb-8 animate-bounce-slow">
//           <span className="relative flex h-2 w-2">
//             <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
//             <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
//           </span>
//           <span className="text-xs font-medium text-emerald-700 dark:text-emerald-300 uppercase tracking-wider">
//             State-Approved Curriculum
//           </span>
//         </div>

//        <h1 className="font-extrabold text-3xl dark:text-blue-400 text-black-600 space-y-3">
//           Become a Certified <br/>
//           <span className="text-5xl md:text-7xl font-bold tracking-tight leading-[0.95] dark:text-[#f1f1f1] text-blue-600"> Nursing Assistant<br/></span> 
//           <br className="md:hidden" />
//           <span className="italic font-serif text-emerald-600 dark:text-emerald-400">
//              in Just 5 Weeks
//           </span>
//         </h1>

//         <p className="mt-8 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
//           Launch your healthcare career with hands-on clinical training, flexible schedules, and expert-led instruction designed for your success.
//         </p>

//         {/* Action Buttons */}
//         <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12">
//          <Link href="/signup">
//           <Button className="group rounded-xl px-10 py-6 text-base w-full max-w-xs sm:w-auto font-semibold shadow-lg shadow-emerald-500/20 hover:scale-105 transition-all bg-emerald-600 hover:bg-emerald-700 text-white border-none">
//             Enroll Now 
//             <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
//           </Button>
//         </Link>

//           <Link href="/schedule">
//           <Button
//             variant="outline"
//             className="relative rounded-xl px-10 py-6 text-base w-full max-w-xs sm:w-auto font-semibold hover:bg-accent transition-all overflow-hidden">
//             <span className="flex items-center gap-2">
//               <span className="h-1.5 w-1.5 rounded-xl bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
//               View Class Schedule
//             </span>
//           </Button>
//           </Link>
//         </div>

//         {/* SOCIAL PROOF SECTION */}
//         <div className="mt-12 flex flex-col items-center gap-4 animate-fade-in">
//           <div className="flex -space-x-3 overflow-hidden">
//             {[10, 15, 22, 31].map((i) => (
//               // eslint-disable-next-line @next/next/no-img-element
//               <img
//                 key={i}
//                 className="inline-block h-10 w-10 rounded-full border-2 border-background ring-2 ring-transparent hover:ring-emerald-500 transition-all"
//                 src={`https://i.pravatar.cc/100?img=${i}`}
//                 alt="Student graduate"
//               />
//             ))}
//             <div className="flex items-center justify-center h-10 w-10 rounded-full border-2 border-background bg-muted text-[10px] font-bold">
//               98%
//             </div>
//           </div>
//           <p className="text-sm text-muted-foreground">
//             Over <span className="text-foreground font-semibold">500+ Graduates</span> with a 98% state exam pass rate
//           </p>
//         </div>
//       </div>
//     </section>
//   );
// }





