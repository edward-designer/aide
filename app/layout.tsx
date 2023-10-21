import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import UserAction from "@/components/userAction";
import Providers from "@/components/Providers";

import "react-loading-skeleton/dist/skeleton.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AIDe - AI Document Chat Service",
  description:
    "AIDe is your 24/7 personal assistant, allowing you to chat with any documents using latest AI technology. Simply upload your file and start asking questions right away!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="light">
      <Providers>
        <body
          className={cn(
            "flex flex-col min-h-screen antialiased grainy",
            inter.className
          )}
        >
          <Navbar>
            <UserAction />
          </Navbar>
          <Toaster />
          {children}
        </body>
      </Providers>
    </html>
  );
}
