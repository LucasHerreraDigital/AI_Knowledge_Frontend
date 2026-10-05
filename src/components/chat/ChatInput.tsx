import { useState } from "react";
import { Send } from "lucide-react";

interface ChatInputProps {
  onSend: (content: string) => Promise<void>;
  loading?: boolean;
}

const ChatInput = ({
  onSend,
  loading = false,
}: ChatInputProps) => {
  const [message, setMessage] =
    useState("");

  const handleSubmit = async (
    event: React.FormEvent
  ) => {
    event.preventDefault();

    const content = message.trim();

    if (!content || loading) return;

    await onSend(content);

    setMessage("");
  };

  return (
    <div className="shrink-0 border-t border-slate-800 p-4">

      <form
        onSubmit={handleSubmit}
        className="mx-auto flex max-w-4xl items-center gap-3 rounded-xl border border-slate-700 bg-slate-900 p-3"
      >
        <textarea
          value={message}
          onChange={(event) =>
            setMessage(event.target.value)
          }
          onKeyDown={(event) => {
            if (
              event.key === "Enter" &&
              !event.shiftKey
            ) {
              event.preventDefault();
              event.currentTarget.form?.requestSubmit();
            }
          }}
          disabled={loading}
          rows={1}
          placeholder="Escribí una pregunta..."
          className="flex-1 resize-none bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
        />

        <button
          type="submit"
          disabled={
            loading ||
            !message.trim()
          }
          className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600 text-white hover:bg-indigo-500 disabled:opacity-50"
        >
          <Send size={17} />
        </button>
      </form>

    </div>
  );
};

export default ChatInput; 