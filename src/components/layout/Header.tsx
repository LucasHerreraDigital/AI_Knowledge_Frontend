import {
  Search,
  Bell,
} from "lucide-react";

import Avatar from "../common/Avatar";
import WorkspaceHeader from "../workspace/WorkspaceHeader";

import type { Workspace } from "../../types/workspace";
import GlobalChatSearch from "../common/GlobalChatSearch";


interface HeaderProps {
  workspace: Workspace | null;
}



const Header = ({ workspace }: HeaderProps) => {


  return (
    <header className="flex h-16 items-center border-b border-slate-800 bg-[#0B1120] px-6">

      {/* Workspace */}
      {workspace ? (
        <WorkspaceHeader workspace={workspace} />
      ) : (
        <div>

          <p className="text-xs text-slate-500">
            Sin workspace seleccionado
          </p>
        </div>
      )}

      {/* Right */}
      <div className="ml-auto flex items-center gap-5">

        {/* Search */}
        <GlobalChatSearch/>

        {/* Notificaciones */}
        <button className="text-slate-400 transition hover:text-white">
          <Bell size={20} />
        </button>

      </div>

    </header>
  );
};

export default Header;