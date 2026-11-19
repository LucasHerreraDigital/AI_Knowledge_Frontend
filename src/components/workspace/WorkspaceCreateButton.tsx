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
        bg-indigo-600
        px-3
        py-1.5
        text-sm
        font-medium
        text-white
        transition
        hover:bg-indigo-400
        hover:text-white
        cursor-pointer
      "
    >
      <Plus size={15} />
      Nuevo
    </button>
  );
};

export default WorkspaceCreateButton;