"use client";

import { Input } from "@/app/_components/ui/input";
import { Search, Loader2 } from "lucide-react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useTransition } from "react";

export function SearchEducatorTable({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [isPending, startTransition] = useTransition();

  function handleSearch(term: string) {
    const params = new URLSearchParams(searchParams);
    
    if (term) {
      params.set("search", term);
    } else {
      params.delete("search");
    }

    // startTransition tells React that this URL update is a "transition"
    // This triggers the isPending state while the server re-renders
    startTransition(() => {
      replace(`${pathname}?${params.toString()}`);
    });
  }

  return (
    <div className="relative w-full max-w-md">
      {/* Dynamic Icon: Show Search normally, Loader when fetching */}
      <div className="absolute left-3 top-1/2 -translate-y-1/2">
        {isPending ? (
          <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
        ) : (
          <Search className="h-4 w-4 text-muted-foreground" />
        )}
      </div>
      
      <Input
        placeholder={placeholder}
        defaultValue={searchParams.get("search")?.toString()}
        onChange={(e) => handleSearch(e.target.value)}
        className="pl-9 w-full"
      />
    </div>
  );
}