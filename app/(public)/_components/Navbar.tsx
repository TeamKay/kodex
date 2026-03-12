"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, BookOpen, Video, Users, Bot, Sparkles,ArrowRight, LayoutDashboard} from "lucide-react";
import clsx from "clsx";
import Logo from "@/public/images/logo.png";
import { ThemeToggle } from "@/app/(public)/_components/themeToggle";
import { buttonVariants } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { UserDropdown } from "./UserDropdown";
import { usePathname } from "next/navigation";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, NavigationMenuViewport, navigationMenuTriggerStyle} from "@/components/ui/navigation-menu";

const productItems = [
  { title: "Courses", href: "/courses", description: "Learn at your own pace.", icon: <BookOpen className="h-5 w-5 text-blue-500" /> },
  { title: "Live Sessions", href: "/live-sessions", description: "Real-time workshops.", icon: <Video className="h-5 w-5 text-red-500" /> },
  { title: "Communities", href: "/communities", description: "Connect with peers.", icon: <Users className="h-5 w-5 text-green-500" /> },
  { title: "AI Tutor", href: "/ai-tutor", description: "24/7 AI assistance.", icon: <Bot className="h-5 w-5 text-purple-500" /> },
];


const DASHBOARD_ROUTES: Record<string, string> = {
  admin: "/dashboard/admin",
  educator: "/dashboard/educator",
  student: "/dashboard/student",
};

export function Navbar() {
  const { data: session, isPending } = authClient.useSession();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const pathname = usePathname();
  const userRole = session?.user?.role?.toLowerCase() ?? "student";
  const dashboardHref = DASHBOARD_ROUTES[userRole] ?? "/dashboard/student";
  

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container mx-auto flex min-h-16 items-center px-4 md:px-6 lg:px-8 relative">
        
        <Link href="/" className="flex items-center shrink-0">
          <Image src={Logo} alt="Logo" width={80} height={60} priority />
        </Link>

        {/* Center Navigation */}
        <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center justify-center">
         <NavigationMenu className="relative">
            <NavigationMenuList className="gap-2">
              
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent font-semibold text-sm">
                  Products
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  {/* Mega Menu Layout */}
                  <div className="grid w-125 grid-cols-3 gap-3 p-4 md:w-162.5 lg:w-187.5">
                    
                    {/* Product List (Left 2 Columns) */}
                    <ul className="col-span-2 grid grid-cols-2 gap-3">
                      {productItems.map((item) => (
                        <ListItem key={item.title} title={item.title} href={item.href} icon={item.icon}>
                          {item.description}
                        </ListItem>
                      ))}
                    </ul>

                    {/* Featured Section (Right 1 Column) */}
                    <div className="col-span-1 flex flex-col justify-between rounded-md bg-muted/50 p-4 border border-border/50">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-primary font-bold text-sm">
                          <Sparkles className="h-4 w-4" />
                          <span>Featured</span>
                        </div>
                        <h4 className="text-sm font-semibold leading-tight text-foreground">
                          New: Advanced React Masterclass
                        </h4>
                        <p className="text-xs text-muted-foreground leading-snug">
                          Join our most popular cohort starting this Monday.
                        </p>
                      </div>
                      <Link 
                        href="/courses/react-masterclass" 
                        className={clsx(buttonVariants({ size: "sm" }), "mt-4 w-full text-xs flex items-center justify-between group")}
                      >
                        Enroll Now
                        <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild className={clsx(navigationMenuTriggerStyle(), "bg-transparent font-semibold cursor-pointer")}>
                  <Link href="/pricing">
                    Pricing
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

            </NavigationMenuList>

            <NavigationMenuViewport />
          </NavigationMenu>
        </div>

        {/* Right Side */}
        <div className="ml-auto flex items-center space-x-4">
          <ThemeToggle />
          {!isPending && (
            session ? (
<div className="flex items-center gap-3">
                {/* Dashboard Button: Only shows when logged in */}
                <Link 
                  href={dashboardHref} 
                  className={clsx(
                    buttonVariants({ variant: "outline", size: "sm" }), 
                    "hidden sm:flex items-center gap-2 border-primary/20 hover:bg-primary/5"
                  )}
                >
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
              <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-widest px-2">Products</h4>
              {productItems.map((item) => (
                <Link key={item.title} href={item.href} className="flex items-center gap-3 px-2 text-lg font-medium" onClick={() => setMobileOpen(false)}>
                  {item.icon} {item.title}
                </Link>
              ))}
           </div>
           {/* Mobile Featured Highlight */}
           <div className="bg-muted p-4 rounded-lg">
              <p className="text-xs font-bold text-primary mb-1 uppercase tracking-tighter">Newest Course</p>
              <Link href="/courses/react-masterclass" className="font-semibold block mb-2" onClick={() => setMobileOpen(false)}>
                Advanced React Masterclass
              </Link>
           </div>
           <div className="pt-4 border-t">
              <Link href="/pricing" className="text-lg font-semibold px-2" onClick={() => setMobileOpen(false)}>
                Pricing
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

