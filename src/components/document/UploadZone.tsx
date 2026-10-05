import { useRef, useState } from "react";
import { Upload, FileText } from "lucide-react";

interface UploadZoneProps {
  onFileSelect: (file: File) => void;
}

const UploadZone = ({ onFileSelect }: UploadZoneProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const handleFile = (file?: File) => {
    if (!file) return;

    onFileSelect(file);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(false);

    const file = event.dataTransfer.files[0];

    handleFile(file);
  };

  return (
    <div
      onDragOver={(event) => {
        event.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
      className={`
        flex
        cursor-pointer
        flex-col
        items-center
        justify-center
        rounded-xl
        border-2
        border-dashed
        px-6
        py-10
        text-center
        transition
        ${
          dragging
            ? "border-indigo-500 bg-indigo-500/10"
            : "border-slate-700 bg-slate-950 hover:border-indigo-500 hover:bg-slate-900"
        }
      `}
    >
      <input
        ref={inputRef}
        type="file"
        accept=".pdf"
        hidden
        onChange={(event) => {
          handleFile(event.target.files?.[0]);
          event.target.value = "";
        }}
      />

      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-indigo-500/10">
        {dragging ? (
          <Upload className="h-7 w-7 text-indigo-400" />
        ) : (
          <FileText className="h-7 w-7 text-indigo-400" />
        )}
      </div>

      <p className="font-medium text-white">
        Arrastrá tu documento aquí
      </p>

      <p className="mt-1 text-sm text-slate-400">
        o hacé click para seleccionarlo
      </p>

      <p className="mt-4 text-xs text-slate-500">
        PDF · Máximo 50 MB
      </p>
    </div>
  );
};

export default UploadZone;