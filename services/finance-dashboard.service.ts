import { connectMongo } from "@/lib/db/mongodb";
import {
  fallbackArrears,
  fallbackFeeStructures,
  fallbackIntegrations,
  fallbackPayments,
  fallbackReports,
  financeProfile
} from "@/lib/finance-dashboard";
import { Fee } from "@/models/fee";
import { Payment } from "@/models/payment";
import { Student } from "@/models/student";

async function withDb<T>(query: () => Promise<T>, fallback: T): Promise<T> {
  try {
    await connectMongo();
    return await query();
  } catch {
    return fallback;
  }
}

export async function getFinanceSummary() {
  return withDb(async () => {
    const [fees, payments, students] = await Promise.all([Fee.find().lean(), Payment.find().lean(), Student.find().lean()]);
    if (!fees.length && !payments.length && !students.length) return financeProfile;

    const expected = fees.reduce((sum, fee) => sum + Number(fee.amount || 0), 0);
    const collected = payments.reduce((sum, payment) => sum + Number(payment.amount || 0), 0);
    const arrears = students.reduce((sum, student) => sum + Number(student.feeBalance || 0), 0);
    const rate = expected > 0 ? Math.round((collected / expected) * 100) : 0;

    return {
      ...financeProfile,
      expected: `KES ${expected.toLocaleString()}`,
      collected: `KES ${collected.toLocaleString()}`,
      arrears: `KES ${arrears.toLocaleString()}`,
      collectionRate: `${rate}%`
    };
  }, financeProfile);
}

export async function getFeeStructures() {
  return withDb(async () => {
    const fees = await Fee.find().sort({ grade: 1 }).lean();
    return fees.length
      ? fees.map((fee) => ({
          id: String(fee._id),
          name: fee.name,
          grade: fee.grade,
          term: fee.termId,
          amount: fee.amount,
          due: fee.dueAt ? new Date(fee.dueAt).toISOString().slice(0, 10) : "Not set",
          voteHeads: fee.voteHeads.map((head) => head.name).join(", ") || "None"
        }))
      : fallbackFeeStructures;
  }, fallbackFeeStructures);
}

export async function getPayments() {
  return withDb(async () => {
    const [payments, students] = await Promise.all([Payment.find().sort({ paidAt: -1 }).lean(), Student.find().lean()]);
    if (!payments.length) return fallbackPayments;
    return payments.map((payment) => {
      const student = students.find((item) => String(item._id) === payment.studentId);
      return {
        id: String(payment._id),
        student: student ? `${student.firstName} ${student.lastName}` : payment.studentId,
        admission: student?.admissionNumber ?? "Unknown",
        amount: payment.amount,
        method: payment.method,
        reference: payment.reference,
        paidAt: new Date(payment.paidAt).toISOString().slice(0, 10),
        status: payment.feeId ? "Allocated" : "Pending allocation"
      };
    });
  }, fallbackPayments);
}

export async function getArrears() {
  return withDb(async () => {
    const students = await Student.find({ feeBalance: { $gt: 0 } }).sort({ feeBalance: -1 }).lean();
    return students.length
      ? students.map((student) => ({
          id: String(student._id),
          student: `${student.firstName} ${student.lastName}`,
          admission: student.admissionNumber,
          grade: `${student.grade} ${student.stream}`,
          balance: student.feeBalance,
          aging: "Live balance",
          parent: student.parentIds.join(", ") || "Not linked",
          status: student.feeBalance > 10000 ? "Call parent" : "Reminder sent"
        }))
      : fallbackArrears;
  }, fallbackArrears);
}

export async function getFinanceReports() {
  return fallbackReports;
}

export async function getReceipts() {
  return getPayments();
}

export async function getReconciliationRows() {
  const payments = await getPayments();
  return payments.map((payment) => ({
    id: payment.id,
    source: payment.method,
    reference: payment.reference,
    student: payment.student,
    amount: payment.amount,
    status: payment.status === "Allocated" || payment.status === "Receipted" ? "Matched" : "Needs review",
    action: payment.status === "Pending allocation" ? "Allocate to fee structure" : "Verify receipt"
  }));
}

export async function getIntegrations() {
  return fallbackIntegrations;
}
