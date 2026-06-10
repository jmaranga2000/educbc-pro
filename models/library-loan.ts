import { Schema, model, models } from "mongoose";

export type LibraryLoanDocument = {
  bookId: string;
  borrowerUserId: string;
  borrowedAt: Date;
  dueAt: Date;
  returnedAt?: Date;
  fineAmount: number;
};

const libraryLoanSchema = new Schema<LibraryLoanDocument>(
  {
    bookId: { type: String, required: true, index: true },
    borrowerUserId: { type: String, required: true, index: true },
    borrowedAt: { type: Date, required: true },
    dueAt: { type: Date, required: true },
    returnedAt: { type: Date },
    fineAmount: { type: Number, default: 0, min: 0 }
  },
  { timestamps: true }
);

export const LibraryLoan = models.LibraryLoan || model<LibraryLoanDocument>("LibraryLoan", libraryLoanSchema);
