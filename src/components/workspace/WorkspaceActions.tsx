import { useEffect, useRef, useState } from "react";
import { MoreVertical, Pencil, Trash2 } from "lucide-react";

interface WorkspaceActionsProps {
  onRename: () => void;
  onDelete: () => void;
}

const WorkspaceActions = ({ onRename, onDelete }: WorkspaceActionsProps) => {
  const [open, setOpen] = useState(false);
  const conteinerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        conteinerRef.current &&
        !conteinerRef.current.contains(event.target as Node)
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
      ref={conteinerRef}
      className="relative"
      onClick={(event) => event.stopPropagation()}
    >
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="rounded-lg p-1.5 text-text-secondary transition hover:bg-indigo-600 hover:text-white cursor-pointer"
      >
        <MoreVertical size={17} />
      </button>
      {open && (
        <div className="absolute right-0 top-9 z-50 w-40 overflow-hidden rounded-lg border border-border bg-background shadow-xl">
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              onRename();
            }}
            className="flex w-full items-center gap-3 px-3 py-2 text-left text-sm text-text-primary transition cursor-pointer hover:bg-indigo-600/15"
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

export default WorkspaceActions;
