import type { CreateStudentDto, StudentDto } from "@/dtos";

export function formatStudentName(student: Pick<StudentDto, "firstName" | "lastName">) {
  return `${student.firstName} ${student.lastName}`.trim();
}

export function createStudentPreview(input: CreateStudentDto): StudentDto {
  return {
    id: "preview",
    admissionNumber: input.admissionNumber,
    firstName: input.firstName,
    lastName: input.lastName,
    fullName: formatStudentName(input),
    grade: input.grade,
    stream: input.stream,
    parentIds: input.parentIds ?? [],
    feeBalance: 0,
    status: "ACTIVE"
  };
}
