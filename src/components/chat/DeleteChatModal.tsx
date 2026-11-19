import { AlertTriangle, LoaderCircle, X } from "lucide-react";

interface DeleteChatModalProps {
  open: boolean;
  chatTitle: string;
  loading?: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteChatModal = ({
  open,
  chatTitle,
  loading = false,
  onClose,
  onConfirm,
}: DeleteChatModalProps) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl border border-border bg-background shadow-2xl">
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <h2 className="font-semibold text-text-primary">Eliminar chat</h2>

          <button
            type="button"
            disabled={loading}
            onClick={onClose}
            className="rounded-xl p-2 text-text-primary dark:hover:bg-slate-700 hover:bg-slate-300 hover:text-white"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex gap-4 px-6 py-6 items-center ">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full dark:bg-red-500/10 bg-red-600/15">
            <AlertTriangle size={20} className="text-red-600" />
          </div>

          <div>
            <p className="text-sm text-text-secondary">
              ¿Estás seguro de que querés eliminar este chat?
            </p>

            <p className="mt-2 break-all text-sm font-medium text-text-primary">
              {chatTitle}
            </p>

            <p className="mt-2 text-xs text-text-secondary">
              Esta acción no se puede deshacer.
            </p>
          </div>
        </div>

        <div className="flex justify-end gap-3 border-t border-border px-6 py-4">
          <button
            type="button"
            disabled={loading}
            onClick={onClose}
            className="rounded-lg px-4 py-2 text-sm text-slate-400 hover:bg-slate-800 hover:text-white cursor-pointer"
          >
            Cancelar
          </button>

          <button
            type="button"
            disabled={loading}
            onClick={onConfirm}
            className="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-400 disabled:opacity-50 cursor-pointer"
          >
            {loading && <LoaderCircle size={16} className="animate-spin" />}

            {loading ? "Eliminando..." : "Eliminar"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteChatModal;
