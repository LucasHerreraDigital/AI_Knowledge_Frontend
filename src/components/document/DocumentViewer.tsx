import { X, Download, ExternalLink } from "lucide-react";

interface DocumentViewerProps {
  open: boolean;
  documentName: string;
  url?: string;
  onClose: () => void;
}

const DocumentViewer = ({
  open,
  documentName,
  url,
  onClose,
}: DocumentViewerProps) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-[#020617]">

      {/* Header */}
      <header className="flex h-16 shrink-0 items-center justify-between border-b border-slate-800 bg-[#0B1120] px-6">

        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-red-500/10 text-red-400">
            PDF
          </div>

          <h2 className="truncate font-medium text-white">
            {documentName}
          </h2>
        </div>

        <div className="flex items-center gap-2">

          {url && (
            <>
              <a
                href={url}
                target="_blank"
                rel="noreferrer"
                className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white"
                title="Abrir en otra pestaña"
              >
                <ExternalLink size={18} />
              </a>

              <a
                href={url}
                download
                className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white"
                title="Descargar"
              >
                <Download size={18} />
              </a>
            </>
          )}

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white"
          >
            <X size={20} />
          </button>

        </div>
      </header>

      {/* PDF */}
      <main className="min-h-0 flex-1 bg-slate-950 p-4">

        {url ? (
          <iframe
            src={url}
            title={documentName}
            className="h-full w-full rounded-xl border border-slate-800 bg-white"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <p className="text-sm text-slate-500">
              No hay una URL disponible para visualizar este documento.
            </p>
          </div>
        )}

      </main>

    </div>
  );
};

export default DocumentViewer;