import LandingPage from "../_components/LandingPage";
import { Prerequisites } from "../_components/Prerequisites";
import { SuccessStories } from "../_components/SuccessStories";
import { FooterCTA } from "../_components/CallToAction";


export default function HomePage() {
  return (
    <main className="min-h-screen">
      <>
      <LandingPage />
      <Prerequisites/>
      <SuccessStories/>
      <FooterCTA/>
    </>
    </main>
    
  );
}





