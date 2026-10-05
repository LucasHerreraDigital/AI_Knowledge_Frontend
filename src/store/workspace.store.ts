import { create } from "zustand";

import type { Workspace } from "../types/workspace";

interface WorkspaceStore {
  workspaces: Workspace[];
  selectedWorkspace: Workspace | null;

  setWorkspaces: (workspaces: Workspace[]) => void;

  selectWorkspace: (workspace: Workspace | null) => void;

  addWorkspace: (workspace: Workspace) => void;

  incrementDocumentCount: (workspaceId: string) => void;

  decrementDocumentCount: (workspaceId: string) => void;
}

export const useWorkspaceStore = create<WorkspaceStore>((set) => ({
  workspaces: [],
  selectedWorkspace: null,

  setWorkspaces: (workspaces) =>
    set({
      workspaces,
    }),

  selectWorkspace: (workspace) =>
    set({
      selectedWorkspace: workspace,
    }),

  addWorkspace: (workspace) =>
    set((state) => ({
      workspaces: [...state.workspaces, workspace],
      selectedWorkspace: workspace,
    })),

  incrementDocumentCount: (workspaceId) =>
    set((state) => {
      const updateCount = (workspace: Workspace): Workspace => ({
        ...workspace,

        _count: {
          ...workspace._count,

          documents: workspace._count.documents + 1,
        },
      });

      return {
        workspaces: state.workspaces.map((workspace) =>
          workspace.id === workspaceId ? updateCount(workspace) : workspace,
        ),

        selectedWorkspace:
          state.selectedWorkspace?.id === workspaceId
            ? updateCount(state.selectedWorkspace)
            : state.selectedWorkspace,
      };
    }),

  decrementDocumentCount: (workspaceId) =>
    set((state) => {
      const updateCount = (workspace: Workspace): Workspace => ({
        ...workspace,

        _count: {
          ...workspace._count,

          documents: Math.max(0, workspace._count.documents - 1),
        },
      });

      return {
        workspaces: state.workspaces.map((workspace) =>
          workspace.id === workspaceId ? updateCount(workspace) : workspace,
        ),

        selectedWorkspace:
          state.selectedWorkspace?.id === workspaceId
            ? updateCount(state.selectedWorkspace)
            : state.selectedWorkspace,
      };
    }),
}));
