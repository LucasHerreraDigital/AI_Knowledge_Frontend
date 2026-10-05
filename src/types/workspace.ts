export interface Workspace {
  id: string;
  name: string;
  description: string | null;

  createdAt: string;
  updatedAt: string;

  _count: {
    documents: number;
    chats: number;
  };
}