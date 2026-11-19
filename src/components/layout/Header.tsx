import WorkspaceHeader from "../workspace/WorkspaceHeader";

import type { Workspace } from "../../types/workspace";
import GlobalChatSearch from "../common/GlobalChatSearch";


interface HeaderProps {
  workspace: Workspace | null;
}



const Header = ({ workspace }: HeaderProps) => {


  return (
    <header className="flex h-16 items-center border-b border-border bg-background px-6">

      {/* Workspace */}
      {workspace ? (
        <WorkspaceHeader workspace={workspace} />
      ) : (
        <div>

          <p className="text-xs text-text-secondary">
            Sin workspace seleccionado
          </p>
        </div>
      )}

      {/* Right */}
      <div className="ml-auto flex items-center gap-5">

        {/* Search */}
        <GlobalChatSearch/>


      </div>

    </header>
  );
};

export default Header;