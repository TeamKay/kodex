"use client";
import { cn } from "@/lib/utils";
import { CalendarCheck, HomeIcon, LucideProps, Settings, User2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ForwardRefExoticComponent, RefAttributes } from "react";

interface iAppProps {
    id: number;
    name: string;
    href: string;
    icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & 
    RefAttributes<SVGSVGElement>>;
}

export const bookingLinks: iAppProps[] = [
    {
        id: 0,
        name: "Event Types",
        href: "/booking",
        icon: HomeIcon,
    },
    {
        id: 1,
        name: "Meetings",
        href: "/booking/meetings",
        icon: User2,
    },
    {
        id: 2,
        name: "Availability",
        href: "/booking/availability",
        icon: CalendarCheck,
    },
    {
        id: 3,
        name: "Settings",
        href: "/booking/settings",
        icon: Settings,
    }
]


export function BookingLinks() {
    const pathname = usePathname();
    return(
        <>
        {bookingLinks.map((link) => (
            <Link key={link.id} href={link.href} className={cn(
                pathname === link.href ? "bg-primary/10 text-primary" : 
                "text-muted-foreground hover:bg-accent hover:text-foreground",
                "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary"
            )}>
                <link.icon className="size-4" />
                {link.name}
            </Link>
        ))}
        </>
    )
}