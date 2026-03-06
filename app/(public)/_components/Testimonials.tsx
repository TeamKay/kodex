import { Card, CardContent } from "@/components/ui/card";


    
export const testimonials = [
    {
        initials: "SP",
        name: "Samuel Parkings",
        role: "Parent",
        quote: "Live sessions are very clear anfmmm"
    },
    {
        initials: "SP",
        name: "Samuel Parkings",
        role: "Parent",
        quote: "Live sessions are very clear anfmmm"
    },
    {
        initials: "SP",
        name: "Samuel Parkings",
        role: "Parent",
        quote: "Live sessions are very clear anfmmm"
    },
    {
        initials: "SP",
        name: "Samuel Parkings",
        role: "Parent",
        quote: "Live sessions are very clear anfmmm"
    },
    {
        initials: "SP",
        name: "Samuel Parkings",
        role: "Parent",
        quote: "Live sessions are very clear anfmmm"
    },
];



export default function Testimonials(){
    return ( 
        <section className="py-20">
            <div className="container mx-auto px-4">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    What Our Users Say
                </h2>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                    Hear from teachers, students and parents who use our system
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {testimonials.map((testimonial, index) => {
                    return (
                        <Card key={index} className="border-emerald-900 hover:border-emerald-800/40 transition-all duration-300">
                            
                            <CardContent className="pt-6">
                                <div className="flex items-center mb-4">
                                    <div className="size-12 rounded-full bg-emerald-900/20 flex items-center justify-center mr-4">
                                        <span className="text-emerald-400 font-bold">{testimonial.initials}</span>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-white">{testimonial.name}</h4>
                                    </div>
                                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                                </div>
                                <p className="text-sm text-muted-foreground">&quot;{testimonial.quote}&quot;</p>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>
            </div>
        </section>
    )
}

