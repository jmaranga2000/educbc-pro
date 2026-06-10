export function getStudentPerformanceColor(score: number): "green" | "yellow" | "orange" | "red" {
  if (score >= 80) return "green";
  if (score >= 65) return "yellow";
  if (score >= 50) return "orange";
  return "red";
}
