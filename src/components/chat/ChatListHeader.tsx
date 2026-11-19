import { Plus } from "lucide-react";

interface ChatListHeaderProps {
  total: number;
  onCreate?: () => void;
}

const ChatListHeader = ({
  total,
  onCreate,
}: ChatListHeaderProps) => {
  return (
    <div className="flex items-center justify-between">

      <div>
        <h2 className="text-lg font-semibold text-text-primary">
          Chats
        </h2>

        <p className="mt-1 text-sm text-text-secondary">
          {total > 1 ? `${total} conversaciones` : `${total} conversación`}
        </p>
      </div>

      <button
        onClick={onCreate}
        className="
          flex items-center gap-2
          rounded-lg
          bg-indigo-600 px-3 py-2
          text-sm font-medium text-white
          transition-colors duration-200  
          hover:bg-indigo-500
          focus-visible:outline-none
          focus-visible:ring-2
          focus-visible:ring-indigo-500
          focus-visible:ring-offset-2
          focus-visible:ring-offset-surface
        "
      >
        <Plus size={16} />
        Nuevo
      </button>

    </div>
  );
};

export default ChatListHeader;