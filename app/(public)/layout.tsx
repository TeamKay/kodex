
import { ReactNode } from "react";
import { AnnouncementBanner } from "../_components/AnnouncementBanner";
import { Navbar } from "../_components/Navbar";


export default function LayoutPublic({ children }: { children: ReactNode }) {
    return (
        <div className="min-h-screen flex flex-col">
          <AnnouncementBanner />
           <Navbar />
             
            {/* Removed container and px classes so children can be full-width */}
            <main className="flex-1 mb-32">
                {children}
            </main>
        </div>
    )
}