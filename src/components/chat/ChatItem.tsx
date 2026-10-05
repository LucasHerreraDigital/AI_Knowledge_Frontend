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
        rounded-lg
        p-3
        transition
        hover:bg-slate-800
      "
      onClick={() =>
        onSelectChat(chat)
      }
    >
      <div className="flex items-start gap-3">

        <div className="
          flex
          h-9
          w-9
          shrink-0
          items-center
          justify-center
          rounded-lg
          bg-slate-800
        ">
          <MessageSquare
            size={17}
            className="text-slate-300"
          />
        </div>

        <div className="min-w-0 flex-1">

          <h3 className="truncate text-sm font-medium text-white">
            {chat.title}
          </h3>

          <p className="mt-1 truncate text-xs text-slate-500">
            {lastMessage?.content ??
              "Sin mensajes"}
          </p>

        </div>

        <div className="opacity-0 transition group-hover:opacity-100">
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