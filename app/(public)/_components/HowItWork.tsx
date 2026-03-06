import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, CreditCard, FileText, ShieldCheck, User, Video } from "lucide-react";

export const features = [
    {
        icon: <User className="size-6 text-emerald-400"/>,
        title: "Create Your Profile",
        description: "Sign up and complete your profile to access quality and interactive courses and live sessions.",
    },
    {
        icon: <Calendar className="size-6 text-emerald-400"/>,
        title: "Schedule Live Session",
        description: "Sign up and complete your profile to access quality and interactive courses and live sessions.",
    },
    {
        icon: <Video className="size-6 text-emerald-400"/>,
        title: "Video Classes",
        description: "Sign up and complete your profile to access quality and interactive courses and live sessions.",
    },
    {
        icon: <CreditCard className="size-6 text-emerald-400"/>,
        title: "Classes Credits",
        description: "Purchase courses meant to engage your learning and produce expected results.",
    },
    {
        icon: <ShieldCheck className="size-6 text-emerald-400"/>,
        title: "Verified Tutors",
        description: "All tutors and courses are carefully verted and verified to ensure quality and success.",
    },
    {
        icon: <FileText className="size-6 text-emerald-400"/>,
        title: "Appointment Manager",
        description: "Access and manage your scheduled classes with easy, and feel free to reschedule or cancel.",
    },
];


export const creditBenefits = [
    "Each session requires <strong class='text-emerald-400'>2 credits</strong> regardless of duration",
    "Credits <strong class='text-emerald-400'>never expires </strong> - use them whenever you need",
    "Monthly subscription gives you <strong class='text-emerald-400'>fresh credit every month</strong>",
    "Cancel or change your subscription <strong class='text-emerald-400'>anytime</strong> without pernaties"
];


export default function HowItWork(){
    return ( 
        <section className="py-20">
            <div className="container mx-auto px-4">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    How it Works
                </h2>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                    We make online courses and live sessions easier, interactive, and affordable.
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {features.map((feature, index) => {
                    return (
                        <Card key={index} className="border-emerald-900 hover:border-emerald-800/40 transition-all duration-300">
                            <CardHeader className="pb-2">
                                <div className="bg-emerald-900/20 p-3 rounded-lg w-fit mb-4">{feature.icon}</div>
                                <CardTitle className="text-xl font-semibold text-white">{feature.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">{feature.description}</p>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>
            </div>
        </section>
    )
}

