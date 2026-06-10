import { Schema, model, models } from "mongoose";

export type LibraryBookDocument = {
  title: string;
  author: string;
  isbn?: string;
  category: string;
  copies: number;
  availableCopies: number;
  digitalDocumentId?: string;
};

const libraryBookSchema = new Schema<LibraryBookDocument>(
  {
    title: { type: String, required: true, index: true },
    author: { type: String, required: true },
    isbn: { type: String },
    category: { type: String, required: true },
    copies: { type: Number, required: true, min: 0 },
    availableCopies: { type: Number, required: true, min: 0 },
    digitalDocumentId: { type: String }
  },
  { timestamps: true }
);

export const LibraryBook = models.LibraryBook || model<LibraryBookDocument>("LibraryBook", libraryBookSchema);
