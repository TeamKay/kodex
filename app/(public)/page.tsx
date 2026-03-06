import { Suspense } from "react";

import LatestCourses from "./_components/LatestCourses";
import { PublicCourseCardSkeleton } from "./_components/PublicCourseCard";
import HowItWork from "./_components/HowItWork";
import CreditBenefits from "./_components/CreditBenefits";
import Testimonials from "./_components/Testimonials";
import CallToAction from "./_components/CallToAction";
import LandingPage from "./_components/LandingPage";
import Pricing from "./_components/Pricing";


export default async function HomePage() {
  return (
    <>
      <LandingPage />
      <HowItWork/>

      <Suspense 
        fallback={<LoadingSkeletonLayout/>}>
                <LatestCourses />
        </Suspense>   

       <CreditBenefits/>
      <Pricing/>

      <Testimonials/>

      <CallToAction/>
    </>
  );
}

function LoadingSkeletonLayout(){
    return <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({length: 9}).map((_, index) => (
            <PublicCourseCardSkeleton key={index} />
        ))}
    </div>
}





