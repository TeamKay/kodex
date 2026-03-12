import React from 'react';
import { Play, Mic, Users, ChevronRight } from 'lucide-react';

const steps = [
  {
    id: '01',
    title: 'On-Demand Courses',
    description: 'Deep Dive immediately with self-paced video modules from industry experts.',
    icon: <Play className="w-8 h-8 text-orange-500 fill-orange-500/20" />,
    features: ['HD Quality', 'Downloadable Resources', 'Lifetime Access'],
  },
  {
    id: '02',
    title: 'Live Sessions',
    description: 'Interact and get questions answered in real-time workshops and Q&As.',
    icon: <Mic className="w-8 h-8 text-orange-500" />,
    features: ['Weekly Schedule', 'Recording Archives', 'Direct Feedback'],
    isLive: true,
  },
  {
    id: '03',
    title: 'Community',
    description: 'Connect with a global tribe for ongoing support, networking, and momentum.',
    icon: <Users className="w-8 h-8 text-orange-500" />,
    features: ['24/7 Access', 'Peer Networking', 'Exclusive Resources'],
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-background py-20 px-6 font-sans">
      <div className="max-w-6xl mx-auto text-center">
        {/* Header */}
        <h2 className="text-5xl font-black text-orange-600 tracking-tight uppercase mb-2">
          How It Works
        </h2>
        <p className="text-slate-600 text-lg mb-16">
          Your 3-step journey from curiosity to mastery
        </p>

        {/* Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {steps.map((step, index) => (
            <div key={step.id} className="relative group">
              {/* Card */}
              <div className="h-full bg-slate-900 border border-slate-800 rounded-3xl p-8 text-left transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/10 hover:-translate-y-2">
                <div className="flex justify-between items-start mb-6">
                  <span className="text-orange-500 font-bold text-sm tracking-widest uppercase">
                    Step {step.id}
                  </span>
                  {step.icon}
                </div>

                <h3 className="text-white text-3xl font-bold leading-tight mb-4">
                  {step.title.split(' ').map((word, i) => (
                    <span key={i} className="block">{word}</span>
                  ))}
                </h3>

                <p className="text-slate-400 text-sm leading-relaxed mb-8">
                  {step.description}
                </p>

                <ul className="space-y-3">
                  {step.features.map((feat) => (
                    <li key={feat} className="flex items-center text-slate-300 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-600 mr-3" />
                      {feat}
                    </li>
                  ))}
                </ul>

                {/* Live Indicator Mockup */}
                {step.isLive && (
                  <div className="mt-8 flex items-center gap-2">
                    <div className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                    </div>
                    <span className="text-[10px] font-bold text-green-500 uppercase tracking-tighter">Live Indicator</span>
                  </div>
                )}
              </div>

              {/* Arrow Connector (Hidden on mobile) */}
              {index < steps.length - 1 && (
                <div className="hidden md:flex absolute -right-6 top-1/2 -translate-y-1/2 z-10 bg-white border border-slate-200 rounded-full p-2 shadow-md">
                  <ChevronRight className="w-5 h-5 text-orange-500" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <button className="mt-16 bg-slate-900 text-white font-bold py-4 px-10 rounded-xl hover:bg-orange-600 transition-colors duration-300 uppercase tracking-widest shadow-lg">
          [Sign Up Now]
        </button>
      </div>
    </section>
  );
}


// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Calendar, CreditCard, FileText, ShieldCheck, User, Video } from "lucide-react";

// export const features = [
//     {
//         icon: <User className="size-6 text-emerald-400"/>,
//         title: "Create Your Profile",
//         description: "Sign up and complete your profile to access quality and interactive courses and live sessions.",
//     },
//     {
//         icon: <Calendar className="size-6 text-emerald-400"/>,
//         title: "Schedule Live Session",
//         description: "Sign up and complete your profile to access quality and interactive courses and live sessions.",
//     },
//     {
//         icon: <Video className="size-6 text-emerald-400"/>,
//         title: "Video Classes",
//         description: "Sign up and complete your profile to access quality and interactive courses and live sessions.",
//     },
//     {
//         icon: <CreditCard className="size-6 text-emerald-400"/>,
//         title: "Classes Credits",
//         description: "Purchase courses meant to engage your learning and produce expected results.",
//     },
//     {
//         icon: <ShieldCheck className="size-6 text-emerald-400"/>,
//         title: "Verified Tutors",
//         description: "All tutors and courses are carefully verted and verified to ensure quality and success.",
//     },
//     {
//         icon: <FileText className="size-6 text-emerald-400"/>,
//         title: "Appointment Manager",
//         description: "Access and manage your scheduled classes with easy, and feel free to reschedule or cancel.",
//     },
// ];


// export const creditBenefits = [
//     "Each session requires <strong class='text-emerald-400'>2 credits</strong> regardless of duration",
//     "Credits <strong class='text-emerald-400'>never expires </strong> - use them whenever you need",
//     "Monthly subscription gives you <strong class='text-emerald-400'>fresh credit every month</strong>",
//     "Cancel or change your subscription <strong class='text-emerald-400'>anytime</strong> without pernaties"
// ];


// export default function HowItWork(){
//     return ( 
//         <section className="py-20">
//             <div className="container mx-auto px-4">
//             <div className="text-center mb-16">
//                 <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
//                     Your Journey, Simplified
//                 </h2>
//                 <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
//                     We make online courses and live sessions easier, interactive, and affordable.
//                 </p>
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//                 {features.map((feature, index) => {
//                     return (
//                         <Card key={index} className="border-emerald-900 hover:border-emerald-800/40 transition-all duration-300">
//                             <CardHeader className="pb-2">
//                                 <div className="bg-emerald-900/20 p-3 rounded-lg w-fit mb-4">{feature.icon}</div>
//                                 <CardTitle className="text-xl font-semibold text-white">{feature.title}</CardTitle>
//                             </CardHeader>
//                             <CardContent>
//                                 <p className="text-muted-foreground">{feature.description}</p>
//                             </CardContent>
//                         </Card>
//                     );
//                 })}
//             </div>
//             </div>
//         </section>
//     )
// }

