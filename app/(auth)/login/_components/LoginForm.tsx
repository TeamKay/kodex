"use client";

import { Loader, Send } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import Logo from "@/public/images/logo.png"
import Image from "next/image";
import { z } from 'zod'
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authClient } from "@/lib/auth-client";
import { loginSchema } from "@/lib/zodSchemas";
import mmm from '@/public/images/login.jpeg'
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/app/_components/ui/form";
import { Input } from "@/app/_components/ui/input";
import { Button } from "@/app/_components/ui/button";
import Cookies from 'js-cookie';
import { User } from "@/lib/auth";


export default function LoginForm() {
  const router = useRouter();
  const [isPending] = useTransition();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function signInWithEmail(values: z.infer<typeof loginSchema>) {
    setLoading(true);
    const { data, error } = await authClient.signIn.email({
      email: values.email,
      password: values.password,
    });

    if (data && data.user) {
    // 1. Get the role from the response
  
    const role = (data.user as User).role?.toLowerCase() || "student";


    // 2. Set the cookie using the library (Fixes the "value cannot be modified" error)
    Cookies.set('role', role, { 
      expires: 7, // 7 days
      path: '/',
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production' 
    });

    // 3. Manual redirect to the correct dashboard
    router.push(`/dashboard/${role}`);
  }
  
    if (error) {
      setLoading(false);
      if (error.status === 401 || error.code === "INVALID_EMAIL_OR_PASSWORD") {
        toast.error("Invalid email or password");
        form.setError("password", { message: "Check your credentials" });
      } else {
        toast.error(error.message || "Something went wrong");
      }
      return;
    }

    const session = await authClient.getSession();
    const role = session?.data?.user?.role?.toLowerCase();

    toast.success("Successfully Logged In! Redirecting...");

    if (role === "student") {
      router.push("/dashboard/student");
    } else if (role === "educator") {
      router.push("/dashboard/educator");
    } else if (role === "admin") {
      router.push("/dashboard/admin");
    } else {
      router.push("/");
    }

    setLoading(false);
  }
  return (
    <div className="flex min-h-screen w-full bg-background text-foreground  font-sans">
      
      
      {/* LEFT SIDE: Image Section (Hidden on mobile) */}
      <div className="relative hidden w-1/2 p-0 lg:block">
        <div className="relative h-full w-full overflow-hidden rounded-none">
          {/* Background Image */}
          <Image src={mmm} alt="Cityscape" className="h-full w-full object-cover"/>
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
              <Image src={Logo} alt="Logo" width={120} height={60} />
            </Link>
            <h2 className="mb-2 text-4xl font-bold text-gray-900 dark:text-white/60">Login to your account</h2>
            <p className="text-gray-600 dark:text-muted-foreground">
              Provide your email and password to proceed 
            </p>
          </div>

          {/* Form */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(signInWithEmail)} className="space-y-4">
              
              <div className="flex flex-col gap-2">
                <FormField 
                    control={form.control} name="email" render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                              type="email"
                              placeholder="Email Address *"
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
                    control={form.control} name="password" render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                              type="password"
                              placeholder="Password *"
                              {...field}
                              className="h-12 w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                              required/>
                        </FormControl>
                        <FormMessage/>
                      </FormItem>
                    )}/>
              </div>

              <div className="text-sm">
                     <span className="text-blue-600 dark:text-blue-400 hover:underline cursor-pointer">Forgot password?</span>
              </div>

               <Button
                  type="submit"
                  className="h-13 w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold transition-all hover:scale-[1.01]"
                  disabled={loading || isPending}>
                  {loading ? (
                    <><Loader className="animate-spin" size={16} /> Loading...</>
                  ) : (
                    <><Send size={16} /> LOG IN</>
                  )}
                </Button>

                <div className="text-muted-foreground pt-2 text-center items-center justify-center">
                  <p className="text-gray-600 dark:text-muted-foreground">
                    New here?{" "}
                    <a href="/signup" className="font-bold text-black dark:text-white underline underline-offset-4 hover:text-gray-700">
                      Create an account
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


