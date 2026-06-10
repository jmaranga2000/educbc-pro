"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

interface StudentFeeData {
  studentId: string;
  firstName: string;
  lastName: string;
  admissionNumber: string;
  grade: string;
  stream: string;
  parentName?: string;
  parentContact?: string;
  totalExpected: number;
  totalPaid: number;
  totalBalance: number;
  paymentHistory: Array<{
    paymentId: string;
    amount: number;
    date: Date;
    term: string;
    method: string;
    reference?: string;
  }>;
  termBreakdown: Array<{
    term: string;
    expected: number;
    paid: number;
    balance: number;
    status: "paid" | "partial" | "pending";
  }>;
}

interface StudentFeesModalProps {
  student: StudentFeeData | null;
  isOpen: boolean;
  onClose: () => void;
}

const statusBadgeMap = {
  paid: "bg-green-100 text-green-800",
  partial: "bg-yellow-100 text-yellow-800",
  pending: "bg-red-100 text-red-800"
};

export function StudentFeesModal({
  student,
  isOpen,
  onClose
}: StudentFeesModalProps) {
  if (!student) return null;

  const paymentPercentage = student.totalExpected > 0 
    ? Math.round((student.totalPaid / student.totalExpected) * 100)
    : 0;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Student Fee Details</DialogTitle>
          <DialogDescription>
            {student.firstName} {student.lastName} ({student.admissionNumber}) - {student.grade} {student.stream}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Student Info */}
          <div className="rounded-lg bg-gray-50 p-4">
            <h3 className="mb-4 font-semibold text-gray-900">Student Information</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-xs font-medium text-gray-600">Admission Number</p>
                <p className="mt-1 text-sm text-gray-900">{student.admissionNumber}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-600">Grade/Stream</p>
                <p className="mt-1 text-sm text-gray-900">{student.grade} - {student.stream}</p>
              </div>
              {student.parentName && (
                <div>
                  <p className="text-xs font-medium text-gray-600">Parent/Guardian</p>
                  <p className="mt-1 text-sm text-gray-900">{student.parentName}</p>
                </div>
              )}
              {student.parentContact && (
                <div>
                  <p className="text-xs font-medium text-gray-600">Contact</p>
                  <p className="mt-1 text-sm text-gray-900">{student.parentContact}</p>
                </div>
              )}
            </div>
          </div>

          {/* Fee Summary Card */}
          <div className={`rounded-lg p-6 ${
            student.totalBalance === 0 
              ? 'bg-green-50 border-2 border-green-300'
              : student.totalBalance > 0
              ? 'bg-red-50 border-2 border-red-300'
              : 'bg-blue-50 border-2 border-blue-300'
          }`}>
            <h3 className="mb-4 font-semibold text-gray-900">Fee Status Summary</h3>

            <div className="grid gap-4 sm:grid-cols-3 mb-4">
              <div className="rounded-lg bg-white p-4">
                <p className="text-xs font-medium text-gray-600">Total Expected</p>
                <p className="mt-2 text-2xl font-bold text-gray-900">
                  ${student.totalExpected.toLocaleString()}
                </p>
              </div>
              <div className="rounded-lg bg-white p-4 border-l-4 border-green-500">
                <p className="text-xs font-medium text-gray-600">Amount Paid</p>
                <p className="mt-2 text-2xl font-bold text-green-600">
                  ${student.totalPaid.toLocaleString()}
                </p>
              </div>
              <div className={`rounded-lg bg-white p-4 border-l-4 ${
                student.totalBalance === 0 ? 'border-green-500' : 'border-red-500'
              }`}>
                <p className="text-xs font-medium text-gray-600">Balance Due</p>
                <p className={`mt-2 text-2xl font-bold ${
                  student.totalBalance === 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  ${student.totalBalance.toLocaleString()}
                </p>
              </div>
            </div>

            {/* Progress Bar */}
            <div>
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="text-gray-600">Payment Progress</span>
                <span className="font-semibold text-gray-900">{paymentPercentage}%</span>
              </div>
              <div className="h-4 rounded-full bg-gray-300">
                <div
                  className={`h-full rounded-full transition-all ${
                    paymentPercentage === 100 ? 'bg-green-500' : 'bg-blue-500'
                  }`}
                  style={{ width: `${paymentPercentage}%` }}
                />
              </div>
            </div>
          </div>

          {/* Term Breakdown */}
          <div className="rounded-lg bg-gray-50 p-4">
            <h3 className="mb-4 font-semibold text-gray-900">Fee Breakdown by Term</h3>
            <div className="space-y-3">
              {student.termBreakdown.map((term) => (
                <div key={term.term} className="rounded-lg bg-white p-3 border-l-4 border-blue-300">
                  <div className="mb-2 flex items-center justify-between">
                    <p className="font-semibold text-gray-900">{term.term}</p>
                    <Badge className={statusBadgeMap[term.status]}>
                      {term.status.charAt(0).toUpperCase() + term.status.slice(1)}
                    </Badge>
                  </div>
                  <div className="grid gap-2 text-sm sm:grid-cols-3">
                    <div>
                      <span className="text-gray-600">Expected: </span>
                      <span className="font-semibold text-gray-900">${term.expected.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Paid: </span>
                      <span className="font-semibold text-green-600">${term.paid.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Balance: </span>
                      <span className={`font-semibold ${
                        term.balance === 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        ${term.balance.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Payment History */}
          {student.paymentHistory && student.paymentHistory.length > 0 && (
            <div className="rounded-lg bg-gray-50 p-4">
              <h3 className="mb-4 font-semibold text-gray-900">Payment History</h3>
              <div className="max-h-48 space-y-2 overflow-y-auto">
                {student.paymentHistory.map((payment) => (
                  <div key={payment.paymentId} className="rounded-lg bg-white p-3 border-l-4 border-green-300">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-gray-900">
                          ${payment.amount.toLocaleString()}
                        </p>
                        <p className="text-xs text-gray-600">
                          {new Date(payment.date).toLocaleDateString()} • {payment.method}
                        </p>
                        <p className="text-xs text-gray-600">{payment.term}</p>
                      </div>
                      {payment.reference && (
                        <p className="text-xs font-mono text-gray-500">{payment.reference}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

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
