import { FileText, Sparkles } from "lucide-react";

const ChatToolbar = () => {
  return (
    <div className="flex items-center gap-2 border-b border-slate-800 px-6 py-2">

      <button className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs text-slate-400 transition hover:bg-slate-800 hover:text-white">
        <FileText size={15} />
        Documentos
      </button>

      <button className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs text-slate-400 transition hover:bg-slate-800 hover:text-white">
        <Sparkles size={15} />
        RAG
      </button>

    </div>
  );
};

export default ChatToolbar;