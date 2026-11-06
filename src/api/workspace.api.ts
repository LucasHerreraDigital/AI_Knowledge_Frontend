import { api } from "./axios";

interface CreateWorkspaceData {
  name: string;
  description?: string;
}

export const createWorkspace = async (
  data: CreateWorkspaceData
) => {
  const response = await api.post(
    "/workspaces",
    data
  );

  return response.data;
};
export const getWorkspaces = async () => {
  const response = await api.get(
    "/workspaces"
  );

  return response.data;
};


export const getWorkspaceById = async (
  workspaceId: string
) => {
  const response = await api.get(
    `/workspaces/${workspaceId}`
  );

  return response.data;
};


export const updateWorkspace = async (
  workspaceId: string,
  data: {
    name?: string;
    description?: string;
  }
) => {
  const response = await api.patch(
    `/workspaces/${workspaceId}`,
    data
  );

  return response.data;
};

export const deleteWorkspace = async (
  workspaceId: string
) => {
  const response = await api.delete(
    `/workspaces/${workspaceId}`
  );

  return response.data;
};