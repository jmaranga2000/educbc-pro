import jwt from "jsonwebtoken";
import type { Role } from "@/lib/types";

export type SessionClaims = {
  sub: string;
  role: Role;
  schoolId: string;
};

export function signAccessToken(claims: SessionClaims) {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not configured.");
  }

  return jwt.sign(claims, process.env.JWT_SECRET, { expiresIn: "15m" });
}

export function signRefreshToken(claims: SessionClaims) {
  if (!process.env.JWT_REFRESH_SECRET) {
    throw new Error("JWT_REFRESH_SECRET is not configured.");
  }

  return jwt.sign(claims, process.env.JWT_REFRESH_SECRET, { expiresIn: "7d" });
}
