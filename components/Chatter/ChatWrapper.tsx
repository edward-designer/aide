import ChatInput from "./ChatInput";
import Messages from "./Messages";

const ChatWrapper = () => {



  return (
    <div className="relative min-h-full bg-primary-foreground flex justify-between gap-xs divide-y divide-text/20 flex-col">
      <div className="flex-1 justify-between flex flex-col mb-xl">
        <Messages />
      </div>
      <ChatInput />
    </div>
  );
};

export default ChatWrapper;
