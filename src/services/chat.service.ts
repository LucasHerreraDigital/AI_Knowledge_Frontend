import {
  createChat,
  getChatsByWorkspace,
  getChatById,
  updateChat,
  deleteChat,
  getMessages,
  sendMessage,
  searchChats,
} from "../api/chat.api";

export const chatService = {
  createChat: async (workspaceId: string, title: string) => {
    return await createChat({
      workspaceId,
      title,
    });
  },

  searchChats: async (query: string) => {
    return await searchChats(query);
  },

  getChatsByWorkspace: async (workspaceId: string) => {
    return await getChatsByWorkspace(workspaceId);
  },

  getChatById: async (chatId: string) => {
    return await getChatById(chatId);
  },

  updateChat: async (
    chatId: string,
    data: {
      title: string;
    },
  ) => {
    return await updateChat(chatId, data);
  },

  deleteChat: async (chatId: string) => {
    return await deleteChat(chatId);
  },

  getMessages: async (chatId: string) => {
    return await getMessages(chatId);
  },

  sendMessage: async (chatId: string, content: string) => {
    return await sendMessage(chatId, content);
  },
};
