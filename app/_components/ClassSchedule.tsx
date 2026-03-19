"use client"

export function ClassSchedule() {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const curriculum = [
    { day: "Monday", topic: "Foundations & Ethics", room: "Lab A" },
    { day: "Tuesday", topic: "Patient Care Skills", room: "Clinical Suite" },
    { day: "Wednesday", topic: "Anatomy & Vitals", room: "Lab B" },
    { day: "Thursday", topic: "Emergency Procedures", room: "Clinical Suite" },
    { day: "Friday", topic: "Clinical Rotation Prep", room: "Lab A" },
  ];

  const handleDownload = () => {
    // Logic for downloading PDF would go here
    console.log("Downloading schedule...");
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6 max-w-5xl">
        
        {/* Header with Download Button */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">Weekly Class Schedule</h2>
            <p className="text-slate-500 font-medium">Accelerated Evening Track • 5:00 PM – 9:00 PM</p>
          </div>
          
          <button 
            onClick={handleDownload}
            className="group flex items-center justify-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-xl font-bold text-sm transition-all hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-200 active:scale-95"
          >
            <svg 
              className="w-5 h-5 text-blue-400 group-hover:text-white transition-colors" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download PDF Schedule
          </button>
        </div>

        {/* Desktop Schedule Grid */}
        <div className="hidden md:block overflow-hidden rounded-2xl border border-slate-200 shadow-sm bg-white">
          <div className="grid grid-cols-5 bg-slate-50 border-b border-slate-200">
            {days.map((day) => (
              <div key={day} className="p-4 text-center font-bold text-slate-600 border-r border-slate-200 last:border-0 uppercase tracking-wider text-xs">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-5 h-70">
            {curriculum.map((item, idx) => (
              <div key={idx} className="relative p-3 border-r border-slate-100 last:border-0 group">
                <div className="h-full w-full rounded-xl bg-slate-50 border border-slate-100 p-5 transition-all group-hover:bg-blue-50 group-hover:border-blue-200 group-hover:shadow-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="h-2 w-2 rounded-full bg-blue-500"></span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 group-hover:text-blue-600">
                      {item.room}
                    </span>
                  </div>
                  <p className="font-bold text-slate-800 leading-tight text-lg group-hover:text-slate-900">
                    {item.topic}
                  </p>
                  <p className="mt-4 text-xs font-semibold text-slate-400">
                    17:00 — 21:00
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile View: Vertical Stack */}
        <div className="md:hidden space-y-3">
          {curriculum.map((item, idx) => (
            <div key={idx} className="flex items-center gap-4 p-5 rounded-2xl border border-slate-100 bg-slate-50/50">
              <div className="min-w-15 text-center border-r border-slate-200 pr-4">
                <span className="text-xs font-black text-slate-900 uppercase">{item.day.slice(0, 3)}</span>
              </div>
              <div>
                <h4 className="font-bold text-slate-900">{item.topic}</h4>
                <p className="text-xs text-slate-500 font-medium">5:00 PM - 9:00 PM • {item.room}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Note */}
        <div className="mt-8 flex items-center justify-center gap-2 text-slate-400 text-sm">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Total: 20 contact hours per week</span>
        </div>
      </div>
    </section>
  );
}