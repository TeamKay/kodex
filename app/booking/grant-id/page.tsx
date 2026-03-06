import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarCheck2 } from "lucide-react";
import Link from "next/link";


export default function GrantIdPage() {
    return (
        <div className="min-h-screen w-screen flex items-center justify-center">
            <Card>
                <CardHeader>
                    <CardTitle>Scheduling Time</CardTitle>
                    <CardDescription className="text-center w-full">
                        Let begin your online class Scheduling!
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Button asChild className="w-full">
                        <Link href="/api/auth">
                            <CalendarCheck2 className="size-4 mr-2"/>
                           Connect Calendar to your account
                        </Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}