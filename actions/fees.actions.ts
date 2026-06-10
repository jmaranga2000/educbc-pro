"use server";

import { Payment } from "@/models/payment";
import { Fee } from "@/models/fee";
import { Student } from "@/models/student";
import { User } from "@/models/user";
import { Term } from "@/models/term";
import { AcademicYear } from "@/models/academic-year";

export type FeesSummary = {
  academicYearId: string;
  academicYear: string;
  totalExpected: number;
  totalCollected: number;
  totalArrears: number;
  collectionRate: number;
  studentCount: number;
};

export type TermFees = {
  termId: string;
  termName: string;
  startDate: Date;
  endDate: Date;
  totalExpected: number;
  totalCollected: number;
  totalArrears: number;
  collectionRate: number;
  studentCount: number;
};

export type FeeBalance = {
  studentId: string;
  firstName: string;
  lastName: string;
  admissionNumber: string;
  grade: string;
  stream: string;
  balance: number;
  status: "paid" | "partial" | "arrears";
  lastPaymentDate?: Date;
  totalOwed: number;
};

export type StudentFeeDetail = {
  studentId: string;
  firstName: string;
  lastName: string;
  admissionNumber: string;
  grade: string;
  stream: string;
  parentName?: string;
  parentContact?: string;
  totalExpected: number;
  totalPaid: number;
  totalBalance: number;
  paymentHistory: Array<{
    paymentId: string;
    amount: number;
    date: Date;
    term: string;
    method: string;
    reference?: string;
  }>;
  termBreakdown: Array<{
    term: string;
    expected: number;
    paid: number;
    balance: number;
    status: "paid" | "partial" | "pending";
  }>;
};

export type CollectionMetrics = {
  grade: string;
  studentCount: number;
  totalExpected: number;
  totalCollected: number;
  collectionRate: number;
};

/**
 * Fetch fees summary for the current academic year
 */
export async function fetchFeesSummaryAction(academicYearId?: string) {
  try {
    // Get current academic year if not provided
    let yearId = academicYearId;
    if (!yearId) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const currentYear = (await AcademicYear.findOne({
        isCurrent: true
      }).lean()) as any;
      if (currentYear) {
        yearId = currentYear._id.toString();
      }
    }

    // Get all payments for this year
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const payments = (await Payment.find({
      academicYearId: yearId
    }).lean()) as any[];

    // Get all fees for this year
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const fees = (await Fee.find({
      academicYearId: yearId
    }).lean()) as any[];

    // Calculate totals
    const totalCollected = payments.reduce((sum, p) => sum + p.amount, 0);
    const totalExpected = fees.reduce((sum, f) => sum + f.amount, 0);
    const totalArrears = totalExpected - totalCollected;
    const collectionRate = totalExpected > 0 ? Math.round((totalCollected / totalExpected) * 100) : 0;

    // Get academic year info
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const academicYear = (await AcademicYear.findById(yearId).lean()) as any;
    
    // Get unique students
    const studentIds = new Set([
      ...fees.map((f) => f.studentId),
      ...payments.map((p) => p.studentId)
    ]);

    return {
      success: true,
      data: {
        academicYearId: yearId,
        academicYear: academicYear?.year || "Current Year",
        totalExpected,
        totalCollected,
        totalArrears,
        collectionRate,
        studentCount: studentIds.size
      } as FeesSummary
    };
  } catch (error) {
    console.error("Error fetching fees summary:", error);
    return { success: false, error: "Failed to fetch fees summary" };
  }
}

/**
 * Fetch fees breakdown per term
 */
export async function fetchFeesPerTermAction(academicYearId?: string) {
  try {
    let yearId = academicYearId;
    if (!yearId) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const currentYear = (await AcademicYear.findOne({
        isCurrent: true
      }).lean()) as any;
      if (currentYear) {
        yearId = currentYear._id.toString();
      }
    }

    // Get all terms for this year
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const terms = (await Term.find({
      academicYearId: yearId
    }).lean()) as any[];

    // For each term, calculate fees
    const termFees = await Promise.all(
      terms.map(async (term) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const fees = (await Fee.find({
          termId: term._id.toString()
        }).lean()) as any[];

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const payments = (await Payment.find({
          termId: term._id.toString()
        }).lean()) as any[];

        const totalExpected = fees.reduce((sum, f) => sum + f.amount, 0);
        const totalCollected = payments.reduce((sum, p) => sum + p.amount, 0);
        const totalArrears = totalExpected - totalCollected;
        const collectionRate = totalExpected > 0 ? Math.round((totalCollected / totalExpected) * 100) : 0;

        const studentIds = new Set([
          ...fees.map((f) => f.studentId),
          ...payments.map((p) => p.studentId)
        ]);

        return {
          termId: term._id.toString(),
          termName: term.name,
          startDate: term.startDate,
          endDate: term.endDate,
          totalExpected,
          totalCollected,
          totalArrears,
          collectionRate,
          studentCount: studentIds.size
        };
      })
    );

    return { success: true, data: termFees };
  } catch (error) {
    console.error("Error fetching fees per term:", error);
    return { success: false, error: "Failed to fetch fees per term" };
  }
}

