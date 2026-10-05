import ChatActions from "./ChatActions";

interface ChatHeaderProps {
  title: string;
  onRename: () => void;
  onDelete: () => void;
}

const ChatHeader = ({
  title,
  onRename,
  onDelete,
}: ChatHeaderProps) => {
  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-slate-800 px-6">

      <div className="min-w-0">
        <h2 className="truncate font-semibold text-white">
          {title}
        </h2>

        <p className="text-xs text-slate-500">
          Conversación
        </p>
      </div>

      <ChatActions
        onRename={onRename}
        onDelete={onDelete}
      />

    </header>
  );
};

export default ChatHeader;