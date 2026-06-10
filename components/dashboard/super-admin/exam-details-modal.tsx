"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

interface ExamDetail {
  examId: string;
  studentId: string;
  studentName: string;
  admissionNumber: string;
  stream: string;
  subject: string;
  teacherName: string;
  score: number;
  totalMarks: number;
  percentage: number;
  grade: "A" | "B" | "C" | "D" | "F";
  date: Date;
}

interface ExamDetailsModalProps {
  student: {
    studentId: string;
    studentName: string;
    admissionNumber: string;
    stream: string;
    exams: ExamDetail[];
  } | null;
  isOpen: boolean;
  onClose: () => void;
}

const gradeColors = {
  A: "bg-green-100 text-green-800 border-green-300",
  B: "bg-yellow-100 text-yellow-800 border-yellow-300",
  C: "bg-orange-100 text-orange-800 border-orange-300",
  D: "bg-red-100 text-red-800 border-red-300",
  F: "bg-purple-100 text-purple-800 border-purple-300"
};

const gradeDescriptions = {
  A: "Excellent - Exceeding Expectations",
  B: "Good - Meeting Expectations",
  C: "Average - Approaching Expectations",
  D: "Below Average - Needs Support",
  F: "Critical - Requires Intervention"
};

export function ExamDetailsModal({
  student,
  isOpen,
  onClose
}: ExamDetailsModalProps) {
  if (!student) return null;

  // Calculate overall performance
  const overallPercentage = Math.round(
    student.exams.reduce((sum, e) => sum + e.percentage, 0) / student.exams.length
  );

  const overallGrade: "A" | "B" | "C" | "D" | "F" = 
    overallPercentage >= 80 ? "A" :
    overallPercentage >= 70 ? "B" :
    overallPercentage >= 60 ? "C" :
    overallPercentage >= 50 ? "D" : "F";

  // Sort exams by date (newest first)
  const sortedExams = [...student.exams].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  // Group by subject
  const subjectMap = new Map<string, ExamDetail[]>();
  sortedExams.forEach((exam) => {
    if (!subjectMap.has(exam.subject)) {
      subjectMap.set(exam.subject, []);
    }
    subjectMap.get(exam.subject)!.push(exam);
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Student Examination Details</DialogTitle>
          <DialogDescription>
            {student.studentName} ({student.admissionNumber}) - {student.stream}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Overall Performance Card */}
          <div className={`rounded-lg border-2 ${gradeColors[overallGrade]} p-6`}>
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-bold">Overall Exam Performance</h3>
              <Badge className={`border ${gradeColors[overallGrade]} text-lg`}>
                {overallGrade}
              </Badge>
            </div>

            <div className="mb-4 flex items-end gap-4">
              <div>
                <p className="text-5xl font-bold">{overallPercentage}%</p>
                <p className="mt-2 text-sm font-semibold">
                  {gradeDescriptions[overallGrade]}
                </p>
              </div>

              <div className="flex-1">
                <div className="h-4 rounded-full bg-gray-300">
                  <div
                    className={`h-full rounded-full transition-all ${
                      overallGrade === "A"
                        ? "bg-green-500"
                        : overallGrade === "B"
                        ? "bg-yellow-500"
                        : overallGrade === "C"
                        ? "bg-orange-500"
                        : overallGrade === "D"
                        ? "bg-red-500"
                        : "bg-purple-500"
                    }`}
                    style={{ width: `${Math.min(overallPercentage, 100)}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              <div>
                <p className="text-xs font-medium text-gray-600">Total Exams</p>
                <p className="text-2xl font-bold">{student.exams.length}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-600">Highest Score</p>
                <p className="text-2xl font-bold">
                  {Math.max(...student.exams.map((e) => e.percentage))}%
                </p>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-600">Lowest Score</p>
                <p className="text-2xl font-bold">
                  {Math.min(...student.exams.map((e) => e.percentage))}%
                </p>
              </div>
            </div>
          </div>

          {/* Exams by Subject */}
          <div>
            <h3 className="mb-4 text-lg font-bold text-gray-900">Examination Records</h3>

            <div className="space-y-4">
              {Array.from(subjectMap.entries()).map(([subject, exams]) => {
                const subjectAverage = Math.round(
                  exams.reduce((sum, e) => sum + e.percentage, 0) / exams.length
                );

                return (
                  <div key={subject} className="rounded-lg bg-gray-50 p-4">
                    <div className="mb-4 flex items-center justify-between">
                      <div>
                        <p className="font-bold text-gray-900">{subject}</p>
                        <p className="text-xs text-gray-600">📚 {exams[0].teacherName}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-gray-900">{subjectAverage}%</p>
                        <p className="text-xs font-medium text-gray-600">Average</p>
                      </div>
                    </div>

                    <div className="space-y-2 border-t border-gray-300 pt-4">
                      {exams.map((exam) => (
                        <div
                          key={exam.examId}
                          className="flex items-center justify-between rounded bg-white p-3"
                        >
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              {new Date(exam.date).toLocaleDateString()}
                            </p>
                            <p className="text-xs text-gray-600">
                              {exam.score}/{exam.totalMarks} marks
                            </p>
                          </div>

                          <div className="flex items-center gap-3">
                            <div>
                              <p className="text-right text-2xl font-bold text-gray-900">
                                {exam.percentage}%
                              </p>
                            </div>
                            <Badge
                              className={`border-2 ${gradeColors[exam.grade]} text-base`}
                            >
                              {exam.grade}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Close Button */}
          <div className="border-t pt-4">
            <button
              onClick={onClose}
              className="w-full rounded bg-blue-600 py-3 font-medium text-white hover:bg-blue-700"
            >
              Close
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
