import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import Logo from "@/public/images/logo.png";
import { BookingLinks } from "./bookingLinks";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { ThemeToggle } from "@/app/(public)/_components/themeToggle";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";


async function getData(userId: string){
    const data = await prisma.user.findUnique({
        where: {
            id: userId,
        },
        select: {
            email: true,
            grantId: true,
        },
    });

    if(!data?.email){
        return redirect("/booking")
    }

    if(!data.grantId){
        return redirect("/booking/grand-id")
    }

    return data;
}



export default function BookingLayout({children}: {children: ReactNode}) {
    return (
        <>
        <div className="min-h-screen w-full grid md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
            <div className="hidden md:block border-r bg-muted/40">
                <div className="flex h-full max-h-screen flex-col gap-2">
                    <div className="flex h-14 items-center border-b px-4 lg:h-15 lg:px-6">
                        <Link href="/">
                         <Image src={Logo} alt="Logo" width={120} height={60} />
                        </Link>
                    </div>

                    <div className="flex-1">
                        <nav className="grid items-start px-2 lg:px-4">
                            <BookingLinks />
                        </nav>
                    </div>
                </div>
            </div>

            <div className="flex flex-col">
                <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-15 lg:px-6 ">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button className="md:hidden" variant="ghost" size="icon">
                                <Menu className="size-5"/>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="flex flex-col">
                            <nav className="grid gap-2 mt-10">
                                <BookingLinks />
                            </nav>
                        </SheetContent>
                    </Sheet>

                    <div className="ml-auto flex items-center gap-x-4">
                        <ThemeToggle/>
                    </div>
                </header>
                <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
                    {children}
                </main>
            </div>
        </div>
        
        </>
    )
}