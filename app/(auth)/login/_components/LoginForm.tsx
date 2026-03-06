"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { authClient } from "@/lib/auth-client";
import { loginSchema } from "@/lib/zodSchemas";


export default function LoginForm(){
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

  // Use the destructuring pattern to catch errors from the auth provider
  const { error } = await authClient.signIn.email({
    email: values.email,
    password: values.password,
    // Note: Better Auth handles the bcrypt comparison automatically on the server
  });

  if (error) {
    setLoading(false);
    // Handle specific error codes
    if (error.status === 401 || error.code === "INVALID_EMAIL_OR_PASSWORD") {
      toast.error("Invalid email or password");
      form.setError("password", { message: "Check your credentials" });
    } else {
      toast.error(error.message || "Something went wrong");
    }
    return;
  }

  // ✅ Fetch session after successful login
  const session = await authClient.getSession();
  const role = session?.data?.user?.role?.toLowerCase();

  toast.success("Successfully Logged In! Redirecting...");

  // ✅ Role-based redirect
  if (role === "student") {
    router.push("/dashboard/student");
  } else if (role === "educator") {
    router.push("/dashboard/educator");
  } else if (role === "admin") {
    router.push("/dashboard/admin");
  } else {
    router.push("/");
  }

    // toast.success("Successfully Logged In! verified! Redirecting...");
    // router.push(`/`);

  setLoading(false);
}


    return(
          <Card className="w-120 max-w-md h-110 mx-auto flex flex-col justify-center p-2 bg-white dark:bg-zinc-900
                backdrop-blur-sm shadow-lg dark:shadow-black/30 border border-zinc-200 dark:border-zinc-800">
            <CardHeader>
                <CardTitle className="text-xl">
                     <Link className="flex items-center justify-center gap-2 self-center font-medium" href="/">
                        <Image src={Logo} alt="Logo" width={120} height={60}/>
                    </Link>
                </CardTitle>
                <CardDescription className="text-xl font-bold flex items-center justify-center text-zinc-800 dark:text-zinc-100">
                    Log in to your account
                </CardDescription>
            </CardHeader>

            <CardContent className="flex flex-col gap-4">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(signInWithEmail)} className="space-y-8">
                    <div className="grid gap-6">
                    <div className="grid gap-3">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({field}) => (
                                <FormItem>
                                    <FormControl>
                                        <Input 
                                            className="
                                                h-11 rounded-lg text-base
                                                bg-white dark:bg-zinc-800
                                                text-zinc-900 dark:text-zinc-100
                                                placeholder:text-zinc-400  placeholder:text-base 
                                                dark:placeholder:text-zinc-500
                                                border-zinc-300 dark:border-zinc-700
                                                focus-visible:ring-blue-500"
                                            {...field}
                                            placeholder="Email" 
                                            required/>
                                    </FormControl>
                                </FormItem>
                            )}/>

                        <FormField
                            control={form.control}
                            name="password"
                            render={({field}) => (
                                <FormItem>
                                    <FormControl>
                                        <Input 
                                            className="
                                                h-11 rounded-lg text-base
                                                bg-white dark:bg-zinc-800
                                                text-zinc-900 dark:text-zinc-100
                                                placeholder:text-zinc-400 placeholder:text-base 
                                                dark:placeholder:text-zinc-500
                                                border-zinc-300 dark:border-zinc-700
                                                focus-visible:ring-blue-500"
                                            {...field}
                                            placeholder="Password" 
                                            type="password"
                                            required/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}/> 
                    </div>

                    <div className="text-balance text-left text-sm text-muted-foreground">
                        <span className="text-white hover:text-white hover:underline">Forgot password?</span>
                    </div>

                    <Button
                        type="submit"
                        className="
                            h-11 w-full flex items-center justify-center gap-2
                            bg-blue-600 hover:bg-blue-700
                            dark:bg-blue-500 dark:hover:bg-blue-600
                            text-white" disabled={loading || isPending}>
                        {loading ? (
                            <>
                            <Loader className="animate-spin" size={16} />
                            Loading...
                            </>
                        ) : (
                            <>
                            <Send size={16} />
                            LOG IN
                            </>
                        )}
                    </Button>
                </div>

                
                </form>
              </Form>
            </CardContent>
            <CardFooter className="flex flex-col gap-4 border-t pt-6 text-center">
          <p className="text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link href="/signup">
            <span className="text-purple-100 hover:underline cursor-pointer">
              Sign up
            </span>
            </Link>
          </p>
        </CardFooter>
        </Card>
    )
}