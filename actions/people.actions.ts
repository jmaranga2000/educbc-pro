"use server";

import type { CreateStudentDto } from "@/dtos";
import { createStudentPreview } from "@/services";

export async function previewStudentAction(input: CreateStudentDto) {
  return createStudentPreview(input);
}
