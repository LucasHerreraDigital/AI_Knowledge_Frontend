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
        <h2 className="text-lg font-semibold text-white">
          Chats
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          {total} conversaciones
        </p>
      </div>

      <button
        onClick={onCreate}
        className="
          flex
          items-center
          gap-2
          rounded-lg
          bg-indigo-600
          px-3
          py-2
          text-sm
          font-medium
          text-white
          transition
          hover:bg-indigo-500
        "
      >
        <Plus size={16} />
        Nuevo
      </button>

    </div>
  );
};

export default ChatListHeader;