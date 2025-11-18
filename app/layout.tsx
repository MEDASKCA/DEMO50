import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import TomPersistentPanel, { TomProvider } from "@/components/TomPersistentPanel";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TOM by MEDASKCA - Theatre Operations Manager",
  description: "AI-powered theatre operations management system with intelligent insights, analytics, and automation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <TomProvider>
          {/* TOM Persistent Panel */}
          <TomPersistentPanel />

          {/* Main Content - Shifted right on desktop to accommodate TOM panel */}
          <main className="md:ml-[380px] min-h-screen bg-gray-50 dark:bg-gray-950 transition-all duration-300">
            {children}
          </main>
        </TomProvider>
      </body>
    </html>
  );
}
