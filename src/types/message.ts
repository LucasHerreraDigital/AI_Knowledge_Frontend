import type { ChatSource } from "./source";
export type MessageRole = "system" | "user" | "assistant";

export interface Message {
  id: string;
  chatId: string;
  role: MessageRole;
  content: string;
  sources: ChatSource[];
  tokens: number | null;
  model: string | null;
  createdAt: string;
}