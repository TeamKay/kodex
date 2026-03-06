import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookAIcon, CheckIcon } from "lucide-react";
import { creditBenefits } from "./HowItWork";

export default function CreditBenefits(){
    return ( 
        <section className="py-20">
            <div className="container mx-auto px-4">
            
            <div>
                <Card className="mt-12 bg-muted/20 border-emerald-900/30">
                    <CardHeader>
                        <CardTitle className="text-xl font-semibold text-white flex items-center">
                            <BookAIcon className="size-5 mr-2 text-emerald-400"/>
                            How Our Credit System Works
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-3">
                            {creditBenefits.map((benefit, index) => {
                                return (
                                    <li key={index} className="flex items-start">
                                    <div className="mr-3 mt-1 bg-emerald-900/20 p-1 rounded-full">
                                        <CheckIcon className="size-4 text-emerald-400"/>
                                    </div>
                                    <p className="text-muted-foreground"
                                        dangerouslySetInnerHTML={{ __html: benefit}}>
                                    </p>
                                </li>
                                )
                            })}
                        </ul>
                    </CardContent>
                </Card>
            </div>
            </div>
        </section>
    )
}