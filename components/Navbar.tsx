import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import UserMenu from "./UserMenu";

const Navbar = () => {
  return (
    <header
      className={cn([
        "w-24 text-secondary/100 flex-centered z-50 transition-all sticky h-14 inset-x-0 top-0 bg-primary/90 backdrop-blur-sm rounded-br-3xl shadow-sm",
        "w-full",
      ])}
    >
      <nav className="w-full">
        <MaxWidthWrapper>
          <div className="flex h-14 items-center justify-between">
            <span className="relative text-4xl font-normal top-1">
              AID<span className="font-thin relative -top-3">e</span>
            </span>

            <div className="items-center space-x-4 sm:flex">
              <UserMenu loggedIn={false} />
            </div>
          </div>
        </MaxWidthWrapper>
      </nav>
    </header>
  );
};

export default Navbar;
