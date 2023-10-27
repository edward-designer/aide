import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Inter } from "next/font/google";

import Navbar from "@/components/Navbar";
import Providers from "@/components/Providers";
import UserAction from "@/components/UserMenu";
import { Toaster } from "@/components/ui/toaster";
import { cn, constructMetadata } from "@/lib/utils";

import UserAccountNav from "@/components/UserAccountNav/UserAccountNav";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import "react-loading-skeleton/dist/skeleton.css";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = constructMetadata();

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
                  !user?.given_name || !user?.family_name
                    ? "Your Account"
                    : `${user?.given_name} ${user?.family_name}`
                }
                email={user?.email ?? ""}
                imageUrl={user?.picture ?? ""}
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
