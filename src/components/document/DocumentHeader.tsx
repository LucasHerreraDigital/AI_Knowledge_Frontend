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
        <h2 className="text-lg font-semibold text-text-primary">
          Documentos
        </h2>

        <p className="mt-1 text-sm text-text-secondary">
          {(total>1)?`${total} documentos`:`${total} documento`} 
        </p>
      </div>

      <button
        type="button"
        onClick={onUpload}
        className="
          flex items-center gap-2
          rounded-lg
          bg-indigo-600 px-3 py-2
          text-sm font-medium text-white
          transition-colors duration-200  
          hover:bg-indigo-500
          focus-visible:outline-none
          focus-visible:ring-2
          focus-visible:ring-indigo-500
          focus-visible:ring-offset-2
          focus-visible:ring-offset-surface
        "
      >
        <Upload size={16} />
        Subir
      </button>
    </div>
  );
};

export default DocumentHeader;  