import type { Metadata } from "next";
import "./globals.css";
import { Inter, Playfair_Display } from "next/font/google";
import { Toaster } from "./_components/ui/sonner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Kodex Institute | CNA Masters",
  description: "Learn smarter with Justdy",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      {/* Added 'bg-cream' class here to ensure it covers the whole page */}
      <body className={`${inter.variable} ${playfair.variable} font-sans bg-cream text-slate-900`}>
        <main>
          {children}
        </main>
        
        <Toaster closeButton position="bottom-center" />

        <footer className="py-12 border-t border-border bg-black/5">
          <div className="container mx-auto px-4 text-center">
            <p className="text-sm text-muted-foreground">
              © 2026 CNA Training Academy. All Rights Reserved. State Approved License #49201.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}