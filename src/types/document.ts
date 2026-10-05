export type ProcessingStatus =
  | "PENDING"
  | "PROCESSING"
  | "COMPLETED"
  | "FAILED";

export interface Document {
  id: string;
  name: string;
  mimeType: string;
  extension: string;
  filePath: string;
  size: number;
  extractedText: string | null;
  processingStatus: ProcessingStatus;
  workspaceId: string;
  createdAt: string;
  updatedAt: string;
}