export function CourseRoadmap() {
  const weeks = [
    { week: "Week 1", title: "Core Fundamentals", desc: "Introduction to patient rights, safety protocols, and medical terminology." },
    { week: "Week 2", title: "Basic Nursing Skills", desc: "Hands-on training for vital signs, mobility assistance, and personal care." },
    { week: "Week 3", title: "Specialized Care", desc: "Focusing on nutrition, mental health, and caring for patients with dementia." },
    { week: "Week 4", title: "Clinical Rotation", desc: "Real-world experience in a healthcare facility under RN supervision." },
    { week: "Week 5", title: "Exam Prep & Review", desc: "Final skills check-offs and intensive prep for the State Certification Exam." },
  ];

  return (
    <section className="bg-slate-50 overflow-hidden">
      {/* Upper Section: The Journey */}
      <div className="py-20 container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">Your 5-Week Journey</h2>
          <p className="text-slate-500 max-w-2xl mx-auto">From classroom to clinicals in just over a month. Our structured curriculum ensures you're exam-ready.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {weeks.map((item, index) => (
            <div 
              key={index} 
              className="relative p-6 rounded-xl border border-blue-100 bg-white shadow-sm hover:border-blue-400 transition-all duration-300 hover:-translate-y-1 hover:shadow-md z-10"
            >
              <div className="text-blue-600 font-bold text-xs uppercase tracking-widest mb-2">
                {item.week}
              </div>
              <h3 className="text-lg font-bold mb-3 text-slate-800">{item.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
              
              {index < weeks.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-3 translate-x-1/2 z-20 text-blue-200 text-2xl">
                  →
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Darker Blue Footer/Transition Bar */}
      <div className="bg-slate-900 py-10">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between text-white text-center md:text-left">
          <div>
            <h4 className="text-xl font-semibold">Ready to start your medical career?</h4>
            <p className="text-slate-400 text-sm mt-1">Next cohort begins the first Monday of every month.</p>
          </div>
          <button className="mt-6 md:mt-0 bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-full font-bold transition-colors">
            Enroll Today
          </button>
        </div>
      </div>
    </section>
  );
}