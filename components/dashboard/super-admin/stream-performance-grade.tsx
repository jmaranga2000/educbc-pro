"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";

interface StreamPerfData {
  streamName: string;
  grade: string;
  studentCount: number;
  meanScore: number;
  performance: {
    meanScore: number;
    grade: "A" | "B" | "C" | "D" | "F";
    percentage: number;
  };
  color: "green" | "yellow" | "orange" | "red" | "purple";
}

interface GradeGroup {
  grade: string;
  streams: StreamPerfData[];
}

interface StreamPerformanceGradeProps {
  grades: GradeGroup[];
  isLoading?: boolean;
  onStreamClick?: (grade: string, stream: string) => void;
}

const colorMap = {
  green: {
    bg: "bg-green-50 border-green-200",
    badge: "bg-green-100 text-green-800",
    icon: "🟢"
  },
  yellow: {
    bg: "bg-yellow-50 border-yellow-200",
    badge: "bg-yellow-100 text-yellow-800",
    icon: "🟡"
  },
  orange: {
    bg: "bg-orange-50 border-orange-200",
    badge: "bg-orange-100 text-orange-800",
    icon: "🟠"
  },
  red: {
    bg: "bg-red-50 border-red-200",
    badge: "bg-red-100 text-red-800",
    icon: "🔴"
  },
  purple: {
    bg: "bg-purple-50 border-purple-200",
    badge: "bg-purple-100 text-purple-800",
    icon: "🟣"
  }
};

export function StreamPerformanceGrade({
  grades,
  isLoading,
  onStreamClick
}: StreamPerformanceGradeProps) {
  if (isLoading) {
    return <div className="p-8 text-center text-gray-500">Loading stream performance...</div>;
  }

  if (!grades || grades.length === 0) {
    return <div className="p-8 text-center text-gray-500">No exam data available</div>;
  }

  return (
    <div className="space-y-8">
      {grades.map((gradeGroup) => (
        <div key={gradeGroup.grade}>
          <div className="mb-4">
            <h2 className="text-2xl font-bold text-gray-900">{gradeGroup.grade}</h2>
            <p className="text-sm text-gray-600">
              {gradeGroup.streams.length} stream{gradeGroup.streams.length !== 1 ? "s" : ""}
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {gradeGroup.streams.map((stream) => {
              const colors = colorMap[stream.color];
              return (
                <button
                  key={stream.streamName}
                  onClick={() => onStreamClick?.(stream.grade, stream.streamName)}
                  className={`rounded-lg border-2 p-4 text-left transition-all hover:shadow-lg ${colors.bg}`}
                >
                  <div className="mb-3 flex items-start justify-between">
                    <div>
                      <p className="font-semibold text-gray-900">{stream.streamName}</p>
                      <p className="text-xs text-gray-600">
                        {stream.studentCount} student{stream.studentCount !== 1 ? "s" : ""}
                      </p>
                    </div>
                    <Badge className={colors.badge}>{stream.performance.grade}</Badge>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Mean Score</span>
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-gray-900">
                          {stream.meanScore}%
                        </span>
                        <span className="text-xl">{colors.icon}</span>
                      </div>
                    </div>

                    {/* Performance bar */}
                    <div className="mt-3 h-2 rounded-full bg-gray-200">
                      <div
                        className={`h-full rounded-full transition-all ${
                          stream.color === "green"
                            ? "bg-green-500"
                            : stream.color === "yellow"
                            ? "bg-yellow-500"
                            : stream.color === "orange"
                            ? "bg-orange-500"
                            : stream.color === "red"
                            ? "bg-red-500"
                            : "bg-purple-500"
                        }`}
                        style={{ width: `${stream.meanScore}%` }}
                      />
                    </div>
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
  );
}
