import type { Message } from "./message";
import type { ChatSource } from "./source";

export interface Chat {
  id: string;
  title: string;
  workspaceId: string;
  messages: Message[];
  createdAt: string;
  updatedAt: string;
}

export interface SendMessageResponse {
  chat: Chat;
  sources: ChatSource[];
}