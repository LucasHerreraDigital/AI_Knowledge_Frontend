import type { Message } from "./message";

export interface ChatSearchResult {
  id: string;
  title: string;
  workspaceId: string;

  workspace: {
    id: string;
    name: string;
  };

  messages: Message[];

  createdAt: string;
  updatedAt: string;
}