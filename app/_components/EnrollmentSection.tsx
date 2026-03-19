"use client"

import React, { useState } from "react";
import { Button } from "./ui/button";

export function EnrollmentSection() {
  const [step, setStep] = useState(1);

  return (
    <section id="enroll" className="py-24 bg-slate-50 dark:bg-slate-950">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto bg-white dark:bg-card rounded-[3rem] shadow-2xl overflow-hidden flex flex-col md:flex-row border border-border">
          
          {/* Left Side: Info & Contact */}
          <div className="md:w-1/3 bg-emerald-600 p-10 text-white flex flex-col justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-6">Start Your Application</h2>
              <p className="text-emerald-50 mb-8 leading-relaxed">
                Complete this form to reserve your spot. Our admissions team will contact you within 24 hours to finalize your clinical placement.
              </p>
              
              <div className="space-y-6">
                <div>
                  <div className="text-xs uppercase tracking-widest text-emerald-200 mb-1">Call Us</div>
                  <div className="font-bold text-lg">(555) 123-4567</div>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-widest text-emerald-200 mb-1">Visit Campus</div>
                  <div className="font-bold text-lg">123 Healthcare Way, Suite 100<br/>Chicago, IL 60601</div>
                </div>
              </div>
            </div>
            
            <div className="mt-12 p-4 bg-white/10 rounded-2xl border border-white/20">
              <p className="text-xs italic">&quot;The admissions process was seamless. I was enrolled and had my textbook in 2 days.&quot; — Alex R., Student</p>
            </div>
          </div>

          {/* Right Side: The Form */}
          <div className="md:w-2/3 p-10 md:p-16">
            <div className="flex items-center gap-4 mb-10">
              <div className={`h-10 w-10 rounded-full flex items-center justify-center font-bold ${step === 1 ? 'bg-emerald-600 text-white' : 'bg-emerald-100 text-emerald-600'}`}>1</div>
              <div className="h-px w-12 bg-border" />
              <div className={`h-10 w-10 rounded-full flex items-center justify-center font-bold ${step === 2 ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-400'}`}>2</div>
              <span className="text-sm font-semibold text-muted-foreground ml-auto uppercase tracking-tighter">
                {step === 1 ? "Personal Details" : "Prerequisite Check"}
              </span>
            </div>

            <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
              {step === 1 ? (
                <div className="grid md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-right-4">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold">Full Name</label>
                    <input type="text" placeholder="Jane Doe" className="w-full h-12 px-4 rounded-xl border border-border bg-background focus:ring-2 focus:ring-emerald-500 outline-none" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold">Email Address</label>
                    <input type="email" placeholder="jane@example.com" className="w-full h-12 px-4 rounded-xl border border-border bg-background focus:ring-2 focus:ring-emerald-500 outline-none" />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-semibold">Phone Number</label>
                    <input type="tel" placeholder="(555) 000-0000" className="w-full h-12 px-4 rounded-xl border border-border bg-background focus:ring-2 focus:ring-emerald-500 outline-none" />
                  </div>
                  <Button onClick={() => setStep(2)} className="md:col-span-2 h-14 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold transition-all">
                    Continue to Requirements
                  </Button>
                </div>
              ) : (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
                  <p className="text-sm text-muted-foreground mb-4">Please confirm you meet the following state requirements:</p>
                  <div className="space-y-3">
                    {["I am 18+ years old", "I have a HS Diploma/GED", "I can pass a background check"].map((check, i) => (
                      <label key={i} className="flex items-center gap-3 p-4 rounded-xl border border-border hover:bg-slate-50 cursor-pointer transition-colors">
                        <input type="checkbox" className="h-5 w-5 rounded border-gray-300 text-emerald-600 focus:ring-emerald-600" />
                        <span className="text-sm font-medium">{check}</span>
                      </label>
                    ))}
                  </div>
                  <div className="flex gap-4 pt-4">
                    <Button variant="outline" onClick={() => setStep(1)} className="h-14 flex-1 rounded-xl">Back</Button>
                    <Button className="h-14 flex-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold">
                      Submit Application
                    </Button>
                  </div>
                </div>
              )}
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}