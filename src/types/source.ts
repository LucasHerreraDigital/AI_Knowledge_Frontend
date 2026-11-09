export interface ChatSource {
  id: string;
  content: string;
  distance: number;
  documentId: string;
  documentName: string;
  pageNumber: number | null;
  chunkIndex: number;
}