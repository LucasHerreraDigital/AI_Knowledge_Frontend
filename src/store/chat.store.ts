import { create } from "zustand";
import type { Chat } from "../types/chat";

interface ChatStore {
  chats: Chat[];
  selectedChat: Chat | null;

  setChats: (chats: Chat[]) => void;
  selectChat: (chat: Chat | null) => void;
  addChat: (chat: Chat) => void;
  updateChat: (chat: Chat) => void;
  removeChat: (chatId: string) => void;
}

export const useChatStore = create<ChatStore>((set) => ({
  chats: [],
  selectedChat: null,

  setChats: (chats) =>
    set({
      chats,
    }),

  selectChat: (chat) =>
    set({
      selectedChat: chat,
    }),

  addChat: (chat) =>
    set((state) => ({
      chats: [chat, ...state.chats],
      selectedChat: chat,
    })),

  updateChat: (chat) =>
    set((state) => ({
      chats: state.chats.map((item) =>
        item.id === chat.id ? chat : item
      ),

      selectedChat:
        state.selectedChat?.id === chat.id
          ? chat
          : state.selectedChat,
    })),

  removeChat: (chatId) =>
    set((state) => {
      const chats = state.chats.filter(
        (chat) => chat.id !== chatId
      );

      return {
        chats,
        selectedChat:
          state.selectedChat?.id === chatId
            ? chats[0] ?? null
            : state.selectedChat,
      };
    }),
}));