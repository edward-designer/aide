import { Loader2, Send } from "lucide-react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { ChatContext } from "./ChatContext";
import { useContext, useRef } from "react";

interface TChatInput {
  isDisabled: boolean;
}

const ChatInput = ({ isDisabled }: TChatInput) => {
  const { addMessage, handleInputChange, isLoading, message } =
    useContext(ChatContext);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  return (
    <div className="absolute bottom-0 left-0 w-full bg-primary-foreground">
      <form className="mx-sm flex flex-row gap-3 md:mx-md md:last:mb-lg lg:mx-auto lg:max-w-2xl xl:max-w-3xl">
        <div className="relative flex h-full flex-1 items-stretch md:flex-col">
          <div className="relative flex flex-cl w-full flex-grow p-4">
            <Textarea
              ref={textareaRef}
              placeholder="Enter your question..."
              rows={1}
              maxRows={4}
              autoFocus
              value={message}
              onChange={handleInputChange}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  addMessage();
                  textareaRef.current?.focus();
                }
              }}
              className="resize-none pr-lg text-base py-sm scrollbar-thumb-primary scrollbar-thumb-rounded scrollbar-track-primary-foreground scrollbar-w-xs scrolling-touch"
            />
            <Button
              aria-label="send message"
              className="absolute bottom-[1.15rem] right-[1.35em]"
              type="submit"
              disabled={isLoading || isDisabled}
              onClick={(e) => {
                e.preventDefault();
                addMessage();
                textareaRef.current?.focus();
              }}
            >
              {isLoading || isDisabled ? (
                <Loader2 className="h-md w-md" />
              ) : (
                <Send className="h-md w-md" />
              )}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ChatInput;
