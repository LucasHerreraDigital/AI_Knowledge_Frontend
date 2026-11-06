import {
  getWorkspaces,
  getWorkspaceById,
  createWorkspace,
  updateWorkspace,
  deleteWorkspace,
} from "../api/workspace.api";

import type { Workspace } from "../types/workspace";

interface CreateWorkspaceData {
  name: string;
  description?: string;
}

interface UpdateWorkspaceData {
  name?: string;
  description?: string;
}

export const workspaceService = {
  getWorkspaces: async (): Promise<Workspace[]> => {
    return await getWorkspaces();
  },

  getWorkspaceById: async (
    workspaceId: string
  ): Promise<Workspace> => {
    return await getWorkspaceById(workspaceId);
  },

  createWorkspace: async (
    data: CreateWorkspaceData
  ): Promise<Workspace> => {
    return await createWorkspace(data);
  },

  updateWorkspace: async (
    workspaceId: string,
    data: UpdateWorkspaceData
  ): Promise<Workspace> => {
    return await updateWorkspace(
      workspaceId,
      data
    );
  },

  deleteWorkspace: async (
    workspaceId: string
  ): Promise<void> => {
    await deleteWorkspace(workspaceId);
  },
};