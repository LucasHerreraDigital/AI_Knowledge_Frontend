import { useEffect, useRef, useState } from "react";
import { MoreVertical, Pencil, Trash2 } from "lucide-react";

interface ChatActionsProps {
  onRename: () => void;
  onDelete: () => void;
}

const ChatActions = ({ onRename, onDelete }: ChatActionsProps) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative"
      onClick={(event) => event.stopPropagation()}
    >
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="cursor-pointer rounded-lg p-2 text-text-secondary transition-colors hover:bg-background hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
      >
        <MoreVertical size={17} />
      </button>

      {open && (
        <div
          className="absolute right-0 top-10 z-20 w-44 overflow-hidden rounded-lg border border-border bg-surface shadow-xl"
        >
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              onRename();
            }}
            className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-text-primary transition-colors hover:bg-background cursor-pointer hover:bg-indigo-600/15"
          >
            <Pencil size={15} />
            Renombrar
          </button>

          <div className="border-t border-border" />

          <button
            type="button"
            onClick={() => {
              setOpen(false);
              onDelete();
            }}
            className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-red-500 transition-colors hover:bg-red-500/20 cursor-pointer"
          >
            <Trash2 size={15} />
            Eliminar
          </button>
        </div>
      )}
    </div>
  );
};

export default ChatActions;
