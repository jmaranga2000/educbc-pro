"use client";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, User, BookOpen, TrendingUp } from "lucide-react";

export interface StreamDetail {
  id: string;
  name: string;
  grade: string;
  capacity?: number;
  studentCount: number;
  classTeacher?: {
    id: string;
    name: string;
    email: string;
  };
  classPrefect?: {
    id: string;
    name: string;
    admissionNumber: string;
  };
  assignedTeachers: Array<{
    id: string;
    name: string;
    email: string;
    subjects: string[];
  }>;
  performance: {
    meanScore: number;
    cbcBand: "EE" | "ME" | "AE" | "BE";
    studentsAssessed: number;
  };
  createdAt?: Date;
}

interface StreamDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  stream: StreamDetail | null;
  isLoading?: boolean;
}

function getPerformanceColor(score: number): { bg: string; text: string } {
  if (score >= 80) {
    return { bg: "bg-green-50", text: "text-green-700" };
  }
  if (score >= 65) {
    return { bg: "bg-yellow-50", text: "text-yellow-700" };
  }
  if (score >= 50) {
    return { bg: "bg-orange-50", text: "text-orange-700" };
  }
  return { bg: "bg-red-50", text: "text-red-700" };
}

function getCbcBandLabel(band: "EE" | "ME" | "AE" | "BE"): string {
  const labels = {
    EE: "Exceeding Expectations",
    ME: "Meeting Expectations",
    AE: "Approaching Expectations",
    BE: "Below Expectations"
  };
  return labels[band];
}

function getCbcBandColor(band: "EE" | "ME" | "AE" | "BE"): string {
  const colors = {
    EE: "bg-green-100 text-green-700 border-green-200",
    ME: "bg-yellow-100 text-yellow-700 border-yellow-200",
    AE: "bg-orange-100 text-orange-700 border-orange-200",
    BE: "bg-red-100 text-red-700 border-red-200"
  };
  return colors[band];
}

export function StreamDetailsModal({
  isOpen,
  onClose,
  stream,
  isLoading
}: StreamDetailsModalProps) {
  if (isLoading) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent>
          <div className="py-8 text-center text-muted-foreground">Loading stream details...</div>
        </DialogContent>
      </Dialog>
    );
  }

  if (!stream) {
    return null;
  }

  const perfColor = getPerformanceColor(stream.performance.meanScore);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{stream.name}</DialogTitle>
          <DialogDescription>{stream.grade}</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Performance Highlight */}
          <Card className={`${perfColor.bg}`}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className={`text-sm font-semibold ${perfColor.text} uppercase`}>Stream Performance</p>
                  <p className={`mt-1 text-4xl font-bold ${perfColor.text}`}>{stream.performance.meanScore}%</p>
                </div>
                <div className="text-right">
                  <div className={`rounded border-2 border-current p-2 ${getCbcBandColor(stream.performance.cbcBand)}`}>
                    <p className="text-xl font-bold">{stream.performance.cbcBand}</p>
                    <p className="text-xs font-semibold">{getCbcBandLabel(stream.performance.cbcBand)}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Student Count */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Users className="h-5 w-5" />
                Students
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-3 gap-4">
                <div className="rounded bg-muted p-3">
                  <p className="text-xs font-semibold text-muted-foreground">TOTAL STUDENTS</p>
                  <p className="text-2xl font-bold">{stream.studentCount}</p>
                </div>
                <div className="rounded bg-muted p-3">
                  <p className="text-xs font-semibold text-muted-foreground">ASSESSED</p>
                  <p className="text-2xl font-bold">{stream.performance.studentsAssessed}</p>
                </div>
                {stream.capacity && (
                  <div className="rounded bg-muted p-3">
                    <p className="text-xs font-semibold text-muted-foreground">CAPACITY</p>
                    <p className="text-2xl font-bold">
                      {Math.round((stream.studentCount / stream.capacity) * 100)}%
                    </p>
                  </div>
                )}
              </div>

              {stream.capacity && (
                <div>
                  <p className="mb-2 text-sm font-semibold">Enrollment vs Capacity</p>
                  <div className="h-3 rounded-full bg-border">
                    <div
                      className="h-3 rounded-full bg-primary"
                      style={{ width: `${(stream.studentCount / stream.capacity) * 100}%` }}
                    />
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {stream.studentCount} / {stream.capacity} students
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Class Teacher */}
          {stream.classTeacher && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <User className="h-5 w-5" />
                  Class Teacher
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded border border-border bg-background p-4">
                  <p className="font-bold">{stream.classTeacher.name}</p>
                  <p className="text-sm text-muted-foreground">{stream.classTeacher.email}</p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Class Prefect */}
          {stream.classPrefect && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <User className="h-5 w-5" />
                  Class Prefect
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded border border-border bg-background p-4">
                  <p className="font-bold">{stream.classPrefect.name}</p>
                  <p className="text-sm text-muted-foreground">{stream.classPrefect.admissionNumber}</p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Assigned Teachers */}
          {stream.assignedTeachers.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <BookOpen className="h-5 w-5" />
                  Assigned Teachers ({stream.assignedTeachers.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {stream.assignedTeachers.map((teacher) => (
                    <div key={teacher.id} className="rounded border border-border p-3">
                      <p className="font-semibold">{teacher.name}</p>
                      <p className="text-sm text-muted-foreground">{teacher.email}</p>
                      {teacher.subjects.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-1">
                          {teacher.subjects.map((subject) => (
                            <Badge key={subject} variant="secondary">
                              {subject}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Assessment Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <TrendingUp className="h-5 w-5" />
                Assessment Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Students Assessed:</span>
                  <span className="font-semibold">{stream.performance.studentsAssessed}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Mean Score:</span>
                  <span className="font-semibold">{stream.performance.meanScore}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Performance Band:</span>
                  <Badge variant={stream.performance.cbcBand === "EE" ? "default" : "secondary"}>
                    {stream.performance.cbcBand}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Metadata */}
          {stream.createdAt && (
            <div className="text-xs text-muted-foreground">
              Created: {new Date(stream.createdAt).toLocaleDateString()}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
