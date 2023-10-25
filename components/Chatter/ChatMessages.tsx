import { trpc } from "@/app/_trpc/client";
import { INFINITE_QUERY_LIMIT } from "@/app/config/infinite-query";
import { Bot, Loader2, MessageSquare } from "lucide-react";
import Skeleton from "react-loading-skeleton";
import Message from "../others/Message";
import ChatMessage from "./ChatMessage";
import { useContext, useEffect, useRef } from "react";
import { ChatContext } from "./ChatContext";
import { Button } from "../ui/button";

interface TMessages {
  fileId: string;
}

const Messages = ({ fileId }: TMessages) => {
  const { isLoading: isAIThinking } = useContext(ChatContext);
  const loadMore = useRef<HTMLDivElement>(null);

  const { data, isLoading, isFetching, hasNextPage, fetchNextPage } =
    trpc.getFileMessages.useInfiniteQuery(
      {
        fileId,
        limit: INFINITE_QUERY_LIMIT,
      },
      {
        getNextPageParam: (lastPage) => lastPage.nextCursor,
        keepPreviousData: true,
        staleTime: 60 * 1000 * 10,
      }
    );
  const messages = data?.pages.flatMap((page) => page.messages);
  const loadingMessage = {
    id: "loading-message",
    createdAt: new Date().toISOString(),
    isUserMessage: false,
    text: (
      <span className="flex h-full items-center justify-center">
        <Loader2 className="w-md h-md animate-spin" />
      </span>
    ),
  };
  const combinedMessages = [
    ...(isAIThinking ? [loadingMessage] : []),
    ...(messages ?? []),
  ];

  useEffect(() => {
    const handleLoad = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) fetchNextPage();
      });
    };
    const intersectionObserver = new IntersectionObserver(handleLoad);
    if (loadMore.current) {
      intersectionObserver.observe(loadMore.current);
      return () => intersectionObserver.disconnect();
    }
  }, [fetchNextPage, data]);

  return (
    <div className="pb-xl relative flex max-h-[calc(100vh-8rem)] border-input/20 flex-1 flex-col-reverse gap-md p-sm py-lg overflow-y-auto scrollbar-thumb-primary scrollbar-thumb-rounded scrollbar-track-primary-foreground scrollbar-w-xs scrolling-touch">
      {combinedMessages && combinedMessages.length > 0 ? (
        <>
          {combinedMessages.map((message, i) => {
            const isNextMessageSamePerson =
              combinedMessages[i - 1]?.isUserMessage ===
              combinedMessages[i].isUserMessage;
            if (i === combinedMessages.length - 1) {
              return (
                <ChatMessage
                  key={message.id}
                  message={message}
                  isNextMessageSamePerson={isNextMessageSamePerson}
                />
              );
            } else {
              return (
                <ChatMessage
                  key={message.id}
                  message={message}
                  isNextMessageSamePerson={isNextMessageSamePerson}
                />
              );
            }
          })}
          {hasNextPage && !isFetching && (
            <>
              <div ref={loadMore} className="bg-transparent w-full h-20 block">
                &nbsp;
              </div>
              <Button
                className="mt-lg"
                variant="secondary"
                onClick={() => {
                  void fetchNextPage();
                }}
              >
                <span>Load More</span>
              </Button>
            </>
          )}
          {isFetching && (
            <div className="w-full flex-centered flex-col gap-xs">
              <Loader2 className="w-lg h-lg animate-spin" />
            </div>
          )}
        </>
      ) : isLoading ? (
        <div className="w-full flex flex-col gap-xs">
          <Skeleton className="h-lg" />
          <Skeleton className="h-lg" />
          <Skeleton className="h-lg" />
          <Skeleton className="h-lg" />
        </div>
      ) : (
        <div className="flex-1 flex-centered flex-col gap-xs">
          <Message
            icon={<Bot className="w-xl h-xl text-accent/100" />}
            heading="Let's Chat with AIDe!"
            text="Ask your first question to get started."
          />
        </div>
      )}
    </div>
  );
};

export default Messages;
