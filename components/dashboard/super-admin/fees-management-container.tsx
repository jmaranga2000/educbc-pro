"use client";

import React, { useCallback, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { FeesSummaryCard } from "./fees-summary-card";
import { FeesTermBreakdown } from "./fees-term-breakdown";
import { FeesBalanceTracker } from "./fees-balance-tracker";
import { FeesCollectionStatus } from "./fees-collection-status";
import { StudentFeesModal } from "./student-fees-modal";
import {
  fetchFeesSummaryAction,
  fetchFeesPerTermAction,
  fetchFeesBalanceAction,
  fetchCollectionMetricsByGradeAction,
  fetchStudentFeesAction
} from "@/actions/fees.actions";

export function FeesManagementContainer() {
  const [summary, setSummary] = useState<any | null>(null);
  const [terms, setTerms] = useState<any[]>([]);
  const [balances, setBalances] = useState<any[]>([]);
  const [metrics, setMetrics] = useState<any[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<any | null>(null);
  const [filterGrade, setFilterGrade] = useState<string>("");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load all data
  const loadData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [summaryRes, termsRes, balancesRes, metricsRes] = await Promise.all([
        fetchFeesSummaryAction(),
        fetchFeesPerTermAction(),
        fetchFeesBalanceAction(undefined, filterGrade || undefined),
        fetchCollectionMetricsByGradeAction()
      ]);

      if (summaryRes.success) {
        setSummary(summaryRes.data);
      } else {
        setError(summaryRes.error || "Failed to load summary");
      }

      if (termsRes.success) {
        setTerms(termsRes.data || []);
      }

      if (balancesRes.success) {
        setBalances(balancesRes.data || []);
      }

      if (metricsRes.success) {
        setMetrics(metricsRes.data || []);
      }
    } catch (err) {
      setError("An error occurred while loading data");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [filterGrade]);

  // Load data on mount and when filter changes
  useEffect(() => {
    loadData();
  }, [loadData]);

  // Handle student click to view details
  const handleStudentClick = useCallback(async (studentId: string) => {
    try {
      const result = await fetchStudentFeesAction(studentId);
      if (result.success) {
        setSelectedStudent(result.data);
      } else {
        setError(result.error || "Failed to load student fees");
      }
    } catch (err) {
      setError("An error occurred while loading student fees");
      console.error(err);
    }
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Fees Management</h1>
        <p className="mt-1 text-gray-600">
          Track and manage school fees collection across grades, terms, and students
        </p>
      </div>

      {/* Filter */}
      <div className="rounded-lg bg-white p-4 shadow-sm">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Filter by Grade
        </label>
        <select
          value={filterGrade}
          onChange={(e) => setFilterGrade(e.target.value)}
          className="w-full sm:w-64 rounded border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none"
        >
          <option value="">All Grades</option>
          <option value="Playgroup">Playgroup</option>
          <option value="PP1">PP1</option>
          <option value="PP2">PP2</option>
          {Array.from({ length: 9 }, (_, i) => (
            <option key={i + 1} value={`Grade ${i + 1}`}>
              Grade {i + 1}
            </option>
          ))}
        </select>
      </div>

      {/* Error Message */}
      {error && (
        <div className="rounded-lg bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Summary Card */}
      {summary && !isLoading && (
        <FeesSummaryCard summary={summary} />
      )}

      {isLoading && (
        <div className="rounded-lg bg-white p-8 text-center text-gray-500">
          Loading fees data...
        </div>
      )}

      {/* Collection Status by Grade */}
      {!isLoading && metrics.length > 0 && (
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <FeesCollectionStatus metrics={metrics} />
        </div>
      )}

      {/* Term Breakdown */}
      {!isLoading && terms.length > 0 && (
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <FeesTermBreakdown terms={terms} />
        </div>
      )}

      {/* Outstanding Balances */}
      {!isLoading && balances.length > 0 && (
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <FeesBalanceTracker
            balances={balances}
            onStudentClick={handleStudentClick}
          />
        </div>
      )}

      {!isLoading && balances.length === 0 && summary && (
        <div className="rounded-lg bg-green-50 border-2 border-green-300 p-8 text-center">
          <p className="text-lg font-semibold text-green-900">
            ✓ All fees are paid! No outstanding balances.
          </p>
        </div>
      )}

      {/* Student Fees Details Modal */}
      <StudentFeesModal
        student={selectedStudent}
        isOpen={!!selectedStudent}
        onClose={() => setSelectedStudent(null)}
      />
    </div>
  );
}
