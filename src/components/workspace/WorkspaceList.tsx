import WorkspaceItem from "./WokspaceItem";
import type { Workspace } from "../../types/workspace";
import { useWorkspaceStore } from "../../store/workspace.store";

interface WorkspaceListProps {
  workspaces: Workspace[];
  onSelectWorkspace: (workspace: Workspace) => void;
}

const WorkspaceList = ({
  workspaces,
  onSelectWorkspace,
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
          onSelectWorkspace={onSelectWorkspace}
          active={
            selectedWorkspace?.id === workspace.id
          }
        />
      ))}
    </div>
  );
};

export default WorkspaceList;