"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface iAppProps {
    fullname: string;
    email: string;
    profileImage: string;
}

export function SettingsForm({fullname, email, profileImage}: iAppProps){
    return (
        <Card>
        <CardHeader>
            <CardTitle>Settings</CardTitle>
            <CardDescription>Manage your account settings!</CardDescription>
        </CardHeader>

        <form>
        <CardContent className="flex flex-col gap-y-4">
            <div className="flex flex-col gap-y-2">
                <Label>Full Name</Label>
                <Input defaultValue={fullname} placeholder="Full Name Here..." />
            </div>
            <div className="flex flex-col gap-y-2">
                <Label>Email</Label>
                <Input disabled defaultValue={email} placeholder="Email Here..." />
            </div>
        </CardContent>
        <CardFooter>
            <Button>
                Submit
            </Button>
        </CardFooter>

        </form>
    </Card>
    )
}