/**
 * Fetch students with outstanding balances
 */
export async function fetchFeesBalanceAction(academicYearId?: string, filterGrade?: string) {
  try {
    let yearId = academicYearId;
    if (!yearId) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const currentYear = (await AcademicYear.findOne({
        isCurrent: true
      }).lean()) as any;
      if (currentYear) {
        yearId = currentYear._id.toString();
      }
    }

    // Get all students
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const query: any = filterGrade ? { grade: filterGrade } : {};
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const students = (await Student.find(query).lean()) as any[];

    // For each student, calculate balance
    const balances = await Promise.all(
      students.map(async (student) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const fees = (await Fee.find({
          studentId: student._id.toString(),
          academicYearId: yearId
        }).lean()) as any[];

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const payments = (await Payment.find({
          studentId: student._id.toString(),
          academicYearId: yearId
        }).lean()) as any[];

        const totalExpected = fees.reduce((sum, f) => sum + f.amount, 0);
        const totalPaid = payments.reduce((sum, p) => sum + p.amount, 0);
        const balance = totalExpected - totalPaid;

        let status: "paid" | "partial" | "arrears" = "paid";
        if (balance > 0 && totalPaid === 0) {
          status = "arrears";
        } else if (balance > 0) {
          status = "partial";
        }

        const lastPayment = payments.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        )[0];

        return {
          studentId: student._id.toString(),
          firstName: student.firstName,
          lastName: student.lastName,
          admissionNumber: student.admissionNumber,
          grade: student.grade,
          stream: student.stream,
          balance: Math.max(0, balance),
          status,
          lastPaymentDate: lastPayment?.date,
          totalOwed: totalExpected
        };
      })
    );

    // Filter and sort by balance (highest first)
    const filtered = balances
      .filter((b) => b.balance > 0)
      .sort((a, b) => b.balance - a.balance);

    return { success: true, data: filtered };
  } catch (error) {
    console.error("Error fetching fees balance:", error);
    return { success: false, error: "Failed to fetch fees balance" };
  }
}

/**
 * Fetch detailed fees for a specific student
 */
