"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { BookOpenIcon, ChevronDownIcon, Home, LayoutDashboardIcon, LogOutIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useSignOut } from "@/hooks/use-signout";

interface UserDropdownProps {
  name: string;
  email: string;
  image?: string;
  role: string;
}

export function UserDropdown({ name, email, image, role }: UserDropdownProps) {
  const router = useRouter();
  const handleSignOut = useSignOut();

 const DASHBOARD_ROUTES: Record<string, string> = {
  admin: "/dashboard/admin",
  educator: "/dashboard/educator",
  student: "/dashboard/student",
};

const handleDashboardClick = () => {
  router.push(DASHBOARD_ROUTES[role] ?? "/dashboard/student");
};

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-auto p-0 hover:bg-transparent">
          <Avatar>
            <AvatarImage src={image ?? ""} alt="Profile image" />
            <AvatarFallback>{name?.[0]?.toUpperCase() ?? "U"}</AvatarFallback>
          </Avatar>
          <ChevronDownIcon size={16} className="opacity-60" aria-hidden="true" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="min-w-60 p-5">
        <DropdownMenuLabel className="flex flex-col min-w-20">
          <span className="text-foreground truncate text-sm font-medium">{name} ({role})</span>
          <span className="text-muted-foreground truncate text-xs font-normal">{email}</span>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/" className="flex items-center">
              <Home size={16} className="opacity-60" />
              <span className="ml-2">Home</span>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link href="/courses" className="flex items-center">
              <BookOpenIcon size={16} className="opacity-60" />
              <span className="ml-2">Courses</span>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem onClick={handleDashboardClick} className="flex items-center cursor-pointer">
            <LayoutDashboardIcon size={16} className="opacity-60" />
            <span className="ml-2">Dashboard</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem onClick={handleSignOut} className="flex items-center cursor-pointer">
            <LogOutIcon size={16} className="opacity-60" />
            <span className="ml-2">Logout</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}