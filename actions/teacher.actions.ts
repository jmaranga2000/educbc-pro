"use server";

import type { TeacherLevel } from "@/types";
import { User } from "@/models/user";
import { Teacher } from "@/models/teacher";

export type ElevateToTeacherInput = {
  userId: string;
  employeeNumber: string;
  subjects: string[];
  qualification?: string;
  tscNumber?: string;
  level: TeacherLevel;
};

export type AssignTeacherRoleInput = {
  teacherId: string;
  role: "TEACHER" | "CLASS_TEACHER" | "EXAMS_OFFICER" | "SPORTS_OFFICER";
};

/**
 * Fetch all users that don't have a teacher record
 * (users who can be elevated to teachers)
 */
export async function fetchEligibleUsersAction(searchQuery: string = "") {
  try {
    // Get all users with TEACHER or related roles
    const userQuery: any = {
      $or: [
        { role: "TEACHER" },
        { role: "CLASS_TEACHER" },
        { role: "EXAMS_OFFICER" },
        { role: "SPORTS_OFFICER" }
      ]
    };

    // Apply search filter
    if (searchQuery.trim()) {
      userQuery.$and = [
        {
          $or: [
            { name: { $regex: searchQuery, $options: "i" } },
            { email: { $regex: searchQuery, $options: "i" } },
            { phone: { $regex: searchQuery, $options: "i" } }
          ]
        }
      ];
    }

    const users = (await User.find(userQuery).select("_id name email phone role").lean()) as any[];

    // Filter out users who already have a teacher record
    const teacherUserIds = (await Teacher.find({}).select("userId").lean()) as any[];
    const existingTeacherIds = new Set(teacherUserIds.map((t) => t.userId));

    const eligibleUsers = users.filter((user) => !existingTeacherIds.has(user._id.toString()));

    return {
      success: true,
      data: eligibleUsers.map((user) => ({
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        phone: user.phone || "",
        currentRole: user.role
      }))
    };
  } catch (error) {
    console.error("Error fetching eligible users:", error);
    return { success: false, error: "Failed to fetch eligible users" };
  }
}

/**
 * Elevate a user to teacher by creating a teacher record
 */
export async function elevateToTeacherAction(input: ElevateToTeacherInput) {
  try {
    // Check if user exists
    const user = await User.findById(input.userId);
    if (!user) {
      return { success: false, error: "User not found" };
    }

    // Check if teacher already exists
    const existingTeacher = await Teacher.findOne({ userId: input.userId });
    if (existingTeacher) {
      return { success: false, error: "User is already a teacher" };
    }

    // Check if employee number is unique
    const existingEmployee = await Teacher.findOne({ employeeNumber: input.employeeNumber });
    if (existingEmployee) {
      return { success: false, error: "Employee number already in use" };
    }

    // Create teacher record
    const teacher = new Teacher({
      userId: input.userId,
      employeeNumber: input.employeeNumber,
      subjects: input.subjects,
      qualification: input.qualification,
      tscNumber: input.tscNumber,
      level: input.level,
      assignedClassIds: [],
      availableDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      maxLessonsPerDay: 4
    });

    await teacher.save();

    return {
      success: true,
      data: {
        id: teacher._id.toString(),
        userId: teacher.userId,
        employeeNumber: teacher.employeeNumber,
        subjects: teacher.subjects,
        level: teacher.level
      }
    };
  } catch (error) {
    console.error("Error elevating user to teacher:", error);
    return { success: false, error: "Failed to elevate user to teacher" };
  }
}

/**
 * Fetch all teachers with optional search
 */
export async function fetchAllTeachersAction(searchQuery: string = "", filterLevel?: TeacherLevel) {
  try {
    const query: any = {};

    // Apply level filter
    if (filterLevel) {
      query.level = filterLevel;
    }

    const teachers = (await Teacher.find(query).lean()) as any[];

    // Fetch user details for each teacher
    const teacherIds = teachers.map((t) => t.userId);
    const users = (await User.find({ _id: { $in: teacherIds } }).lean()) as any[];
    const userMap = Object.fromEntries(users.map((u) => [u._id.toString(), u]));

    // Apply search filter
    let results = teachers.map((teacher) => {
      const user = userMap[teacher.userId];
      return {
        id: teacher._id.toString(),
        userId: teacher.userId,
        name: user?.name || "Unknown",
        email: user?.email || "",
        employeeNumber: teacher.employeeNumber,
        subjects: teacher.subjects,
        qualification: teacher.qualification,
        tscNumber: teacher.tscNumber,
        level: teacher.level,
        assignedClassIds: teacher.assignedClassIds,
        createdAt: teacher.createdAt
      };
    });

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      results = results.filter(
        (t) =>
          t.name.toLowerCase().includes(query) ||
          t.email.toLowerCase().includes(query) ||
          t.employeeNumber.toLowerCase().includes(query) ||
          t.subjects.some((s: any) => s.toLowerCase().includes(query))
      );
    }

    return { success: true, data: results };
  } catch (error) {
    console.error("Error fetching teachers:", error);
    return { success: false, error: "Failed to fetch teachers" };
  }
}

/**
 * Fetch a single teacher with details
 */
export async function fetchTeacherDetailsAction(teacherId: string) {
  try {
    const teacher = (await Teacher.findById(teacherId).lean()) as any;
    if (!teacher) {
      return { success: false, error: "Teacher not found" };
    }

    const user = (await User.findById(teacher.userId).lean()) as any;
    if (!user) {
      return { success: false, error: "User not found" };
    }

    return {
      success: true,
      data: {
        id: teacher._id.toString(),
        userId: teacher.userId,
        name: user.name,
        email: user.email,
        phone: user.phone,
        employeeNumber: teacher.employeeNumber,
        subjects: teacher.subjects,
        qualification: teacher.qualification,
        tscNumber: teacher.tscNumber,
        level: teacher.level,
        assignedClassIds: teacher.assignedClassIds,
        availableDays: teacher.availableDays,
        maxLessonsPerDay: teacher.maxLessonsPerDay,
        currentRole: user.role,
        twoFactorEnabled: user.twoFactorEnabled,
        createdAt: teacher.createdAt,
        updatedAt: teacher.updatedAt
      }
    };
  } catch (error) {
    console.error("Error fetching teacher details:", error);
    return { success: false, error: "Failed to fetch teacher details" };
  }
}

/**
 * Update teacher's teaching role
 */
export async function assignTeacherRoleAction(input: AssignTeacherRoleInput) {
  try {
    const teacher = await Teacher.findById(input.teacherId);
    if (!teacher) {
      return { success: false, error: "Teacher not found" };
    }

    const user = await User.findById(teacher.userId);
    if (!user) {
      return { success: false, error: "User not found" };
    }

    // Update user role
    user.role = input.role;
    await user.save();

    return {
      success: true,
      data: { userId: user._id.toString(), role: user.role }
    };
  } catch (error) {
    console.error("Error assigning teacher role:", error);
    return { success: false, error: "Failed to assign teacher role" };
  }
}

/**
 * Update teacher subjects
 */
export async function updateTeacherSubjectsAction(teacherId: string, subjects: string[]) {
  try {
    const teacher = await Teacher.findByIdAndUpdate(teacherId, { subjects }, { new: true });
    if (!teacher) {
      return { success: false, error: "Teacher not found" };
    }

    return { success: true, data: { subjects: teacher.subjects } };
  } catch (error) {
    console.error("Error updating teacher subjects:", error);
    return { success: false, error: "Failed to update teacher subjects" };
  }
}
