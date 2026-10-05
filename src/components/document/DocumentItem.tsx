import { FileText } from "lucide-react";

import DocumentStatus from "./DocumentStatus";
import DocumentActions from "./DocumentActions";

import type { Document } from "../../types/document";

interface DocumentItemProps {
  document: Document;
  onView?: (document: Document) => void;
  onDownload?: (document: Document) => void;
  onDelete?: (document: Document) => void;
}

const DocumentItem = ({
  document,
  onView,
  onDownload,
  onDelete,
}: DocumentItemProps) => {
  return (
    <div
      className="
        group
        flex
        items-center
        gap-3
        rounded-lg
        p-3
        transition
        hover:bg-slate-800
      "
    >
      {/* Icono */}
      <div
        className="
          flex
          h-10
          w-10
          shrink-0
          items-center
          justify-center
          rounded-lg
          bg-slate-800
        "
      >
        <FileText
          size={19}
          className="text-slate-300"
        />
      </div>

      {/* Información */}
      <div className="min-w-0 flex-1">

        <h3 className="truncate text-sm font-medium text-white">
          {document.name}
        </h3>

        <p className="mt-1 text-xs text-slate-500">
          {formatFileSize(document.size)}
        </p>

      </div>

      {/* Estado */}
      <DocumentStatus
        status={document.processingStatus}
      />

      {/* Acciones */}
      <div className="opacity-0 transition group-hover:opacity-100">
        <DocumentActions
          onView={() => onView?.(document)}
          onDownload={() => onDownload?.(document)}
          onDelete={() => onDelete?.(document)}
        />
      </div>
    </div>
  );
};

const formatFileSize = (bytes: number) => {
  if (bytes === 0) return "0 B";

  const units = ["B", "KB", "MB", "GB"];
  const index = Math.floor(
    Math.log(bytes) / Math.log(1024)
  );

  return `${(bytes / Math.pow(1024, index)).toFixed(1)} ${
    units[index]
  }`;
};

export default DocumentItem;