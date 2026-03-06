import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import FooterPage from "./(public)/_components/FooterPage";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Justdy | Learning made easy",
  description: "Learn smarter with Justdy",
  // icons: {
  //   icon: "images/favicon.png", // <-- your new icon file
  // },
};

export default function RootLayout({ children } : { children: React.ReactNode}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange>
            {children}
            <Toaster closeButton position="bottom-center"/>

            <FooterPage/>
          </ThemeProvider>
      </body>
    </html>
  );
}
