import DocumentItem from "./DocumentItem";

import type { Document } from "../../types/document";

interface DocumentListProps {
  documents: Document[];
  onView?: (document: Document) => void;
  onDownload?: (document: Document) => void;
  onDelete?: (document: Document) => void;
}

const DocumentList = ({
  documents,
  onView,
  onDownload,
  onDelete,
}: DocumentListProps) => {
  if (documents.length === 0) {
    return (
      <div className="flex h-full items-center justify-center text-sm text-slate-500">
        No hay documentos.
      </div>
    );
  }

  return (
    <div className="space-y-1">
      {documents.map((document) => (
        <DocumentItem
          key={document.id}
          document={document}
          onView={onView}
          onDownload={onDownload}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default DocumentList;