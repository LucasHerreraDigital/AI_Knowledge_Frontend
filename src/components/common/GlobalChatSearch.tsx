import { useEffect, useRef, useState } from "react";
import {
  Search,
  MessageSquare,
  FolderOpen,
} from "lucide-react";

import { chatService } from "../../services/chat.service";

import { useWorkspaceStore } from "../../store/workspace.store";
import { useChatStore } from "../../store/chat.store";

import type { ChatSearchResult } from "../../types/search";

const GlobalChatSearch = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<ChatSearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  const workspaces = useWorkspaceStore(
    (state) => state.workspaces
  );

  const selectWorkspace = useWorkspaceStore(
    (state) => state.selectWorkspace
  );

  const selectChat = useChatStore(
    (state) => state.selectChat
  );

  /* ------------------ Debounce búsqueda ------------------ */

  useEffect(() => {
    const text = query.trim();

    if (text.length < 2) {
      setResults([]);
      return;
    }

    const timeout = setTimeout(async () => {
      try {
        setLoading(true);

        const data =
          await chatService.searchChats(text);

        setResults(data);
      } catch (error) {
        console.error(
          "Error buscando chats:",
          error
        );
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [query]);

  /* ------------------ Click afuera ------------------ */

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(
          event.target as Node
        )
      ) {
        setOpen(false);
      }
    };

    window.addEventListener("mousedown", handleClick);

    return () =>
      window.removeEventListener(
        "mousedown",
        handleClick
      );
  }, []);

  /* ------------------ Seleccionar chat ------------------ */

  const handleSelect = async (
    result: ChatSearchResult
  ) => {
    const workspace = workspaces.find(
      (workspace) =>
        workspace.id === result.workspace.id
    );

    if (workspace) {
      selectWorkspace(workspace);
    }

    try {
      const completeChat =
        await chatService.getChatById(
          result.id
        );

      selectChat(completeChat);
    } catch (error) {
      console.error(
        "Error cargando chat:",
        error
      );
    }

    setQuery("");
    setResults([]);
    setOpen(false);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-80"
    >
      {/* Input */}
      <div
        className="
          flex
          h-10
          items-center
          gap-3
          rounded-xl
          border
          border-slate-700
          bg-slate-900
          px-3
          transition
          focus-within:border-indigo-500
        "
      >
        <Search
          size={18}
          className="text-slate-500"
        />

        <input
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          placeholder="Buscar chats..."
          className="
            w-full
            bg-transparent
            text-sm
            text-white
            outline-none
            placeholder:text-slate-500
          "
        />
      </div>

      {/* Dropdown */}
      {open && query.trim().length >= 2 && (
        <div
          className="
            absolute
            top-12
            right-0
            z-50
            max-h-[420px]
            w-[420px]
            overflow-y-auto
            rounded-xl
            border
            border-slate-800
            bg-[#0B1120]
            p-2
            shadow-2xl
          "
        >
          {loading ? (
            <div className="px-4 py-6 text-center text-sm text-slate-400">
              Buscando...
            </div>
          ) : results.length === 0 ? (
            <div className="px-4 py-6 text-center text-sm text-slate-500">
              No se encontraron chats
            </div>
          ) : (
            <div className="space-y-1">
              {results.map((result) => (
                <button
                  key={result.id}
                  type="button"
                  onClick={() =>
                    handleSelect(result)
                  }
                  className="
                    flex
                    w-full
                    items-start
                    gap-3
                    rounded-lg
                    px-3
                    py-3
                    text-left
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
                      bg-indigo-500/10
                    "
                  >
                    <MessageSquare
                      size={18}
                      className="text-indigo-400"
                    />
                  </div>

                  {/* Info */}
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-white">
                      {result.title}
                    </p>

                    <div className="mt-1 flex items-center gap-1.5 text-xs text-slate-500">
                      <FolderOpen size={13} />
                      {result.workspace.name}
                    </div>

                    <p className="mt-2 truncate text-xs text-slate-400">
                      {result.messages[0]?.content ??
                        "Sin mensajes"}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default GlobalChatSearch;