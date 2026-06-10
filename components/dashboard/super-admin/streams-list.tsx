"use client";

import { useState } from "react";
import { Search, Eye, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export interface Stream {
  id: string;
  name: string;
  grade: string;
  capacity?: number;
  studentCount: number;
  performance: {
    meanScore: number;
    cbcBand: "EE" | "ME" | "AE" | "BE";
    studentsAssessed: number;
  };
}

interface StreamsListProps {
  streams: Stream[];
  isLoading?: boolean;
  onRefresh?: () => void;
  onCreateStream?: () => void;
  onViewStream?: (streamId: string) => void;
}

function getPerformanceColor(score: number): { bg: string; text: string; border: string } {
  if (score >= 80) {
    return { bg: "bg-green-50", text: "text-green-700", border: "border-green-200" };
  }
  if (score >= 65) {
    return { bg: "bg-yellow-50", text: "text-yellow-700", border: "border-yellow-200" };
  }
  if (score >= 50) {
    return { bg: "bg-orange-50", text: "text-orange-700", border: "border-orange-200" };
  }
  return { bg: "bg-red-50", text: "text-red-700", border: "border-red-200" };
}

function getCbcBandColor(band: "EE" | "ME" | "AE" | "BE"): string {
  const colors = {
    EE: "bg-green-100 text-green-700 border-green-200",
    ME: "bg-yellow-100 text-yellow-700 border-yellow-200",
    AE: "bg-orange-100 text-orange-700 border-orange-200",
    BE: "bg-red-100 text-red-700 border-red-200"
  };
  return colors[band];
}

function getCbcBandLabel(band: "EE" | "ME" | "AE" | "BE"): string {
  const labels = {
    EE: "Exceeding Expectations",
    ME: "Meeting Expectations",
    AE: "Approaching Expectations",
    BE: "Below Expectations"
  };
  return labels[band];
}

export function StreamsList({
  streams,
  isLoading = false,
  onRefresh,
  onCreateStream,
  onViewStream
}: StreamsListProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredStreams = streams.filter(
    (stream) =>
      stream.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      stream.grade.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Group streams by grade
  const streamsByGrade = filteredStreams.reduce(
    (acc, stream) => {
      if (!acc[stream.grade]) {
        acc[stream.grade] = [];
      }
      acc[stream.grade].push(stream);
      return acc;
    },
    {} as Record<string, Stream[]>
  );

  const gradeOrder = ["Playgroup", "PP1", "PP2", "Grade 1", "Grade 2", "Grade 3", "Grade 4", "Grade 5", "Grade 6", "Grade 7", "Grade 8", "Grade 9"];
  const sortedGrades = Object.keys(streamsByGrade).sort(
    (a, b) => gradeOrder.indexOf(a) - gradeOrder.indexOf(b)
  );

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by stream name or grade..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <button
          onClick={onCreateStream}
          className="inline-flex min-h-10 items-center gap-2 rounded bg-primary px-4 py-2 text-sm font-bold text-primary-foreground hover:bg-primary/90"
        >
          <Plus className="h-4 w-4" />
          New Stream
        </button>
      </div>

      {isLoading ? (
        <div className="py-8 text-center text-muted-foreground">Loading streams...</div>
      ) : filteredStreams.length === 0 ? (
        <div className="py-8 text-center text-muted-foreground">No streams found</div>
      ) : (
        <div className="space-y-6">
          {sortedGrades.map((grade) => (
            <div key={grade} className="space-y-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">{grade}</h3>

              <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                {streamsByGrade[grade].map((stream) => {
                  const perfColor = getPerformanceColor(stream.performance.meanScore);
                  const bandColor = getCbcBandColor(stream.performance.cbcBand);

                  return (
                    <Card key={stream.id} className={`${perfColor.border} border-2 transition`}>
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1">
                            <CardTitle className="text-base">{stream.name}</CardTitle>
                            <p className="text-xs text-muted-foreground">{stream.grade}</p>
                          </div>
                          <button
                            onClick={() => onViewStream?.(stream.id)}
                            className="rounded bg-secondary px-2 py-1 hover:bg-secondary/80"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                        </div>
                      </CardHeader>

                      <CardContent className="space-y-4">
                        {/* Performance Score */}
                        <div className={`rounded p-3 ${perfColor.bg}`}>
                          <p className={`text-xs font-semibold ${perfColor.text} uppercase`}>Performance Score</p>
                          <p className={`text-2xl font-bold ${perfColor.text}`}>{stream.performance.meanScore}%</p>
                          <div className={`mt-2 rounded border ${bandColor}`}>
                            <p className="text-xs font-semibold">
                              {stream.performance.cbcBand} - {getCbcBandLabel(stream.performance.cbcBand)}
                            </p>
                          </div>
                        </div>

                        {/* Statistics */}
                        <div className="grid grid-cols-2 gap-2">
                          <div className="rounded bg-muted p-2">
                            <p className="text-xs font-semibold text-muted-foreground">Students</p>
                            <p className="text-lg font-bold">{stream.studentCount}</p>
                            {stream.capacity && <p className="text-xs text-muted-foreground">/ {stream.capacity}</p>}
                          </div>
                          <div className="rounded bg-muted p-2">
                            <p className="text-xs font-semibold text-muted-foreground">Assessed</p>
                            <p className="text-lg font-bold">{stream.performance.studentsAssessed}</p>
                          </div>
                        </div>

                        {/* Capacity Indicator */}
                        {stream.capacity && (
                          <div>
                            <p className="mb-1 text-xs font-semibold text-muted-foreground">Capacity</p>
                            <div className="h-2 rounded-full bg-muted">
                              <div
                                className="h-2 rounded-full bg-primary"
                                style={{ width: `${(stream.studentCount / stream.capacity) * 100}%` }}
                              />
                            </div>
                            <p className="mt-1 text-xs text-muted-foreground">
                              {stream.studentCount} / {stream.capacity}
                            </p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
