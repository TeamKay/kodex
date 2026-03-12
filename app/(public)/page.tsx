import { Suspense } from "react";

import LatestCourses from "./_components/LatestCourses";
import { PublicCourseCardSkeleton } from "./_components/PublicCourseCard";
import HowItWork from "./_components/HowItWork";
import Testimonials from "./_components/Testimonials";
import CallToAction from "./_components/CallToAction";
import LandingPage from "./_components/LandingPage";
import Pricing from "./_components/Pricing";
import HorizontalSlider from "./_components/HorizontalSlider";
import { getCategories } from "../actions/getCategories";


export default async function HomePage() {
   const categories = await getCategories();
  return (
    <>
      <LandingPage />
      <HorizontalSlider categories={categories} />;
   <HowItWork/>

        <CallToAction/>
    </>
  );
}





