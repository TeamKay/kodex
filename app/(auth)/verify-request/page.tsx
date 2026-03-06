"use client";

import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import { useRouter, useSearchParams } from "next/navigation";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useEffect, useState, useTransition } from "react";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { verifyAndAssignRole } from "@/app/actions/verify-and-assign-role";


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
      toast.success("Account verified successfully! Log in now");
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

      toast.success("A new verification code has been sent");
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
    <Card className="w-120 max-w-md h-90 mx-auto flex flex-col justify-center p-2 bg-white dark:bg-zinc-900
      backdrop-blur-sm shadow-lg dark:shadow-black/30 border border-zinc-200 dark:border-zinc-800">

      <CardHeader className="text-center">
        <CardTitle className="text-2xl">We sent you a code</CardTitle>
        <CardDescription>
          <p>Enter it below to verify {email}</p>
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6 text-center">
        <div className="flex flex-col items-center space-y-2">
          <InputOTP
            value={otp}
            onChange={(value) => setOtp(value)}
            maxLength={6}
            className="gap-2">
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>

        <Button
          onClick={verifyEmail}
          disabled={emailPending || !isOtpCompleted}
          className="w-full"
        >
          {emailPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              <span>Verifying...</span>
            </>
          ) : (
            "Verify Email"
          )}
        </Button>

        <p className="text-sm text-muted-foreground">
          Didn&apos;t get email?{" "}
          <button
            type="button"
            onClick={resendOtp}
            disabled={resending || cooldown > 0}
            className="text-blue-300 hover:underline disabled:opacity-50">
            {resending
              ? "Sending..."
              : cooldown > 0
              ? `Resend in ${cooldown}s`
              : "Resend it"}
          </button>{" "}
          or{" "}
          <Link href="/signup" className="text-blue-300 hover:underline">
            Use different email
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}

/* ------------------ PAGE EXPORT ------------------ */
export default function VerifyRequestRoute() {
  return (
    <Suspense fallback={<div className="text-center p-8">Loading verification…</div>}>
      <VerifyRequestContent />
    </Suspense>
  );
}


// "use client";

// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { useRouter, useSearchParams } from "next/navigation";
// import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
// import { useEffect, useState, useTransition } from "react";
// import { authClient } from "@/lib/auth-client";
// import { toast } from "sonner";
// import { Loader2 } from "lucide-react";
// import Link from "next/link";

// export default function VerifyRequestRoute(){
//     const router = useRouter();
//     const [otp, setOtp] = useState("");
//     const [emailPending, startTransition] = useTransition();
//     const params = useSearchParams();
//     const email = params.get("email") as string;
//     const isOtpCompleted = otp.length === 6;
//     const [resending, setResending] = useState(false);
//     const [cooldown, setCooldown] = useState(0);



//     function verifyEmail() {
//         startTransition(async () => {
//             try {
//                 //Verify the OTP first
//                 await authClient.emailOtp.verifyEmail({
//                     email: email.trim().toLowerCase(),
//                     otp: otp.trim(),
//                 });

//                 toast.success("Email is verified; You can log in now!");
//                 router.push("/login");

//                 } catch  {
//                 toast.error("Invalid or expired OTP. Please try again.");
//                 }
//             });
//             }

//     async function resendOtp() {
//     if (!email || cooldown > 0) return;

//     try {
//         setResending(true);

//         await authClient.emailOtp.sendVerificationOtp({
//         email: email.trim().toLowerCase(),
//         type: "email-verification", 
//         });

//         toast.success("A new verification code has been sent");
//         setCooldown(60); // 60-second cooldown
//     } catch  {
//         toast.error("Failed to resend code");
//     } finally {
//         setResending(false);
//     }
//     }

//     useEffect(() => {
//     if (cooldown <= 0) return;

//     const timer = setTimeout(() => setCooldown((c) => c - 1), 1000);
//     return () => clearTimeout(timer);
//     }, [cooldown]);



//     return(
//         <Card className="w-120 max-w-md h-90 mx-auto flex flex-col justify-center p-2 bg-white dark:bg-zinc-900
//                 backdrop-blur-sm shadow-lg dark:shadow-black/30 border border-zinc-200 dark:border-zinc-800">
//             <CardHeader className="text-center">
//                 <CardTitle className="text-2xl">We sent you a code</CardTitle>
//                 <CardDescription>   
//                     <p>Enter it below to verify {email}</p>
//                 </CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-6 text-center">
//                 <div className="flex flex-col items-center space-y-2">
//                     <InputOTP value={otp} onChange={(value) => setOtp(value)} maxLength={6} className="gap-2" >
//                     <InputOTPGroup>
//                     <InputOTPSlot index={0} />
//                     <InputOTPSlot index={1} />
//                     <InputOTPSlot index={2} />
//                     </InputOTPGroup>
//                     <InputOTPGroup>
//                     <InputOTPSlot index={3} />
//                     <InputOTPSlot index={4} />
//                     <InputOTPSlot index={5} />
//                     </InputOTPGroup>
//                     </InputOTP>
//                 </div>

//                 <Button onClick={verifyEmail} disabled={emailPending || !isOtpCompleted} className="w-full">
//                     {emailPending ? (
//                         <>
//                         <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                         <span>Verifying...</span>
//                         </>
//                     ) : (
//                         "Verify Email"
//                     )}
//                 </Button>
//                 <p 
//                   className="text-sm text-muted-foreground">Didn&apos;t get email? {" "}
//                   <button
//                     type="button"
//                     onClick={resendOtp}
//                     disabled={resending || cooldown > 0}
//                     className="text-blue-300 hover:underline disabled:opacity-50">
//                     {resending
//                         ? "Sending..."
//                         : cooldown > 0
//                         ? `Resend in ${cooldown}s` 
//                         : "Resend it"} 
//                     </button> or {" "}

//                   <Link href="/signup" className="text-blue-300 hover:underline">Use different email</Link></p>
//             </CardContent>
//         </Card>

        
      
//     );
// }

