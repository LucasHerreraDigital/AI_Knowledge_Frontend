import { Search } from "lucide-react";

interface DocumentFilterProps {
  value?: string;
  onChange?: (value: string) => void;
}

const DocumentFilter = ({
  value = "",
  onChange,
}: DocumentFilterProps) => {
  return (
    <div
      className="
        flex
        items-center
        gap-2
        rounded-lg
        border
        border-slate-700
        bg-slate-900
        px-3
        py-2
      "
    >
      <Search
        size={17}
        className="text-slate-500"
      />

      <input
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder="Buscar documentos..."
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
  );
};

export default DocumentFilter;