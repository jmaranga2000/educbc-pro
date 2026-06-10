"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { classStudents, disciplineCategories } from "@/lib/class-teacher";

export function ClassDisciplineRecordsPage() {
  const [category, setCategory] = useState(disciplineCategories[0]);
  const [studentId, setStudentId] = useState(classStudents[0]?.id ?? "");
  const [details, setDetails] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const selectedStudent = classStudents.find((student) => student.id === studentId);

  function submitRecord(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="space-y-5">
      <section className="rounded border border-border bg-white p-5 shadow-soft">
        <Badge>Discipline Records</Badge>
        <h1 className="mt-3 text-3xl font-bold tracking-normal">Discipline Categories</h1>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
          Choose a discipline category, select the learner, record the incident, and queue notices for the parent and administrator.
        </p>
      </section>

      <div className="grid gap-5 xl:grid-cols-[0.75fr_1fr]">
        <div className="rounded border border-border bg-white p-4 shadow-soft">
          <p className="font-bold">Categories</p>
          <p className="mt-1 text-sm text-muted-foreground">Click a category to open its reporting form.</p>
          <div className="mt-3 grid gap-2">
            {disciplineCategories.map((item) => (
              <button
                key={item}
                type="button"
                aria-pressed={category === item}
                title={`Open ${item} discipline form`}
                onClick={() => {
                  setCategory(item);
                  setSubmitted(false);
                }}
                className={`min-h-14 cursor-pointer rounded border px-3 py-2 text-left text-sm font-bold transition ${
                  category === item ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background hover:border-primary/40 hover:bg-muted"
                }`}
              >
                <span>{item}</span>
                <span className={`mt-1 block text-xs ${category === item ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                  Open form
                </span>
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={submitRecord} className="rounded border border-border bg-white p-5 shadow-soft">
          <Badge>{category}</Badge>
          <h2 className="mt-3 text-xl font-bold">Create Discipline Record</h2>
          <div className="mt-4 grid gap-4">
            <label className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Student</span>
              <select value={studentId} onChange={(event) => setStudentId(event.target.value)} className="min-h-10 w-full rounded border border-border bg-white px-3 py-2 text-sm">
                {classStudents.map((student) => (
                  <option key={student.id} value={student.id}>
                    {student.admissionNumber} - {student.name}
                  </option>
                ))}
              </select>
            </label>
            <label className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Incident Details</span>
              <textarea
                value={details}
                onChange={(event) => setDetails(event.target.value)}
                className="min-h-32 w-full rounded border border-border bg-white px-3 py-2 text-sm"
                placeholder="Write the incident notes, action taken, and follow-up required."
                required
              />
            </label>
            <Button type="submit">Save and Queue Notices</Button>
          </div>
          {submitted && selectedStudent ? (
            <div className="mt-4 rounded border border-green-200 bg-green-50 p-4 text-sm text-green-800">
              Notice queued to {selectedStudent.parentName} ({selectedStudent.parentPhone}) and the administrator for {category.toLowerCase()}.
            </div>
          ) : null}
        </form>
      </div>
    </div>
  );
}
