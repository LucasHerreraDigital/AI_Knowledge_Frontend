import type { Message } from "../../types/message";
import type { ChatSource } from "../../types/source";

import UserMessage from "./UserMessage";
import AIMessage from "./AiMessage";

interface MessageListProps {
  messages: Message[];
  sourcesByMessageId: Record<string,ChatSource[]>
}

const MessageList = ({
  messages,
  sourcesByMessageId
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
              sources ={sourcesByMessageId[message.id]??[]}
            />
          )
        ))}

      </div>

    </div>
  );
};

export default MessageList;