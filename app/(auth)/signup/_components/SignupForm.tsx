"use client";


import { Loader, Send } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import Image from "next/image";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { signupSchema } from "@/lib/zodSchemas";

import { signupUser } from "@/app/actions/signup-user";
import mmm from '@/public/images/signup.jpg'
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/app/_components/ui/form";
import { Input } from "@/app/_components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/app/_components/ui/select";
import { Button } from "@/app/_components/ui/button";


export default function SignupForm() {
  const router = useRouter();
  const [isPending] = useTransition();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: { name: "", email: "", password: "", confirmPassword: "", roleIntent: "Student" },
  });

  async function signUpWithEmail(values: z.infer<typeof signupSchema>) {
    setLoading(true);
    try {
      await signupUser(values);
      toast.success("Verification OTP sent! Check your email.");
      router.push(`/verify-request?email=${values.email}`);
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen w-full bg-background text-foreground  font-sans">
      
      
      {/* LEFT SIDE: Image Section (Hidden on mobile) */}
      <div className="relative hidden w-1/2 p-0 lg:block">
        <div className="relative h-full w-full overflow-hidden rounded-none">
          {/* Background Image */}
          <Image src={mmm} alt="Cityscape" className="h-full w-full object-cover object-center"/>
        </div>
      </div>

      {/* RIGHT SIDE: Form Section */}
       <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] 
        opacity-[0.02] dark:opacity-[0.05] bg-size-[32px_32px] mask-[linear-gradient(to_bottom,black_10%,transparent_100%)]" 
      />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/4 -translate-y-1/3 w-200 h-75
        bg-blue-400/20 dark:bg-blue-600/15 blur-[120px] rounded-full pointer-events-none" 
      />
      <div className="flex w-full z-10 flex-col items-center justify-center px-8 lg:w-1/2 lg:px-20">
        <div className="w-full max-w-md">
          
          {/* Header */}
          <div className="mb-10 text-center">
             <Link href="/" className="flex items-center pt-6 pb-6 justify-center gap-2 self-center font-medium">
              <h1 className="font-black text-4xl tracking-tighter cursor-pointer group">
  <span className="text-fuchsia-600 transition-colors duration-500 group-hover:text-fuchsia-400">
    Ko
  </span>
  <span className="text-cyan-400 animate-pulse drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]">
    dex
  </span>
</h1>
            </Link>
            <h2 className="mb-2 text-4xl font-bold text-gray-900 dark:text-white/60">Create your account</h2>
            <p className="text-gray-600 dark:text-muted-foreground">
               Sign up and join the community of intellectuals
            </p>
          </div>

          {/* Form */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(signUpWithEmail)} className="space-y-4">
              
              <div className="flex flex-col gap-2">
                <FormField 
                    control={form.control} name="name" render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                              type="name"
                              placeholder="Full Name"
                              {...field}
                              className="h-12 w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                              required/>
                        </FormControl>
                        <FormMessage/>
                      </FormItem>
                    )}/>
              </div>

              <div className="flex flex-col gap-2">
                <FormField 
                    control={form.control} name="email" render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                              type="email"
                              placeholder="Email Address"
                              {...field}
                              className="h-12 w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                              required/>
                        </FormControl>
                        <FormMessage/>
                      </FormItem>
                    )}/>
              </div>

               <div className="flex flex-col gap-2">
                    <FormField
                    control={form.control} name="roleIntent" render={({ field }) => (
                      <FormItem>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                           <FormControl>
                             <SelectTrigger  className="h-12! w-full rounded-lg border border-gray-300 px-4 py-0 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20">
                               <SelectValue placeholder="Select your role" />
                             </SelectTrigger>
                           </FormControl>
                           <SelectContent>
                             <SelectGroup>
                               <SelectItem value="Student">🎓 I am a Student</SelectItem>
                               <SelectItem value="Educator">👩‍🏫 I want to teach</SelectItem>
                             </SelectGroup>
                           </SelectContent>
                         </Select>
                      </FormItem>
                    )}/>
              </div>


              <div className="flex flex-col gap-2">
                <FormField 
                    control={form.control} name="password" render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                              type="password"
                              placeholder="Password"
                              {...field}
                              className="h-12 w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                              required/>
                        </FormControl>
                        <FormMessage/>
                      </FormItem>
                    )}/>
              </div>

               <div className="flex flex-col gap-2">
                <FormField 
                    control={form.control} name="confirmPassword" render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                              type="Password"
                              placeholder="Confirm Password"
                              {...field}
                              className="h-12 w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                              required/>
                        </FormControl>
                        <FormMessage/>
                      </FormItem>
                    )}/>
              </div>

               <Button
                  type="submit"
                  className="h-13 w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold transition-all hover:scale-[1.01]"
                  disabled={loading || isPending}>
                  {loading ? (
                    <><Loader className="animate-spin" size={16} /> Loading...</>
                  ) : (
                    <><Send size={16} /> SIGN UP</>
                  )}
                </Button>

                <div className="text-muted-foreground text-center items-center justify-center">
                 <p className="text-gray-600 dark:text-muted-foreground">
                    Already have an account?{" "}
                    <a href="/login" className="font-bold text-black dark:text-white underline underline-offset-4 hover:text-gray-700">
                      Log in
                    </a>
                  </p>
                </div>
            </form>
          </Form>

        </div>
      </div>
    </div>
  );
};




