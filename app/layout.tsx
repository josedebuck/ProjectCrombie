import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./pages/components/Navbar";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/contexts/ThemeContext";
import ToggleDarkMode from "./pages/components/ToggleDarkMode";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Elys",
  description: "The best social media app",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ThemeProvider>
      <ClerkProvider>
      <html lang="en" className="dark">
  <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white dark:bg-gray-900`}>
    <div className="w-full px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
      <Navbar />
    </div>
    <div className="bg-slate-100 dark:bg-gray-800 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
      <ToggleDarkMode />
      {children}
    </div>
  </body>
</html>

      </ClerkProvider>
    </ThemeProvider>
  );
}
