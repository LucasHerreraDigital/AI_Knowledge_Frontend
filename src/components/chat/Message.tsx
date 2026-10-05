import type { Message as MessageType } from "../../types/message";

import UserMessage from "./UserMessage";
import AIMessage from "./AiMessage";

interface MessageProps {
  message: MessageType;
}

const Message = ({ message }: MessageProps) => {
  if (message.role === "user") {
    return <UserMessage message={message} />;
  }

  if (message.role === "assistant") {
    return <AIMessage message={message} />;
  }

  return null;
};

export default Message;