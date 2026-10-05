import { useState } from "react";
import { X, MessageSquarePlus } from "lucide-react";

interface CreateChatModalProps {
  open: boolean;
  onClose: () => void;
  onCreate: (title: string) => Promise<void>;
  loading?: boolean;
}

const CreateChatModal = ({
  open,
  onClose,
  onCreate,
  loading = false,
}: CreateChatModalProps) => {
  const [title, setTitle] = useState("");

  if (!open) return null;

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const cleanTitle = title.trim();

    if (!cleanTitle || loading) return;

    await onCreate(cleanTitle);

    setTitle("");
  };

  const handleClose = () => {
    if (loading) return;

    setTitle("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm">
      <div className="w-full max-w-md overflow-hidden rounded-2xl border border-slate-800 bg-[#0B1120] shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 px-6 py-4">

          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500/10">
              <MessageSquarePlus
                size={20}
                className="text-indigo-400"
              />
            </div>

            <div>
              <h2 className="font-semibold text-white">
                Nuevo chat
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Creá una conversación dentro del workspace
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleClose}
            disabled={loading}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white disabled:opacity-50"
          >
            <X size={18} />
          </button>

        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>

          <div className="px-6 py-6">

            <label
              htmlFor="chat-title"
              className="mb-2 block text-sm font-medium text-slate-300"
            >
              Título
            </label>

            <input
              id="chat-title"
              value={title}
              onChange={(event) =>
                setTitle(event.target.value)
              }
              placeholder="Ej. Event Loop en Node.js"
              autoFocus
              disabled={loading}
              className="
                h-11
                w-full
                rounded-lg
                border
                border-slate-700
                bg-slate-900
                px-3
                text-sm
                text-white
                outline-none
                transition
                placeholder:text-slate-500
                focus:border-indigo-500
                focus:ring-1
                focus:ring-indigo-500
                disabled:opacity-60
              "
            />

          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 border-t border-slate-800 px-6 py-4">

            <button
              type="button"
              onClick={handleClose}
              disabled={loading}
              className="rounded-lg px-4 py-2 text-sm font-medium text-slate-400 transition hover:bg-slate-800 hover:text-white disabled:opacity-50"
            >
              Cancelar
            </button>

            <button
              type="submit"
              disabled={!title.trim() || loading}
              className="
                rounded-lg
                bg-indigo-600
                px-4
                py-2
                text-sm
                font-medium
                text-white
                transition
                hover:bg-indigo-500
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              {loading ? "Creando..." : "Crear chat"}
            </button>

          </div>

        </form>

      </div>
    </div>
  );
};

export default CreateChatModal;