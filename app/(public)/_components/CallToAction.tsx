import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CallToAction(){
    return ( 
        <section className="py-20">
  <div className="container mx-auto px-4">
    <Card className="bg-linear-to-r from-emerald-900/30 to-emerald-950/20 border-emerald-800/20">
      {/* Added flex flex-col items-center text-center */}
      <CardContent className="p-6 md:p-12 lg:p-16 relative overflow-hidden flex flex-col items-center text-center">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to take control of your learning?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl">
            Join thousands of users who have simplified their learning journey with our lucrative program
            and packages. Get started today and experience learning the way is whouls be
          </p>
        </div>
        
        {/* Added justify-center */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
  </div>
</section>
    )
}