import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";

import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";

import Navbar from "@/app/_components/navbar";
import Footer from "@/app/_components/footer";

const font = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RiotTracker | Game Stats Tracker",
  description: "Open-Souce Game Stats Tracker",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          {children}
        </ThemeProvider>
        <Footer />
      </body>
    </html>
  );
}
