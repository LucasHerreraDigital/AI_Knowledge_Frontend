import {
  AlertTriangle,
  LoaderCircle,
  X,
} from "lucide-react";

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

      <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-[#0B1120] shadow-2xl">

        <div className="flex items-center justify-between border-b border-slate-800 px-6 py-4">

          <h2 className="font-semibold text-white">
            Eliminar chat
          </h2>

          <button
            type="button"
            disabled={loading}
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white"
          >
            <X size={18} />
          </button>

        </div>

        <div className="flex gap-4 px-6 py-6">

          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-red-500/10">
            <AlertTriangle
              size={20}
              className="text-red-400"
            />
          </div>

          <div>
            <p className="text-sm text-slate-300">
              ¿Estás seguro de que querés eliminar este chat?
            </p>

            <p className="mt-2 break-all text-sm font-medium text-white">
              {chatTitle}
            </p>

            <p className="mt-2 text-xs text-slate-500">
              Esta acción no se puede deshacer.
            </p>
          </div>

        </div>

        <div className="flex justify-end gap-3 border-t border-slate-800 px-6 py-4">

          <button
            type="button"
            disabled={loading}
            onClick={onClose}
            className="rounded-lg px-4 py-2 text-sm text-slate-400 hover:bg-slate-800 hover:text-white"
          >
            Cancelar
          </button>

          <button
            type="button"
            disabled={loading}
            onClick={onConfirm}
            className="
              flex
              items-center
              gap-2
              rounded-lg
              bg-red-600
              px-4
              py-2
              text-sm
              font-medium
              text-white
              hover:bg-red-500
              disabled:opacity-50
            "
          >
            {loading && (
              <LoaderCircle
                size={16}
                className="animate-spin"
              />
            )}

            {loading
              ? "Eliminando..."
              : "Eliminar"}
          </button>

        </div>

      </div>
    </div>
  );
};

export default DeleteChatModal;