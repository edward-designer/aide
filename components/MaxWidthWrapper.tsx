import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface TMaxWidthWrapper {
  className?: string;
  children: ReactNode;
}

const MaxWidthWrapper = ({ className = "", children }: TMaxWidthWrapper) => {
  return (
    <main
      className={cn(
        "mx-auto w-full max-w-screen-xl px-2 md:px-4",
        className
      )}
    >
      {children}
    </main>
  );
};

export default MaxWidthWrapper;
