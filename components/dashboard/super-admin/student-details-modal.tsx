"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { getStudentPerformanceColor } from "@/lib/student-performance";

interface StudentDetail {
  id: string;
  firstName: string;
  lastName: string;
  admissionNumber: string;
  dateOfBirth?: Date;
  grade: string;
  stream: string;
  parentContact?: string;
  healthStatus?: string;
  libraryStatus?: string;
  transportRoute?: string;
  performance: {
    meanScore: number;
    cbcBand: "EE" | "ME" | "AE" | "BE";
    assessmentsCount: number;
  };
  classTeacher?: {
    id: string;
    name: string;
    email: string;
  };
  assessments: Array<{
    subject: string;
    competencyScore: number;
    projectScore: number;
    practicalScore: number;
    date: Date;
  }>;
}

interface StudentDetailsModalProps {
  student: StudentDetail | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdate?: (studentId: string, updates: any) => Promise<void>;
}

const performanceBadgeMap = {
  green: "bg-green-100 text-green-800",
  yellow: "bg-yellow-100 text-yellow-800",
  orange: "bg-orange-100 text-orange-800",
  red: "bg-red-100 text-red-800"
};

export function StudentDetailsModal({
  student,
  isOpen,
  onClose,
  onUpdate
}: StudentDetailsModalProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(student);

  React.useEffect(() => {
    setEditData(student);
  }, [student]);

  if (!student) return null;

  const color = getStudentPerformanceColor(student.performance.meanScore);
  const badgeClass = performanceBadgeMap[color];

  const handleSave = async () => {
    if (onUpdate) {
      await onUpdate(student.id, editData);
      setIsEditing(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Student Details</DialogTitle>
          <DialogDescription>
            {student.firstName} {student.lastName} - {student.grade} {student.stream}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Personal Info Section */}
          <div className="rounded-lg bg-gray-50 p-4">
            <h3 className="mb-4 font-semibold text-gray-900">Personal Information</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-medium text-gray-600">First Name</label>
                <p className="mt-1 text-sm text-gray-900">{student.firstName}</p>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600">Last Name</label>
                <p className="mt-1 text-sm text-gray-900">{student.lastName}</p>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600">Admission Number</label>
                <p className="mt-1 text-sm text-gray-900">{student.admissionNumber}</p>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600">Date of Birth</label>
                <p className="mt-1 text-sm text-gray-900">
                  {student.dateOfBirth
                    ? new Date(student.dateOfBirth).toLocaleDateString()
                    : "Not specified"}
                </p>
              </div>
            </div>
          </div>

          {/* Academic Info Section */}
          <div className="rounded-lg bg-gray-50 p-4">
            <h3 className="mb-4 font-semibold text-gray-900">Academic Information</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Grade</span>
                <span className="text-sm font-medium text-gray-900">{student.grade}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Stream</span>
                <span className="text-sm font-medium text-gray-900">{student.stream}</span>
              </div>
              {student.classTeacher && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Class Teacher</span>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{student.classTeacher.name}</p>
                    <p className="text-xs text-gray-600">{student.classTeacher.email}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Performance Section */}
          <div className="rounded-lg bg-blue-50 p-4">
            <h3 className="mb-4 font-semibold text-gray-900">Academic Performance</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Mean Score</span>
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-bold text-blue-600">
                    {student.performance.meanScore}%
                  </span>
                  <Badge className={badgeClass}>{student.performance.cbcBand}</Badge>
                </div>
              </div>

              {student.performance.assessmentsCount > 0 && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Total Assessments</span>
                  <span className="text-sm font-medium text-gray-900">
                    {student.performance.assessmentsCount}
                  </span>
                </div>
              )}

              {/* Performance Breakdown */}
              {student.performance.meanScore >= 80 && (
                <p className="text-sm text-green-700">🌟 Excellent performance! Student is exceeding expectations.</p>
              )}
              {student.performance.meanScore >= 65 && student.performance.meanScore < 80 && (
                <p className="text-sm text-yellow-700">✓ Good performance! Student is meeting expectations.</p>
              )}
              {student.performance.meanScore >= 50 && student.performance.meanScore < 65 && (
                <p className="text-sm text-orange-700">⚠ Student is approaching expectations. Extra support may help.</p>
              )}
              {student.performance.meanScore < 50 && (
                <p className="text-sm text-red-700">⚠ Student needs additional support to improve performance.</p>
              )}
            </div>
          </div>

          {/* Administrative Info Section */}
          <div className="rounded-lg bg-gray-50 p-4">
            <h3 className="mb-4 font-semibold text-gray-900">Administrative Information</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-gray-600">Parent Contact</label>
                <p className="mt-1 text-sm text-gray-900">{student.parentContact || "Not specified"}</p>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600">Health Status</label>
                <p className="mt-1 text-sm text-gray-900">{student.healthStatus || "Not specified"}</p>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600">Library Status</label>
                <p className="mt-1 text-sm text-gray-900">{student.libraryStatus || "Not specified"}</p>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600">Transport Route</label>
                <p className="mt-1 text-sm text-gray-900">{student.transportRoute || "Not specified"}</p>
              </div>
            </div>
          </div>

          {/* Assessments Section */}
          {student.assessments && student.assessments.length > 0 && (
            <div className="rounded-lg bg-gray-50 p-4">
              <h3 className="mb-4 font-semibold text-gray-900">Assessment Records</h3>
              <div className="space-y-3 max-h-48 overflow-y-auto">
                {student.assessments.map((assessment, idx) => (
                  <div key={idx} className="border-l-4 border-blue-300 bg-white p-3">
                    <p className="font-medium text-gray-900">{assessment.subject}</p>
                    <div className="mt-2 grid gap-2 text-xs text-gray-600 sm:grid-cols-3">
                      <div>
                        <span className="font-semibold text-gray-700">Competency:</span>{" "}
                        {assessment.competencyScore}%
                      </div>
                      <div>
                        <span className="font-semibold text-gray-700">Project:</span>{" "}
                        {assessment.projectScore}%
                      </div>
                      <div>
                        <span className="font-semibold text-gray-700">Practical:</span>{" "}
                        {assessment.practicalScore}%
                      </div>
                    </div>
                    <p className="mt-1 text-xs text-gray-500">
                      {new Date(assessment.date).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 border-t pt-4">
            <button
              onClick={onClose}
              className="flex-1 rounded border border-gray-300 py-2 px-4 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Close
            </button>
            {onUpdate && (
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="flex-1 rounded bg-blue-600 py-2 px-4 text-sm font-medium text-white hover:bg-blue-700"
              >
                {isEditing ? "Cancel" : "Edit"}
              </button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
