"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";

interface TermData {
  termId: string;
  termName: string;
  startDate: Date;
  endDate: Date;
  totalExpected: number;
  totalCollected: number;
  totalArrears: number;
  collectionRate: number;
  studentCount: number;
}

interface FeesTermBreakdownProps {
  terms: TermData[];
  isLoading?: boolean;
}

export function FeesTermBreakdown({ terms, isLoading }: FeesTermBreakdownProps) {
  if (isLoading) {
    return <div className="p-8 text-center text-gray-500">Loading term data...</div>;
  }

  if (!terms || terms.length === 0) {
    return <div className="p-8 text-center text-gray-500">No term data available</div>;
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-gray-900">Collection by Term</h3>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {terms.map((term) => {
          const collectionColor =
            term.collectionRate >= 80
              ? "bg-green-50 border-green-300"
              : term.collectionRate >= 60
              ? "bg-yellow-50 border-yellow-300"
              : "bg-red-50 border-red-300";

          return (
            <div key={term.termId} className={`rounded-lg border-2 p-4 ${collectionColor}`}>
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="font-bold text-gray-900">{term.termName}</p>
                  <p className="text-xs text-gray-600">
                    {new Date(term.startDate).toLocaleDateString()} -{" "}
                    {new Date(term.endDate).toLocaleDateString()}
                  </p>
                </div>
                <Badge
                  className={
                    term.collectionRate >= 80
                      ? "bg-green-100 text-green-800"
                      : term.collectionRate >= 60
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                  }
                >
                  {term.collectionRate}%
                </Badge>
              </div>

              <div className="space-y-2 border-t border-gray-300 pt-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Expected</span>
                  <span className="font-semibold text-gray-900">
                    ${term.totalExpected.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Collected</span>
                  <span className="font-semibold text-green-600">
                    ${term.totalCollected.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Outstanding</span>
                  <span className="font-semibold text-red-600">
                    ${term.totalArrears.toLocaleString()}
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="mt-3 h-3 rounded-full bg-gray-300">
                  <div
                    className={`h-full rounded-full transition-all ${
                      term.collectionRate >= 80
                        ? "bg-green-500"
                        : term.collectionRate >= 60
                        ? "bg-yellow-500"
                        : "bg-red-500"
                    }`}
                    style={{ width: `${Math.min(term.collectionRate, 100)}%` }}
                  />
                </div>

                <p className="text-xs text-gray-600 pt-2">
                  {term.studentCount} students
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
