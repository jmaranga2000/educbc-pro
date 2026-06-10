"use client";

import React from "react";

interface CollectionMetric {
  grade: string;
  studentCount: number;
  totalExpected: number;
  totalCollected: number;
  collectionRate: number;
}

interface FeesCollectionStatusProps {
  metrics: CollectionMetric[];
  isLoading?: boolean;
}

export function FeesCollectionStatus({ metrics, isLoading }: FeesCollectionStatusProps) {
  if (isLoading) {
    return <div className="p-8 text-center text-gray-500">Loading collection metrics...</div>;
  }

  if (!metrics || metrics.length === 0) {
    return <div className="p-8 text-center text-gray-500">No collection data available</div>;
  }

  const totalMetrics = {
    students: metrics.reduce((sum, m) => sum + m.studentCount, 0),
    expected: metrics.reduce((sum, m) => sum + m.totalExpected, 0),
    collected: metrics.reduce((sum, m) => sum + m.totalCollected, 0),
    rate: Math.round(
      (metrics.reduce((sum, m) => sum + m.totalCollected, 0) /
        metrics.reduce((sum, m) => sum + m.totalExpected, 0)) *
        100
    )
  };

  return (
    <div className="space-y-6">
      <div className="mb-4">
        <h3 className="text-lg font-bold text-gray-900">Collection Status by Grade</h3>
      </div>

      {/* Overall Stats */}
      <div className="rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 p-6 text-white shadow-lg">
        <div className="grid gap-4 sm:grid-cols-4">
          <div>
            <p className="text-sm font-medium opacity-90">Total Students</p>
            <p className="text-3xl font-bold">{totalMetrics.students}</p>
          </div>
          <div>
            <p className="text-sm font-medium opacity-90">Expected</p>
            <p className="text-3xl font-bold">${totalMetrics.expected.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-sm font-medium opacity-90">Collected</p>
            <p className="text-3xl font-bold">${totalMetrics.collected.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-sm font-medium opacity-90">Overall Rate</p>
            <p className="text-3xl font-bold">{totalMetrics.rate}%</p>
          </div>
        </div>
      </div>

      {/* Grade Breakdown */}
      <div className="space-y-3">
        {metrics.map((metric) => {
          const collectionColor =
            metric.collectionRate >= 80
              ? "text-green-600"
              : metric.collectionRate >= 60
              ? "text-yellow-600"
              : "text-red-600";

          const barColor =
            metric.collectionRate >= 80
              ? "bg-green-500"
              : metric.collectionRate >= 60
              ? "bg-yellow-500"
              : "bg-red-500";

          return (
            <div key={metric.grade} className="rounded-lg bg-white p-4 shadow-sm border border-gray-200">
              <div className="mb-3 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-gray-900">{metric.grade}</p>
                  <p className="text-xs text-gray-600">{metric.studentCount} students</p>
                </div>

                <div className="text-right">
                  <p className={`text-2xl font-bold ${collectionColor}`}>{metric.collectionRate}%</p>
                  <p className="text-xs text-gray-600">
                    ${metric.totalCollected.toLocaleString()} / $
                    {metric.totalExpected.toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="h-4 rounded-full bg-gray-200">
                <div
                  className={`h-full rounded-full transition-all ${barColor}`}
                  style={{ width: `${Math.min(metric.collectionRate, 100)}%` }}
                />
              </div>

              <div className="mt-2 grid gap-2 text-xs text-gray-600 sm:grid-cols-3">
                <div>
                  <span className="font-medium">Expected:</span> ${metric.totalExpected.toLocaleString()}
                </div>
                <div>
                  <span className="font-medium text-green-600">Collected:</span> ${metric.totalCollected.toLocaleString()}
                </div>
                <div>
                  <span className="font-medium text-red-600">Outstanding:</span> $
                  {(metric.totalExpected - metric.totalCollected).toLocaleString()}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
