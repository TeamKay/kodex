import Image from "next/image";

export function SuccessStories() {
  const testimonials = [
    {
      name: "Sarah Jenkins",
      role: "CNA at St. Jude Medical",
      text: "The 5-week program was intense but so rewarding. The instructors really cared about our success. I had a job offer before I even took my state exam!",
      img: "https://i.pravatar.cc/100?img=32"
    },
    {
      name: "Marcus Rivera",
      role: "Lead Patient Tech",
      text: "I was nervous about the clinical rotations, but the hands-on training in Week 4 prepared me perfectly. Best career decision I've ever made.",
      img: "https://i.pravatar.cc/100?img=12"
    },
    {
      name: "Elena Rodriguez",
      role: "Home Health Specialist",
      text: "Coming from a non-medical background, I wasn't sure if I could keep up. The study guides and prep labs made everything so clear.",
      img: "https://i.pravatar.cc/100?img=45"
    }
  ];

  return (
    <section className="py-24 bg-white text-slate-900">
      <div className="container mx-auto px-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-6">
              Real Stories, <span className="text-blue-600">Real Careers</span>
            </h2>
            <p className="text-xl text-slate-500 leading-relaxed">
              See how our graduates transformed their lives in just over a month.
            </p>
          </div>
          
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-700 font-medium text-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
            </span>
            98% Job Placement Rate
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {testimonials.map((t, i) => (
            <div 
              key={i} 
              className="group flex flex-col h-full p-8 rounded-2xl bg-white border border-slate-100 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] hover:shadow-xl transition-shadow duration-300"
            >
              <div className="mb-6">
                {/* 5-Star Rating (Optional aesthetic touch) */}
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-amber-400 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                
                <p className="text-slate-700 leading-relaxed text-lg italic">
                  &ldquo;{t.text}&rdquo;
                </p>
              </div>

              <div className="mt-auto flex items-center gap-4 pt-6 border-t border-slate-50">
                <div className="relative h-14 w-14 shrink-0">
                  <Image 
                    src={t.img} 
                    alt={t.name} 
                    fill
                    className="rounded-full object-cover grayscale-20 group-hover:grayscale-0 transition-all shadow-sm"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">{t.name}</h4>
                  <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-0.5">
                    Verified Graduate
                  </p>
                  <p className="text-sm text-slate-500 font-medium">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}