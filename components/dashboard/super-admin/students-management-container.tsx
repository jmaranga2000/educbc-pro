"use client";

import React, { useCallback, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { StudentsList } from "./students-list";
import { StudentDetailsModal } from "./student-details-modal";
import { fetchAllStudentsAction, fetchStudentDetailsAction, updateStudentAction } from "@/actions/students.actions";

export function StudentsManagementContainer() {
  const [grades, setGrades] = useState<any[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<any | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterGrade, setFilterGrade] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load students
  const loadStudents = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await fetchAllStudentsAction(searchQuery, filterGrade);
      if (result.success) {
        setGrades(result.data || []);
      } else {
        setError(result.error || "Failed to load students");
      }
    } catch (err) {
      setError("An error occurred while loading students");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [searchQuery, filterGrade]);

  // Load students on mount and when filters change
  useEffect(() => {
    loadStudents();
  }, [loadStudents]);

  // Handle viewing student details
  const handleViewStudent = useCallback(async (studentId: string) => {
    try {
      const result = await fetchStudentDetailsAction(studentId);
      if (result.success) {
        setSelectedStudent(result.data);
        setIsDetailsOpen(true);
      } else {
        setError(result.error || "Failed to load student details");
      }
    } catch (err) {
      setError("An error occurred while loading student details");
      console.error(err);
    }
  }, []);

  // Handle updating student
  const handleUpdateStudent = useCallback(async (studentId: string, updates: any) => {
    try {
      const result = await updateStudentAction(studentId, updates);
      if (result.success) {
        setError(null);
        // Reload students
        await loadStudents();
        setIsDetailsOpen(false);
      } else {
        setError(result.error || "Failed to update student");
      }
    } catch (err) {
      setError("An error occurred while updating student");
      console.error(err);
    }
  }, [loadStudents]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Students Management</h1>
        <p className="mt-1 text-gray-600">
          View and manage students across grades and streams
        </p>
      </div>

      {/* Search and Filter */}
      <div className="space-y-3 rounded-lg bg-white p-4 shadow-sm">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search Student
            </label>
            <Input
              placeholder="Search by name, admission number..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Filter by Grade
            </label>
            <select
              value={filterGrade || ""}
              onChange={(e) => setFilterGrade(e.target.value || undefined)}
              className="w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none"
            >
              <option value="">All Grades</option>
              <option value="Playgroup">Playgroup</option>
              <option value="PP1">PP1</option>
              <option value="PP2">PP2</option>
              {Array.from({ length: 9 }, (_, i) => (
                <option key={i + 1} value={`Grade ${i + 1}`}>
                  Grade {i + 1}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="rounded-lg bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Students List */}
      <div className="rounded-lg bg-white p-6 shadow-sm">
        <StudentsList
          grades={grades}
          onViewStudent={handleViewStudent}
          isLoading={isLoading}
        />
      </div>

      {/* Student Details Modal */}
      <StudentDetailsModal
        student={selectedStudent}
        isOpen={isDetailsOpen}
        onClose={() => {
          setIsDetailsOpen(false);
          setSelectedStudent(null);
        }}
        onUpdate={handleUpdateStudent}
      />
    </div>
  );
}
