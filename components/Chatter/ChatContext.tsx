import { ChangeEvent, ReactNode, createContext, useRef, useState } from "react";
import { useToast } from "../ui/use-toast";
import { useMutation } from "@tanstack/react-query";
import { trpc } from "@/app/_trpc/client";
import { INFINITE_QUERY_LIMIT } from "@/app/config/infinite-query";

interface StreamResponse {
  addMessage: () => void;
  message: string;
  handleInputChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  isLoading: boolean;
}

export const ChatContext = createContext<StreamResponse>({
  addMessage: () => {},
  message: "",
  handleInputChange: () => {},
  isLoading: false,
});

interface TChatContextProvider {
  fileId: string;
  userId: string;
  children: ReactNode;
}

export const ChatContextProvider = ({
  fileId,
  userId,
  children,
}: TChatContextProvider) => {
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const utils = trpc.useUtils();

  const { toast } = useToast();

  const backupMessage = useRef("");

  const mutation = trpc.addMessage.useMutation({
    onSettled: async () => await utils.getFileMessages.invalidate(),
  });

  const { mutate: sendMessage } = useMutation({
    mutationFn: async ({ message }: { message: string }) => {
      mutation.mutate({
        fileId,
        isUserMessage: true,
        createdAt: new Date().toISOString(),
        message,
      });
      const response = await fetch("/api/message", {
        method: "POST",
        body: JSON.stringify({
          fileId,
          userId,
          message,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      return response.body;
    },
    onMutate: async ({ message }) => {
      backupMessage.current = message;
      setMessage("");

      await utils.getFileMessages.cancel();
      const previousMessages = utils.getFileMessages.getInfiniteData();

      utils.getFileMessages.setInfiniteData(
        { fileId, limit: INFINITE_QUERY_LIMIT },
        (old) => {
          if (!old) {
            return {
              pages: [],
              pageParams: [],
            };
          }
          let [firstPage, ...otherPages] = old.pages;

          firstPage = {
            ...firstPage,
            messages: [
              {
                id: crypto.randomUUID(),
                createdAt: new Date().toISOString(),
                text: message,
                isUserMessage: true,
              },
              ...firstPage.messages,
            ],
          };

          return {
            ...old,
            pages: [firstPage, ...otherPages],
          };
        }
      );
      setIsLoading(true);
      return {
        previousMessages: previousMessages?.pages.flatMap(
          (page) => page.messages
        ),
      };
    },
    onSuccess: async (stream) => {
      setIsLoading(false);
      if (!stream) {
        return toast({
          title: "Huston, We have a Problem Here...",
          description: "Please retry by refreshing the page",
          variant: "destructive",
        });
      }

      const reader = stream.getReader();
      const decoder = new TextDecoder();
      let done = false;

      let accResponse = "";
      let isFirstResponse = true;
      const id = crypto.randomUUID();
      const createdAt = new Date().toISOString();

      while (!done) {
        const { value, done: doneStream } = await reader.read();
        done = doneStream;
        const chunkValue = decoder.decode(value);
        accResponse += chunkValue;

        utils.getFileMessages.setInfiniteData(
          { fileId, limit: INFINITE_QUERY_LIMIT },
          (old) => {
            if (!old) {
              return {
                pages: [],
                pageParams: [],
              };
            }
            let [firstPage, ...otherPages] = old.pages;
            let [firstMessage, ...otherMessages] = firstPage.messages;

            if (isFirstResponse) {
              otherMessages.unshift(firstMessage);
            }
            isFirstResponse = false;

            firstPage = {
              ...firstPage,
              messages: [
                {
                  id,
                  createdAt,
                  text: `${accResponse}${done ? "" : " ..."}`,
                  isUserMessage: false,
                },
                ...otherMessages,
              ],
            };

            return {
              ...old,
              pages: [firstPage, ...otherPages],
            };
          }
        );
      }
      mutation.mutate({
        fileId,
        isUserMessage: false,
        createdAt,
        message: accResponse,
      });
    },
    onError: (_, __, context) => {
      setMessage(backupMessage.current);
      utils.getFileMessages.setData(
        { fileId },
        { messages: context?.previousMessages ?? [] }
      );
    },
    onSettled: async () => {
      setIsLoading(false);
    },
  });

  const addMessage = () => {
    if (message === "") return;
    sendMessage({ message });
  };
  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  return (
    <ChatContext.Provider
      value={{
        addMessage,
        message,
        handleInputChange,
        isLoading,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
