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
        className="rounded-lg p-1.5 text-slate-500 translation hover:bg-slate-700 hover:text-white"
      >
        <MoreVertical size={17} />
      </button>
      {open && (
        <div className="absolute right-0 top-9 z-50 w-40 overflow-hidden rounded-lg border border-slate-700 bg-slate-900 py-1 shadow-xl">
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              onRename();
            }}
            className="flex w-full items-center gap-3 px-3 py-2 text-left text-sm text-slate-300 transition hover:bg-slate-800 hover:text-white"
          >
            <Pencil size={15} />
            Renombrar
          </button>
          <div className="my-1 border-t border-slate-800" />
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              onDelete();
            }}
            className="flex w-full items-center gap-3 px-3 py-2 text-left text-sm text-red-400 transition hover:bg-red-500/10"
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
