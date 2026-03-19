import { Button } from "./ui/button";

export function Prerequisites() {
  const requirements = [
    "Must be at least 18 years of age",
    "High School Diploma or GED equivalent",
    "Valid government-issued photo ID",
    "Up-to-date immunization records (TB, Hep B)",
    "Clean criminal background check"
  ];

  return (
    <section className="py-20 border-t border-border bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-12">
          
          <div className="flex-1">
            <h2 className="text-3xl font-bold mb-6">Ready to Start?</h2>
            <p className="text-muted-foreground mb-8">
              We keep our enrollment process simple. To qualify for the upcoming cohort, 
              please ensure you meet the following state-mandated requirements:
            </p>
            <ul className="space-y-4">
              {requirements.map((req, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="mt-1 h-5 w-5 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                    <span className="text-emerald-500 text-xs font-bold">✓</span>
                  </div>
                  <span className="text-foreground/80">{req}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex-1 w-full bg-card p-8 rounded-3xl border border-border shadow-xl">
            <h3 className="text-xl font-bold mb-4 italic font-serif">Financial Aid & Pricing</h3>
            <div className="mb-6">
              <span className="text-4xl font-bold">$1,250</span>
              <span className="text-muted-foreground ml-2">All-inclusive tuition</span>
            </div>
            <p className="text-sm text-muted-foreground mb-6">
              Tuition includes your scrubs, textbook, clinical supplies, and lab fees. 
              Flexible payment plans available.
            </p>
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-6">
              Download Enrollment Package
            </Button>
          </div>

        </div>
      </div>
    </section>
  );
}