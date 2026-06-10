"use client";

import React from "react";

interface FeesSummaryCardProps {
  summary: {
    academicYear: string;
    totalExpected: number;
    totalCollected: number;
    totalArrears: number;
    collectionRate: number;
    studentCount: number;
  };
}

export function FeesSummaryCard({ summary }: FeesSummaryCardProps) {
  return (
    <div className="rounded-lg bg-gradient-to-br from-blue-50 to-blue-100 p-6 shadow-lg border-2 border-blue-300">
      <h2 className="mb-6 text-2xl font-bold text-blue-900">Fees Summary - {summary.academicYear}</h2>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
        {/* Total Expected */}
        <div className="rounded-lg bg-white p-4 shadow-md">
          <p className="text-xs font-semibold text-gray-600 uppercase">Total Expected</p>
          <p className="mt-2 text-3xl font-bold text-blue-600">
            ${summary.totalExpected.toLocaleString()}
          </p>
          <p className="mt-1 text-xs text-gray-500">{summary.studentCount} students</p>
        </div>

        {/* Total Collected */}
        <div className="rounded-lg bg-white p-4 shadow-md border-l-4 border-green-500">
          <p className="text-xs font-semibold text-gray-600 uppercase">Collected</p>
          <p className="mt-2 text-3xl font-bold text-green-600">
            ${summary.totalCollected.toLocaleString()}
          </p>
          <p className="mt-1 text-xs text-gray-500">Amount paid</p>
        </div>

        {/* Total Arrears */}
        <div className="rounded-lg bg-white p-4 shadow-md border-l-4 border-red-500">
          <p className="text-xs font-semibold text-gray-600 uppercase">Outstanding</p>
          <p className="mt-2 text-3xl font-bold text-red-600">
            ${summary.totalArrears.toLocaleString()}
          </p>
          <p className="mt-1 text-xs text-gray-500">Balance due</p>
        </div>

        {/* Collection Rate */}
        <div className="rounded-lg bg-white p-4 shadow-md">
          <p className="text-xs font-semibold text-gray-600 uppercase">Collection Rate</p>
          <p className="mt-2 text-3xl font-bold text-blue-600">{summary.collectionRate}%</p>
          <div className="mt-2 h-2 rounded-full bg-gray-300">
            <div
              className="h-full rounded-full bg-blue-500 transition-all"
              style={{ width: `${summary.collectionRate}%` }}
            />
          </div>
        </div>

        {/* Percentage */}
        <div className="rounded-lg bg-white p-4 shadow-md">
          <p className="text-xs font-semibold text-gray-600 uppercase">Per Student Avg</p>
          <p className="mt-2 text-3xl font-bold text-purple-600">
            ${Math.round(summary.totalCollected / summary.studentCount).toLocaleString()}
          </p>
          <p className="mt-1 text-xs text-gray-500">Average collected</p>
        </div>
      </div>
    </div>
  );
}
