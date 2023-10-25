import { cn } from "@/lib/utils";
import { ExtendedMessage } from "@/types/message";
import { Icons } from "../others/Icons";
import ReactMarkdown from "react-markdown";
import formatRelative from "date-fns/formatRelative";

interface TChatMessage {
  message: ExtendedMessage;
  isNextMessageSamePerson: boolean;
}

const ChatMessage = ({ message, isNextMessageSamePerson }: TChatMessage) => {
  return (
    <div
      className={cn(
        "grid grid-cols-[3em_1fr_3em] items-end gap-sm last:pt-lg",
        {
          "justify-end": message.isUserMessage,
        }
      )}
    >
      <div
        className={cn("relative flex-centered aspect-square rounded-full", {
          "col-start-3 bg-primary/80": message.isUserMessage,
          "col-start-1 bg-text/30": !message.isUserMessage,
          invisible: isNextMessageSamePerson,
        })}
      >
        {message.isUserMessage ? (
          <Icons.user className="text-white h-lg w-lg" />
        ) : (
          <Icons.logo className="text-white h-lg w-lg" />
        )}
      </div>
      <div
        className={cn(
          "flex flex-col space-y-xs text-base mx-xs col-start-2 row-start-1",
          {
            "items-end": message.isUserMessage,
            "items-start": !message.isUserMessage,
          }
        )}
      >
        <div
          className={cn("px-md py-sm max-w-lg rounded-xl block", {
            "bg-primary/100 text-white": message.isUserMessage,
            "bg-secondary-foreground/10 text-text": !message.isUserMessage,
            "rounded-br-none":
              !isNextMessageSamePerson && message.isUserMessage,
            "rounded-bl-none":
              !isNextMessageSamePerson && !message.isUserMessage,
          })}
        >
          {typeof message.text === "string" ? (
            <ReactMarkdown
              className={cn("prose", {
                "text-white": message.isUserMessage,
              })}
            >
              {message.text}
            </ReactMarkdown>
          ) : (
            message.text
          )}
          {message.id !== "loading-message" ? (
            <div
              className={cn("text-sm select-none mt-sm w-full text-right", {
                "text-text/70": !message.isUserMessage,
                "text-white/60": message.isUserMessage,
              })}
            >
              {formatRelative(new Date(message.createdAt), new Date())}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
