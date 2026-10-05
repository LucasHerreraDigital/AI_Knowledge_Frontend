import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { House, Settings, Sparkles } from "lucide-react";

import type { Workspace } from "../../types/workspace";

import WorkspaceList from "../workspace/WorkspaceList";
import WorkspaceCreateButton from "../workspace/WorkspaceCreateButton";
import CreateWorkspaceModal from "../workspace/CreateWorkspaceModal";
import SidebarFooter from "./SidebarFooter";

import { useWorkspaceStore } from "../../store/workspace.store";
import { useAuthStore } from "../../store/auth.store";
import { useChatStore } from "../../store/chat.store";

import { workspaceService } from "../../services/workspace.service";

const Sidebar = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const workspaces = useWorkspaceStore((state) => state.workspaces);

  const selectWorkspace = useWorkspaceStore((state) => state.selectWorkspace);

  const addWorkspace = useWorkspaceStore((state) => state.addWorkspace);

  const authUser = useAuthStore((state) => state.user);
  const selectChat = useChatStore((state) => state.selectChat);

  const handleSelectWorkspace = (workspace: Workspace) => {
    selectChat(null);
    selectWorkspace(workspace);
  };

  const handleCreateWorkspace = async (data: {
    name: string;
    description?: string;
  }) => {
    if (!authUser) return;

    try {
      const newWorkspace = await workspaceService.createWorkspace({
        name: data.name,
        description: data.description,
        userId: authUser.id,
      });

      addWorkspace(newWorkspace);

      setShowCreateModal(false);
    } catch (error) {
      console.error("Error creando workspace:", error);
    }
  };

  return (
    <>
      <aside className="flex h-screen w-72 shrink-0 flex-col border-r border-slate-800 bg-[#0B1120]">
        {/* Logo */}
        <div className="flex items-center gap-3 px-6 py-6">
          <Sparkles size={24} className="text-white" />

          <h1 className="text-3xl font-bold tracking-tight text-white">
            AI Knowledge
          </h1>
        </div>

        {/* Navegación */}
        <nav className="px-4">
          <ul className="space-y-2">
            <li>
              <button
                type="button"
                onClick={() => {
                  selectChat(null);
                  selectWorkspace(null);
                  navigate("/dashboard");
                }}
                className="
                  flex
                  w-full
                  items-center
                  gap-3
                  rounded-lg
                  px-4
                  py-3
                  text-left
                  text-slate-400
                  transition
                  hover:bg-slate-800
                  hover:text-white
                "
              >
                <House size={20} />
                Inicio
              </button>
            </li>

            <li>
              <button
                type="button"
                onClick={() => navigate("/settings")}
                className={`
                  flex
                  w-full
                  items-center
                  gap-3
                  rounded-lg
                  px-4
                  py-3
                  text-left
                  transition

                  ${
                    location.pathname === "/settings"
                      ? "bg-indigo-500/10 text-indigo-400"
                      : "text-slate-400 hover:bg-slate-800 hover:text-white"
                  }
                `}
              >
                <Settings size={20} />
                Ajustes
              </button>
            </li>
          </ul>
        </nav>

        <div className="mx-5 my-6 border-t border-slate-800" />

        {/* Workspaces */}
        <div className="min-h-0 flex-1 overflow-y-auto px-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Mis Workspaces
            </h2>

            <WorkspaceCreateButton onClick={() => setShowCreateModal(true)} />
          </div>

          <WorkspaceList
            workspaces={workspaces}
            onSelectWorkspace={handleSelectWorkspace}
          />
        </div>

        <div className="mx-5 border-t border-slate-800" />

        {authUser && (
          <SidebarFooter
            user={{
              name: authUser.name,
              plan: "Plan Pro",
            }}
          />
        )}
      </aside>

      <CreateWorkspaceModal
        open={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onCreate={handleCreateWorkspace}
      />
    </>
  );
};

export default Sidebar;