export async function fetchStudentFeesAction(studentId: string, academicYearId?: string) {
  try {
    let yearId = academicYearId;
    if (!yearId) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const currentYear = (await AcademicYear.findOne({
        isCurrent: true
      }).lean()) as any;
      if (currentYear) {
        yearId = currentYear._id.toString();
      }
    }

    // Get student info
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const student = (await Student.findById(studentId).lean()) as any;
    if (!student) {
      return { success: false, error: "Student not found" };
    }

    // Get fees for this student
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const fees = (await Fee.find({
      studentId: studentId,
      academicYearId: yearId
    }).lean()) as any[];

    // Get payments for this student
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const payments = (await Payment.find({
      studentId: studentId,
      academicYearId: yearId
    }).lean()) as any[];

    // Get terms for breakdown
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const terms = (await Term.find({
      academicYearId: yearId
    }).lean()) as any[];

    const totalExpected = fees.reduce((sum, f) => sum + f.amount, 0);
    const totalPaid = payments.reduce((sum, p) => sum + p.amount, 0);
    const totalBalance = totalExpected - totalPaid;

    // Payment history sorted by date
    const paymentHistory = payments
      .map((p) => {
        const term = terms.find((t) => t._id.toString() === p.termId);
        return {
          paymentId: p._id.toString(),
          amount: p.amount,
          date: p.date,
          term: term?.name || "Unknown",
          method: p.method || "Cash",
          reference: p.reference
        };
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    // Term breakdown
    const termBreakdown = terms.map((term) => {
      const termFees = fees.filter((f) => f.termId === term._id.toString());
      const termPayments = payments.filter((p) => p.termId === term._id.toString());

      const expected = termFees.reduce((sum, f) => sum + f.amount, 0);
      const paid = termPayments.reduce((sum, p) => sum + p.amount, 0);
      const balance = expected - paid;

      let status: "paid" | "partial" | "pending" = "pending";
      if (balance === 0 && expected > 0) {
        status = "paid";
      } else if (paid > 0) {
        status = "partial";
      }

      return {
        term: term.name,
        expected,
        paid,
        balance: Math.max(0, balance),
        status
      };
    });

    return {
      success: true,
      data: {
        studentId: student._id.toString(),
        firstName: student.firstName,
        lastName: student.lastName,
        admissionNumber: student.admissionNumber,
        grade: student.grade,
        stream: student.stream,
        parentName: student.parentName,
        parentContact: student.parentContact,
        totalExpected,
        totalPaid,
        totalBalance,
        paymentHistory,
        termBreakdown
      } as StudentFeeDetail
    };
  } catch (error) {
    console.error("Error fetching student fees:", error);
    return { success: false, error: "Failed to fetch student fees" };
  }
}

/**
 * Get collection metrics by grade
 */
export async function fetchCollectionMetricsByGradeAction(academicYearId?: string) {
  try {
    let yearId = academicYearId;
    if (!yearId) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const currentYear = (await AcademicYear.findOne({
        isCurrent: true
      }).lean()) as any;
      if (currentYear) {
        yearId = currentYear._id.toString();
      }
    }

    // Get all students grouped by grade
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const students = (await Student.find().lean()) as any[];

    const gradeMap = new Map<string, string[]>();
    students.forEach((student) => {
      if (!gradeMap.has(student.grade)) {
        gradeMap.set(student.grade, []);
      }
      gradeMap.get(student.grade)!.push(student._id.toString());
    });

    // Calculate metrics per grade
    const metrics = await Promise.all(
      Array.from(gradeMap.entries()).map(async ([grade, studentIds]) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const fees = (await Fee.find({
          studentId: { $in: studentIds },
          academicYearId: yearId
        }).lean()) as any[];

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const payments = (await Payment.find({
          studentId: { $in: studentIds },
          academicYearId: yearId
        }).lean()) as any[];

        const totalExpected = fees.reduce((sum, f) => sum + f.amount, 0);
        const totalCollected = payments.reduce((sum, p) => sum + p.amount, 0);
        const collectionRate = totalExpected > 0 ? Math.round((totalCollected / totalExpected) * 100) : 0;

        return {
          grade,
          studentCount: studentIds.length,
          totalExpected,
          totalCollected,
          collectionRate
        };
      })
    );

    // Sort by grade order
    const gradeOrder = [
      "Playgroup",
      "PP1",
      "PP2",
      "Grade 1",
      "Grade 2",
      "Grade 3",
      "Grade 4",
      "Grade 5",
      "Grade 6",
      "Grade 7",
      "Grade 8",
      "Grade 9"
    ];

    return {
      success: true,
      data: metrics.sort((a, b) => gradeOrder.indexOf(a.grade) - gradeOrder.indexOf(b.grade))
    };
  } catch (error) {
    console.error("Error fetching collection metrics:", error);
    return { success: false, error: "Failed to fetch collection metrics" };
  }
}

/**
 * Get top debtors (students with highest outstanding balances)
 */
export async function fetchTopDebtorsAction(limit: number = 10, academicYearId?: string) {
  try {
    let yearId = academicYearId;
    if (!yearId) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const currentYear = (await AcademicYear.findOne({
        isCurrent: true
      }).lean()) as any;
      if (currentYear) {
        yearId = currentYear._id.toString();
      }
    }

    // Get all students
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const students = (await Student.find().lean()) as any[];

    // Calculate balances
    const balances = await Promise.all(
      students.map(async (student) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const fees = (await Fee.find({
          studentId: student._id.toString(),
          academicYearId: yearId
        }).lean()) as any[];

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const payments = (await Payment.find({
          studentId: student._id.toString(),
          academicYearId: yearId
        }).lean()) as any[];

        const totalExpected = fees.reduce((sum, f) => sum + f.amount, 0);
        const totalPaid = payments.reduce((sum, p) => sum + p.amount, 0);
        const balance = totalExpected - totalPaid;

        return {
          studentId: student._id.toString(),
          firstName: student.firstName,
          lastName: student.lastName,
          admissionNumber: student.admissionNumber,
          grade: student.grade,
          stream: student.stream,
          balance: Math.max(0, balance)
        };
      })
    );

    return {
      success: true,
      data: balances.filter((b) => b.balance > 0).sort((a, b) => b.balance - a.balance).slice(0, limit)
    };
  } catch (error) {
    console.error("Error fetching top debtors:", error);
    return { success: false, error: "Failed to fetch top debtors" };
  }
}
