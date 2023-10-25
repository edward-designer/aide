"use client";

import Image from "next/image";
import Link from "next/link";

import MaxWidthWrapper from "./MaxWidthWrapper";
import { cn } from "@/lib/utils";

import logo from "@/public/aide-logo.svg";
import { Button, buttonVariants } from "./ui/button";
import { ReactNode, useState } from "react";

interface TNavbar {
  loginLinks: ReactNode;
  userArea: ReactNode;
  isLoggedIn: boolean;
}

const Navbar = ({ loginLinks, userArea, isLoggedIn }: TNavbar) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <header
      className={cn([
        "overflow-hidden w-24 duration-300 text-secondary/100 flex-centered z-50 transition-all sticky h-14 inset-x-0 top-0 bg-primary/80 backdrop-blur-sm rounded-br-3xl shadow-sm",
        isExpanded ? "w-full" : "w-40",
      ])}
    >
      <nav className="w-full">
        <MaxWidthWrapper>
          <div className="flex h-14 items-center justify-between">
            <Button
              onClick={() => setIsExpanded((isExpanded) => !isExpanded)}
              className="flex-centered hover:bg-transparent hover:scale-110 transition-all origin-left"
              variant="ghost"
              aria-label={isExpanded ? "close the menu" : "open the menu"}
            >
              <Image
                priority
                src={logo}
                className="w-8 mr-sm relative top-[1px]"
                alt="AIDe AI Document Chatter"
              />
              <span className="relative text-3xl font-extralight top-1">
                AID<span className="font-normal relative -top-3">e</span>
              </span>
            </Button>
            {isExpanded && (
              <div className="items-center space-x-4 flex flex-wrap justify-end">
                {!isLoggedIn ? (
                  <>
                    <Link
                      href="/pricing"
                      className={buttonVariants({
                        variant: "ghost",
                        size: "sm",
                      })}
                    >
                      Pricing
                    </Link>
                    {loginLinks}
                  </>
                ) : (
                  <>
                    <Link
                      href="/dashboard"
                      className={buttonVariants({
                        variant: "ghost",
                        size: "sm",
                      })}
                    >
                      Dashboard
                    </Link>
                    {userArea}
                  </>
                )}
              </div>
            )}
          </div>
        </MaxWidthWrapper>
      </nav>
    </header>
  );
};

export default Navbar;
