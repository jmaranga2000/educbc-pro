import { connectMongo } from "@/lib/db/mongodb";
import { Student } from "@/models/student";
import { User } from "@/models/user";
import { Parent } from "@/models/parent";
import { HealthRecord } from "@/models/health-record";
import { toStudentDto } from "@/mappers/student.mapper";
import type { AdmitStudentDto, CreateStudentDto, StudentDto } from "@/dtos";
import bcrypt from "bcryptjs";

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
    age: 0,
    grade: input.grade,
    stream: input.stream,
    parentIds: input.parentIds ?? [],
    feeBalance: 0,
    status: "ACTIVE"
  };
}

export async function createStudent(input: AdmitStudentDto): Promise<StudentDto> {
  await connectMongo();

  const {
    firstName,
    middleName,
    lastName,
    age,
    grade,
    stream,
    healthRecords,
    parentName,
    parentPhone,
    homePlace
  } = input;

  // 1. Find or create Parent and User accounts for the parent's contact
  let user = await User.findOne({ phone: parentPhone, role: "PARENT" });
  if (!user) {
    const sanitizedPhone = parentPhone.replace(/[^0-9]/g, "");
    const email = `parent_${sanitizedPhone || Date.now()}@educbc.com`;
    const passwordHash = await bcrypt.hash("Parent123!", 10);
    user = await User.create({
      name: parentName,
      phone: parentPhone,
      email,
      role: "PARENT",
      passwordHash,
      twoFactorEnabled: false
    });
  }

  let parent = await Parent.findOne({ userId: user._id.toString() });
  if (!parent) {
    parent = await Parent.create({
      userId: user._id.toString(),
      relationship: "Parent",
      studentIds: [],
      address: homePlace || ""
    });
  }

  // 2. Generate a unique admission number (ADM-YYYY-XXXX)
  const year = new Date().getFullYear();
  const prefix = `ADM-${year}-`;
  const studentsInYear = await Student.find({ admissionNumber: new RegExp(`^${prefix}`) }).lean();
  let nextSeq = 1;
  if (studentsInYear.length > 0) {
    const seqs = studentsInYear.map((s: any) => {
      const parts = s.admissionNumber.split("-");
      const num = parseInt(parts[2], 10);
      return isNaN(num) ? 0 : num;
    });
    nextSeq = Math.max(...seqs) + 1;
  }
  const admissionNumber = `ADM-${year}-${String(nextSeq).padStart(4, "0")}`;

  // 3. Create the Student document
  const student = await Student.create({
    admissionNumber,
    firstName,
    middleName,
    lastName,
    age,
    grade,
    stream,
    parentIds: [parent._id.toString()],
    feeBalance: 0,
    homePlace
  });

  // 4. Update the Parent document with the new student's ID
  await Parent.findByIdAndUpdate(parent._id, {
    $addToSet: { studentIds: student._id.toString() }
  });

  // 5. Create the HealthRecord document linking to the student ID
  await HealthRecord.create({
    studentId: student._id.toString(),
    allergies: healthRecords ? [healthRecords] : [],
    medicalNotes: healthRecords || "",
    emergencyContactName: parentName,
    emergencyContactPhone: parentPhone,
    clinicVisits: []
  });

  // 6. Map and return the StudentDto
  const studentData = student.toObject ? student.toObject() : student;
  return toStudentDto(studentData as any);
}
