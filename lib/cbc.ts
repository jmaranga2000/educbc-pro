import { CBC_BANDS } from "@/constants";

export function gradeFromScore(score: number) {
  const normalized = Math.max(0, Math.min(100, Math.round(score)));
  return CBC_BANDS.find((band) => normalized >= band.min && normalized <= band.max) ?? CBC_BANDS[3];
}

export function meanScore(scores: number[]) {
  if (scores.length === 0) {
    return 0;
  }

  return Math.round(scores.reduce((total, score) => total + score, 0) / scores.length);
}

export function learnerRisk(score: number, attendance: number) {
  if (score < 50 || attendance < 80) {
    return "High";
  }
  if (score < 65 || attendance < 88) {
    return "Watch";
  }
  return "Stable";
}

export function getStudentPerformanceColor(score: number): "green" | "yellow" | "orange" | "red" {
  if (score >= 80) return "green";
  if (score >= 65) return "yellow";
  if (score >= 50) return "orange";
  return "red";
}

export function getExamPerformanceColor(score: number): "green" | "yellow" | "orange" | "red" | "purple" {
  if (score >= 85) return "green";
  if (score >= 75) return "yellow";
  if (score >= 65) return "orange";
  if (score >= 55) return "red";
  return "purple";
}

export function getPerformanceColor(score: number): "green" | "yellow" | "orange" | "red" {
  if (score >= 80) return "green";
  if (score >= 65) return "yellow";
  if (score >= 50) return "orange";
  return "red";
}

