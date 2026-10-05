import { useState } from "react";
import { X, Upload } from "lucide-react";
import type { Document } from "../../types/document";

import UploadZone from "./UploadZone";
import UploadProgress from "./UploadProgress";

import { documentService } from "../../services/document.service";

interface UploadDocumentModalProps {
  open: boolean;
  workspaceId: string;
  onClose: () => void;
  onUploaded?: (
    document: Document
  ) => void;
}

const UploadDocumentModal = ({
  open,
  workspaceId,
  onClose,
  onUploaded,
}: UploadDocumentModalProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);

  const [status, setStatus] = useState<
    "uploading" | "processing" | "completed" | "failed"
  >("uploading");

  if (!open) return null;

  const handleFileSelect = async (
    selectedFile: File
  ) => {
    setFile(selectedFile);
    setProgress(0);
    setStatus("uploading");

    try {
      const newDocument =
        await documentService.uploadDocument(
          workspaceId,
          selectedFile,
          (value) => {
            setProgress(value);
          }
        );

      setProgress(100);
      setStatus("completed");

      onUploaded?.(newDocument);

    } catch (error) {
      console.error(
        "Error subiendo documento:",
        error
      );

      setStatus("failed");
    }
  };

  const handleClose = () => {
    setFile(null);
    setProgress(0);
    setStatus("uploading");

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm">

      <div className="w-full max-w-lg overflow-hidden rounded-2xl border border-slate-800 bg-[#0B1120] shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 px-6 py-4">

          <div>
            <h2 className="text-lg font-semibold text-white">
              Subir documento
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              Agregá un documento a tu workspace
            </p>
          </div>

          <button
            type="button"
            onClick={handleClose}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white"
          >
            <X size={20} />
          </button>

        </div>

        {/* Content */}
        <div className="p-6">

          {!file ? (
            <UploadZone
              onFileSelect={handleFileSelect}
            />
          ) : (
            <UploadProgress
              file={file}
              progress={progress}
              status={status}
            />
          )}

        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 border-t border-slate-800 px-6 py-4">

          {status !== "completed" && (
            <button
              type="button"
              onClick={handleClose}
              className="rounded-lg px-4 py-2 text-sm text-slate-400 transition hover:bg-slate-800 hover:text-white"
            >
              Cancelar
            </button>
          )}

          {file && status === "completed" && (
            <button
              type="button"
              onClick={handleClose}
              className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-500"
            >
              <Upload size={16} />
              Listo
            </button>
          )}

          {file && status === "failed" && (
            <button
              type="button"
              onClick={() => handleFileSelect(file)}
              className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-500"
            >
              Reintentar
            </button>
          )}

        </div>

      </div>

    </div>
  );
};

export default UploadDocumentModal;