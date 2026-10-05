import { useEffect, useState } from "react";

import { useChatStore } from "../../store/chat.store";
import { chatService } from "../../services/chat.service";

import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import ChatInput from "./ChatInput";
import TypingIndicator from "../common/TypingIndicator";
import RenameChatModal from "./RenameChatModal";
import DeleteChatModal from "./DeleteChatModal";

const ChatWindow = () => {
  const [sending, setSending] = useState(false);

  const [loadingChat, setLoadingChat] = useState(false);

  const [renameOpen, setRenameOpen] = useState(false);

  const [deleteOpen, setDeleteOpen] = useState(false);

  const [renaming, setRenaming] = useState(false);

  const [deleting, setDeleting] = useState(false);

  const selectedChat = useChatStore((state) => state.selectedChat);

  const updateChat = useChatStore((state) => state.updateChat);

  const removeChat = useChatStore((state) => state.removeChat);

  useEffect(() => {
    if (!selectedChat) return;

    const loadChat = async () => {
      try {
        setLoadingChat(true);

        const chat = await chatService.getChatById(selectedChat.id);

        updateChat(chat);
      } catch (error) {
        console.error("Error cargando chat:", error);
      } finally {
        setLoadingChat(false);
      }
    };

    loadChat();
  }, [selectedChat?.id, updateChat]);

  const handleSendMessage = async (content: string) => {
    if (!selectedChat || sending) return;

    try {
      setSending(true);

      const updatedChat = await chatService.sendMessage(
        selectedChat.id,
        content,
      );

      updateChat(updatedChat);
    } catch (error) {
      console.error("Error enviando mensaje:", error);
    } finally {
      setSending(false);
    }
  };

  const handleRename = async (title: string) => {
    if (!selectedChat) return;

    try {
      setRenaming(true);

      const updatedChat = await chatService.updateChat(selectedChat.id, {
        title,
      });

      updateChat(updatedChat);

      setRenameOpen(false);
    } catch (error) {
      console.error("Error renombrando chat:", error);
    } finally {
      setRenaming(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedChat) return;

    try {
      setDeleting(true);

      const chatId = selectedChat.id;

      await chatService.deleteChat(chatId);

      removeChat(chatId);

      setDeleteOpen(false);
    } catch (error) {
      console.error("Error eliminando chat:", error);
    } finally {
      setDeleting(false);
    }
  };

  if (!selectedChat) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-sm text-slate-500">
          Seleccioná un chat para comenzar
        </p>
      </div>
    );
  }

  if (loadingChat) {
    return (
      <div className="flex h-full items-center justify-center">
        <TypingIndicator />
      </div>
    );
  }

  return (
    <>
      <section className="flex h-full min-w-0 flex-col bg-[#0F172A]">
        <ChatHeader
          title={selectedChat.title}
          onRename={() => setRenameOpen(true)}
          onDelete={() => setDeleteOpen(true)}
        />

        <MessageList messages={selectedChat.messages ?? []} />

        {sending && <TypingIndicator />}

        <ChatInput onSend={handleSendMessage} loading={sending} />
      </section>

      <RenameChatModal
        open={renameOpen}
        currentTitle={selectedChat.title}
        loading={renaming}
        onClose={() => setRenameOpen(false)}
        onRename={handleRename}
      />

      <DeleteChatModal
        open={deleteOpen}
        chatTitle={selectedChat.title}
        loading={deleting}
        onClose={() => setDeleteOpen(false)}
        onConfirm={handleDelete}
      />
    </>
  );
};

export default ChatWindow;
