const TypingIndicator = () => {
  return (
    <div className="px-6 pb-4">
      <div className="mx-auto max-w-4xl">
        <div className="inline-flex items-center gap-2 rounded-xl bg-slate-800 px-4 py-3">
          <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400" />
          <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400 [animation-delay:150ms]" />
          <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400 [animation-delay:300ms]" />

          <span className="ml-2 text-sm text-slate-400">
            AI Knowledge está respondiendo...
          </span>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;