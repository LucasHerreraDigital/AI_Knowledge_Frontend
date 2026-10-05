import { api } from "./axios";

export const getDocuments = async (
  workspaceId: string
) => {
  const response = await api.get(
    `/documents/${workspaceId}`
  );

  return response.data;
};

export const uploadDocument = async (
  workspaceId: string,
  file: File,
  onProgress?: (progress: number) => void
) => {
  const formData = new FormData();

  formData.append("workspaceId", workspaceId);
  formData.append("file", file);

  const response = await api.post(
    "/documents/upload",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },

      onUploadProgress: (progressEvent) => {
        if (!progressEvent.total) return;

        const progress = Math.round(
          (progressEvent.loaded * 100) /
            progressEvent.total
        );

        onProgress?.(progress);
      },
    }
  );

  return response.data;
};

export const getDocumentFile = async (
  documentId: string
): Promise<Blob> => {
  const response = await api.get(
    `/documents/${documentId}/file`,
    {
      responseType: "blob",
    }
  );

  return response.data;
};

export const deleteDocument = async (
  documentId: string
) => {
  const response = await api.delete(
    `/documents/${documentId}`
  );

  return response.data;
};