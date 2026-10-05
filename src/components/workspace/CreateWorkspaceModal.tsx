import { useState } from "react";
import { X } from "lucide-react";

interface CreateWorkspaceModalProps {
  open: boolean;
  onClose: () => void;
  onCreate: (data: {
    name: string;
    description?: string;
  }) => void;
}

const CreateWorkspaceModal = ({
  open,
  onClose,
  onCreate,
}: CreateWorkspaceModalProps) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) return;

    onCreate({
      name: name.trim(),
      description: description.trim() || undefined,
    });

    setName("");
    setDescription("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-[#0B1120] shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 px-6 py-4">
          <div>
            <h2 className="text-lg font-semibold text-white">
              Crear workspace
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              Organizá documentos y chats en un nuevo espacio.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit}>

          <div className="space-y-5 px-6 py-6">

            {/* Nombre */}
            <div>
              <label
                htmlFor="workspace-name"
                className="mb-2 block text-sm font-medium text-slate-300"
              >
                Nombre
              </label>

              <input
                id="workspace-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ej. Proyecto Node.js"
                autoFocus
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
                "
              />
            </div>

            {/* Descripción */}
            <div>
              <label
                htmlFor="workspace-description"
                className="mb-2 block text-sm font-medium text-slate-300"
              >
                Descripción
                <span className="ml-1 text-slate-500">
                  opcional
                </span>
              </label>

              <textarea
                id="workspace-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="¿Para qué vas a usar este workspace?"
                rows={4}
                className="
                  w-full
                  resize-none
                  rounded-lg
                  border
                  border-slate-700
                  bg-slate-900
                  px-3
                  py-3
                  text-sm
                  text-white
                  outline-none
                  transition
                  placeholder:text-slate-500
                  focus:border-indigo-500
                  focus:ring-1
                  focus:ring-indigo-500
                "
              />
            </div>

          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 border-t border-slate-800 px-6 py-4">

            <button
              type="button"
              onClick={onClose}
              className="
                rounded-lg
                px-4
                py-2
                text-sm
                font-medium
                text-slate-400
                transition
                hover:bg-slate-800
                hover:text-white
              "
            >
              Cancelar
            </button>

            <button
              type="submit"
              disabled={!name.trim()}
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
              Crear workspace
            </button>

          </div>

        </form>

      </div>
    </div>
  );
};

export default CreateWorkspaceModal;