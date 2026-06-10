import type { UserDto } from "@/dtos";
import type { UserDocument } from "@/models/user";
import { documentId, type WithMongoId } from "./mapping-utils";

export function toUserDto(user: WithMongoId<UserDocument>): UserDto {
  return {
    id: documentId(user),
    name: user.name,
    email: user.email,
    phone: user.phone,
    role: user.role,
    twoFactorEnabled: user.twoFactorEnabled
  };
}
