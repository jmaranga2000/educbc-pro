import { Schema, model, models } from "mongoose";
import type { DocumentType } from "@/types";

export type DocumentOwnerType = "STUDENT" | "TEACHER" | "SCHOOL" | "ASSIGNMENT";

export type DocumentFileDocument = {
  ownerType: DocumentOwnerType;
  ownerId: string;
  type: DocumentType;
  fileName: string;
  mimeType: string;
  size: number;
  storageKey: string;
  bucket: string;
  uploadedBy: string;
};

const documentFileSchema = new Schema<DocumentFileDocument>(
  {
    ownerType: { type: String, required: true, index: true },
    ownerId: { type: String, required: true, index: true },
    type: { type: String, required: true },
    fileName: { type: String, required: true },
    mimeType: { type: String, required: true },
    size: { type: Number, required: true, min: 0 },
    storageKey: { type: String, required: true, unique: true },
    bucket: { type: String, required: true },
    uploadedBy: { type: String, required: true }
  },
  { timestamps: true }
);

export const DocumentFile = models.DocumentFile || model<DocumentFileDocument>("DocumentFile", documentFileSchema);
