import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CallToAction(){
    return ( 
        <section className="py-20">
            <div className="container mx-auto px-4">
            <Card className="bg-linear-to-r from-emerald-900/30 to-emerald-950/20 border-emerald-800/20">
                <CardContent className="p-8 md:p-12 lg:p-16 relative overflow-hidden">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                            Ready to take control of your learning?
                        </h2>
                        <p className="text-lg text-muted-foreground mb-8">
                            Join thousands of users who have simplified their learning journey with our lucrative program
                            and packages. Get started today and experience learning the way is whouls be
                        </p>
                    </div>
                     <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-emerald-600 text-white hover:bg-emerald-700">
                 <Link href="/signup">
                   Signup Now <ArrowRight />
                 </Link>
                 </Button>
                <Button asChild variant="outline" size="lg" className="border-emerald-700/30 hover:bg-muted/80">
                 <Link href="/booking">
                   Live Sessions
                 </Link>
                 </Button>
               </div>
                </CardContent>
            </Card>
            <div>
                
            </div>
            </div>
        </section>
    )
}