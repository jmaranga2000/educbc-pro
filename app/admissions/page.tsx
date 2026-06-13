"use client";

import React, { useState, useTransition } from "react";
import Link from "next/link";
import { PublicNav } from "@/components/public/public-nav";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { admitStudentAction } from "@/actions/students.actions";
import {
  GraduationCap,
  User,
  Phone,
  MapPin,
  Calendar,
  CheckCircle2,
  Activity,
  ArrowRight,
  Sparkles,
  Heart
} from "lucide-react";

export default function AdmissionsPage() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [successData, setSuccessData] = useState<{
    admissionNumber: string;
    fullName: string;
    parentEmail: string;
    parentPhone: string;
  } | null>(null);

  // Form states
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [grade, setGrade] = useState("Grade 1");
  const [stream, setStream] = useState("East");
  const [parentName, setParentName] = useState("");
  const [parentPhone, setParentPhone] = useState("");
  const [homePlace, setHomePlace] = useState("");
  const [healthRecords, setHealthRecords] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!firstName || !lastName || !age || !parentName || !parentPhone) {
      setError("Please fill in all required fields.");
      return;
    }

    const parsedAge = parseInt(age, 10);
    if (isNaN(parsedAge) || parsedAge <= 0) {
      setError("Please enter a valid age.");
      return;
    }

    startTransition(async () => {
      try {
        const res = await admitStudentAction({
          firstName,
          middleName: middleName || undefined,
          lastName,
          age: parsedAge,
          grade,
          stream,
          parentName,
          parentPhone,
          homePlace: homePlace || undefined,
          healthRecords: healthRecords || undefined
        });

        if (res.success && res.data) {
          const sanitizedPhone = parentPhone.replace(/[^0-9]/g, "");
          const generatedEmail = `parent_${sanitizedPhone || "contact"}@educbc.com`;

          setSuccessData({
            admissionNumber: res.data.admissionNumber,
            fullName: res.data.fullName,
            parentEmail: generatedEmail,
            parentPhone: parentPhone
          });
        } else {
          setError(res.error || "Something went wrong during admission.");
        }
      } catch (err: any) {
        setError(err.message || "An unexpected error occurred.");
      }
    });
  };

  const resetForm = () => {
    setFirstName("");
    setMiddleName("");
    setLastName("");
    setAge("");
    setGrade("Grade 1");
    setStream("East");
    setParentName("");
    setParentPhone("");
    setHomePlace("");
    setHealthRecords("");
    setSuccessData(null);
    setError(null);
  };

  const grades = [
    "Playgroup",
    "PP1",
    "PP2",
    "Grade 1",
    "Grade 2",
    "Grade 3",
    "Grade 4",
    "Grade 5",
    "Grade 6",
    "Grade 7",
    "Grade 8",
    "Grade 9"
  ];

  const streams = ["East", "West", "North", "South", "A", "B", "C"];

  return (
    <main className="min-h-screen bg-slate-50/50 pb-20">
      <PublicNav />

      <section className="mx-auto max-w-4xl px-4 pt-10 sm:px-6 lg:px-8">
        {/* Header decoration */}
        <div className="text-center mb-8">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary mb-3">
            <GraduationCap className="h-6 w-6" />
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Student Admissions Center
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-lg text-slate-600">
            Admit new learners into the CBC Portal. Student profile registry, parent account association, and health record allocation will compile automatically.
          </p>
        </div>

        {successData ? (
          /* Success Screen */
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xl overflow-hidden p-8 max-w-2xl mx-auto animate-fade-in">
            <div className="text-center">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-500 mb-4 border border-emerald-100">
                <CheckCircle2 className="h-10 w-10" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Admission Completed Successfully!</h2>
              <p className="text-slate-500 mt-1">Learner has been added to active registry</p>
            </div>

            <div className="mt-8 space-y-6">
              {/* Admission Number */}
              <div className="bg-slate-50 border border-slate-100 rounded-xl p-5 text-center">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest block">Admission Number</span>
                <span className="text-3xl font-extrabold text-primary tracking-tight mt-1 block font-mono">
                  {successData.admissionNumber}
                </span>
              </div>

              {/* Student Details */}
              <div className="border-t border-slate-100 pt-6 space-y-3">
                <h3 className="text-sm font-semibold text-slate-900">Student Information</h3>
                <div className="grid grid-cols-2 gap-4 text-sm bg-slate-50/40 p-4 rounded-xl border border-slate-100">
                  <div>
                    <span className="text-slate-400 block text-xs">Full Name</span>
                    <span className="font-semibold text-slate-700">{successData.fullName}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-xs">Placement</span>
                    <span className="font-semibold text-slate-700">{grade} ({stream})</span>
                  </div>
                </div>
              </div>

              {/* Parent Credentials */}
              <div className="border-t border-slate-100 pt-6 space-y-3">
                <h3 className="text-sm font-semibold text-slate-900">Parent Login Credentials</h3>
                <p className="text-xs text-slate-500">
                  A Parent user account has been matched or provisioned. They can use these credentials to log in:
                </p>
                <div className="space-y-2 bg-slate-50/40 p-4 rounded-xl border border-slate-100 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Portal Email:</span>
                    <span className="font-mono font-medium text-slate-700">{successData.parentEmail}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Portal Password:</span>
                    <span className="font-mono font-medium text-slate-700">Parent123!</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Phone Contact:</span>
                    <span className="font-mono font-medium text-slate-700">{successData.parentPhone}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 flex gap-3">
              <Button onClick={resetForm} className="w-full justify-center">
                Admit Another Student
              </Button>
              <Link href="/dashboard/super-admin" className="w-full">
                <Button variant="ghost" className="w-full justify-center">
                  Back to Dashboard
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          /* Admission Form */
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200/80 shadow-xl overflow-hidden">
            {error && (
              <div className="bg-rose-50 border-b border-rose-100 p-4 text-rose-600 text-sm font-medium flex items-start gap-3">
                <div className="h-5 w-5 bg-rose-100 rounded-full flex items-center justify-center shrink-0 text-rose-700 text-xs font-bold font-mono">!</div>
                <span>{error}</span>
              </div>
            )}

            <div className="p-6 sm:p-8 space-y-8">
              {/* SECTION 1: Student Information */}
              <div>
                <div className="flex items-center gap-2 mb-4 pb-2 border-b border-slate-100">
                  <User className="h-5 w-5 text-primary" />
                  <h2 className="text-lg font-bold text-slate-900">Student Information</h2>
                </div>
                <div className="grid gap-5 sm:grid-cols-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">First Name *</label>
                    <Input
                      placeholder="e.g. John"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Middle Name</label>
                    <Input
                      placeholder="e.g. Juma"
                      value={middleName}
                      onChange={(e) => setMiddleName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Last Name *</label>
                    <Input
                      placeholder="e.g. Doe"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-3 mt-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Age *</label>
                    <Input
                      type="number"
                      placeholder="e.g. 8"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Grade Level *</label>
                    <select
                      className="flex h-10 w-full rounded-md border border-border bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                      value={grade}
                      onChange={(e) => setGrade(e.target.value)}
                      required
                    >
                      {grades.map((g) => (
                        <option key={g} value={g}>
                          {g}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Stream Placement *</label>
                    <select
                      className="flex h-10 w-full rounded-md border border-border bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                      value={stream}
                      onChange={(e) => setStream(e.target.value)}
                      required
                    >
                      {streams.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Home Place / Neighborhood</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
                    <Input
                      className="pl-10"
                      placeholder="e.g. Karen, Nairobi"
                      value={homePlace}
                      onChange={(e) => setHomePlace(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* SECTION 2: Parent Information */}
              <div>
                <div className="flex items-center gap-2 mb-4 pb-2 border-b border-slate-100">
                  <Phone className="h-5 w-5 text-primary" />
                  <h2 className="text-lg font-bold text-slate-900">Parent / Guardian Contact</h2>
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Parent's Full Name *</label>
                    <Input
                      placeholder="e.g. Sarah Doe"
                      value={parentName}
                      onChange={(e) => setParentName(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Parent's Phone Number *</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                      <Input
                        className="pl-10"
                        placeholder="e.g. +254712345678"
                        value={parentPhone}
                        onChange={(e) => setParentPhone(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* SECTION 3: Health Records */}
              <div>
                <div className="flex items-center gap-2 mb-4 pb-2 border-b border-slate-100">
                  <Activity className="h-5 w-5 text-primary" />
                  <h2 className="text-lg font-bold text-slate-900">Health & Medical Records</h2>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    Medical Notes / Allergies / Health Records
                  </label>
                  <textarea
                    rows={3}
                    className="flex w-full rounded-md border border-border bg-white px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                    placeholder="e.g. Allergic to peanuts. Asthma inhaler kept in backpack."
                    value={healthRecords}
                    onChange={(e) => setHealthRecords(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="bg-slate-50 px-6 py-5 sm:px-8 flex items-center justify-between border-t border-slate-100">
              <span className="text-xs text-slate-500">* Required fields</span>
              <Button type="submit" disabled={isPending} className="px-6 flex items-center gap-2">
                {isPending ? "Processing..." : "Complete Admission"}
                {!isPending && <ArrowRight className="h-4 w-4" />}
              </Button>
            </div>
          </form>
        )}
      </section>
    </main>
  );
}
