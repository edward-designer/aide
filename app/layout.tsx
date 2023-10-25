import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import Providers from "@/components/Providers";
import { Toaster } from "@/components/ui/toaster";
import UserAction from "@/components/UserMenu";

import "./globals.css";
import "react-loading-skeleton/dist/skeleton.css";
import UserAccountNav from "@/components/UserAccountNav/UserAccountNav";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

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
  const { getUser } = getKindeServerSession();
  const user = getUser();

  return (
    <html lang="en" className="light">
      <Providers>
        <body
          className={cn(
            "flex flex-col min-h-screen antialiased grainy",
            inter.className
          )}
        >
          <Navbar
            userArea={
              <UserAccountNav
                name={
                  !user.given_name || !user.family_name
                    ? "Your Account"
                    : `${user.given_name} ${user.family_name}`
                }
                email={user.email ?? ""}
                imageUrl={user.picture ?? ""}
              />
            }
            loginLinks={<UserAction />}
            isLoggedIn={!!user}
          />
          <ReactQueryDevtools />
          <Toaster />
          {children}
        </body>
      </Providers>
    </html>
  );
}
