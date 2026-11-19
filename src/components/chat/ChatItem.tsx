import { MessageSquare } from "lucide-react";

import ChatActions from "./ChatActions";

import type { Chat } from "../../types/chat";

interface ChatItemProps {
  chat: Chat;
  onSelectChat: (chat: Chat) => void;
  onRename: (chat: Chat) => void;
  onDelete: (chat: Chat) => void;
}

const ChatItem = ({
  chat,
  onSelectChat,
  onRename,
  onDelete,
}: ChatItemProps) => {
  const lastMessage =
    chat.messages?.[0];

  return (
    <div
      className="
        group
        cursor-pointer
        gap-3
        rounded-lg
        p-3
        transition-colors 
        duration-200
        hover:bg-background
      "
      onClick={() =>
        onSelectChat(chat)
      }
    >
      <div className="flex items-start gap-3">

        <div className="
          flex
          h-10
          w-10
          shrink-0
          items-center
          justify-center
          rounded-lg
          bg-background
          border-border
        ">
          <MessageSquare
            size={17}
            className="text-text-secondary"
          />
        </div>

        <div className="min-w-0 flex-1">

          <h3 className="truncate text-sm font-medium text-text-primary">
            {chat.title}
          </h3>

          <p className="mt-1 truncate text-xs text-text-secondary">
            {lastMessage?.content ??
              "Sin mensajes"}
          </p>

        </div>

        <div className="">
          <ChatActions
            onRename={() =>
              onRename(chat)
            }
            onDelete={() =>
              onDelete(chat)
            }
          />
        </div>

      </div>
    </div>
  );
};

export default ChatItem;