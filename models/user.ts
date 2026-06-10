import { Schema, model, models } from "mongoose";
import type { Role } from "@/lib/types";

export type UserDocument = {
  name: string;
  email: string;
  phone?: string;
  role: Role;
  passwordHash: string;
  twoFactorEnabled: boolean;
};

const userSchema = new Schema<UserDocument>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    role: { type: String, required: true },
    passwordHash: { type: String, required: true },
    twoFactorEnabled: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export const User = models.User || model<UserDocument>("User", userSchema);
