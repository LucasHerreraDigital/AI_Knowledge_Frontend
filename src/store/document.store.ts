import { create } from "zustand";

import type { Document } from "../types/document";

interface DocumentStore {
  documents: Document[];
  selectedDocument: Document | null;

  setDocuments: (documents: Document[]) => void;
  selectDocument: (document: Document) => void;
  clearSelectedDocument: () => void;
}

export const useDocumentStore = create<DocumentStore>((set) => ({
  documents: [],
  selectedDocument: null,

  setDocuments: (documents) =>
    set({
      documents,
      selectedDocument: null,
    }),

  selectDocument: (document) =>
    set({
      selectedDocument: document,
    }),

  clearSelectedDocument: () =>
    set({
      selectedDocument: null,
    }),
}));