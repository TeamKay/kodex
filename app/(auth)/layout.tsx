// AuthLayout.tsx

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";
import { buttonVariants } from "../_components/ui/button";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex min-h-svh flex-col items-center justify-center">
      {/* Added z-50 to ensure it stays above the LoginForm's background and card */}
      <Link 
        href="/" 
        className={buttonVariants({ 
          variant: 'outline', 
          className: 'absolute top-4 left-4 z-50' // Added z-50 here
        })}
      >
        <ArrowLeft className="size-4 mr-2" /> Back
      </Link>
      
      <div className="flex w-full flex-col gap-6">
        {children}
      </div>
    </div>
  );
}