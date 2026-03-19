"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, X, MessageCircle, Mail, Sparkles, LayoutDashboard, Code, Palette, Terminal } from "lucide-react";
import clsx from "clsx";
import { authClient } from "@/lib/auth-client";
import { UserDropdown } from "./UserDropdown";
import { buttonVariants } from "./ui/button";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle, NavigationMenuViewport } from "./ui/navigation-menu";

// Updated Course Items for the Dropdown
const courseItems = [
  { title: "Certified Nursing Assistance", href: "/courses/web-dev", description: "Master modern React and Next.js.", icon: <Code className="h-5 w-5 text-blue-500" /> },
  { title: "UI/UX Design", href: "/courses/design", description: "Learn Figma and design systems.", icon: <Palette className="h-5 w-5 text-pink-500" /> },
  { title: "Backend Systems", href: "/courses/backend", description: "Node.js, Databases, and Scaling.", icon: <Terminal className="h-5 w-5 text-green-500" /> },
];

const DASHBOARD_ROUTES: Record<string, string> = {
  admin: "/dashboard/admin",
  educator: "/dashboard/educator",
  student: "/dashboard/student",
};

export function Navbar() {
  const { data: session, isPending } = authClient.useSession();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const userRole = session?.user?.role?.toLowerCase() ?? "student";
  const dashboardHref = DASHBOARD_ROUTES[userRole] ?? "/dashboard/student";

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container mx-auto flex min-h-16 items-center px-4 md:px-6 lg:px-8 relative">
        
        <Link href="/" className="flex items-center shrink-0">
         <div className="flex flex-col items-start leading-none group cursor-pointer">
  {/* Main Brand Name */}
  <h1 className="font-black text-4xl sm:text-3xl tracking-tighter">
    <span className="text-fuchsia-600 transition-colors duration-500 group-hover:text-fuchsia-400">
      Ko
    </span>
    <span className="text-cyan-400 animate-shimmer drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]">
      dex
    </span>
  </h1>
  
  {/* Subtitle */}
  <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] font-bold text-slate-500 ml-1 transition-colors duration-500 group-hover:text-cyan-300">
    Institute
  </span>
</div>
        </Link>

        {/* Center Navigation */}
        <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center justify-center">
          <NavigationMenu className="relative">
            <NavigationMenuList className="gap-2">
              
              {/* Courses Dropdown */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent font-semibold text-sm">
                  Courses
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid w-100 gap-3 p-4 md:w-125 md:grid-cols-2 lg:w-150">
                    <ul className="grid gap-3">
                      {courseItems.map((item) => (
                        <ListItem key={item.title} title={item.title} href={item.href} icon={item.icon}>
                          {item.description}
                        </ListItem>
                      ))}
                    </ul>
                    <div className="flex flex-col justify-between rounded-md bg-muted/50 p-4 border border-border/50">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-primary font-bold text-sm">
                          <Sparkles className="h-4 w-4" />
                          <span>Special Offer</span>
                        </div>
                        <h4 className="text-sm font-semibold leading-tight">Full-Stack Bundle</h4>
                        <p className="text-xs text-muted-foreground">Get access to all courses at 40% off.</p>
                      </div>
                      <Link href="/courses" className={clsx(buttonVariants({ size: "sm" }), "mt-4 w-full text-xs")}>
                        View All Courses
                      </Link>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* FAQ Link */}
              <NavigationMenuItem>
                <NavigationMenuLink asChild className={clsx(navigationMenuTriggerStyle(), "bg-transparent font-semibold cursor-pointer")}>
                  <Link href="/faq">FAQ</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              {/* Contact Link */}
              <NavigationMenuItem>
                <NavigationMenuLink asChild className={clsx(navigationMenuTriggerStyle(), "bg-transparent font-semibold cursor-pointer")}>
                  <Link href="/contact">Contact</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

            </NavigationMenuList>
            <NavigationMenuViewport />
          </NavigationMenu>
        </div>

        {/* Right Side */}
        <div className="ml-auto flex items-center space-x-4">
          {!isPending && (
            session ? (
              <div className="flex items-center gap-3">
                <Link href={dashboardHref} className={clsx(buttonVariants({ variant: "outline", size: "sm" }), "hidden sm:flex items-center gap-2 border-primary/20 hover:bg-primary/5")}>
                  <LayoutDashboard className="h-4 w-4" />
                  <span className="font-semibold">Dashboard</span>
                </Link>
                <UserDropdown 
                  email={session.user.email ?? ""} 
                  image={session.user.image ?? ""} 
                  name={session.user.name ?? "User"} 
                  role={userRole} 
                />
              </div>
            ) : (
              <div className="hidden sm:flex items-center space-x-2">
                <Link href="/login" className={buttonVariants({ variant: "ghost" })}>Login</Link>
                <Link href="/signup" className={buttonVariants()}>Get Started</Link>
              </div>
            )
          )}
          
          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2 text-muted-foreground focus:outline-none">
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div className="md:hidden border-t bg-background p-6 space-y-6">
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-widest px-2">Courses</h4>
            {courseItems.map((item) => (
              <Link key={item.title} href={item.href} className="flex items-center gap-3 px-2 text-lg font-medium" onClick={() => setMobileOpen(false)}>
                {item.icon} {item.title}
              </Link>
            ))}
          </div>
          <div className="pt-4 border-t flex flex-col gap-4">
            <Link href="/faq" className="text-lg font-semibold px-2 flex items-center gap-3" onClick={() => setMobileOpen(false)}>
              <MessageCircle className="h-5 w-5 text-muted-foreground" /> FAQ
            </Link>
            <Link href="/contact" className="text-lg font-semibold px-2 flex items-center gap-3" onClick={() => setMobileOpen(false)}>
              <Mail className="h-5 w-5 text-muted-foreground" /> Contact
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

const ListItem = React.forwardRef<React.ElementRef<"a">, React.ComponentPropsWithoutRef<"a"> & { icon?: React.ReactNode }>(
  ({ className, title, children, icon, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={clsx(
              "group flex select-none gap-3 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className
            )}
            {...props}
          >
            <div className="shrink-0 pt-1">{icon}</div>
            <div className="space-y-1">
              <div className="text-sm font-medium leading-none">{title}</div>
              <p className="line-clamp-2 text-xs leading-snug text-muted-foreground">{children}</p>
            </div>
          </a>
        </NavigationMenuLink>
      </li>
    );
  }
);
ListItem.displayName = "ListItem";
