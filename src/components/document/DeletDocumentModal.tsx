import {
  AlertTriangle,
  LoaderCircle,
  X,
} from "lucide-react";

interface DeleteDocumentModalProps {
  open: boolean;
  documentName?: string;
  loading?: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteDocumentModal = ({
  open,
  documentName,
  loading = false,
  onClose,
  onConfirm,
}: DeleteDocumentModalProps) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-[#0B1120] shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-800 px-6 py-4">
          <h2 className="font-semibold text-white">
            Eliminar documento
          </h2>

          <button
            type="button"
            disabled={loading}
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white disabled:opacity-50"
          >
            <X size={18} />
          </button>
        </div>

        <div className="px-6 py-6">
          <div className="flex gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-red-500/10">
              <AlertTriangle className="h-5 w-5 text-red-400" />
            </div>

            <div>
              <p className="text-sm leading-6 text-slate-300">
                ¿Estás seguro de que querés eliminar este documento?
              </p>

              {documentName && (
                <p className="mt-2 break-all text-sm font-medium text-white">
                  {documentName}
                </p>
              )}

              <p className="mt-2 text-xs text-slate-500">
                Esta acción no se puede deshacer.
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 border-t border-slate-800 px-6 py-4">
          <button
            type="button"
            disabled={loading}
            onClick={onClose}
            className="rounded-lg px-4 py-2 text-sm text-slate-400 transition hover:bg-slate-800 hover:text-white disabled:opacity-50"
          >
            Cancelar
          </button>

          <button
            type="button"
            disabled={loading}
            onClick={onConfirm}
            className="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading && (
              <LoaderCircle
                size={16}
                className="animate-spin"
              />
            )}

            {loading ? "Eliminando..." : "Eliminar"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteDocumentModal;