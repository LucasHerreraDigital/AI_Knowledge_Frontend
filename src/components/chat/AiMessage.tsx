
import { useState } from "react";

import type { Message } from "../../types/message";
import type { ChatSource } from "../../types/source";

interface AIMessageProps {
  message: Message;
  sources: ChatSource[];
}

const AIMessage = ({
  message,
  sources,
}: AIMessageProps) => {
  const [showSources, setShowSources] = useState(false);

  return (
    <div className="flex justify-start">
      <div className="max-w-[80%] w-full">

        <div className="mb-2 flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-violet-950 text-xs font-semibold text-white">
            AI
          </div>

          <span className="text-xs font-medium text-slate-400">
            AI Knowledge
          </span>
        </div>

        {/* Respuesta */}
        <div className="rounded-2xl rounded-tl-md border border-slate-800 bg-[#0B1120] px-4 py-3">
          <p className="text-sm leading-relaxed text-slate-200 whitespace-pre-wrap">
            {message.content}
          </p>
        </div>

        {/* Fuentes */}
        {sources.length > 0 && (
          <div className="mt-3">
            <button
              type="button"
              onClick={() => setShowSources((prev) => !prev)}
              className="flex items-center gap-2 text-xs font-medium text-violet-400 hover:text-violet-300 transition-colors"
            >
              <span>
                {showSources ? "Ocultar fuentes" : "Ver fuentes"}
              </span>

              <span>
                ({sources.length})
              </span>

              <span>
                {showSources ? "−" : "+"}
              </span>
            </button>

            {showSources && (
              <div className="mt-3 space-y-3">
                {sources.map((source) => (
                  <div
                    key={source.id}
                    className="rounded-xl border border-slate-800 bg-[#0B1120] p-3"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="text-sm font-medium text-slate-200">
                        {source.documentName}
                      </span>

                      <span className="rounded-md bg-violet-950/60 px-2 py-1 text-xs text-violet-300">
                        Página {source.pageNumber ?? "Desconocida"}
                      </span>
                    </div>

                    <p className="mt-2 text-xs leading-relaxed text-slate-400 whitespace-pre-wrap">
                      {source.content}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};

export default AIMessage;
