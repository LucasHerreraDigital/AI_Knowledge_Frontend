import { useState } from "react";
import {
  MoreVertical,
  Eye,
  Download,
  Trash2,
} from "lucide-react";

interface DocumentActionsProps {
  onView?: () => void;
  onDownload?: () => void;
  onDelete?: () => void;
}

const DocumentActions = ({
  onView,
  onDownload,
  onDelete,
}: DocumentActionsProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((value) => !value)}
        className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-800 hover:text-white"
      >
        <MoreVertical size={18} />
      </button>

      {open && (
        <div className="absolute right-0 top-10 z-20 w-44 overflow-hidden rounded-lg border border-slate-800 bg-slate-900 shadow-xl">

          <button
            onClick={() => {
              onView?.();
              setOpen(false);
            }}
            className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-slate-300 hover:bg-slate-800 hover:text-white"
          >
            <Eye size={16} />
            Ver documento
          </button>

          <button
            onClick={() => {
              onDownload?.();
              setOpen(false);
            }}
            className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-slate-300 hover:bg-slate-800 hover:text-white"
          >
            <Download size={16} />
            Descargar
          </button>

          <div className="border-t border-slate-800" />

          <button
            onClick={() => {
              onDelete?.();
              setOpen(false);
            }}
            className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10"
          >
            <Trash2 size={16} />
            Eliminar
          </button>

        </div>
      )}
    </div>
  );
};

export default DocumentActions;