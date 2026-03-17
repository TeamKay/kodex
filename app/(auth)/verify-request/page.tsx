"use client";

import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { verifyAndAssignRole } from "@/app/actions/verify-and-assign-role";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/_components/ui/card";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/app/_components/ui/input-otp";
import { Button } from "@/app/_components/ui/button";

/* ------------------ INNER COMPONENT ------------------ */
function VerifyRequestContent() {
  const router = useRouter();
  const params = useSearchParams();

  const email = params.get("email") as string;
  const [otp, setOtp] = useState("");
  const [emailPending, startTransition] = useTransition();
  const isOtpCompleted = otp.length === 6;
  const [resending, setResending] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  function verifyEmail() {
    startTransition(async () => {
      try {
        await verifyAndAssignRole(email, otp);
        await authClient.getSession();
        toast.success("Account verified successfully!");
        router.push("/login"); 
        router.refresh();
      } catch {
        toast.error("Invalid or expired OTP. Please try again.");
      }
    });
  }

  async function resendOtp() {
    if (!email || cooldown > 0) return;
    try {
      setResending(true);
      await authClient.emailOtp.sendVerificationOtp({
        email: email.trim().toLowerCase(),
        type: "email-verification",
      });
      toast.success("New code sent!");
      setCooldown(60);
    } catch {
      toast.error("Failed to resend code");
    } finally {
      setResending(false);
    }
  }

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [cooldown]);

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-white dark:bg-[#09090b]">
      
      {/* 1. THE GRID SYSTEM */}
      <div 
        className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] 
        dark:bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] 
        bg-size-[32px_32px] mask-[radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" 
      />

      {/* 2. INDIGO BRAND GLOW */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-100
        bg-indigo-500/15 dark:bg-indigo-600/20 blur-[140px] rounded-full pointer-events-none z-0 animate-pulse" 
        style={{ animationDuration: '8s' }}
      />

      {/* 3. VERIFICATION CARD WITH ENTRANCE ANIMATION */}
      <Card className="relative z-10 w-full max-w-md mx-4 bg-white/70 dark:bg-zinc-950/70 backdrop-blur-xl shadow-2xl border border-zinc-200 dark:border-zinc-800/50 
        animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
        
        <CardHeader className="text-center pb-2">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600 shadow-lg shadow-indigo-500/20">
            <Loader2 className={`h-6 w-6 text-white ${emailPending ? 'animate-spin' : ''}`} />
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Check your email
          </CardTitle>
          <CardDescription className="text-zinc-500 dark:text-zinc-400 mt-2">
            We sent a code to <span className="font-semibold text-zinc-900 dark:text-zinc-200">{email}</span>
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6 pt-4">
          <div className="flex flex-col items-center pt-2">
            <InputOTP value={otp} onChange={(value) => setOtp(value)} maxLength={6} className="gap-3">
              {/* Group 1: Index 0, 1, 2 */}
              <InputOTPGroup className="shadow-sm">
                <InputOTPSlot index={0} className="rounded-l-lg rounded-r-none border-zinc-200 dark:border-zinc-800 h-14 w-11 md:w-12 text-xl font-bold transition-all focus:z-10 ring-offset-background"/>
                <InputOTPSlot index={1} className="rounded-none border-l-0 border-zinc-200 dark:border-zinc-800 h-14 w-11 md:w-12 text-xl font-bold transition-all focus:z-10"/>
                <InputOTPSlot index={2} className="rounded-r-none border-l-0 border-zinc-200 dark:border-zinc-800 h-14 w-11 md:w-12 text-xl font-bold transition-all focus:z-10"/>
              </InputOTPGroup>

              {/* Center Divider / Gap */}
              <div className="w-1" />

              {/* Group 2: Index 3, 4, 5 */}
              <InputOTPGroup className="shadow-sm">
                <InputOTPSlot index={3} className="rounded-l-none border-zinc-200 dark:border-zinc-800 h-14 w-11 md:w-12 text-xl font-bold transition-all focus:z-10"/>
                <InputOTPSlot index={4} className="rounded-none border-l-0 border-zinc-200 dark:border-zinc-800 h-14 w-11 md:w-12 text-xl font-bold transition-all focus:z-10"/>
                <InputOTPSlot index={5} className="rounded-r-lg rounded-l-none border-l-0 border-zinc-200 dark:border-zinc-800 h-14 w-11 md:w-12 text-xl font-bold transition-all focus:z-10 ring-offset-background"/>
              </InputOTPGroup>
            </InputOTP>
          </div>

          <Button
            onClick={verifyEmail}
            disabled={emailPending || !isOtpCompleted}
            className="w-full h-12 text-base font-semibold bg-indigo-600 hover:bg-indigo-700 text-white transition-all rounded-xl shadow-lg shadow-indigo-500/25 active:scale-[0.98]">
            {emailPending ? (
              <div className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Verifying...</span>
              </div>
            ) : (
              "Verify Account"
            )}
          </Button>

          <div className="text-center space-y-4 pt-2">
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Didnt receive the code?{" "}
              <button
                type="button"
                onClick={resendOtp}
                disabled={resending || cooldown > 0}
                className="text-indigo-600 dark:text-indigo-400 font-bold hover:text-indigo-500 transition-colors disabled:opacity-50">
                {resending
                  ? "Sending..."
                  : cooldown > 0
                  ? `Resend in ${cooldown}s`
                  : "Resend now"}
              </button>
            </p>
            
            <div className="flex items-center justify-center gap-2 pt-4 border-t border-zinc-100 dark:border-zinc-800/50">
                <ArrowLeft className="h-3 w-3 text-zinc-400" />
                <Link href="/signup" className="text-xs font-medium text-zinc-400 hover:text-indigo-500 transition-colors">
                  Back to signup
                </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

/* ------------------ PAGE EXPORT ------------------ */
export default function VerifyRequestRoute() {
  return (
    <Suspense fallback={null}>
      <VerifyRequestContent />
    </Suspense>
  );
}



// "use client";

// import { Suspense } from "react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
// import { useRouter, useSearchParams } from "next/navigation";
// import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
// import { useEffect, useState, useTransition } from "react";
// import { authClient } from "@/lib/auth-client";
// import { toast } from "sonner";
// import { Loader2 } from "lucide-react";
// import Link from "next/link";
// import { verifyAndAssignRole } from "@/app/actions/verify-and-assign-role";


// /* ------------------ INNER COMPONENT ------------------ */
// function VerifyRequestContent() {
// const router = useRouter();
//   const params = useSearchParams();

//   const email = params.get("email") as string;
//   const [otp, setOtp] = useState("");
//   const [emailPending, startTransition] = useTransition();
//   const isOtpCompleted = otp.length === 6;
//   const [resending, setResending] = useState(false);
//   const [cooldown, setCooldown] = useState(0);

//   function verifyEmail() {
//   startTransition(async () => {
//     try {
//       await verifyAndAssignRole(email, otp);
//       await authClient.getSession();
//       toast.success("Account verified successfully! Log in now");
//       router.push("/login"); 
//       router.refresh();
      
//     } catch {
//       toast.error("Invalid or expired OTP. Please try again.");
//     }
//   });
// }

//   async function resendOtp() {
//     if (!email || cooldown > 0) return;

//     try {
//       setResending(true);

//       await authClient.emailOtp.sendVerificationOtp({
//         email: email.trim().toLowerCase(),
//         type: "email-verification",
//       });

//       toast.success("A new verification code has been sent");
//       setCooldown(60);
//     } catch {
//       toast.error("Failed to resend code");
//     } finally {
//       setResending(false);
//     }
//   }

//   useEffect(() => {
//     if (cooldown <= 0) return;
//     const timer = setTimeout(() => setCooldown((c) => c - 1), 1000);
//     return () => clearTimeout(timer);
//   }, [cooldown]);

//   return (
    
//     <Card className="w-120 max-w-md h-90 mx-auto flex flex-col justify-center p-2 bg-white dark:bg-zinc-900
//       backdrop-blur-sm shadow-lg dark:shadow-black/30 border border-zinc-200 dark:border-zinc-800">

//       <CardHeader className="text-center">
//         <CardTitle className="text-2xl">We sent you a code</CardTitle>
//         <CardDescription>
//           <p>Enter it below to verify {email}</p>
//         </CardDescription>
//       </CardHeader>

//       <CardContent className="space-y-6 text-center">
//         <div className="flex flex-col items-center space-y-2">
//           <InputOTP
//             value={otp}
//             onChange={(value) => setOtp(value)}
//             maxLength={6}
//             className="gap-2">
//             <InputOTPGroup>
//               <InputOTPSlot index={0} />
//               <InputOTPSlot index={1} />
//               <InputOTPSlot index={2} />
//             </InputOTPGroup>
//             <InputOTPGroup>
//               <InputOTPSlot index={3} />
//               <InputOTPSlot index={4} />
//               <InputOTPSlot index={5} />
//             </InputOTPGroup>
//           </InputOTP>
//         </div>

//         <Button
//           onClick={verifyEmail}
//           disabled={emailPending || !isOtpCompleted}
//           className="w-full"
//         >
//           {emailPending ? (
//             <>
//               <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//               <span>Verifying...</span>
//             </>
//           ) : (
//             "Verify Email"
//           )}
//         </Button>

//         <p className="text-sm text-muted-foreground">
//           Didn&apos;t get email?{" "}
//           <button
//             type="button"
//             onClick={resendOtp}
//             disabled={resending || cooldown > 0}
//             className="text-blue-300 hover:underline disabled:opacity-50">
//             {resending
//               ? "Sending..."
//               : cooldown > 0
//               ? `Resend in ${cooldown}s`
//               : "Resend it"}
//           </button>{" "}
//           or{" "}
//           <Link href="/signup" className="text-blue-300 hover:underline">
//             Use different email
//           </Link>
//         </p>
//       </CardContent>
//     </Card>
//   );
// }

// /* ------------------ PAGE EXPORT ------------------ */
// export default function VerifyRequestRoute() {
//   return (
//     <Suspense fallback={<div className="text-center p-8">Loading verification…</div>}>
//       <VerifyRequestContent />
//     </Suspense>
//   );
// }



