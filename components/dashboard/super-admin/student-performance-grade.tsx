"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";

interface StudentPerfData {
  studentId: string;
  firstName: string;
  lastName: string;
  admissionNumber: string;
  stream: string;
  meanScore: number;
  performance: {
    meanScore: number;
    grade: "A" | "B" | "C" | "D" | "F";
    percentage: number;
  };
  color: "green" | "yellow" | "orange" | "red" | "purple";
}

interface StudentPerformanceGradeProps {
  students: StudentPerfData[];
  grade: string;
  isLoading?: boolean;
  onStudentClick?: (studentId: string) => void;
}

const colorMap = {
  green: {
    bg: "bg-green-50 border-green-300",
    badge: "bg-green-100 text-green-800",
    bar: "bg-green-500"
  },
  yellow: {
    bg: "bg-yellow-50 border-yellow-300",
    badge: "bg-yellow-100 text-yellow-800",
    bar: "bg-yellow-500"
  },
  orange: {
    bg: "bg-orange-50 border-orange-300",
    badge: "bg-orange-100 text-orange-800",
    bar: "bg-orange-500"
  },
  red: {
    bg: "bg-red-50 border-red-300",
    badge: "bg-red-100 text-red-800",
    bar: "bg-red-500"
  },
  purple: {
    bg: "bg-purple-50 border-purple-300",
    badge: "bg-purple-100 text-purple-800",
    bar: "bg-purple-500"
  }
};

export function StudentPerformanceGrade({
  students,
  grade,
  isLoading,
  onStudentClick
}: StudentPerformanceGradeProps) {
  if (isLoading) {
    return <div className="p-8 text-center text-gray-500">Loading student performance...</div>;
  }

  if (!students || students.length === 0) {
    return <div className="p-8 text-center text-gray-500">No student data available for {grade}</div>;
  }

  // Group by stream
  const streamMap = new Map<string, StudentPerfData[]>();
  students.forEach((student) => {
    if (!streamMap.has(student.stream)) {
      streamMap.set(student.stream, []);
    }
    streamMap.get(student.stream)!.push(student);
  });

  return (
    <div className="space-y-6">
      <div className="mb-4">
        <h3 className="text-lg font-bold text-gray-900">Student Performance - {grade}</h3>
        <p className="text-sm text-gray-600">{students.length} students</p>
      </div>

      {Array.from(streamMap.entries()).map(([stream, streamStudents]) => (
        <div key={stream}>
          <h4 className="mb-3 text-sm font-semibold text-gray-700 uppercase tracking-wider">
            Stream: {stream}
          </h4>

          <div className="space-y-2">
            {streamStudents.map((student) => {
              const colors = colorMap[student.color];
              return (
                <button
                  key={student.studentId}
                  onClick={() => onStudentClick?.(student.studentId)}
                  className={`flex w-full items-center gap-4 rounded-lg border-2 p-3 text-left transition-all hover:shadow-md ${colors.bg}`}
                >
                  {/* Student Info */}
                  <div className="flex-1 min-w-0">
                    <p className="truncate font-semibold text-gray-900">
                      {student.firstName} {student.lastName}
                    </p>
                    <p className="text-xs text-gray-600">{student.admissionNumber}</p>
                  </div>

                  {/* Performance Section */}
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className="text-lg font-bold text-gray-900">{student.meanScore}%</p>
                      <Badge className={colors.badge}>{student.performance.grade}</Badge>
                    </div>

                    {/* Mini bar */}
                    <div className="h-8 w-16 rounded bg-gray-300">
                      <div
                        className={`h-full rounded transition-all ${colors.bar}`}
                        style={{ width: `${Math.min(student.meanScore, 100)}%` }}
                      />
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
