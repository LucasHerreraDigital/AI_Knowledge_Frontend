import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { House, Settings, Sparkles } from "lucide-react";

import type { Workspace } from "../../types/workspace";

import WorkspaceList from "../workspace/WorkspaceList";
import WorkspaceCreateButton from "../workspace/WorkspaceCreateButton";
import CreateWorkspaceModal from "../workspace/CreateWorkspaceModal";
import SidebarFooter from "./SidebarFooter";
import DeleteWorkspaceModal from "../workspace/DeleteWorkspaceModal";
import RenameWorkspaceModal from "../workspace/RenameWorkspaceModal";

import { useWorkspaceStore } from "../../store/workspace.store";
import { useAuthStore } from "../../store/auth.store";
import { useChatStore } from "../../store/chat.store";

import { workspaceService } from "../../services/workspace.service";

const Sidebar = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [workspaceToDelete, setWorkspaceToDelete] = useState<Workspace | null>(null);
  const [workspaceToRename, setWorkspaceToRename] = useState<Workspace | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isRenaming, setIsRenaming] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const workspaces = useWorkspaceStore((state) => state.workspaces);
  const selectWorkspace = useWorkspaceStore((state) => state.selectWorkspace);
  const addWorkspace = useWorkspaceStore((state) => state.addWorkspace);
  const updateWorkspaceInStore  = useWorkspaceStore((state) => state.updateWorkspace)
  const removeWorkspace = useWorkspaceStore ((state) => state.removeWorkspace)
  const selectedWorkspace = useWorkspaceStore((state) => state.selectedWorkspace);

  const authUser = useAuthStore((state) => state.user);

  const selectChat = useChatStore((state) => state.selectChat);

  const handleSelectWorkspace = (workspace: Workspace) => {
    selectChat(null);
    selectWorkspace(workspace);
  };
  const handleOpenRenameModal = (workspace: Workspace) => {
    setWorkspaceToRename(workspace);
  };

  const handleOpenDeleteModal = (workspace: Workspace) => {
    setWorkspaceToDelete(workspace);
  };

  const handleCloseRenameModal = () => {
    if (isRenaming) return;
    setWorkspaceToRename(null);
  };

  const handleCloseDeleteModal = () => {
    if (isDeleting) return;
    setWorkspaceToDelete(null);
  };

  const handleRenameWorkspace = async (newName: string) => {
    if (!authUser || !workspaceToRename) return;

    const trimmedName = newName.trim();

    if (!trimmedName) return;

    try {
      setIsRenaming(true);

      const updatedWorkspace = await workspaceService.updateWorkspace(
        workspaceToRename.id,
        { name: trimmedName }
      );

      updateWorkspaceInStore(updatedWorkspace);

      setWorkspaceToRename(null);

    } catch (error) {
      console.error("Error renombrando workspace:", error);
    } finally {
      setIsRenaming(false);
    }
  };
  

  const handleRemoveWorkspace = async () => {
    if (!authUser || !workspaceToDelete) return;

    try {
      setIsDeleting(true);

      await workspaceService.deleteWorkspace(workspaceToDelete.id);

      removeWorkspace(workspaceToDelete.id);

      if (workspaceToDelete.id === selectedWorkspace?.id) {
        selectChat(null);
        navigate("/dashboard");
      }

      setWorkspaceToDelete(null);

    } catch (error) {
      console.error("Error eliminando workspace:", error);
    } finally {
      setIsDeleting(false);
    }
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
            onDelete={handleOpenDeleteModal}
            onRename={handleOpenRenameModal}
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
      <RenameWorkspaceModal
        open={workspaceToRename !== null}
        currentTitle={workspaceToRename?.name ?? ""}
        loading={isRenaming}
        onClose={handleCloseRenameModal}
        onRename={handleRenameWorkspace}
      />

      <DeleteWorkspaceModal
        open={workspaceToDelete !== null}
        workspaceTitle={workspaceToDelete?.name ?? ""}
        loading={isDeleting}
        onClose={handleCloseDeleteModal}
        onConfirm={handleRemoveWorkspace}
      />
    </>
  );
};

export default Sidebar;
