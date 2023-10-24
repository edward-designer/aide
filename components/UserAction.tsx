import { buttonVariants } from "./ui/button";
import {
  LoginLink,
  RegisterLink,
  getKindeServerSession,
} from "@kinde-oss/kinde-auth-nextjs/server";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const UserAction = () => {
  const { getUser } = getKindeServerSession();
  const user = getUser();

  return user ? (
    <>
      <Link
        className={buttonVariants({
          variant: "ghost",
          size: "sm",
        })}
        href="/dashboard"
      >
        Dashboard
      </Link>
    </>
  ) : (
    <>
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
          className: "hover:!bg-accent/100",
        })}
      >
        Get started <ArrowRight className="ml-1.5 h-5 w-5" />
      </RegisterLink>
    </>
  );
};

export default UserAction;
