import { CheckCircle2, LoaderCircle, XCircle } from "lucide-react";

interface UploadProgressProps {
  file: File;
  progress: number;
  status: "uploading" | "processing" | "completed" | "failed";
}

const UploadProgress = ({
  file,
  progress,
  status,
}: UploadProgressProps) => {
  const getStatusText = () => {
    switch (status) {
      case "uploading":
        return "Subiendo documento...";
      case "processing":
        return "Procesando documento...";
      case "completed":
        return "Documento procesado correctamente";
      case "failed":
        return "Error al procesar el documento";
    }
  };

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-800">
          {status === "completed" ? (
            <CheckCircle2 className="h-5 w-5 text-green-400" />
          ) : status === "failed" ? (
            <XCircle className="h-5 w-5 text-red-400" />
          ) : (
            <LoaderCircle className="h-5 w-5 animate-spin text-indigo-400" />
          )}
        </div>

        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-white">
            {file.name}
          </p>

          <p className="mt-1 text-xs text-slate-500">
            {getStatusText()}
          </p>
        </div>

        <span className="text-sm font-medium text-slate-300">
          {progress}%
        </span>
      </div>

      <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-800">
        <div
          className="h-full rounded-full bg-indigo-500 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default UploadProgress;