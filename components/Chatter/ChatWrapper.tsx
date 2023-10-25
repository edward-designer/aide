"use client";

import { trpc } from "@/app/_trpc/client";
import ChatInput from "./ChatInput";
import Messages from "./ChatMessages";
import { Loader2, XCircle } from "lucide-react";
import Message from "../others/Message";
import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { ChatContextProvider } from "./ChatContext";

interface TChatWrapper {
  fileId: string;
  userId: string;
}

const ChatWrapper = ({ fileId, userId }: TChatWrapper) => {
  const { data, error, isLoading } = trpc.getFileStatus.useQuery(
    {
      fileId,
    },
    {
      refetchInterval: (data) =>
        data?.status === "SUCCESS" || data?.status === "FAILED" ? false : 500,
    }
  );

  if (isLoading)
    return (
      <div className="relative min-h-full flex justify-between gap-xs divide-y divide-text/20 flex-col">
        <div className="flex-1 flex-centered mb-xl">
          <div className="flex flex-col items-center gap-2">
            <Message
              icon={
                <Loader2 className="h-lg w-lg animate-spin text-accent/100" />
              }
              heading="Just a Moment"
              text="AIDe is currently munching and digesting your file."
            />
          </div>
        </div>
      </div>
    );

  if (data?.status === "PROCESSING" || error)
    return (
      <div className="relative min-h-full bg-primary-foreground flex justify-between gap-xs divide-y divide-text/20 flex-col">
        <div className="flex-1 flex-centered mb-xl">
          <div className="flex flex-col items-center gap-2">
            <Message
              icon={
                <Loader2 className="h-lg w-lg animate-spin text-accent/100" />
              }
              heading="A Moment More"
              text="Give AIDe a minute and AIDe will be ready in no time."
            />
          </div>
        </div>
      </div>
    );

  if (data?.status === "FAILED")
    return (
      <div className="relative min-h-full bg-primary-foreground flex justify-between gap-xs divide-y divide-text/20 flex-col">
        <div className="flex-1 flex-centered mb-xl">
          <div className="flex flex-col items-center gap-2">
            <Message
              icon={<XCircle className="h-lg w-lg text-accent/100" />}
              heading="Something Went Wrong."
              text="AIDe needs your help to upload the file again."
            >
              <Link
                href="/dashboard"
                className={buttonVariants({ variant: "secondary" })}
              >
                Back to dashboard.
              </Link>
            </Message>
          </div>
        </div>
      </div>
    );

  return (
    <ChatContextProvider fileId={fileId} userId={userId}>
      <div className="relative min-h-full bg-primary-foreground flex justify-between gap-xs divide-y divide-text/20 flex-col">
        <div className="flex-1 relative justify-between flex flex-col mb-xl">
          <div className="absolute z-10 top-0 h-lg w-full bg-gradient-to-b from-white to-transparent" />
          <Messages fileId={fileId} />
        </div>
        <ChatInput isDisabled={false} />
      </div>
    </ChatContextProvider>
  );
};

export default ChatWrapper;
