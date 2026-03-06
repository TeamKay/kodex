"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import clsx from "clsx";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "@/public/images/logo.png";
import { ThemeToggle } from "@/components/ui/themeToggle";
import { buttonVariants } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { UserDropdown } from "./UserDropdown";
import { usePathname } from "next/navigation";


const navigationItems = [
  { name: "Courses", href: "/courses" },
  { name: "Instructors", href: "/instructors" },
  { name: "About Us", href: "/games" },
];

export function Navbar() {
  const { data: session, isPending } = authClient.useSession();
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const userRole = session?.user?.role?.toLowerCase() ?? "student";


  return (
    <header className="sticky top-0 z-10 w-full border-b bg-background/95 backdrop-blur">
      <div className="container mx-auto flex min-h-16 items-center px-4 md:px-6 lg:px-8">
        <Link href="/" className="flex items-center">
          <Image src={Logo} alt="Logo" width={80} height={60} priority />
        </Link>

        <div className="hidden md:block mx-6 h-6 w-px bg-border" />

        <nav className="hidden md:flex flex-1 items-center justify-between">
          <div className="flex items-center space-x-4 divide-x divide-border">
            {navigationItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={clsx(
                    "relative px-4 text-sm font-bold transition-colors",
                    isActive ? 
                    "text-primary dark:text-primary" : "text-muted-foreground hover:text-primary")}>
                  {item.name}
                  {isActive && (
                    <motion.span
                      layoutId="active-underline"
                      className="absolute -bottom-2 left-4 right-4 h-0.5 bg-primary rounded-full"
                    />
                  )}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center space-x-4">
            <ThemeToggle />
            {!isPending &&
              (session ? (
                <UserDropdown
                  email={session.user.email ?? ""}
                  image={session.user.image ?? `https://avatar.vercel.sh/${session.user.email ?? "user"}`}
                  name={session.user.name?.length ? session.user.name : session.user.email?.split("@")[0] ?? "User"}
                  role={session?.user?.role?.toLowerCase() ?? "student"} // 🔹 dynamic role
                />
              ) : (
                <>
                  <Link href="/login" className={buttonVariants({ variant: "outline" })}>
                    Login
                  </Link>
                  <Link href="/signup" className={buttonVariants()}>
                    Get Started
                  </Link>
                </>
              ))}
          </div>
        </nav>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen((prev) => !prev)}
          className="ml-auto md:hidden rounded-md p-2 text-muted-foreground hover:text-primary"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="md:hidden overflow-hidden border-t bg-background"
          >
            <motion.div initial={{ y: -10 }} animate={{ y: 0 }} exit={{ y: -10 }} transition={{ duration: 0.25 }} className="px-4 py-4 space-y-2">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={clsx(
                    "block rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    pathname === item.href
                      ? "bg-muted text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-primary"
                  )}
                >
                  {item.name}
                </Link>
              ))}

              <div className="my-3 h-px bg-border" />

              <div className="flex items-center justify-between">
                <ThemeToggle />
                {!isPending &&
                  (session ? (
                    <UserDropdown
                      email={session.user.email ?? ""}
                      image={session.user.image ?? `https://avatar.vercel.sh/${session.user.email ?? "user"}`}
                      name={session.user.name?.length ? session.user.name : session.user.email?.split("@")[0] ?? "User"}
                      role={userRole} // 🔹 dynamic role
                    />
                  ) : (
                    <Link href="/login" className={buttonVariants({ variant: "secondary" })}>
                      Login
                    </Link>
                  ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}


// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Menu, X } from "lucide-react";
// import clsx from "clsx";
// import Logo from "@/public/images/logo.png";
// import { ThemeToggle } from "@/components/ui/themeToggle";
// import { authClient } from "@/lib/auth-client";
// import { buttonVariants } from "@/components/ui/button";
// import { UserDropdown } from "./UserDropdown";

// const navigationItems = [
//   { name: "Courses", href: "/courses" },
//   { name: "Instructors", href: "/instructors" },
//   { name: "About Us", href: "/games" },
// ];

// export function Navbar() {
//   const { data: session, isPending } = authClient.useSession();
//   const pathname = usePathname();
//   const [mobileOpen, setMobileOpen] = useState(false);

  
// return (
//     <header className="sticky top-0 z-10 w-full border-b bg-background/95 backdrop-blur">
//       <div className="container mx-auto flex min-h-16 items-center px-4 md:px-6 lg:px-8">
        
//         {/* Logo */}
//         <Link href="/" className="flex items-center">
//           <Image src={Logo} alt="Logo" width={80} height={60} priority />
//         </Link>

//         {/* Divider */}
//         <div className="hidden md:block mx-6 h-6 w-px bg-border" />

//         {/* Desktop Navigation */}
//         <nav className="hidden md:flex flex-1 items-center justify-between">
          
//           {/* Nav Links with Dividers */}
//           <div className="flex items-center space-x-4 divide-x divide-border">
//             {navigationItems.map((item) => {
//               const isActive = pathname === item.href;

//               return (
//                 <Link key={item.name} href={item.href}
//                   className={clsx("relative px-4 text-sm font-bold transition-colors", 
//                     isActive 
//                       ? "text-primary dark:text-primary"
//                       : "text-muted-foreground hover:text-primary")}>
//                   {item.name}

//                   {/* Active underline animation */}
//                   {isActive && (
//                     <motion.span
//                       layoutId="active-underline"
//                       className="absolute -bottom-2 left-4 right-4 h-0.5 bg-primary rounded-full"
//                     />
//                   )}
//                 </Link>
//               );
//             })}
//           </div>

         

//           {/* Right Actions */}
//           <div className="flex items-center space-x-4">
//             <ThemeToggle />

//             {!isPending && (
//               session ? (
//                 <UserDropdown
//                   email={session.user.email}
//                   image={session.user.image ?? `https://avatar.vercel.sh/${session.user.email}`}
//                   name={session.user.name?.length ? session.user.name : session.user.email.split("@")[0]}
//                   role={session.user.role ?? "Student"}
//                 />
//               ) : (
//                 <>
//                   <Link href="/login" className={buttonVariants({ variant: "outline" })}>
//                     Login
//                   </Link>
//                    <Link href="/signup" className={buttonVariants()}>
//                     Get Started
//                   </Link>
//                 </>
//               )
//             )}
//           </div>
//         </nav>

//         {/* Mobile Menu Button */}
//         <button
//           onClick={() => setMobileOpen((prev) => !prev)}
//           className="ml-auto md:hidden rounded-md p-2 text-muted-foreground hover:text-primary"
//           aria-label="Toggle menu"
//         >
//           {mobileOpen ? <X size={22} /> : <Menu size={22} />}
//         </button>
//       </div>

//       {/* Mobile Menu */}
//       <AnimatePresence>
//         {mobileOpen && (
//           <motion.div
//             initial={{ height: 0, opacity: 0 }}
//             animate={{ height: "auto", opacity: 1 }}
//             exit={{ height: 0, opacity: 0 }}
//             transition={{ duration: 0.25, ease: "easeInOut" }}
//             className="md:hidden overflow-hidden border-t bg-background"
//           >
//             <motion.div
//               initial={{ y: -10 }}
//               animate={{ y: 0 }}
//               exit={{ y: -10 }}
//               transition={{ duration: 0.25 }}
//               className="px-4 py-4 space-y-2"
//             >
//               {navigationItems.map((item) => {
//                 const isActive = pathname === item.href;

//                 return (
//                   <Link
//                     key={item.name}
//                     href={item.href}
//                     onClick={() => setMobileOpen(false)}
//                     className={clsx(
//                       "block rounded-md px-3 py-2 text-sm font-medium transition-colors",
//                       isActive
//                         ? "bg-muted text-primary"
//                         : "text-muted-foreground hover:bg-muted hover:text-primary"
//                     )}
//                   >
//                     {item.name}
//                   </Link>
//                 );
//               })}

//               {/* Divider */}
//               <div className="my-3 h-px bg-border" />

//               <div className="flex items-center justify-between">
//                 <ThemeToggle />

//                 {!isPending && (
//                   session ? (
//                     <UserDropdown
//                   email={session.user.email}
//                   image={session.user.image ?? `https://avatar.vercel.sh/${session.user.email}`}
//                   name={session.user.name?.length ? session.user.name : session.user.email.split("@")[0]}
//                   role={session.user.role ?? "Student"}
//                 />
//                   ) : (
//                     <div className="flex space-x-2">
//                       <Link
//                         href="/login"
//                         className={buttonVariants({ variant: "secondary" })}
//                       >
//                         Login
//                       </Link>
//                     </div>
//                   )
//                 )}
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </header>
//   );
// }

