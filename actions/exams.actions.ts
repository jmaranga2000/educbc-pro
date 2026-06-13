"use server";

import { Exam } from "@/models/exam";
import { Student } from "@/models/student";
import { Teacher } from "@/models/teacher";
import { Subject } from "@/models/subject";
import { User } from "@/models/user";
import { Stream } from "@/models/stream";
import { getExamPerformanceColor } from "@/lib/cbc";

export type ExamPerformance = {
  meanScore: number;
  grade: "A" | "B" | "C" | "D" | "F";
  percentage: number;
};

export type StreamPerformanceData = {
  streamName: string;
  grade: string;
  studentCount: number;
  meanScore: number;
  performance: ExamPerformance;
  color: "green" | "yellow" | "orange" | "red" | "purple";
};

export type SubjectPerformanceData = {
  subject: string;
  teacherId: string;
  teacherName: string;
  meanScore: number;
  performance: ExamPerformance;
  color: "green" | "yellow" | "orange" | "red" | "purple";
  studentCount: number;
};

export type StudentPerformanceData = {
  studentId: string;
  firstName: string;
  lastName: string;
  admissionNumber: string;
  stream: string;
  meanScore: number;
  performance: ExamPerformance;
  color: "green" | "yellow" | "orange" | "red" | "purple";
};

export type ExamDetailData = {
  examId: string;
  studentId: string;
  studentName: string;
  admissionNumber: string;
  stream: string;
  subject: string;
  teacherName: string;
  score: number;
  totalMarks: number;
  percentage: number;
  grade: "A" | "B" | "C" | "D" | "F";
  date: Date;
};

/**
 * Convert score percentage to grade
 */
function getGradeFromScore(percentage: number): "A" | "B" | "C" | "D" | "F" {
  if (percentage >= 80) return "A";
  if (percentage >= 70) return "B";
  if (percentage >= 60) return "C";
  if (percentage >= 50) return "D";
  return "F";
}

/**
 * Get stream performance per grade
 */
export async function fetchStreamPerformanceByGradeAction(grade?: string) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const query: any = grade ? { grade } : {};
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const streams = (await Stream.find(query).lean()) as any[];

    const streamPerformance = await Promise.all(
      streams.map(async (stream) => {
        // Get students in this stream
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const students = (await Student.find({
          grade: stream.grade,
          stream: stream.name
        }).lean()) as any[];

        // Get exams for this stream
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const exams = (await Exam.find({
          grade: stream.grade
        }).lean()) as any[];

        // Filter exams for students in this stream
        const studentIds = new Set(students.map(s => s._id.toString()));
        const streamExams = exams.filter((e) => studentIds.has(e.studentId));

        // Calculate mean score
        let meanScore = 0;
        if (streamExams.length > 0) {
          const totalScore = streamExams.reduce((sum, e) => {
            const percentage = (e.score / e.totalMarks) * 100;
            return sum + percentage;
          }, 0);
          meanScore = Math.round(totalScore / streamExams.length);
        }

        return {
          streamName: stream.name,
          grade: stream.grade,
          studentCount: students.length,
          meanScore,
          performance: {
            meanScore,
            grade: getGradeFromScore(meanScore),
            percentage: meanScore
          },
          color: getExamPerformanceColor(meanScore)
        };
      })
    );

    // Group by grade
    const gradeGroups = new Map<string, StreamPerformanceData[]>();
    streamPerformance.forEach((perf) => {
      if (!gradeGroups.has(perf.grade)) {
        gradeGroups.set(perf.grade, []);
      }
      gradeGroups.get(perf.grade)!.push(perf);
    });

    // Sort and return
    const sortedGrades = Array.from(gradeGroups.entries())
      .map(([gradeLevel, streamsData]) => ({
        grade: gradeLevel,
        streams: streamsData.sort((a, b) => b.meanScore - a.meanScore)
      }))
      .sort((a, b) => {
        const gradeOrder = ["Playgroup", "PP1", "PP2", "Grade 1", "Grade 2", "Grade 3", "Grade 4", "Grade 5", "Grade 6", "Grade 7", "Grade 8", "Grade 9"];
        return gradeOrder.indexOf(a.grade) - gradeOrder.indexOf(b.grade);
      });

    return { success: true, data: sortedGrades };
  } catch (error) {
    console.error("Error fetching stream performance:", error);
    return { success: false, error: "Failed to fetch stream performance" };
  }
}

