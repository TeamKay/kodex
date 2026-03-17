"use client"

import * as React from "react"
import {
  IconCamera,
  IconChartBar,
  IconColumns,
  IconDashboardFilled,
  IconFolder,
  IconHelp,
  IconSearch,
  IconSettings,
  IconUsers,
  IconBook,
  IconVideo,
} from "@tabler/icons-react";
import Logo from '@/public/images/logo.png'

import Link from "next/link";
import Image from "next/image";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";
import { NavMain } from "./nav-main";
import { NavSecondary } from "./nav-secondary";
import { NavUser } from "./nav-user";

// Import your Better Auth client instance
import { authClient } from "@/lib/auth-client"; 

const navigationData = {
  admin: [
    { title: "Dashboard", url: "/dashboard/admin", icon: IconDashboardFilled },
    { title: "All Courses", url: "/dashboard/admin/courses", icon: IconColumns },
    { title: "Review Queue", url: "/dashboard/admin/reviews", icon: IconSearch },
    { title: "Instructors", url: "/dashboard/admin/instructor", icon: IconCamera },
    { title: "Students", url: "/dashboard/admin/student", icon: IconUsers },
    { title: "Revenue", url: "/dashboard/admin/revenue", icon: IconChartBar },
    { title: "Projections", url: "/dashboard/admin/projection", icon: IconFolder },
  ],
  educator: [
  { title: "Dashboard", url: "/dashboard/educator", icon: IconDashboardFilled },
  { title: "My Courses", url: "/dashboard/educator/courses", icon: IconBook },   
  { title: "Review Status", url: "/dashboard/educator/reviews", icon: IconSearch },
  { title: "Live Classes", url: "/dashboard/educator/live", icon: IconVideo },
  { title: "Student Roster", url: "/dashboard/educator/assignments", icon: IconUsers },
],
  student: [
    { title: "Dashboard", url: "/dashboard/student", icon: IconDashboardFilled },
    { title: "My Profile", url: "/dashboard/student/profile", icon: IconUsers },
    { title: "Enrolled Courses", url: "/dashboard/student/enrolled", icon: IconColumns },
    { title: "Available Courses", url: "/dashboard/student/available", icon: IconColumns },
  ],
};

const secondaryNav = [
  { title: "Settings", url: "#", icon: IconSettings },
  { title: "Get Help", url: "#", icon: IconHelp },
  { title: "Search", url: "#", icon: IconSearch },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  // 1. Hook into Better Auth session
  const { data: session, isPending } = authClient.useSession();

  // 2. Extract role (defaulting to 'student' if not found)
  // Note: Ensure 'role' is in your database schema and Better Auth config
  const rawRole = (session?.user as { role?: string })?.role || "Student";
  const userRole = rawRole.toLowerCase() as keyof typeof navigationData;

  // 3. Select the correct nav items
  const navMainItems = navigationData[userRole] || navigationData.student;


  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:p-1.5">
              <Link href="/">
                <Image src={Logo} alt="Logo" width={120} height={60} priority />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      
      <SidebarContent>
        {/* Optional: Show a skeleton or nothing while loading session */}
        {!isPending && <NavMain items={navMainItems} />}
        
        <NavSecondary items={secondaryNav} className="mt-auto" />
      </SidebarContent>

      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  )
}