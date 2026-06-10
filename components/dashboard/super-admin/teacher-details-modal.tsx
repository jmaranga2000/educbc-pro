"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, Award, BookOpen } from "lucide-react";

export interface TeacherDetail {
  id: string;
  userId: string;
  name: string;
  email: string;
  phone?: string;
  employeeNumber: string;
  subjects: string[];
  qualification?: string;
  tscNumber?: string;
  level: "PRIMARY" | "JSS";
  assignedClassIds: string[];
  availableDays: string[];
  maxLessonsPerDay: number;
  currentRole: string;
  twoFactorEnabled: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

interface TeacherDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  teacher: TeacherDetail | null;
  isLoading?: boolean;
  onAssignRole?: (teacherId: string, role: string) => Promise<void>;
  isAssigningRole?: boolean;
}

const TEACHER_ROLES = [
  { value: "TEACHER", label: "Teacher", description: "Regular classroom teacher" },
  { value: "CLASS_TEACHER", label: "Class Teacher", description: "Class teacher with administrative duties" },
  { value: "EXAMS_OFFICER", label: "Exams Officer", description: "Manages exams and assessments" },
  { value: "SPORTS_OFFICER", label: "Sports Officer", description: "Manages school sports programs" }
];

export function TeacherDetailsModal({
  isOpen,
  onClose,
  teacher,
  isLoading,
  onAssignRole,
  isAssigningRole
}: TeacherDetailsModalProps) {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  if (isLoading) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent>
          <div className="py-8 text-center text-muted-foreground">Loading teacher details...</div>
        </DialogContent>
      </Dialog>
    );
  }

  if (!teacher) {
    return null;
  }

  const handleAssignRole = async (role: string) => {
    if (onAssignRole) {
      try {
        await onAssignRole(teacher.id, role);
        setSelectedRole(null);
      } catch (error) {
        console.error("Error assigning role:", error);
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{teacher.name}</DialogTitle>
          <DialogDescription>{teacher.email}</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-xs font-semibold text-muted-foreground">EMAIL</p>
                  <p>{teacher.email}</p>
                </div>
              </div>
              {teacher.phone && (
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground">PHONE</p>
                    <p>{teacher.phone}</p>
                  </div>
                </div>
              )}
              <div className="flex items-start gap-3">
                <Badge variant="outline">{teacher.twoFactorEnabled ? "2FA Enabled" : "2FA Disabled"}</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Professional Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Professional Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-semibold text-muted-foreground">EMPLOYEE NUMBER</p>
                  <p className="font-semibold">{teacher.employeeNumber}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-muted-foreground">TEACHING LEVEL</p>
                  <Badge variant={teacher.level === "PRIMARY" ? "default" : "outline"}>
                    {teacher.level === "PRIMARY" ? "Primary (Grade 1-6)" : "JSS (Grade 7-9)"}
                  </Badge>
                </div>
              </div>

              {teacher.qualification && (
                <div>
                  <p className="text-xs font-semibold text-muted-foreground">QUALIFICATION</p>
                  <div className="flex items-center gap-2">
                    <Award className="h-4 w-4 text-muted-foreground" />
                    <p>{teacher.qualification}</p>
                  </div>
                </div>
              )}

              {teacher.tscNumber && (
                <div>
                  <p className="text-xs font-semibold text-muted-foreground">TSC NUMBER</p>
                  <p className="font-mono text-sm">{teacher.tscNumber}</p>
                </div>
              )}

              <div>
                <p className="text-xs font-semibold text-muted-foreground">SUBJECTS</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {teacher.subjects.length > 0 ? (
                    teacher.subjects.map((subject) => (
                      <Badge key={subject} variant="secondary">
                        {subject}
                      </Badge>
                    ))
                  ) : (
                    <span className="text-muted-foreground">No subjects assigned</span>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Role Assignment */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Role Assignment</CardTitle>
              <p className="text-sm text-muted-foreground">Current role: <Badge>{teacher.currentRole}</Badge></p>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {TEACHER_ROLES.map((role) => (
                  <button
                    key={role.value}
                    onClick={() => handleAssignRole(role.value)}
                    className={`w-full rounded border p-3 text-left transition ${
                      teacher.currentRole === role.value
                        ? "border-primary bg-primary/10"
                        : "border-border hover:bg-muted"
                    } ${isAssigningRole ? "opacity-50 cursor-not-allowed" : ""}`}
                    disabled={isAssigningRole}
                  >
                    <p className="font-semibold">{role.label}</p>
                    <p className="text-sm text-muted-foreground">{role.description}</p>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Timetable Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Timetable Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-xs font-semibold text-muted-foreground">AVAILABLE DAYS</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {teacher.availableDays.map((day) => (
                    <Badge key={day} variant="secondary">
                      {day}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold text-muted-foreground">MAX LESSONS PER DAY</p>
                <p>{teacher.maxLessonsPerDay} lessons</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-muted-foreground">ASSIGNED CLASSES</p>
                <p>{teacher.assignedClassIds.length} classes assigned</p>
              </div>
            </CardContent>
          </Card>

          {/* Timestamps */}
          <div className="text-xs text-muted-foreground space-y-1">
            <p>Created: {teacher.createdAt ? new Date(teacher.createdAt).toLocaleDateString() : "N/A"}</p>
            <p>Updated: {teacher.updatedAt ? new Date(teacher.updatedAt).toLocaleDateString() : "N/A"}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
