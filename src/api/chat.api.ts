import { api } from "./axios";
import type { ChatSearchResult } from "../types/search";

export const createChat = async (data: {
  workspaceId: string;
  title: string;
}) => {
  const response = await api.post("/chats", data);

  return response.data;
};

export const searchChats = async (
  query: string,
): Promise<ChatSearchResult[]> => {
  const response = await api.get("/chats/search", {
    params: {
      q: query,
    },
  });

  return response.data;
};

export const getChatsByWorkspace = async (workspaceId: string) => {
  const response = await api.get(`/chats/workspace/${workspaceId}`);

  return response.data;
};

export const getChatById = async (chatId: string) => {
  const response = await api.get(`/chats/${chatId}`);

  return response.data;
};

export const updateChat = async (
  chatId: string,
  data: {
    title?: string;
  },
) => {
  const response = await api.patch(`/chats/${chatId}`, data);

  return response.data;
};

export const deleteChat = async (chatId: string) => {
  const response = await api.delete(`/chats/${chatId}`);

  return response.data;
};

export const getMessages = async (chatId: string) => {
  const response = await api.get(`/chats/${chatId}/messages`);

  return response.data;
};

export const sendMessage = async (chatId: string, content: string) => {
  const response = await api.post(`/chats/${chatId}/messages`, {
    role: "user",
    content,
  });

  return response.data;
};
