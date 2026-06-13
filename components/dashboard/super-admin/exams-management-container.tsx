"use client";

import React, { useCallback, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { StreamPerformanceGrade } from "./stream-performance-grade";
import { SubjectPerformance } from "./subject-performance";
import { StudentPerformanceGrade } from "./student-performance-grade";
import { StreamSubjectPerformance } from "./stream-subject-performance";
import { ExamDetailsModal } from "./exam-details-modal";
import {
  fetchStreamPerformanceByGradeAction,
  fetchSubjectPerformanceByGradeAction,
  fetchStudentPerformanceByGradeAction,
  fetchStreamSubjectPerformanceAction,
  fetchStudentExamsAction,
  fetchAvailableGradesAction
} from "@/actions/exams.actions";

type ViewMode = "overview" | "subjects" | "students" | "stream-details";

export function ExamsManagementContainer() {
  const [viewMode, setViewMode] = useState<ViewMode>("overview");
  const [selectedGrade, setSelectedGrade] = useState<string>("");
  const [selectedStream, setSelectedStream] = useState<string>("");
  const [selectedStudentId, setSelectedStudentId] = useState<string>("");

  const [grades, setGrades] = useState<string[]>([]);
  const [streamPerformance, setStreamPerformance] = useState<any[]>([]);
  const [subjectPerformance, setSubjectPerformance] = useState<any[]>([]);
  const [studentPerformance, setStudentPerformance] = useState<any[]>([]);
  const [streamSubjectPerformance, setStreamSubjectPerformance] = useState<any[]>([]);
  const [selectedStudentExams, setSelectedStudentExams] = useState<any | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load available grades on mount
  useEffect(() => {
    const loadGrades = async () => {
      try {
        const result = await fetchAvailableGradesAction();
        if (result.success) {
          setGrades(result.data || []);
          if (result.data && result.data.length > 0) {
            setSelectedGrade(result.data[0]);
          }
        }
      } catch (err) {
        console.error("Error loading grades:", err);
      }
    };
    loadGrades();
  }, []);

  // Load stream performance overview
  useEffect(() => {
    const loadStreamPerformance = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const result = await fetchStreamPerformanceByGradeAction();
        if (result.success) {
          setStreamPerformance(result.data || []);
        } else {
          setError(result.error || "Failed to load stream performance");
        }
      } catch (err) {
        setError("An error occurred while loading data");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    if (viewMode === "overview") {
      loadStreamPerformance();
    }
  }, [viewMode]);

  // Load subject performance for selected grade
  useEffect(() => {
    const loadSubjectPerformance = async () => {
      if (!selectedGrade) return;
      setIsLoading(true);
      setError(null);
      try {
        const result = await fetchSubjectPerformanceByGradeAction(selectedGrade);
        if (result.success) {
          setSubjectPerformance(result.data || []);
        } else {
          setError(result.error || "Failed to load subject performance");
        }
      } catch (err) {
        setError("An error occurred while loading data");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    if (viewMode === "subjects") {
      loadSubjectPerformance();
    }
  }, [viewMode, selectedGrade]);

  // Load student performance for selected grade
  useEffect(() => {
    const loadStudentPerformance = async () => {
      if (!selectedGrade) return;
      setIsLoading(true);
      setError(null);
      try {
        const result = await fetchStudentPerformanceByGradeAction(selectedGrade);
        if (result.success) {
          setStudentPerformance(result.data || []);
        } else {
          setError(result.error || "Failed to load student performance");
        }
      } catch (err) {
        setError("An error occurred while loading data");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    if (viewMode === "students") {
      loadStudentPerformance();
    }
  }, [viewMode, selectedGrade]);

  // Load stream subject performance
  useEffect(() => {
    const loadStreamSubjectPerformance = async () => {
      if (!selectedGrade || !selectedStream) return;
      setIsLoading(true);
      setError(null);
      try {
        const result = await fetchStreamSubjectPerformanceAction(selectedGrade, selectedStream);
        if (result.success) {
          setStreamSubjectPerformance(result.data || []);
        } else {
          setError(result.error || "Failed to load stream subject performance");
        }
      } catch (err) {
        setError("An error occurred while loading data");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    if (viewMode === "stream-details") {
      loadStreamSubjectPerformance();
    }
  }, [viewMode, selectedGrade, selectedStream]);

  // Load student exam details
  const handleStudentClick = useCallback(async (studentId: string) => {
    try {
      const result = await fetchStudentExamsAction(studentId);
      if (result.success && result.data) {
        setSelectedStudentExams({
          studentId: studentId,
          studentName: result.data[0]?.studentName || "Unknown",
          admissionNumber: result.data[0]?.admissionNumber || "",
          stream: result.data[0]?.stream || "",
          exams: result.data
        });
      } else {
        setError(result.error || "Failed to load student exams");
      }
    } catch (err) {
      setError("An error occurred while loading student exams");
      console.error(err);
    }
  }, []);

  const handleStreamClick = (grade: string, stream: string) => {
    setSelectedGrade(grade);
    setSelectedStream(stream);
    setViewMode("stream-details");
  };

  const handleSubjectClick = (subject: string, teacher: string) => {
    console.log(`Subject: ${subject}, Teacher: ${teacher}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Exams Management</h1>
        <p className="mt-1 text-gray-600">
          Comprehensive examination performance analysis across grades, streams, subjects, and students
        </p>
      </div>

      {/* View Mode Tabs */}
      <div className="flex flex-wrap gap-2 rounded-lg bg-white p-4 shadow-sm">
        <button
          onClick={() => setViewMode("overview")}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            viewMode === "overview"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          📊 Overview
        </button>
        <button
          onClick={() => setViewMode("subjects")}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            viewMode === "subjects"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          📚 Subjects
        </button>
        <button
          onClick={() => setViewMode("students")}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            viewMode === "students"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          👥 Students
        </button>
      </div>

      {/* Grade Filter */}
      {(viewMode === "subjects" || viewMode === "students") && (
        <div className="rounded-lg bg-white p-4 shadow-sm">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Grade
          </label>
          <select
            value={selectedGrade}
            onChange={(e) => setSelectedGrade(e.target.value)}
            className="w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none"
          >
            {grades.map((grade) => (
              <option key={grade} value={grade}>
                {grade}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="rounded-lg bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Content Views */}
      {viewMode === "overview" && (
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <StreamPerformanceGrade
            grades={streamPerformance}
            isLoading={isLoading}
            onStreamClick={handleStreamClick}
          />
        </div>
      )}

      {viewMode === "subjects" && (
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <SubjectPerformance
            subjects={subjectPerformance}
            grade={selectedGrade}
            isLoading={isLoading}
            onSubjectClick={handleSubjectClick}
          />
        </div>
      )}

      {viewMode === "students" && (
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <StudentPerformanceGrade
            students={studentPerformance}
            grade={selectedGrade}
            isLoading={isLoading}
            onStudentClick={handleStudentClick}
          />
        </div>
      )}

      {viewMode === "stream-details" && (
        <StreamSubjectPerformance
          stream={selectedStream}
          grade={selectedGrade}
          subjects={streamSubjectPerformance}
          isLoading={isLoading}
          onSubjectClick={handleSubjectClick}
        />
      )}

      {/* Student Exam Details Modal */}
      <ExamDetailsModal
        student={selectedStudentExams}
        isOpen={!!selectedStudentExams}
        onClose={() => setSelectedStudentExams(null)}
      />

      {/* Back Button for Stream Details */}
      {viewMode === "stream-details" && (
        <div className="flex justify-center">
          <button
            onClick={() => setViewMode("overview")}
            className="rounded bg-gray-600 px-6 py-2 font-medium text-white hover:bg-gray-700"
          >
            ← Back to Overview
          </button>
        </div>
      )}
    </div>
  );
}
