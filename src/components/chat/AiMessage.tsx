import type { Message } from "../../types/message";

interface AIMessageProps {
  message: Message;
}

const AIMessage = ({
  message,
}: AIMessageProps) => {
  return (
    <div className="flex justify-start">

      <div className="max-w-[80%]">

        <div className="mb-2 flex items-center gap-2">

          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-violet-950 text-xs font-semibold text-white">
            AI
          </div>

          <span className="text-xs font-medium text-slate-400">
            AI Knowledge
          </span>

        </div>

        <div className="rounded-2xl rounded-tl-md border border-slate-800 bg-[#0B1120] px-4 py-3">

          <p className="text-sm leading-relaxed text-slate-200">
            {message.content}
          </p>

        </div>

      </div>

    </div>
  );
};

export default AIMessage;