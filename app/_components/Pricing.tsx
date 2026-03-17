import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

import Link from "next/link";

async function getSession() {
  const requestHeaders = await headers(); // ✅ await here

  return await auth.api.getSession({
    headers: requestHeaders,
  });
}

export default async function PricingPage() {
  const session = await getSession();

  const plans = [
    {
      name: "Hatchling Plan",
      price: 25,
      color: "bg-purple-700",
      features: [
        { text: "Unlimited Support", included: true },
        { text: "5GB Server Space", included: true },
        { text: "2 Users per Project", included: true },
        { text: "Email Integration", included: false },
        { text: "Unlimited Download", included: false },
      ],
    },
    {
      name: "Baby Plan",
      price: 69,
      color: "bg-green-600",
      highlighted: true,
      features: [
        { text: "Unlimited Support", included: true },
        { text: "10GB Server Space", included: true },
        { text: "5 Users per Project", included: true },
        { text: "Email Integration", included: true },
        { text: "Unlimited Download", included: false },
      ],
    },
    {
      name: "Premium Plan",
      price: 99,
      color: "bg-orange-600",
      features: [
        { text: "Unlimited Support", included: true },
        { text: "25GB Server Space", included: true },
        { text: "10 Users per Project", included: true },
        { text: "Email Integration", included: true },
        { text: "Unlimited Download", included: true },
      ],
    },
  ];

  return (
    <div className="min-h-screen py-20 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">Plans & Pricing</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-16">
          Choose the perfect plan for your project needs.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pl-0">
          {plans.map((plan, index) => {
            return (
                        <Card key={index} className="border-emerald-900 hover:border-emerald-800/40 transition-all duration-300">
                            <CardHeader className="pb-2">
                                <h2 className="uppercase tracking-wider text-sm mb-4">{plan.name}</h2>
                                
                                <CardTitle className="text-6xl font-semibold text-white">{plan.price}</CardTitle>
                                <p className="text-sm mt-2">PER MONTH</p>
                            </CardHeader>
                            <CardContent>
                                 <div className="text-muted-foreground p-8 space-y-4">
                                    {plan.features.map((feature, i) => (
                                    <div key={i} className="flex items-center justify-between">
                                        <span>{feature.text}</span>
                                        <span className={`font-bold ${feature.included ? "text-green-500" : "text-red-500"}`}>
                                        {feature.included ? "✓" : "✕"}
                                        </span>
                                    </div>
                                    ))}
                                </div>
                            </CardContent>
                            <CardFooter>
                                <div className="p-6 text-center">
                 {session ? (
                   <Link
                     href="/dashboard"
                     className="bg-orange-600 text-white px-6 py-3 rounded-md hover:bg-orange-700 transition"
                   >
                     Choose Plan
                   </Link>
                 ) : (
                   <Link
                     href="/sign-in"
                     className="bg-orange-600 text-white px-6 py-3 rounded-md hover:bg-orange-700 transition"
                   >
                     Sign In to Choose
                   </Link>
                 )}
               </div>
                            </CardFooter>
                        </Card>
                    );
         
            })}
        </div>
      </div>
    </div>
  );
}