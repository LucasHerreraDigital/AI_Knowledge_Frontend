import type { Workspace } from "../../types/workspace";

interface WorkspaceItemProps {
  workspace: Workspace;
  active?: boolean;
  onSelectWorkspace: (workspace: Workspace) => void;
}

const WorkspaceItem = ({
  workspace,
  active = false,
  onSelectWorkspace,
}: WorkspaceItemProps) => {
  return (
    <button
      type="button"
      onClick={() => onSelectWorkspace(workspace)}
      className={`
        flex
        w-full
        items-center
        gap-3
        rounded-lg
        border
        px-4
        py-3
        text-left
        transition

        ${
          active
            ? `
              border-indigo-500/30
              bg-indigo-500/10
              text-white
            `
            : `
              border-transparent
              text-slate-400
              hover:bg-slate-800
              hover:text-white
            `
        }
      `}
    >
      {/* Icono */}
      <div
        className={`
          flex
          h-12
          w-12
          shrink-0
          items-center
          justify-center
          rounded-lg
          font-semibold
          text-white
          transition

          ${active ? "bg-indigo-600" : "bg-violet-950"}
        `}
      >
        {workspace.name.charAt(0).toUpperCase()}
      </div>

      {/* Información */}
      <div className="min-w-0 flex-1">
        <p
          className={`
            truncate
            font-medium

            ${active ? "text-indigo-300" : "text-white"}
          `}
        >
          {workspace.name}
        </p>

        <p
          className={`
            text-xs

            ${active ? "text-indigo-400/70" : "text-slate-500"}
          `}
        >
          {workspace._count.documents} documentos
        </p>
      </div>

      {/* Indicador activo */}
      {active && (
        <div className="h-2 w-2 shrink-0 rounded-full bg-indigo-400" />
      )}
    </button>
  );
};

export default WorkspaceItem;
