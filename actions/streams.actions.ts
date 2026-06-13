"use server";

import type { TeacherLevel } from "@/types";
import { Stream } from "@/models/stream";
import { Student } from "@/models/student";
import { SchoolClass } from "@/models/class";
import { Teacher } from "@/models/teacher";
import { CbcAssessment } from "@/models/cbc-assessment";
import { User } from "@/models/user";

export type StreamPerformance = {
  meanScore: number;
  cbcBand: "EE" | "ME" | "AE" | "BE";
  studentsAssessed: number;
};

export type StreamDetail = {
  id: string;
  name: string;
  grade: string;
  capacity?: number;
  studentCount: number;
  classTeacher?: {
    id: string;
    name: string;
    email: string;
  };
  classPrefect?: {
    id: string;
    name: string;
    admissionNumber: string;
  };
  assignedTeachers: Array<{
    id: string;
    name: string;
    email: string;
    subjects: string[];
  }>;
  performance: StreamPerformance;
  createdAt?: Date;
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
 * Fetch all streams with student counts and performance
 */
export async function fetchAllStreamsAction(searchQuery: string = "", filterGrade?: string) {
  try {
    const query: any = {};

    if (filterGrade) {
      query.grade = filterGrade;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const streams = (await Stream.find(query).lean()) as any[];

    const results = await Promise.all(
      streams.map(async (stream) => {
        // Count students in this stream
        const studentCount = await Student.countDocuments({
          grade: stream.grade,
          stream: stream.name
        });

        // Get CBC assessments for this stream to calculate performance
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const assessments = (await CbcAssessment.find({
          grade: stream.grade
        }).lean()) as any[];

        // Get all students in this stream
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const streamStudents = (await Student.find({
          grade: stream.grade,
          stream: stream.name
        })
          .select("_id")
          .lean()) as any[];

        const streamStudentIds = new Set(streamStudents.map((s) => s._id.toString()));

        // Filter assessments for this stream
        const streamAssessments = assessments.filter((a) => streamStudentIds.has(a.studentId));

        // Calculate mean score
        let meanScore = 0;
        if (streamAssessments.length > 0) {
          const totalScore = streamAssessments.reduce((sum, a) => {
            const score = Math.max(a.competencyScore, a.projectScore || 0, a.practicalScore || 0);
            return sum + score;
          }, 0);
          meanScore = Math.round(totalScore / streamAssessments.length);
        }

        return {
          id: stream._id.toString(),
          name: stream.name,
          grade: stream.grade,
          capacity: stream.capacity,
          studentCount,
          performance: {
            meanScore,
            cbcBand: gradeFromScore(meanScore),
            studentsAssessed: streamAssessments.length
          }
        };
      })
    );

    // Apply search filter
    let filtered = results;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.grade.toLowerCase().includes(q)
      );
    }

    return { success: true, data: filtered };
  } catch (error) {
    console.error("Error fetching streams:", error);
    return { success: false, error: "Failed to fetch streams" };
  }
}

/**
 * Fetch detailed information about a specific stream
 */
