import type { Workspace } from "../../types/workspace";

interface WorkspaceHeaderProps {
  workspace: Workspace;
}

const WorkspaceHeader = ({ workspace }: WorkspaceHeaderProps) => {
  return (
    <button className="flex items-center gap-3 rounded-lg px-3 py-2">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-950 font-bold text-white">
        {workspace.name.charAt(0).toUpperCase()}
      </div>

      <span className="font-medium text-white">
        {workspace.name}
      </span>
    </button>
  );
};

export default WorkspaceHeader;
