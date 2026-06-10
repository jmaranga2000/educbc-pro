"use server";

import { Student } from "@/models/student";
import { CbcAssessment } from "@/models/cbc-assessment";
import { User } from "@/models/user";
import { Teacher } from "@/models/teacher";

export type StudentPerformance = {
  meanScore: number;
  cbcBand: "EE" | "ME" | "AE" | "BE";
  assessmentsCount: number;
};

export type StudentListItem = {
  id: string;
  firstName: string;
  lastName: string;
  admissionNumber: string;
  grade: string;
  stream: string;
  performance: StudentPerformance;
};

export type StudentDetail = {
  id: string;
  firstName: string;
  lastName: string;
  admissionNumber: string;
  dateOfBirth?: Date;
  grade: string;
  stream: string;
  parentContact?: string;
  healthStatus?: string;
  libraryStatus?: string;
  transportRoute?: string;
  performance: StudentPerformance;
  classTeacher?: {
    id: string;
    name: string;
    email: string;
  };
  assessments: Array<{
    subject: string;
    competencyScore: number;
    projectScore: number;
    practicalScore: number;
    date: Date;
  }>;
};

/**
 * Calculate CBC band from mean score
 */
function gradeFromScore(score: number): "EE" | "ME" | "AE" | "BE" {
  if (score >= 90) return "EE";
  if (score >= 75) return "ME";
  if (score >= 50) return "AE";
  return "BE";
}

/**
 * Calculate performance for a student
 */
async function calculateStudentPerformance(studentId: string): Promise<StudentPerformance> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const assessments = (await CbcAssessment.find({
    studentId: studentId
  }).lean()) as any[];

  let meanScore = 0;
  if (assessments.length > 0) {
    const totalScore = assessments.reduce((sum, a) => {
      const score = Math.max(a.competencyScore, a.projectScore || 0, a.practicalScore || 0);
      return sum + score;
    }, 0);
    meanScore = Math.round(totalScore / assessments.length);
  }

  return {
    meanScore,
    cbcBand: gradeFromScore(meanScore),
    assessmentsCount: assessments.length
  };
}

/**
 * Fetch all students organized by grade and stream, sorted by performance
 */
export async function fetchAllStudentsAction(searchQuery: string = "", filterGrade?: string) {
  try {
    const query: any = {};

    if (filterGrade) {
      query.grade = filterGrade;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const students = (await Student.find(query).lean()) as any[];

    // Calculate performance for all students
    const studentsWithPerformance = await Promise.all(
      students.map(async (student) => {
        const performance = await calculateStudentPerformance(student._id.toString());
        return {
          id: student._id.toString(),
          firstName: student.firstName,
          lastName: student.lastName,
          admissionNumber: student.admissionNumber,
          grade: student.grade,
          stream: student.stream,
          performance
        };
      })
    );

    // Apply search filter
    let filtered = studentsWithPerformance;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (s) =>
          s.firstName.toLowerCase().includes(q) ||
          s.lastName.toLowerCase().includes(q) ||
          s.admissionNumber.toLowerCase().includes(q)
      );
    }

    // Group by grade
    const gradeMap = new Map<string, StudentListItem[]>();
    filtered.forEach((student) => {
      if (!gradeMap.has(student.grade)) {
        gradeMap.set(student.grade, []);
      }
      gradeMap.get(student.grade)!.push(student);
    });

    // Within each grade, group by stream and sort by performance
    const grades = Array.from(gradeMap.entries())
      .map(([grade, studentsInGrade]) => {
        // Group by stream
        const streamMap = new Map<string, StudentListItem[]>();
        studentsInGrade.forEach((student) => {
          if (!streamMap.has(student.stream)) {
            streamMap.set(student.stream, []);
          }
          streamMap.get(student.stream)!.push(student);
        });

        // Sort each stream by performance (descending - best first)
        const streams = Array.from(streamMap.entries())
          .map(([stream, streamStudents]) => ({
            stream,
            students: streamStudents.sort((a, b) => b.performance.meanScore - a.performance.meanScore)
          }))
          .sort((a, b) => a.stream.localeCompare(b.stream)); // Sort stream names alphabetically

        return {
          grade,
          streams,
          totalStudents: studentsInGrade.length
        };
      })
      .sort((a, b) => {
        // Sort by grade level
        const gradeOrder = ["Playgroup", "PP1", "PP2", "Grade 1", "Grade 2", "Grade 3", "Grade 4", "Grade 5", "Grade 6", "Grade 7", "Grade 8", "Grade 9"];
        return gradeOrder.indexOf(a.grade) - gradeOrder.indexOf(b.grade);
      });

    return { success: true, data: grades };
  } catch (error) {
    console.error("Error fetching students:", error);
    return { success: false, error: "Failed to fetch students" };
  }
}

/**
 * Fetch detailed information about a specific student
 */
export async function fetchStudentDetailsAction(studentId: string) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const student = (await Student.findById(studentId).lean()) as any;
    if (!student) {
      return { success: false, error: "Student not found" };
    }

    // Get performance
    const performance = await calculateStudentPerformance(studentId);

    // Get CBC assessments for this student
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const assessments = (await CbcAssessment.find({
      studentId: studentId
    }).lean()) as any[];

    // Get class teacher for this grade/stream
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const schoolClass = (await import("@/models/class")).then((m) =>
      m.SchoolClass.findOne({
        grade: student.grade,
        stream: student.stream
      }).lean()
    ) as any;

    let classTeacher = null;
    if (schoolClass?.classTeacherId) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const teacher = (await Teacher.findById(schoolClass.classTeacherId).lean()) as any;
      if (teacher) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const user = (await User.findById(teacher.userId).lean()) as any;
        if (user) {
          classTeacher = {
            id: teacher._id.toString(),
            name: user.name,
            email: user.email
          };
        }
      }
    }

    return {
      success: true,
      data: {
        id: student._id.toString(),
        firstName: student.firstName,
        lastName: student.lastName,
        admissionNumber: student.admissionNumber,
        dateOfBirth: student.dateOfBirth,
        grade: student.grade,
        stream: student.stream,
        parentContact: student.parentContact,
        healthStatus: student.healthStatus,
        libraryStatus: student.libraryStatus,
        transportRoute: student.transportRoute,
        performance,
        classTeacher,
        assessments: assessments.map((a) => ({
          subject: a.subject,
          competencyScore: a.competencyScore,
          projectScore: a.projectScore || 0,
          practicalScore: a.practicalScore || 0,
          date: a.date
        }))
      } as StudentDetail
    };
  } catch (error) {
    console.error("Error fetching student details:", error);
    return { success: false, error: "Failed to fetch student details" };
  }
}

/**
 * Update student information
 */
export async function updateStudentAction(
  studentId: string,
  updates: {
    parentContact?: string;
    healthStatus?: string;
    transportRoute?: string;
  }
) {
  try {
    const student = await Student.findByIdAndUpdate(studentId, updates, { new: true });
    if (!student) {
      return { success: false, error: "Student not found" };
    }

    return { success: true, data: { id: student._id.toString() } };
  } catch (error) {
    console.error("Error updating student:", error);
    return { success: false, error: "Failed to update student" };
  }
}
