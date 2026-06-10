"use client";

import { useState } from "react";
import { Search, Plus, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export interface Teacher {
  id: string;
  userId: string;
  name: string;
  email: string;
  employeeNumber: string;
  subjects: string[];
  qualification?: string;
  tscNumber?: string;
  level: "PRIMARY" | "JSS";
  assignedClassIds: string[];
}

interface TeachersListProps {
  teachers: Teacher[];
  isLoading?: boolean;
  onRefresh?: () => void;
  onElevateUser?: () => void;
  onViewTeacher?: (teacherId: string) => void;
}

export function TeachersList({ teachers, isLoading = false, onRefresh, onElevateUser, onViewTeacher }: TeachersListProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTeachers = teachers.filter(
    (teacher) =>
      teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      teacher.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      teacher.employeeNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      teacher.subjects.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by name, email, employee number, or subject..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <button
          onClick={onElevateUser}
          className="inline-flex min-h-10 items-center gap-2 rounded bg-primary px-4 py-2 text-sm font-bold text-primary-foreground hover:bg-primary/90"
        >
          <Plus className="h-4 w-4" />
          Elevate User
        </button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Teachers ({filteredTeachers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="py-8 text-center text-muted-foreground">Loading teachers...</div>
          ) : filteredTeachers.length === 0 ? (
            <div className="py-8 text-center text-muted-foreground">
              {teachers.length === 0 ? "No teachers found. Start by elevating users to teachers." : "No teachers match your search."}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="px-4 py-3 text-left text-sm font-semibold">Name</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Email</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Employee #</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Level</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Subjects</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Classes</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTeachers.map((teacher) => (
                    <tr key={teacher.id} className="border-b border-border hover:bg-muted/50">
                      <td className="px-4 py-3 text-sm font-semibold">{teacher.name}</td>
                      <td className="px-4 py-3 text-sm text-muted-foreground">{teacher.email}</td>
                      <td className="px-4 py-3 text-sm text-muted-foreground">{teacher.employeeNumber}</td>
                      <td className="px-4 py-3 text-sm">
                        <Badge variant={teacher.level === "PRIMARY" ? "default" : "outline"}>
                          {teacher.level === "PRIMARY" ? "Primary" : "JSS"}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <div className="flex flex-wrap gap-1">
                          {teacher.subjects.length > 0 ? (
                            teacher.subjects.slice(0, 2).map((subject) => (
                              <Badge key={subject} variant="secondary">
                                {subject}
                              </Badge>
                            ))
                          ) : (
                            <span className="text-muted-foreground">—</span>
                          )}
                          {teacher.subjects.length > 2 && (
                            <Badge variant="secondary">+{teacher.subjects.length - 2}</Badge>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <Badge variant="secondary">{teacher.assignedClassIds.length}</Badge>
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <button
                          onClick={() => onViewTeacher?.(teacher.id)}
                          className="inline-flex items-center gap-1 rounded bg-secondary px-2 py-1 text-xs font-semibold hover:bg-secondary/80"
                        >
                          <Eye className="h-3 w-3" />
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
