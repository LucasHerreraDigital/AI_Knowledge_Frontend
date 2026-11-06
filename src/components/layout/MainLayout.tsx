import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";
import Header from "./Header";

import { useWorkspaceStore } from "../../store/workspace.store";
import { useAuthStore } from "../../store/auth.store";

import { workspaceService } from "../../services/workspace.service";

const MainLayout = () => {
  const [loading, setLoading] = useState(true);

  const user = useAuthStore(
    (state) => state.user
  );

  const selectedWorkspace = useWorkspaceStore(
    (state) => state.selectedWorkspace
  );

  const setWorkspaces = useWorkspaceStore(
    (state) => state.setWorkspaces
  );

  useEffect(() => {
    if (!user) return;

    const loadWorkspaces = async () => {
      try {
        setLoading(true);
       const data = await workspaceService.getWorkspaces()
        setWorkspaces(data);
      } catch (error) {
        console.error(
          "Error cargando workspaces:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    loadWorkspaces();
  }, [user, setWorkspaces]);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#0F172A] text-white">

      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col">

        <Header
          workspace={selectedWorkspace}
        />

        <main className="min-h-0 flex-1 overflow-hidden">
          {loading ? (
            <div className="flex h-full items-center justify-center">
              <p className="text-sm text-slate-500">
                Cargando...
              </p>
            </div>
          ) : (
            <Outlet />
          )}
        </main>

      </div>

    </div>
  );
};

export default MainLayout;