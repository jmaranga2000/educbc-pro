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
