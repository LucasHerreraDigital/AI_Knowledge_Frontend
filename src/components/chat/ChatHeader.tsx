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
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-border bg-background px-6">

      <div className="min-w-0">
        <h2 className="truncate font-semibold text-text-primary">
          {title}
        </h2>

        <p className="text-xs text-text-secondary">
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