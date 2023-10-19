import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";

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
      <body
        className={cn(
          "flex flex-col min-h-screen antialiased grainy",
          inter.className
        )}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
