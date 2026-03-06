"use client";

import { Button } from "@/components/ui/button";
import {Card,CardContent,CardDescription,CardHeader,CardTitle} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Loader, Send } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import Image from "next/image";
import Logo from "@/public/images/logo.png";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {Form,FormControl,FormField,FormItem,FormMessage} from "@/components/ui/form";
import { signupSchema } from "@/lib/zodSchemas";
import {Select,SelectContent,SelectGroup,SelectItem,SelectTrigger,SelectValue} from "@/components/ui/select"
import { signupUser } from "@/app/actions/signup-user";

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
   <Card className="w-120 max-w-md h-143 mx-auto flex flex-col justify-center p-2 bg-white 
                  dark:bg-zinc-900 backdrop-blur-sm shadow-lg dark:shadow-black/30 border border-zinc-200 dark:border-zinc-800">
  <CardHeader>
    <CardTitle className="text-xl">
      <Link href="/" className="flex items-center justify-center gap-2 self-center font-medium">
        <Image src={Logo} alt="Logo" width={120} height={60} />
      </Link>
    </CardTitle>

    <CardDescription
      className="text-xl font-bold flex items-center justify-center text-zinc-800 dark:text-zinc-100">
      Create your Justdy account
    </CardDescription>
  </CardHeader>

  <CardContent className="flex flex-col gap-4">
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(signUpWithEmail)}
        className="space-y-8">
        <div className="grid gap-6">
          <div className="grid gap-3">

            {/* Full Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Full name"
                      className="
                        h-11 rounded-lg text-base
                        bg-white dark:bg-zinc-800
                        text-zinc-900 dark:text-zinc-100
                        placeholder:text-zinc-400  placeholder:text-base 
                        dark:placeholder:text-zinc-500
                        border-zinc-300 dark:border-zinc-700
                        focus-visible:ring-blue-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Email"
                      className="
                        h-11 rounded-lg text-base
                        bg-white dark:bg-zinc-800
                        text-zinc-900 dark:text-zinc-100
                        placeholder:text-zinc-400  placeholder:text-base 
                        dark:placeholder:text-zinc-500
                        border-zinc-300 dark:border-zinc-700
                        focus-visible:ring-blue-500"/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

             <FormField
            control={form.control}
            name="roleIntent"
            render={({ field }) => (
              <FormItem className="space-y-2">

                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="h-11 w-full rounded-lg text-base
                        bg-white dark:bg-zinc-800
                        text-zinc-900 dark:text-zinc-100
                        placeholder:text-zinc-400  placeholder:text-base 
                        dark:placeholder:text-zinc-500
                        border-zinc-300 dark:border-zinc-700
                        focus-visible:ring-blue-500">
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                  </FormControl>

                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="Student">
                        🎓 I am a Student
                      </SelectItem>
                      <SelectItem value="Educator">
                        👩‍🏫 I want to teach
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />


            {/* Password */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder="Password"
                      className="
                        h-11 rounded-lg text-base
                        bg-white dark:bg-zinc-800
                        text-zinc-900 dark:text-zinc-100
                        placeholder:text-zinc-400  placeholder:text-base 
                        dark:placeholder:text-zinc-500
                        border-zinc-300 dark:border-zinc-700
                        focus-visible:ring-blue-500
                      "
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Confirm Password */}
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder="Confirm password"
                      className="
                        h-11 rounded-lg text-base
                        bg-white dark:bg-zinc-800
                        text-zinc-900 dark:text-zinc-100
                        placeholder:text-zinc-400  placeholder:text-base 
                        dark:placeholder:text-zinc-500
                        border-zinc-300 dark:border-zinc-700
                        focus-visible:ring-blue-500
                      "
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

         

          {/* Submit Button */}
          <Button type="submit" disabled={loading || isPending}
            className="
              h-12 w-full flex items-center justify-center gap-2
              bg-blue-600 hover:bg-blue-700
              dark:bg-blue-500 dark:hover:bg-blue-600
              text-white">
            {loading ? (
              <>
                <Loader className="animate-spin" size={16} />
                Creating account...
              </>
            ) : (
              <>
                <Send size={16} />
                SIGN UP
              </>
            )}
          </Button>
        </div>

        {/* Footer */}
      <div className="text-center space-y-1">
        <div className="text-xs text-zinc-500 dark:text-zinc-400">
          By signing up, you accept our{" "}
          <Link href="/login">
            <span className="text-white hover:underline">terms</span>
          </Link>{" "}
          and{" "}
          <Link href="/login">
            <span className="text-white hover:underline">privacy policy</span>
          </Link>
        </div>

        <div className="text-[16px] text-zinc-500 dark:text-zinc-400">
          Already have an account?{" "}
          <Link href="/login">
            <span className="text-white hover:underline">Log in</span>
          </Link>
        </div>
      </div>
      </form>
    </Form>
  </CardContent>
</Card>

  );
}
