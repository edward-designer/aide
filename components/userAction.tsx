import { buttonVariants } from "./ui/button";
import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs/server";
import { ArrowRight } from "lucide-react";

const UserAction = () => {
  return (
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
