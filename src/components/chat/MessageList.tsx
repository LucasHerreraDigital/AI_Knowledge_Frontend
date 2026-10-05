import type { Message } from "../../types/message";

import UserMessage from "./UserMessage";
import AIMessage from "./AiMessage";

interface MessageListProps {
  messages: Message[];
}

const MessageList = ({
  messages,
}: MessageListProps) => {
  return (
    <div className="min-h-0 flex-1 overflow-y-auto px-6 py-6">

      <div className="mx-auto max-w-4xl space-y-6">

        {messages.map((message) => (
          message.role === "user" ? (
            <UserMessage
              key={message.id}
              message={message}
            />
          ) : (
            <AIMessage
              key={message.id}
              message={message}
            />
          )
        ))}

      </div>

    </div>
  );
};

export default MessageList;