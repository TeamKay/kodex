"use client";

import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";


export default function LandingPage() {
  return (
    <div className="bg-background">
      <section className="relative overflow-hidden py-25">
        <div className="container mx-auto px-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <Badge 
                className="h-8 flex items-center border rounded-lg px-4 text-sm text-primary dark:text-white/50 font-medium whitespace-nowrap"
                variant="outline">
                  E-Learning made easy for all
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                Learn Math with Confidence <br/> 
                <span className="bg-linear-to-b from-emerald-500 to-teal-400 font-bold text-transparent bg-clip-text pb-1 pr-2">
                  Guided by Experts
                </span> 
                </h1>
                <p className="text-muted-foreground text-lg md:text-xl max-w-md">
                  Learn at your own pace or join interactive live classes taught by experienced math educators—with results you can trust.
                </p>
                <div>
                 <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                 <Link href="/courses" className={buttonVariants({ size: "lg" })}>
                   Explore Courses <ArrowRight />
                 </Link>

                 <Link href="/booking" className={buttonVariants({ size: "lg", variant: "outline" })}>
                   Live Sessions
                 </Link>
               </div>
                </div>
            </div>
            
       
            <div className="absolute inset-0 rounded-3xl pointer-events-none"/>
              <Image src="/images/hero.png" alt="Online learning illustration" width={500} height={500} priority />
          </div>
        </div>
      </section>
    </div>
  );

   
}