export async function fetchStreamDetailsAction(streamId: string) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const stream = (await Stream.findById(streamId).lean()) as any;
    if (!stream) {
      return { success: false, error: "Stream not found" };
    }

    // Get students in this stream
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const students = (await Student.find({
      grade: stream.grade,
      stream: stream.name
    }).lean()) as any[];

    const studentCount = students.length;

    // Get class for this stream
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const schoolClass = (await SchoolClass.findOne({
      grade: stream.grade,
      streamId: streamId
    }).lean()) as any;

    // Get class teacher
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

    // Get class prefect (first student as example, you may want to add a prefectId field to Student model)
    let classPrefect = null;
    if (students.length > 0) {
      const prefectStudent = students[0];
      classPrefect = {
        id: prefectStudent._id.toString(),
        name: `${prefectStudent.firstName} ${prefectStudent.lastName}`,
        admissionNumber: prefectStudent.admissionNumber
      };
    }

    // Get all teachers assigned to this grade/stream
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const allTeachers = (await Teacher.find({
      level: stream.grade.startsWith("Grade 7") || stream.grade.startsWith("Grade 8") || stream.grade.startsWith("Grade 9") ? "JSS" : "PRIMARY"
    }).lean()) as any[];

    const assignedTeachers = await Promise.all(
      allTeachers.map(async (teacher) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const user = (await User.findById(teacher.userId).lean()) as any;
        return {
          id: teacher._id.toString(),
          name: user?.name || "Unknown",
          email: user?.email || "",
          subjects: teacher.subjects
        };
      })
    );

    // Calculate performance
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const assessments = (await CbcAssessment.find({
      grade: stream.grade
    }).lean()) as any[];

    const studentIds = new Set(students.map((s) => s._id.toString()));
    const streamAssessments = assessments.filter((a) => studentIds.has(a.studentId));

    let meanScore = 0;
    if (streamAssessments.length > 0) {
      const totalScore = streamAssessments.reduce((sum, a) => {
        const score = Math.max(a.competencyScore, a.projectScore || 0, a.practicalScore || 0);
        return sum + score;
      }, 0);
      meanScore = Math.round(totalScore / streamAssessments.length);
    }

    return {
      success: true,
      data: {
        id: stream._id.toString(),
        name: stream.name,
        grade: stream.grade,
        capacity: stream.capacity,
        studentCount,
        classTeacher,
        classPrefect,
        assignedTeachers,
        performance: {
          meanScore,
          cbcBand: gradeFromScore(meanScore),
          studentsAssessed: streamAssessments.length
        },
        createdAt: stream.createdAt
      } as StreamDetail
    };
  } catch (error) {
    console.error("Error fetching stream details:", error);
    return { success: false, error: "Failed to fetch stream details" };
  }
}

/**
 * Create a new stream
 */
export async function createStreamAction(name: string, grade: string, capacity?: number) {
  try {
    // Check if stream already exists
    const existing = await Stream.findOne({ name, grade });
    if (existing) {
      return { success: false, error: "Stream already exists for this grade" };
    }

    const stream = new Stream({
      name,
      grade,
      capacity
    });

    await stream.save();

    return {
      success: true,
      data: {
        id: stream._id.toString(),
        name: stream.name,
        grade: stream.grade,
        capacity: stream.capacity
      }
    };
  } catch (error) {
    console.error("Error creating stream:", error);
    return { success: false, error: "Failed to create stream" };
  }
}

/**
 * Update stream capacity
 */
export async function updateStreamCapacityAction(streamId: string, capacity: number) {
  try {
    const stream = await Stream.findByIdAndUpdate(streamId, { capacity }, { new: true });
    if (!stream) {
      return { success: false, error: "Stream not found" };
    }

    return { success: true, data: { capacity: stream.capacity } };
  } catch (error) {
    console.error("Error updating stream:", error);
    return { success: false, error: "Failed to update stream" };
  }
}

/**
 * Get grade distribution
 */
export async function getGradesWithStreamsAction() {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const streams = (await Stream.find().lean()) as any[];

    // Group by grade
    const gradeMap = new Map<string, any[]>();
    streams.forEach((stream) => {
      if (!gradeMap.has(stream.grade)) {
        gradeMap.set(stream.grade, []);
      }
      gradeMap.get(stream.grade)!.push({
        id: stream._id.toString(),
        name: stream.name
      });
    });

    // Convert to sorted array
    const grades = Array.from(gradeMap.entries())
      .map(([grade, streamsInGrade]) => ({
        grade,
        streams: streamsInGrade,
        count: streamsInGrade.length
      }))
      .sort((a, b) => {
        // Sort by grade level
        const gradeOrder = ["Playgroup", "PP1", "PP2", "Grade 1", "Grade 2", "Grade 3", "Grade 4", "Grade 5", "Grade 6", "Grade 7", "Grade 8", "Grade 9"];
        return gradeOrder.indexOf(a.grade) - gradeOrder.indexOf(b.grade);
      });

    return { success: true, data: grades };
  } catch (error) {
    console.error("Error getting grades:", error);
    return { success: false, error: "Failed to fetch grades" };
  }
}
