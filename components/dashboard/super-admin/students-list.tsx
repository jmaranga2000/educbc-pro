"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { getStudentPerformanceColor } from "@/lib/student-performance";

interface StudentItem {
  id: string;
  firstName: string;
  lastName: string;
  admissionNumber: string;
  stream: string;
  performance: {
    meanScore: number;
    cbcBand: "EE" | "ME" | "AE" | "BE";
    assessmentsCount: number;
  };
}

interface StreamGroup {
  stream: string;
  students: StudentItem[];
}

interface GradeGroup {
  grade: string;
  streams: StreamGroup[];
  totalStudents: number;
}

interface StudentListProps {
  grades: GradeGroup[];
  onViewStudent: (studentId: string) => void;
  isLoading?: boolean;
}

const performanceColorMap = {
  green: "bg-green-50 border-green-200",
  yellow: "bg-yellow-50 border-yellow-200",
  orange: "bg-orange-50 border-orange-200",
  red: "bg-red-50 border-red-200"
};

const performanceBadgeMap = {
  green: "bg-green-100 text-green-800",
  yellow: "bg-yellow-100 text-yellow-800",
  orange: "bg-orange-100 text-orange-800",
  red: "bg-red-100 text-red-800"
};

export function StudentsList({ grades, onViewStudent, isLoading }: StudentListProps) {
  if (isLoading) {
    return <div className="p-8 text-center text-gray-500">Loading students...</div>;
  }

  if (!grades || grades.length === 0) {
    return <div className="p-8 text-center text-gray-500">No students found</div>;
  }

  return (
    <div className="space-y-8">
      {grades.map((gradeGroup) => (
        <div key={gradeGroup.grade}>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">{gradeGroup.grade}</h2>
            <span className="text-sm text-gray-600">
              {gradeGroup.totalStudents} student{gradeGroup.totalStudents !== 1 ? "s" : ""}
            </span>
          </div>

          <div className="space-y-6">
            {gradeGroup.streams.map((streamGroup) => (
              <div key={streamGroup.stream}>
                <h3 className="mb-3 text-sm font-semibold text-gray-700 uppercase tracking-wide">
                  Stream: {streamGroup.stream}
                </h3>

                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {streamGroup.students.map((student) => {
                    const color = getStudentPerformanceColor(student.performance.meanScore);
                    const borderColorClass = performanceColorMap[color];
                    const badgeClass = performanceBadgeMap[color];

                    return (
                      <button
                        key={student.id}
                        onClick={() => onViewStudent(student.id)}
                        className={`rounded-lg border-2 p-4 text-left transition-all hover:shadow-md ${borderColorClass}`}
                      >
                        <div className="mb-3 flex items-start justify-between">
                          <div>
                            <p className="font-semibold text-gray-900">
                              {student.firstName} {student.lastName}
                            </p>
                            <p className="text-xs text-gray-600">{student.admissionNumber}</p>
                          </div>
                          <Badge className={badgeClass}>{student.performance.cbcBand}</Badge>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Mean Score</span>
                            <span className="font-semibold text-gray-900">
                              {student.performance.meanScore}%
                            </span>
                          </div>

                          {student.performance.assessmentsCount > 0 && (
                            <div className="flex justify-between text-xs">
                              <span className="text-gray-600">Assessments</span>
                              <span className="text-gray-700">
                                {student.performance.assessmentsCount}
                              </span>
                            </div>
                          )}

                          {student.performance.assessmentsCount === 0 && (
                            <p className="text-xs text-gray-500">No assessments yet</p>
                          )}
                        </div>

                        <button className="mt-4 w-full rounded bg-blue-600 py-2 text-sm font-medium text-white hover:bg-blue-700">
                          View Details
                        </button>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
