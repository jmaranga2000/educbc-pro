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

interface StreamSubjectPerformanceProps {
  stream: string;
  grade: string;
  subjects: SubjectPerfData[];
  isLoading?: boolean;
  onSubjectClick?: (subject: string, teacher: string) => void;
}

const colorMap = {
  green: {
    bg: "bg-gradient-to-br from-green-50 via-green-50 to-emerald-50 border-green-400",
    badge: "bg-green-100 text-green-800",
    accent: "text-green-700",
    bar: "bg-green-500"
  },
  yellow: {
    bg: "bg-gradient-to-br from-yellow-50 via-yellow-50 to-amber-50 border-yellow-400",
    badge: "bg-yellow-100 text-yellow-800",
    accent: "text-yellow-700",
    bar: "bg-yellow-500"
  },
  orange: {
    bg: "bg-gradient-to-br from-orange-50 via-orange-50 to-red-50 border-orange-400",
    badge: "bg-orange-100 text-orange-800",
    accent: "text-orange-700",
    bar: "bg-orange-500"
  },
  red: {
    bg: "bg-gradient-to-br from-red-50 via-red-50 to-pink-50 border-red-400",
    badge: "bg-red-100 text-red-800",
    accent: "text-red-700",
    bar: "bg-red-500"
  },
  purple: {
    bg: "bg-gradient-to-br from-purple-50 via-purple-50 to-indigo-50 border-purple-400",
    badge: "bg-purple-100 text-purple-800",
    accent: "text-purple-700",
    bar: "bg-purple-500"
  }
};

export function StreamSubjectPerformance({
  stream,
  grade,
  subjects,
  isLoading,
  onSubjectClick
}: StreamSubjectPerformanceProps) {
  if (isLoading) {
    return <div className="p-8 text-center text-gray-500">Loading subject performance...</div>;
  }

  if (!subjects || subjects.length === 0) {
    return (
      <div className="rounded-lg bg-white p-8 text-center text-gray-500">
        No subject data available for {stream}
      </div>
    );
  }

  // Calculate overall stream performance
  const overallScore = Math.round(
    subjects.reduce((sum, s) => sum + s.meanScore, 0) / subjects.length
  );

  return (
    <div className="space-y-6 rounded-lg bg-white p-6">
      {/* Header */}
      <div className="border-b border-gray-200 pb-4">
        <h2 className="mb-2 text-2xl font-bold text-gray-900">
          {grade} - {stream}
        </h2>
        <div className="flex items-center gap-4">
          <div>
            <p className="text-sm text-gray-600">Stream Overall Performance</p>
            <p className="text-3xl font-bold text-blue-600">{overallScore}%</p>
          </div>
          <div className="flex-1">
            <div className="h-4 rounded-full bg-gray-200">
              <div
                className="h-full rounded-full bg-blue-500 transition-all"
                style={{ width: `${Math.min(overallScore, 100)}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Subjects Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {subjects.map((subject) => {
          const colors = colorMap[subject.color];
          return (
            <button
              key={subject.subject}
              onClick={() => onSubjectClick?.(subject.subject, subject.teacherName)}
              className={`rounded-xl border-2 p-5 text-left transition-all hover:shadow-xl ${colors.bg}`}
            >
              {/* Subject Header */}
              <div className="mb-4 flex items-start justify-between">
                <div className="flex-1">
                  <p className="mb-1 text-lg font-bold text-gray-900">{subject.subject}</p>
                  <p className={`text-xs font-semibold ${colors.accent}`}>
                    👨‍🏫 {subject.teacherName}
                  </p>
                </div>
                <Badge className={colors.badge}>{subject.performance.grade}</Badge>
              </div>

              {/* Score Display */}
              <div className="mb-4 flex items-end gap-3">
                <span className={`text-4xl font-bold ${colors.accent}`}>
                  {subject.meanScore}
                </span>
                <span className="mb-2 text-sm text-gray-600">%</span>
              </div>

              {/* Performance Bar */}
              <div className="mb-3 h-3 rounded-full bg-gray-300">
                <div
                  className={`h-full rounded-full transition-all ${colors.bar}`}
                  style={{ width: `${Math.min(subject.meanScore, 100)}%` }}
                />
              </div>

              {/* Stats */}
              <div className="flex items-center justify-between border-t border-gray-300 pt-3 text-xs text-gray-600">
                <span>{subject.studentCount} students assessed</span>
                <span className="font-semibold text-gray-700">
                  {subject.color === "green"
                    ? "Excellent"
                    : subject.color === "yellow"
                    ? "Good"
                    : subject.color === "orange"
                    ? "Average"
                    : subject.color === "red"
                    ? "Below Average"
                    : "Critical"}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
