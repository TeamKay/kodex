import type { Metadata } from "next";
import "./globals.css";
import { Inter, Playfair_Display } from "next/font/google";
import { Toaster } from "./_components/ui/sonner";
import { ThemeProvider } from "./_components/ui/theme-provider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
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
      <body className={`${inter.variable} ${playfair.variable} font-sans`}>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange>
            {children}
            <Toaster closeButton position="bottom-center"/>

            {/* <FooterPage/> */}
          </ThemeProvider>
      </body>
    </html>
  );
}
