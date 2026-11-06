import { useState, useEffect } from "react";

import type { Document } from "../../types/document";

import DocumentHeader from "../document/DocumentHeader";
import DocumentList from "../document/DocumentList";
import UploadDocumentModal from "../document/UploadDocumentModal";
import DocumentViewer from "../document/DocumentViewer";
import DeleteDocumentModal from "../document/DeletDocumentModal";

import { documentService } from "../../services/document.service";

interface WorkspaceDocumentsProps {
  workspaceId: string;
  documents: Document[];
  onDocumentDeleted?: (documentId: string) => void;
  onDocumentUploaded?: (document:Document) => void;
}

const WorkspaceDocuments = ({
  workspaceId,
  documents,
  onDocumentDeleted,
  onDocumentUploaded,
}: WorkspaceDocumentsProps) => {
  const [showAll, setShowAll] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);

  const [loadingViewer,setLoadingViewer] = useState(false)

  const [selectedDocument, setSelectedDocument] = useState<Document | null>(
    null,
  );

  const [viewerOpen, setViewerOpen] = useState(false);
  const [viewerUrl, setViewerUrl] = useState<string | null>(null);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const visibleDocuments = showAll ? documents : documents.slice(0, 3);

  useEffect(() => {
    return () => {
      if (viewerUrl) {
        URL.revokeObjectURL(viewerUrl);
      }
    };
  }, [viewerUrl]);

  // VER DOCUMENTO
  const handleView = async (document: Document) => {
    if(loadingViewer) return;
    try {
      setLoadingViewer(true)
      const blob = await documentService.getDocumentFile(document.id);

      const url = URL.createObjectURL(blob);

      setSelectedDocument(document);
      setViewerUrl(url);
      setViewerOpen(true);
    } catch (error) {
      console.error("Error abriendo documento:", error);
    }finally{
      setLoadingViewer(false)
    }
  };

  // DESCARGAR DOCUMENTO
  const handleDownload = async (document: Document) => {
    try {
      const blob = await documentService.getDocumentFile(document.id);

      const url = URL.createObjectURL(blob);

      const link = window.document.createElement("a");

      link.href = url;
      link.download = document.name;

      window.document.body.appendChild(link);

      link.click();

      link.remove();

      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error descargando documento:", error);
    }
  };

  // ABRIR MODAL ELIMINAR
  const handleDelete = (document: Document) => {
    setSelectedDocument(document);
    setDeleteOpen(true);
  };

  // CONFIRMAR ELIMINACIÓN
  const handleConfirmDelete = async () => {
    if (!selectedDocument) return;

    try {
      setDeleting(true);

      await documentService.deleteDocument(selectedDocument.id);

      onDocumentDeleted?.(selectedDocument.id);

      setDeleteOpen(false);
      setSelectedDocument(null);
    } catch (error) {
      console.error("Error eliminando documento:", error);
    } finally {
      setDeleting(false);
    }
  };

  // CERRAR VISOR
  const handleCloseViewer = () => {
    if (viewerUrl) {
      URL.revokeObjectURL(viewerUrl);
    }

    setViewerUrl(null);
    setViewerOpen(false);
    setSelectedDocument(null);
  };

  return (
    <section className="flex h-full min-h-0 flex-col">
      {/* Header */}
      <div className="border-b border-slate-800 p-5">
        <DocumentHeader
          total={documents.length}
          onUpload={() => setShowUploadModal(true)}
        />
      </div>

      {/* Lista */}
      <div className="min-h-0 flex-1 overflow-hidden p-3">
        <div className="h-full overflow-y-auto">
          <DocumentList
            documents={visibleDocuments}
            onView={handleView}
            onDownload={handleDownload}
            onDelete={handleDelete}
          />
        </div>
      </div>

      {/* Ver todos */}
      {documents.length > 3 && (
        <div className="border-t border-slate-800 p-4">
          <button
            type="button"
            onClick={() => setShowAll((prev) => !prev)}
            className="
              w-full
              text-center
              text-sm
              font-medium
              text-indigo-400
              transition
              hover:text-indigo-300
            "
          >
            {showAll ? "Mostrar menos" : "Ver todos los documentos"}
          </button>
        </div>
      )}

      {/* Upload */}
      <UploadDocumentModal
        open={showUploadModal}
        workspaceId={workspaceId}
        onClose={() => setShowUploadModal(false)}
        onUploaded={(document) => {
          onDocumentUploaded?.(document);
          setShowUploadModal(false);
        }}
      />

      {/* Viewer */}
      {selectedDocument && viewerUrl && (
        <DocumentViewer
          open={viewerOpen}
          documentName={selectedDocument.name}
          url={viewerUrl}
          onClose={handleCloseViewer}
        />
      )}

      {/* Delete modal */}
      {selectedDocument && (
        <DeleteDocumentModal
          open={deleteOpen}
          documentName={selectedDocument.name}
          loading={deleting}
          onClose={() => {
            if (!deleting) {
              setDeleteOpen(false);
              setSelectedDocument(null);
            }
          }}
          onConfirm={handleConfirmDelete}
        />
      )}
    </section>
  );
};

export default WorkspaceDocuments;
