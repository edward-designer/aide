import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs/server";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "./ui/button";
import Link from "next/link";

const UserMenu = ({ loggedIn = false }) => {
  return (
    <>
      <Link
        href="/"
        className={buttonVariants({
          variant: "ghost",
          size: "sm",
        })}
      >
        Home
      </Link>
      {!loggedIn ? (
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
          <LoginLink
            className={buttonVariants({
              variant: "ghost",
              size: "sm",
            })}
          >
            Sign in
          </LoginLink>
          <RegisterLink
            className={buttonVariants({
              size: "sm",
              className: "hover:bg-accent/100",
            })}
          >
            Get started <ArrowRight className="ml-1.5 h-5 w-5" />
          </RegisterLink>
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
        </>
      )}
    </>
  );
};

export default UserMenu;
