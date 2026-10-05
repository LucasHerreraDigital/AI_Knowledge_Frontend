import WorkspaceChats from "./WorkspaceChats";
import WorkspaceDocuments from "./WorkspaceDocuments";

import type { Workspace } from "../../types/workspace";
import type { Document } from "../../types/document";
import type { Chat } from "../../types/chat";

import { useChatStore } from "../../store/chat.store";
import { chatService } from "../../services/chat.service";

interface WorkspacePanelProps {
  workspace: Workspace;
  documents: Document[];
  onDocumentDeleted: (documentId: string) => void;
  onDocumentUploaded:(document:Document) => void;
}

const WorkspacePanel = ({
  workspace,
  documents,
  onDocumentDeleted,
  onDocumentUploaded,
}: WorkspacePanelProps) => {
  const chats = useChatStore((state) => state.chats);

  const selectChat = useChatStore((state) => state.selectChat);

  const workspaceChats = chats.filter(
    (chat) => chat.workspaceId === workspace.id,
  );

  const handleSelectChat = async (chat: Chat) => {
    try {
      const completeChat = await chatService.getChatById(chat.id);

      selectChat(completeChat);
    } catch (error) {
      console.error("Error cargando chat:", error);
    }
  };

  return (
    <aside className="flex h-full w-[380px] shrink-0 flex-col overflow-hidden border-r border-slate-800 bg-[#0B1120]">
      <section className="flex min-h-0 flex-1 flex-col overflow-hidden">
        <WorkspaceDocuments
          workspaceId={workspace.id}
          documents={documents}
          onDocumentDeleted={onDocumentDeleted}
          onDocumentUploaded={onDocumentUploaded}
        />
      </section>

      <section className="flex min-h-0 flex-1 flex-col overflow-hidden border-t border-slate-800">
        <WorkspaceChats
          workspaceId={workspace.id}
          chats={workspaceChats}
          onSelectChat={handleSelectChat}
        />
      </section>
    </aside>
  );
};

export default WorkspacePanel;
