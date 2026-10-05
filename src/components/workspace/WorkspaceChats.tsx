import { useState } from "react";

import ChatList from "../chat/ChatList";
import ChatListHeader from "../chat/ChatListHeader";
import CreateChatModal from "../chat/CreateChatModal";
import RenameChatModal from "../chat/RenameChatModal";
import DeleteChatModal from "../chat/DeleteChatModal";

import type { Chat } from "../../types/chat";

import { chatService } from "../../services/chat.service";
import { useChatStore } from "../../store/chat.store";

interface WorkspaceChatsProps {
  workspaceId: string;
  chats: Chat[];
  onSelectChat: (chat: Chat) => void;
}

const WorkspaceChats = ({
  workspaceId,
  chats,
  onSelectChat,
}: WorkspaceChatsProps) => {
  const [showCreateModal, setShowCreateModal] =
    useState(false);

  const [creating, setCreating] =
    useState(false);

  const [selectedActionChat, setSelectedActionChat] =
    useState<Chat | null>(null);

  const [renameOpen, setRenameOpen] =
    useState(false);

  const [deleteOpen, setDeleteOpen] =
    useState(false);

  const [updating, setUpdating] =
    useState(false);

  const [deleting, setDeleting] =
    useState(false);

  const addChat = useChatStore(
    (state) => state.addChat
  );

  const updateChat = useChatStore(
    (state) => state.updateChat
  );

  const removeChat = useChatStore(
    (state) => state.removeChat
  );

  const selectedChat = useChatStore(
    (state) => state.selectedChat
  );

  const selectChat = useChatStore(
    (state) => state.selectChat
  );

  const handleCreateChat = async (
    title: string
  ) => {
    try {
      setCreating(true);

      const newChat =
        await chatService.createChat(
          workspaceId,
          title
        );

      addChat(newChat);
      onSelectChat(newChat);

      setShowCreateModal(false);
    } catch (error) {
      console.error(
        "Error creando chat:",
        error
      );
    } finally {
      setCreating(false);
    }
  };

  const handleOpenRename = (
    chat: Chat
  ) => {
    setSelectedActionChat(chat);
    setRenameOpen(true);
  };

  const handleRename = async (
    title: string
  ) => {
    if (!selectedActionChat) return;

    try {
      setUpdating(true);

      const updatedChat =
        await chatService.updateChat(
          selectedActionChat.id,
          {
            title,
          }
        );

      updateChat(updatedChat);

      setRenameOpen(false);
      setSelectedActionChat(null);
    } catch (error) {
      console.error(
        "Error renombrando chat:",
        error
      );
    } finally {
      setUpdating(false);
    }
  };

  const handleOpenDelete = (
    chat: Chat
  ) => {
    setSelectedActionChat(chat);
    setDeleteOpen(true);
  };

  const handleConfirmDelete =
    async () => {
      if (!selectedActionChat) return;

      try {
        setDeleting(true);

        await chatService.deleteChat(
          selectedActionChat.id
        );

        removeChat(
          selectedActionChat.id
        );

        // Si era el chat abierto,
        // cerramos ChatWindow
        if (
          selectedChat?.id ===
          selectedActionChat.id
        ) {
          selectChat(null);
        }

        setDeleteOpen(false);
        setSelectedActionChat(null);
      } catch (error) {
        console.error(
          "Error eliminando chat:",
          error
        );
      } finally {
        setDeleting(false);
      }
    };

  return (
    <section className="flex min-h-0 flex-1 flex-col">

      <div className="border-b border-slate-800 p-5">

        <ChatListHeader
          total={chats.length}
          onCreate={() =>
            setShowCreateModal(true)
          }
        />

      </div>

      <div className="min-h-0 flex-1 overflow-y-auto p-3">

        <ChatList
          chats={chats}
          onSelectChat={onSelectChat}
          onRename={handleOpenRename}
          onDelete={handleOpenDelete}
        />

      </div>

      <CreateChatModal
        open={showCreateModal}
        loading={creating}
        onClose={() =>
          setShowCreateModal(false)
        }
        onCreate={handleCreateChat}
      />

      {selectedActionChat && (
        <>
          <RenameChatModal
            open={renameOpen}
            currentTitle={
              selectedActionChat.title
            }
            loading={updating}
            onClose={() => {
              if (!updating) {
                setRenameOpen(false);
                setSelectedActionChat(null);
              }
            }}
            onRename={handleRename}
          />

          <DeleteChatModal
            open={deleteOpen}
            chatTitle={
              selectedActionChat.title
            }
            loading={deleting}
            onClose={() => {
              if (!deleting) {
                setDeleteOpen(false);
                setSelectedActionChat(null);
              }
            }}
            onConfirm={
              handleConfirmDelete
            }
          />
        </>
      )}

    </section>
  );
};

export default WorkspaceChats;