import {
  getDocuments,
  uploadDocument,
  deleteDocument,
  getDocumentFile,
} from "../api/document.api";

export const documentService = {
  getDocuments: async (
    workspaceId: string
  ) => {
    return await getDocuments(workspaceId);
  },

  uploadDocument: async (
    workspaceId: string,
    file: File,
    onProgress?: (progress: number) => void
  ) => {
    return await uploadDocument(
      workspaceId,
      file,
      onProgress
    );
  },

  deleteDocument: async (
    documentId: string
  ) => {
    return await deleteDocument(documentId);
  },

  getDocumentFile: async (
    documentId: string
  ) => {
    return await getDocumentFile(documentId);
  },
};