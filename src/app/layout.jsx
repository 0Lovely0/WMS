'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbaar";
import Sidebar from "@/components/Sidebar";
import { SelectionProvider } from "@/context/SelectionContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const allowedPaths = ['/dashboard', '/po', '/asn', '/gateEntries', '/grn', '/putaway'];

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const [showSidebar, setShowSidebar] = useState(true);

  const toggleSidebar = () => setShowSidebar(prev => !prev);
  const shouldShowLayout = allowedPaths.includes(pathname);

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <SelectionProvider>
          <div className="flex flex-col min-h-screen w-full">
            {shouldShowLayout && <Navbar onWmsClick={toggleSidebar} />}
            <div className="flex flex-1">
              {shouldShowLayout && showSidebar && <Sidebar />}
              <div className="flex-1 relative">
                    {children}
              </div>
            </div>
          </div>
        </SelectionProvider>
      </body>
    </html>
  );
}
