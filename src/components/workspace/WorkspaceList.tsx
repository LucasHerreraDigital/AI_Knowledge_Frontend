import WorkspaceItem from "./WokspaceItem";
import type { Workspace } from "../../types/workspace";
import { useWorkspaceStore } from "../../store/workspace.store";

interface WorkspaceListProps {
  workspaces: Workspace[];
  onSelectWorkspace: (workspace: Workspace) => void;
  onRename: (workspace: Workspace) => void;
  onDelete: (workspace: Workspace) => void;
}

const WorkspaceList = ({
  workspaces,
  onSelectWorkspace,
  onDelete,
  onRename,
}: WorkspaceListProps) => {
  const selectedWorkspace = useWorkspaceStore(
    (state) => state.selectedWorkspace
  );

  return (
    <div className="space-y-2">
      {workspaces.map((workspace) => (
        <WorkspaceItem
          key={workspace.id}
          workspace={workspace}
          onDelete={() => onDelete(workspace)}
          onRename={() => onRename(workspace)}
          onSelectWorkspace={onSelectWorkspace}
          active={selectedWorkspace?.id === workspace.id}
        />
      ))}
    </div>
  );
};

export default WorkspaceList;