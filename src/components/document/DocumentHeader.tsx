import { Upload } from "lucide-react";

interface DocumentHeaderProps {
  total: number;
  onUpload: () => void;
}

const DocumentHeader = ({
  total,
  onUpload,
}: DocumentHeaderProps) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-lg font-semibold text-white">
          Documentos
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          {total} documentos
        </p>
      </div>

      <button
        type="button"
        onClick={onUpload}
        className="
          flex
          items-center
          gap-2
          rounded-lg
          bg-indigo-600
          px-3
          py-2
          text-sm
          font-medium
          text-white
          transition
          hover:bg-indigo-500
        "
      >
        <Upload size={16} />
        Subir
      </button>
    </div>
  );
};

export default DocumentHeader;  