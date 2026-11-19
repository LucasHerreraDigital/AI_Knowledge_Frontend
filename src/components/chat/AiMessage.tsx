
import { useState } from "react";
import type { Message } from "../../types/message";

interface AIMessageProps {
  message: Message;
}

const AIMessage = ({
  message,
}: AIMessageProps) => {
  const [showSources, setShowSources] = useState(false);

  return (
    <div className="flex justify-start">
      <div className="max-w-[80%] w-full">

        <div className="mb-2 flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600 text-xs font-semibold text-white">
            AI
          </div>
        </div>

        {/* Respuesta */}
        <div className="rounded-2xl rounded-tl-md py-3">
          <p className="text-sm leading-relaxed text-text-primary whitespace-pre-wrap">
            {message.content}
          </p>
        </div>

        {/* Fuentes */}
        {message.sources.length > 0 && (
          <div className="">
            <button
              type="button"
              onClick={() => setShowSources((prev) => !prev)}
              className="flex items-center gap-2 text-xs font-medium text-indigo-600 hover:text-indigo-400 transition-colors"
            >
              <span>
                {showSources ? "Ocultar fuentes" : "Ver fuentes"}
              </span>

              <span>
                ({message.sources.length})
              </span>

              <span>
                {showSources ? "−" : "+"}
              </span>
            </button>

            {showSources && (
              <div className="mt-3 space-y-3">
                {message.sources.map((source) => (
                  <div
                    key={source.id}
                    className="rounded-xl border border-border p-3"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="text-sm font-medium text-text-primary">
                        {source.documentName}
                      </span>

                      <span className="rounded-md bg-indigo-600 px-2 py-1 text-xs text-white">
                        Página {source.pageNumber ?? "Desconocida"}
                      </span>
                    </div>

                    <p className="mt-2 text-xs leading-relaxed text-text-secondary whitespace-pre-wrap">
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
