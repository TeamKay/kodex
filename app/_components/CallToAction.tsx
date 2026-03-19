import Link from "next/link";

export function FooterCTA() {
  return (
    <section className="px-6 pb-20 pt-10 bg-white">
      <div className="container mx-auto max-w-6xl">
        <div className="relative overflow-hidden rounded-3xl bg-slate-900 px-8 py-16 md:px-16 md:py-20 shadow-2xl">
          {/* Subtle Background Decorative Elements */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 h-64 w-64 rounded-full bg-blue-600/20 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl"></div>

          <div className="relative z-10 flex flex-col items-center text-center">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-6">
              Ready to start your <span className="text-blue-400">medical career?</span>
            </h2>
            
            <p className="max-w-2xl text-lg md:text-xl text-slate-300 mb-10 leading-relaxed">
              Our next CNA cohort begins in just two weeks. Secure your spot today and join the 98% of our graduates who find employment immediately.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Link
                href="/signup"
                className="inline-flex h-14 items-center justify-center rounded-xl bg-blue-600 px-10 text-base font-bold text-white transition-all hover:bg-blue-500 hover:scale-105 active:scale-95 shadow-lg shadow-blue-900/20"
              >
                Enroll Now
              </Link>
              
              <Link
                href="/schedule-tour"
                className="inline-flex h-14 items-center justify-center rounded-xl bg-white/10 px-10 text-base font-bold text-white transition-all hover:bg-white/20 backdrop-blur-sm border border-white/10"
              >
                Schedule a Tour
              </Link>
            </div>

            <p className="mt-8 text-sm text-slate-400 font-medium flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
              Job Application Support and Payment plans available!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}