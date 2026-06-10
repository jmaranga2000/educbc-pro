"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";

interface BalanceData {
  studentId: string;
  firstName: string;
  lastName: string;
  admissionNumber: string;
  grade: string;
  stream: string;
  balance: number;
  status: "paid" | "partial" | "arrears";
  lastPaymentDate?: Date;
  totalOwed: number;
}

interface FeesBalanceTrackerProps {
  balances: BalanceData[];
  isLoading?: boolean;
  onStudentClick?: (studentId: string) => void;
}

const statusBadgeMap = {
  paid: "bg-green-100 text-green-800",
  partial: "bg-yellow-100 text-yellow-800",
  arrears: "bg-red-100 text-red-800"
};

const statusLabelMap = {
  paid: "Paid ✓",
  partial: "Partial",
  arrears: "Arrears"
};

export function FeesBalanceTracker({ balances, isLoading, onStudentClick }: FeesBalanceTrackerProps) {
  if (isLoading) {
    return <div className="p-8 text-center text-gray-500">Loading balance data...</div>;
  }

  if (!balances || balances.length === 0) {
    return <div className="p-8 text-center text-gray-500">No outstanding balances</div>;
  }

  // Group by grade
  const gradeMap = new Map<string, BalanceData[]>();
  balances.forEach((balance) => {
    if (!gradeMap.has(balance.grade)) {
      gradeMap.set(balance.grade, []);
    }
    gradeMap.get(balance.grade)!.push(balance);
  });

  const totalOutstanding = balances.reduce((sum, b) => sum + b.balance, 0);

  return (
    <div className="space-y-6">
      <div className="mb-4">
        <h3 className="text-lg font-bold text-gray-900">Outstanding Balances</h3>
        <p className="text-sm text-gray-600">
          Total arrears: <span className="font-bold text-red-600">${totalOutstanding.toLocaleString()}</span>
        </p>
      </div>

      {Array.from(gradeMap.entries()).map(([grade, gradeBalances]) => (
        <div key={grade}>
          <h4 className="mb-3 text-sm font-semibold text-gray-700 uppercase tracking-wider">
            {grade} ({gradeBalances.length} students)
          </h4>

          <div className="space-y-2">
            {gradeBalances.map((balance) => (
              <button
                key={balance.studentId}
                onClick={() => onStudentClick?.(balance.studentId)}
                className="flex w-full items-center gap-4 rounded-lg border-2 border-red-200 bg-red-50 p-3 text-left transition-all hover:shadow-md hover:border-red-300"
              >
                {/* Student Info */}
                <div className="flex-1 min-w-0">
                  <p className="truncate font-semibold text-gray-900">
                    {balance.firstName} {balance.lastName}
                  </p>
                  <p className="text-xs text-gray-600">{balance.admissionNumber}</p>
                </div>

                {/* Stream and Status */}
                <div className="flex items-center gap-2">
                  <div className="text-right">
                    <p className="text-xs text-gray-600">{balance.stream}</p>
                    <Badge className={statusBadgeMap[balance.status]}>
                      {statusLabelMap[balance.status]}
                    </Badge>
                  </div>

                  {/* Balance Display */}
                  <div className="text-right min-w-[100px]">
                    <p className="text-lg font-bold text-red-600">${balance.balance.toLocaleString()}</p>
                    <p className="text-xs text-gray-600">
                      Of ${balance.totalOwed.toLocaleString()}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
