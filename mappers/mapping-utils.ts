export type WithMongoId<T> = T & {
  _id?: { toString(): string };
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export function documentId(document: WithMongoId<unknown>) {
  return document.id ?? document._id?.toString() ?? "";
}

export function isoDate(value?: Date | string) {
  if (!value) {
    return "";
  }

  return value instanceof Date ? value.toISOString() : value;
}
