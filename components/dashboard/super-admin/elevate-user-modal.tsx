"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

export interface EligibleUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  currentRole: string;
}

interface ElevateUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  eligibleUsers: EligibleUser[];
  isLoadingUsers?: boolean;
  onElevateUser: (userId: string, data: ElevateUserFormData) => Promise<void>;
  isElevating?: boolean;
}

export interface ElevateUserFormData {
  employeeNumber: string;
  subjects: string[];
  qualification?: string;
  tscNumber?: string;
  level: "PRIMARY" | "JSS";
}

export function ElevateUserModal({ 
  isOpen, 
  onClose, 
  eligibleUsers, 
  isLoadingUsers, 
  onElevateUser, 
  isElevating 
}: ElevateUserModalProps) {
  const [selectedUser, setSelectedUser] = useState<EligibleUser | null>(null);
  const [formData, setFormData] = useState<ElevateUserFormData>({
    employeeNumber: "",
    subjects: [],
    level: "PRIMARY"
  });
  const [subjectInput, setSubjectInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredUsers = eligibleUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectUser = (user: EligibleUser) => {
    setSelectedUser(user);
    setFormData({ employeeNumber: "", subjects: [], level: "PRIMARY" });
  };

  const handleAddSubject = () => {
    if (subjectInput.trim() && !formData.subjects.includes(subjectInput.trim())) {
      setFormData({
        ...formData,
        subjects: [...formData.subjects, subjectInput.trim()]
      });
      setSubjectInput("");
    }
  };

  const handleRemoveSubject = (subject: string) => {
    setFormData({
      ...formData,
      subjects: formData.subjects.filter((s) => s !== subject)
    });
  };

  const handleElevate = async () => {
    if (!selectedUser || !formData.employeeNumber.trim()) {
      alert("Please fill in all required fields");
      return;
    }

    try {
      await onElevateUser(selectedUser.id, formData);
      onClose();
    } catch (error) {
      console.error("Error elevating user:", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Elevate User to Teacher</DialogTitle>
          <DialogDescription>Select a user and configure their teacher profile</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {!selectedUser ? (
            <div className="space-y-3">
              <label className="text-sm font-semibold">Select User</label>
              <div className="mb-3">
                <input
                  type="text"
                  placeholder="Search users..."
                  className="w-full rounded border border-border px-3 py-2 text-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {isLoadingUsers ? (
                <div className="py-8 text-center text-muted-foreground">Loading users...</div>
              ) : filteredUsers.length === 0 ? (
                <div className="py-8 text-center text-muted-foreground">
                  {eligibleUsers.length === 0 ? "No eligible users found" : "No users match your search"}
                </div>
              ) : (
                <div className="max-h-64 space-y-2 overflow-y-auto">
                  {filteredUsers.map((user) => (
                    <button
                      key={user.id}
                      onClick={() => handleSelectUser(user)}
                      className="w-full rounded border border-border p-3 text-left hover:bg-muted"
                    >
                      <p className="font-semibold">{user.name}</p>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                      {user.phone && <p className="text-sm text-muted-foreground">{user.phone}</p>}
                      <Badge className="mt-2">{user.currentRole}</Badge>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              <div className="rounded bg-muted p-3">
                <p className="text-sm font-semibold">{selectedUser.name}</p>
                <p className="text-sm text-muted-foreground">{selectedUser.email}</p>
                <button
                  onClick={() => setSelectedUser(null)}
                  className="mt-2 text-xs font-semibold text-primary hover:underline"
                >
                  Change Selection
                </button>
              </div>

              <div>
                <label className="text-sm font-semibold">Employee Number *</label>
                <input
                  type="text"
                  placeholder="e.g., TSC/2024/001"
                  className="mt-1 w-full rounded border border-border px-3 py-2 text-sm"
                  value={formData.employeeNumber}
                  onChange={(e) => setFormData({ ...formData, employeeNumber: e.target.value })}
                />
              </div>

              <div>
                <label className="text-sm font-semibold">Teaching Level *</label>
                <select
                  className="mt-1 w-full rounded border border-border px-3 py-2 text-sm"
                  value={formData.level}
                  onChange={(e) => setFormData({ ...formData, level: e.target.value as "PRIMARY" | "JSS" })}
                >
                  <option value="PRIMARY">Primary (Grade 1-6)</option>
                  <option value="JSS">JSS (Grade 7-9)</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-semibold">Subjects</label>
                <div className="mt-2 flex gap-2">
                  <input
                    type="text"
                    placeholder="Add a subject..."
                    className="flex-1 rounded border border-border px-3 py-2 text-sm"
                    value={subjectInput}
                    onChange={(e) => setSubjectInput(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddSubject();
                      }
                    }}
                  />
                  <button
                    onClick={handleAddSubject}
                    className="rounded bg-secondary px-3 py-2 text-sm font-semibold hover:bg-secondary/80"
                  >
                    Add
                  </button>
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {formData.subjects.map((subject) => (
                    <Badge key={subject} variant="secondary">
                      {subject}
                      <button
                        onClick={() => handleRemoveSubject(subject)}
                        className="ml-1 hover:opacity-70"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold">Qualification</label>
                <input
                  type="text"
                  placeholder="e.g., Bachelor of Education"
                  className="mt-1 w-full rounded border border-border px-3 py-2 text-sm"
                  value={formData.qualification || ""}
                  onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                />
              </div>

              <div>
                <label className="text-sm font-semibold">TSC Number</label>
                <input
                  type="text"
                  placeholder="e.g., 1234567"
                  className="mt-1 w-full rounded border border-border px-3 py-2 text-sm"
                  value={formData.tscNumber || ""}
                  onChange={(e) => setFormData({ ...formData, tscNumber: e.target.value })}
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setSelectedUser(null)}
                  className="flex-1 rounded border border-border px-3 py-2 text-sm font-semibold hover:bg-muted"
                  disabled={isElevating}
                >
                  Back
                </button>
                <button
                  onClick={handleElevate}
                  className="flex-1 rounded bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
                  disabled={isElevating || !formData.employeeNumber.trim()}
                >
                  {isElevating ? "Elevating..." : "Elevate to Teacher"}
                </button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
