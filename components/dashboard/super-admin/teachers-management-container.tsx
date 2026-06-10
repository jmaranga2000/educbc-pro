"use client";

import { useCallback, useEffect, useState } from "react";
import { TeachersList, type Teacher } from "@/components/dashboard/super-admin/teachers-list";
import { ElevateUserModal, type EligibleUser } from "@/components/dashboard/super-admin/elevate-user-modal";
import { TeacherDetailsModal, type TeacherDetail } from "@/components/dashboard/super-admin/teacher-details-modal";
import {
  fetchAllTeachersAction,
  fetchEligibleUsersAction,
  elevateToTeacherAction,
  fetchTeacherDetailsAction,
  assignTeacherRoleAction,
  type ElevateToTeacherInput,
  type AssignTeacherRoleInput
} from "@/actions/teacher.actions";

export function TeachersManagementContainer() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [eligibleUsers, setEligibleUsers] = useState<EligibleUser[]>([]);
  const [selectedTeacher, setSelectedTeacher] = useState<TeacherDetail | null>(null);

  const [isLoadingTeachers, setIsLoadingTeachers] = useState(true);
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  const [isLoadingTeacherDetails, setIsLoadingTeacherDetails] = useState(false);
  const [isElevating, setIsElevating] = useState(false);
  const [isAssigningRole, setIsAssigningRole] = useState(false);

  const [showElevateModal, setShowElevateModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  // Load teachers on mount
  useEffect(() => {
    loadTeachers();
  }, []);

  const loadTeachers = useCallback(async () => {
    try {
      setIsLoadingTeachers(true);
      const result = await fetchAllTeachersAction();
      if (result.success) {
        setTeachers(result.data as Teacher[]);
      } else {
        console.error("Error fetching teachers:", result.error);
      }
    } catch (error) {
      console.error("Error loading teachers:", error);
    } finally {
      setIsLoadingTeachers(false);
    }
  }, []);

  const handleElevateUserClick = useCallback(async () => {
    try {
      setIsLoadingUsers(true);
      setShowElevateModal(true);
      const result = await fetchEligibleUsersAction();
      if (result.success) {
        setEligibleUsers(result.data as EligibleUser[]);
      } else {
        console.error("Error fetching eligible users:", result.error);
      }
    } catch (error) {
      console.error("Error loading eligible users:", error);
    } finally {
      setIsLoadingUsers(false);
    }
  }, []);

  const handleElevateUser = useCallback(
    async (userId: string, formData: any) => {
      try {
        setIsElevating(true);
        const input: ElevateToTeacherInput = {
          userId,
          employeeNumber: formData.employeeNumber,
          subjects: formData.subjects,
          qualification: formData.qualification,
          tscNumber: formData.tscNumber,
          level: formData.level
        };

        const result = await elevateToTeacherAction(input);
        if (result.success) {
          alert("User elevated to teacher successfully!");
          setShowElevateModal(false);
          await loadTeachers();
        } else {
          alert(`Error: ${result.error}`);
        }
      } catch (error) {
        console.error("Error elevating user:", error);
        alert("Failed to elevate user");
      } finally {
        setIsElevating(false);
      }
    },
    [loadTeachers]
  );

  const handleViewTeacher = useCallback(async (teacherId: string) => {
    try {
      setIsLoadingTeacherDetails(true);
      setShowDetailsModal(true);
      const result = await fetchTeacherDetailsAction(teacherId);
      if (result.success) {
        setSelectedTeacher(result.data as TeacherDetail);
      } else {
        console.error("Error fetching teacher details:", result.error);
        alert("Failed to load teacher details");
      }
    } catch (error) {
      console.error("Error loading teacher details:", error);
      alert("Failed to load teacher details");
    } finally {
      setIsLoadingTeacherDetails(false);
    }
  }, []);

  const handleAssignRole = useCallback(
    async (teacherId: string, role: string) => {
      try {
        setIsAssigningRole(true);
        const input: AssignTeacherRoleInput = {
          teacherId,
          role: role as "TEACHER" | "CLASS_TEACHER" | "EXAMS_OFFICER" | "SPORTS_OFFICER"
        };

        const result = await assignTeacherRoleAction(input);
        if (result.success) {
          alert("Role assigned successfully!");
          await handleViewTeacher(teacherId);
          await loadTeachers();
        } else {
          alert(`Error: ${result.error}`);
        }
      } catch (error) {
        console.error("Error assigning role:", error);
        alert("Failed to assign role");
      } finally {
        setIsAssigningRole(false);
      }
    },
    [handleViewTeacher, loadTeachers]
  );

  return (
    <>
      <TeachersList
        teachers={teachers}
        isLoading={isLoadingTeachers}
        onRefresh={loadTeachers}
        onElevateUser={handleElevateUserClick}
        onViewTeacher={handleViewTeacher}
      />

      <ElevateUserModal
        isOpen={showElevateModal}
        onClose={() => setShowElevateModal(false)}
        eligibleUsers={eligibleUsers}
        isLoadingUsers={isLoadingUsers}
        onElevateUser={handleElevateUser}
        isElevating={isElevating}
      />

      <TeacherDetailsModal
        isOpen={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
        teacher={selectedTeacher}
        isLoading={isLoadingTeacherDetails}
        onAssignRole={handleAssignRole}
        isAssigningRole={isAssigningRole}
      />
    </>
  );
}
