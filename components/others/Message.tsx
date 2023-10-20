import { ReactNode } from "react";

interface TMessage {
  icon: ReactNode;
  heading: string;
  text?: string;
  children?: ReactNode;
}
const Message = ({ icon, heading, text = "", children = null }: TMessage) => {
  return (
    <div className="flex-1 flex-centered flex-col">
      {icon}
      <h3 className="font-semibld text-4xl mt-lg">{heading}</h3>
      {text && <p className="mt-sm mb-xl">{text}</p>}
      {children}
    </div>
  );
};

export default Message;
