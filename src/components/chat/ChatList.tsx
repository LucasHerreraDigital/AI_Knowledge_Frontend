import ChatItem from "./ChatItem";

import type { Chat } from "../../types/chat";

interface ChatListProps {
  chats: Chat[];
  onSelectChat: (chat: Chat) => void;
  onRename: (chat: Chat) => void;
  onDelete: (chat: Chat) => void;
}

const ChatList = ({
  chats,
  onSelectChat,
  onRename,
  onDelete,
}: ChatListProps) => {
  if (chats.length === 0) {
    return (
      <div className="flex h-full items-center justify-center text-sm text-slate-500">
        No hay chats.
      </div>
    );
  }

  return (
    <div className="space-y-1">

      {chats.map((chat) => (
        <ChatItem
          key={chat.id}
          chat={chat}
          onSelectChat={onSelectChat}
          onRename={onRename}
          onDelete={onDelete}
        />
      ))}

    </div>
  );
};

export default ChatList;