/**
 * Get subject performance with teachers for a specific grade
 */
export async function fetchSubjectPerformanceByGradeAction(grade: string) {
  try {
    // Get all exams for this grade
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const exams = (await Exam.find({ grade }).lean()) as any[];

    if (exams.length === 0) {
      return { success: true, data: [] };
    }

    // Group exams by subject
    const subjectMap = new Map<string, any[]>();
    exams.forEach((exam) => {
      if (!subjectMap.has(exam.subject)) {
        subjectMap.set(exam.subject, []);
      }
      subjectMap.get(exam.subject)!.push(exam);
    });

    // Calculate performance per subject
    const subjectPerformance = await Promise.all(
      Array.from(subjectMap.entries()).map(async ([subject, subjectExams]) => {
        // Get the teacher for this subject
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const teachers = (await Teacher.find({
          subjects: subject
        }).lean()) as any[];

        let teacherName = "Unknown";
        let teacherId = "";
        if (teachers.length > 0) {
          teacherId = teachers[0]._id.toString();
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const user = (await User.findById(teachers[0].userId).lean()) as any;
          if (user) {
            teacherName = user.name;
          }
        }

        // Calculate mean score
        const totalScore = subjectExams.reduce((sum, e) => {
          const percentage = (e.score / e.totalMarks) * 100;
          return sum + percentage;
        }, 0);
        const meanScore = Math.round(totalScore / subjectExams.length);

        return {
          subject,
          teacherId,
          teacherName,
          meanScore,
          performance: {
            meanScore,
            grade: getGradeFromScore(meanScore),
            percentage: meanScore
          },
          color: getExamPerformanceColor(meanScore),
          studentCount: subjectExams.length
        };
      })
    );

    // Sort by performance
    return {
      success: true,
      data: subjectPerformance.sort((a, b) => b.meanScore - a.meanScore)
    };
  } catch (error) {
    console.error("Error fetching subject performance:", error);
    return { success: false, error: "Failed to fetch subject performance" };
  }
}

/**
 * Get student performance for a specific grade
 */
export async function fetchStudentPerformanceByGradeAction(grade: string) {
  try {
    // Get all students in this grade
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const students = (await Student.find({ grade }).lean()) as any[];

    if (students.length === 0) {
      return { success: true, data: [] };
    }

    // Get exams for all students in this grade
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const exams = (await Exam.find({ grade }).lean()) as any[];

    // Calculate performance per student
    const studentPerformances = students.map((student) => {
      const studentExams = exams.filter((e) => e.studentId === student._id.toString());

      let meanScore = 0;
      if (studentExams.length > 0) {
        const totalScore = studentExams.reduce((sum, e) => {
          const percentage = (e.score / e.totalMarks) * 100;
          return sum + percentage;
        }, 0);
        meanScore = Math.round(totalScore / studentExams.length);
      }

      return {
        studentId: student._id.toString(),
        firstName: student.firstName,
        lastName: student.lastName,
        admissionNumber: student.admissionNumber,
        stream: student.stream,
        meanScore,
        performance: {
          meanScore,
          grade: getGradeFromScore(meanScore),
          percentage: meanScore
        },
        color: getExamPerformanceColor(meanScore)
      };
    });

    // Sort by performance (best first)
    return {
      success: true,
      data: studentPerformances.sort((a, b) => b.meanScore - a.meanScore)
    };
  } catch (error) {
    console.error("Error fetching student performance:", error);
    return { success: false, error: "Failed to fetch student performance" };
  }
}

/**
 * Get subject performance for a specific stream
 */
