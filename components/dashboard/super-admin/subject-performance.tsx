"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";

interface SubjectPerfData {
  subject: string;
  teacherId: string;
  teacherName: string;
  meanScore: number;
  performance: {
    meanScore: number;
    grade: "A" | "B" | "C" | "D" | "F";
    percentage: number;
  };
  color: "green" | "yellow" | "orange" | "red" | "purple";
  studentCount: number;
}

interface SubjectPerformanceProps {
  subjects: SubjectPerfData[];
  grade: string;
  isLoading?: boolean;
  onSubjectClick?: (subject: string, teacher: string) => void;
}

const colorMap = {
  green: {
    bg: "bg-gradient-to-r from-green-50 to-green-100 border-green-300",
    badge: "bg-green-100 text-green-800",
    accent: "text-green-700"
  },
  yellow: {
    bg: "bg-gradient-to-r from-yellow-50 to-yellow-100 border-yellow-300",
    badge: "bg-yellow-100 text-yellow-800",
    accent: "text-yellow-700"
  },
  orange: {
    bg: "bg-gradient-to-r from-orange-50 to-orange-100 border-orange-300",
    badge: "bg-orange-100 text-orange-800",
    accent: "text-orange-700"
  },
  red: {
    bg: "bg-gradient-to-r from-red-50 to-red-100 border-red-300",
    badge: "bg-red-100 text-red-800",
    accent: "text-red-700"
  },
  purple: {
    bg: "bg-gradient-to-r from-purple-50 to-purple-100 border-purple-300",
    badge: "bg-purple-100 text-purple-800",
    accent: "text-purple-700"
  }
};

export function SubjectPerformance({
  subjects,
  grade,
  isLoading,
  onSubjectClick
}: SubjectPerformanceProps) {
  if (isLoading) {
    return <div className="p-8 text-center text-gray-500">Loading subject performance...</div>;
  }

  if (!subjects || subjects.length === 0) {
    return <div className="p-8 text-center text-gray-500">No subject data available for {grade}</div>;
  }

  return (
    <div className="space-y-4">
      <div className="mb-4">
        <h3 className="text-lg font-bold text-gray-900">Subject Performance - {grade}</h3>
        <p className="text-sm text-gray-600">{subjects.length} subjects</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {subjects.map((subject) => {
          const colors = colorMap[subject.color];
          return (
            <button
              key={subject.subject}
              onClick={() => onSubjectClick?.(subject.subject, subject.teacherName)}
              className={`rounded-lg border-2 p-5 text-left transition-all hover:shadow-lg ${colors.bg}`}
            >
              <div className="mb-3 flex items-start justify-between">
                <div>
                  <p className="font-bold text-gray-900">{subject.subject}</p>
                  <p className={`text-xs font-medium ${colors.accent}`}>👨‍🏫 {subject.teacherName}</p>
                </div>
                <Badge className={colors.badge}>{subject.performance.grade}</Badge>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Mean Score</span>
                  <span className={`text-2xl font-bold ${colors.accent}`}>
                    {subject.meanScore}%
                  </span>
                </div>

                {/* Performance bar */}
                <div className="h-3 rounded-full bg-gray-300">
                  <div
                    className={`h-full rounded-full transition-all ${
                      subject.color === "green"
                        ? "bg-green-500"
                        : subject.color === "yellow"
                        ? "bg-yellow-500"
                        : subject.color === "orange"
                        ? "bg-orange-500"
                        : subject.color === "red"
                        ? "bg-red-500"
                        : "bg-purple-500"
                    }`}
                    style={{ width: `${Math.min(subject.meanScore, 100)}%` }}
                  />
                </div>

                <div className="pt-2 text-xs text-gray-600">
                  {subject.studentCount} student{subject.studentCount !== 1 ? "s" : ""} assessed
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
