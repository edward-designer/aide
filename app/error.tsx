"use client";

import { useEffect } from "react";
import { useQueryErrorResetBoundary } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import Message from "@/components/others/Message";
import { AlertCircle } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);
  const { reset: queryReset } = useQueryErrorResetBoundary();

  return (
    <Message
      icon={<AlertCircle className="h-xl w-xl text-accent/80" />}
      heading="Sorry, something went wrong..."
      text="Please try again by pressing the button below. Finger crossed."
    >
      <Button variant="secondary" onClick={() => reset()}>
        Try again
      </Button>
    </Message>
  );
}
