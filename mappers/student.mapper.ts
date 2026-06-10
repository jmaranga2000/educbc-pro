import type { StudentDto } from "@/dtos";
import type { StudentDocument } from "@/models/student";
import { documentId, type WithMongoId } from "./mapping-utils";

export function toStudentDto(student: WithMongoId<StudentDocument & { status?: StudentDto["status"] }>): StudentDto {
  return {
    id: documentId(student),
    admissionNumber: student.admissionNumber,
    firstName: student.firstName,
    lastName: student.lastName,
    fullName: `${student.firstName} ${student.lastName}`,
    grade: student.grade,
    stream: student.stream,
    parentIds: student.parentIds,
    feeBalance: student.feeBalance,
    status: student.status ?? "ACTIVE"
  };
}