export async function fetchStreamSubjectPerformanceAction(grade: string, streamName: string) {
  try {
    // Get students in this stream
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const students = (await Student.find({
      grade,
      stream: streamName
    }).lean()) as any[];

    if (students.length === 0) {
      return { success: true, data: [] };
    }

    // Get exams for students in this stream
    const studentIds = new Set(students.map(s => s._id.toString()));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const exams = (await Exam.find({ grade }).lean()) as any[];
    const streamExams = exams.filter((e) => studentIds.has(e.studentId));

    if (streamExams.length === 0) {
      return { success: true, data: [] };
    }

    // Group by subject
    const subjectMap = new Map<string, any[]>();
    streamExams.forEach((exam) => {
      if (!subjectMap.has(exam.subject)) {
        subjectMap.set(exam.subject, []);
      }
      subjectMap.get(exam.subject)!.push(exam);
    });

    // Calculate performance per subject
    const subjectPerformance = await Promise.all(
      Array.from(subjectMap.entries()).map(async ([subject, subjectExams]) => {
        // Get the teacher for this subject
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const teachers = (await Teacher.find({
          subjects: subject
        }).lean()) as any[];

        let teacherName = "Unknown";
        let teacherId = "";
        if (teachers.length > 0) {
          teacherId = teachers[0]._id.toString();
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const user = (await User.findById(teachers[0].userId).lean()) as any;
          if (user) {
            teacherName = user.name;
          }
        }

        // Calculate mean score
        const totalScore = subjectExams.reduce((sum, e) => {
          const percentage = (e.score / e.totalMarks) * 100;
          return sum + percentage;
        }, 0);
        const meanScore = Math.round(totalScore / subjectExams.length);

        return {
          subject,
          teacherId,
          teacherName,
          meanScore,
          performance: {
            meanScore,
            grade: getGradeFromScore(meanScore),
            percentage: meanScore
          },
          color: getExamPerformanceColor(meanScore),
          studentCount: subjectExams.length
        };
      })
    );

    return {
      success: true,
      data: subjectPerformance.sort((a, b) => b.meanScore - a.meanScore)
    };
  } catch (error) {
    console.error("Error fetching stream subject performance:", error);
    return { success: false, error: "Failed to fetch stream subject performance" };
  }
}

/**
 * Get exam details for a specific student
 */
export async function fetchStudentExamsAction(studentId: string) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const student = (await Student.findById(studentId).lean()) as any;
    if (!student) {
      return { success: false, error: "Student not found" };
    }

    // Get all exams for this student
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const exams = (await Exam.find({
      studentId: studentId
    }).lean()) as any[];

    // Enrich with teacher information
    const examDetails = await Promise.all(
      exams.map(async (exam) => {
        // Get teacher for this subject
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const teachers = (await Teacher.find({
          subjects: exam.subject
        }).lean()) as any[];

        let teacherName = "Unknown";
        if (teachers.length > 0) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const user = (await User.findById(teachers[0].userId).lean()) as any;
          if (user) {
            teacherName = user.name;
          }
        }

        const percentage = (exam.score / exam.totalMarks) * 100;

        return {
          examId: exam._id.toString(),
          studentId: student._id.toString(),
          studentName: `${student.firstName} ${student.lastName}`,
          admissionNumber: student.admissionNumber,
          stream: student.stream,
          subject: exam.subject,
          teacherName,
          score: exam.score,
          totalMarks: exam.totalMarks,
          percentage: Math.round(percentage),
          grade: getGradeFromScore(percentage),
          date: exam.date
        };
      })
    );

    return {
      success: true,
      data: examDetails.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      )
    };
  } catch (error) {
    console.error("Error fetching student exams:", error);
    return { success: false, error: "Failed to fetch student exams" };
  }
}

/**
 * Get all grades with exam data available
 */
export async function fetchAvailableGradesAction() {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const exams = (await Exam.find().lean()) as any[];

    const gradeSet = new Set(exams.map((e) => e.grade));
    const grades = Array.from(gradeSet);

    // Sort by grade order
    const gradeOrder = [
      "Playgroup",
      "PP1",
      "PP2",
      "Grade 1",
      "Grade 2",
      "Grade 3",
      "Grade 4",
      "Grade 5",
      "Grade 6",
      "Grade 7",
      "Grade 8",
      "Grade 9"
    ];

    return {
      success: true,
      data: grades.sort(
        (a, b) => gradeOrder.indexOf(a) - gradeOrder.indexOf(b)
      )
    };
  } catch (error) {
    console.error("Error fetching available grades:", error);
    return { success: false, error: "Failed to fetch grades" };
  }
}
