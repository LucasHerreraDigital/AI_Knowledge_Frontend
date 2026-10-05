import { useEffect, useState } from "react";

import WorkspacePanel from "../components/workspace/WorkspacePanel";
import ChatWindow from "../components/chat/ChatWindow";

import { useWorkspaceStore } from "../store/workspace.store";
import { useChatStore } from "../store/chat.store";

import { documentService } from "../services/document.service";
import { chatService } from "../services/chat.service";

import type { Document } from "../types/document";

const Dashboard = () => {
  const [documents, setDocuments] = useState<Document[]>([]);

  const selectedWorkspace = useWorkspaceStore(
    (state) => state.selectedWorkspace,
  );
  const handleDocumentUploaded = (
    document: Document
  ) => {
    setDocuments((currentDocuments) => [
      document,
      ...currentDocuments,
    ]);
  };

  const decrementDocumentCount = useWorkspaceStore(
    (state) => state.decrementDocumentCount,
  );

  const workspaces = useWorkspaceStore((state) => state.workspaces);

  const setChats = useChatStore((state) => state.setChats);

  const selectChat = useChatStore((state) => state.selectChat);

  useEffect(() => {
    if (!selectedWorkspace) {
      setDocuments([]);
      setChats([]);
      selectChat(null);

      return;
    }

    const loadWorkspaceData = async () => {
      try {
        const [documentsData, chatsData] = await Promise.all([
          documentService.getDocuments(selectedWorkspace.id),

          chatService.getChatsByWorkspace(selectedWorkspace.id),
        ]);

        setDocuments(documentsData);
        setChats(chatsData);

        // No abrimos ningún chat automáticamente
        selectChat(null);
      } catch (error) {
        console.error("Error cargando workspace:", error);

        setDocuments([]);
        setChats([]);
        selectChat(null);
      }
    };

    loadWorkspaceData();
  }, [selectedWorkspace, setChats, selectChat]);

  /*
   * Actualiza inmediatamente la lista
   * después de eliminar un documento.
   */
  const handleDocumentDeleted = (documentId: string) => {
    if (!selectedWorkspace) return;

    setDocuments((documents) =>
      documents.filter((document) => document.id !== documentId),
    );

    decrementDocumentCount(selectedWorkspace.id);
  };

  if (!selectedWorkspace) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="max-w-md text-center">
          {workspaces.length === 0 ? (
            <>
              <h2 className="text-xl font-semibold text-white">
                No tenés workspaces
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Creá tu primer workspace para comenzar.
              </p>
            </>
          ) : (
            <>
              <h2 className="text-xl font-semibold text-white">
                Seleccioná un workspace
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Elegí uno de tus workspaces desde el menú lateral para ver sus
                documentos y chats.
              </p>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full min-w-0 overflow-hidden">
      <WorkspacePanel
        workspace={selectedWorkspace}
        documents={documents}
        onDocumentDeleted={handleDocumentDeleted}
        onDocumentUploaded={handleDocumentUploaded}
      />

      <section className="min-w-0 flex-1 overflow-hidden">
        <ChatWindow />
      </section>
    </div>
  );
};

export default Dashboard;
