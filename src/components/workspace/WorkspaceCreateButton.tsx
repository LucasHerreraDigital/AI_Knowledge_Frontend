import { Plus } from "lucide-react";

interface WorkspaceCreateButtonProps {
  onClick?: () => void;
}

const WorkspaceCreateButton = ({
  onClick,
}: WorkspaceCreateButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="
        flex
        items-center
        gap-1.5
        rounded-md
        bg-slate-800
        px-3
        py-1.5
        text-sm
        font-medium
        text-slate-300
        transition
        hover:bg-slate-700
        hover:text-white
      "
    >
      <Plus size={15} />
      Nuevo
    </button>
  );
};

export default WorkspaceCreateButton;