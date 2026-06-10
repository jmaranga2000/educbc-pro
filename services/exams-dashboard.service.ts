import { connectMongo } from "@/lib/db/mongodb";
import {
  approvalQueue,
  assessmentPeriods,
  cbcEngineSpec,
  performanceRows,
  reportCards,
  riskLearners,
  subjectRows
} from "@/lib/exams-dashboard";
import { CbcAssessment } from "@/models/cbc-assessment";
import { CbcAssessmentPeriod, CbcCompetency, CbcCurriculumNode, CbcGradingBoundary } from "@/models/cbc-engine";
import { Exam } from "@/models/exam";
import { Student } from "@/models/student";

async function withDb<T>(query: () => Promise<T>, fallback: T): Promise<T> {
  try {
    await connectMongo();
    return await query();
  } catch {
    return fallback;
  }
}

export async function getCbcEngineOverview() {
  return withDb(async () => {
    const [nodes, competencies, grading, assessmentCount, learnerCount] = await Promise.all([
      CbcCurriculumNode.find().sort({ level: 1, code: 1 }).lean(),
      CbcCompetency.find().sort({ name: 1 }).lean(),
      CbcGradingBoundary.find().sort({ minScore: -1 }).lean(),
      CbcAssessment.countDocuments(),
      Student.countDocuments()
    ]);

    return {
      hierarchy: nodes.length
        ? nodes.map((node) => ({
            id: String(node._id),
            title: node.name,
            level: node.level,
            detail: node.description || node.learningArea || node.grade || "CBC curriculum node"
          }))
        : cbcEngineSpec.hierarchy.map((item, index) => ({
            id: item.toLowerCase().replaceAll(" ", "-"),
            title: item,
            level: `Level ${index + 1}`,
            detail: "Seed this collection to manage live curriculum hierarchy records."
          })),
      competencies: competencies.length
        ? competencies.map((item) => ({ id: String(item._id), title: item.name, detail: item.description }))
        : cbcEngineSpec.competencies.map((item) => ({ id: item.toLowerCase().replaceAll(" ", "-"), title: item, detail: "Official CBC core competency" })),
      grading: grading.length
        ? grading.map((item) => ({
            id: String(item._id),
            range: `${item.minScore} - ${item.maxScore}`,
            level: item.level,
            value: `${item.numericLevel}`,
            remark: item.remarkTemplate
          }))
        : cbcEngineSpec.scoring.map((item) => ({ id: item.level.toLowerCase(), ...item })),
      assessmentTypes: cbcEngineSpec.assessmentTypes.map((item) => ({ id: item.toLowerCase().replaceAll(" ", "-"), title: item, detail: "Supported CBC assessment type" })),
      collections: cbcEngineSpec.collections.map((item) => ({ id: item, title: item, detail: "MongoDB collection from CBC engine architecture" })),
      workflow: cbcEngineSpec.workflow.map((item, index) => ({ id: `${index + 1}`, title: item, detail: "Operational workflow step" })),
      stats: {
        curriculumNodes: nodes.length,
        competencies: competencies.length || cbcEngineSpec.competencies.length,
        assessmentCount,
        learnerCount
      }
    };
  }, {
    hierarchy: cbcEngineSpec.hierarchy.map((item, index) => ({
      id: item.toLowerCase().replaceAll(" ", "-"),
      title: item,
      level: `Level ${index + 1}`,
      detail: "CBC curriculum hierarchy level"
    })),
    competencies: cbcEngineSpec.competencies.map((item) => ({ id: item.toLowerCase().replaceAll(" ", "-"), title: item, detail: "Official CBC core competency" })),
    grading: cbcEngineSpec.scoring.map((item) => ({ id: item.level.toLowerCase(), ...item })),
    assessmentTypes: cbcEngineSpec.assessmentTypes.map((item) => ({ id: item.toLowerCase().replaceAll(" ", "-"), title: item, detail: "Supported CBC assessment type" })),
    collections: cbcEngineSpec.collections.map((item) => ({ id: item, title: item, detail: "MongoDB collection from CBC engine architecture" })),
    workflow: cbcEngineSpec.workflow.map((item, index) => ({ id: `${index + 1}`, title: item, detail: "Operational workflow step" })),
    stats: {
      curriculumNodes: cbcEngineSpec.hierarchy.length,
      competencies: cbcEngineSpec.competencies.length,
      assessmentCount: 0,
      learnerCount: 0
    }
  });
}

export async function getCbcEngineSection(section: string) {
  const overview = await getCbcEngineOverview();
  const sectionMap = {
    hierarchy: overview.hierarchy,
    competencies: overview.competencies,
    grading: overview.grading,
    "assessment-types": overview.assessmentTypes,
    collections: overview.collections,
    workflow: overview.workflow
  };

  return sectionMap[section as keyof typeof sectionMap] ?? [];
}

export async function getAssessmentPeriods() {
  return withDb(async () => {
    const periods = await CbcAssessmentPeriod.find().sort({ createdAt: -1 }).lean();
    return periods.length
      ? periods.map((period) => ({
          id: String(period._id),
          name: period.name,
          term: period.term,
          status: period.status,
          completion: `${period.completion}%`,
          assessments: period.assessments
        }))
      : assessmentPeriods;
  }, assessmentPeriods);
}

export async function getPerformanceRows() {
  return withDb(async () => {
    const [assessments, exams] = await Promise.all([CbcAssessment.find().lean(), Exam.find().lean()]);
    if (!assessments.length && !exams.length) return performanceRows;

    const grouped = new Map<string, number[]>();
    assessments.forEach((assessment) => {
      const key = `${assessment.grade} ${assessment.subject}`;
      grouped.set(key, [...(grouped.get(key) ?? []), assessment.competencyScore]);
    });

    return Array.from(grouped.entries()).map(([name, scores], index) => {
      const mean = Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length);
      return {
        id: `perf-db-${index}`,
        name,
        scope: "CBC Assessment",
        mean,
        achievement: mean >= 90 ? "EE" : mean >= 75 ? "ME" : mean >= 50 ? "AE" : "BE",
        completion: "Live",
        top: "From assessment scores",
        risk: scores.filter((score) => score < 50).length
      };
    });
  }, performanceRows);
}

export async function getSubjectRows() {
  return withDb(async () => {
    const assessments = await CbcAssessment.find().lean();
    if (!assessments.length) return subjectRows;
    const grouped = new Map<string, number[]>();
    assessments.forEach((assessment) => grouped.set(assessment.subject, [...(grouped.get(assessment.subject) ?? []), assessment.competencyScore]));
    return Array.from(grouped.entries()).map(([subject, scores], index) => ({
      id: `subject-db-${index}`,
      subject,
      teacher: "Assigned teacher",
      grade: "Multiple grades",
      mean: Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length),
      trend: "Live",
      completion: `${scores.length} scores`
    }));
  }, subjectRows);
}

export async function getReportCards() {
  return withDb(async () => {
    const students = await Student.find().limit(20).lean();
    return students.length
      ? students.map((student) => ({
          id: String(student._id),
          student: `${student.firstName} ${student.lastName}`,
          admission: student.admissionNumber,
          grade: `${student.grade} ${student.stream}`,
          status: "Draft",
          approval: "Awaiting report generation",
          export: "PDF, Excel"
        }))
      : reportCards;
  }, reportCards);
}

export async function getApprovalQueue() {
  return approvalQueue;
}

export async function getRiskLearners() {
  return riskLearners;
}
