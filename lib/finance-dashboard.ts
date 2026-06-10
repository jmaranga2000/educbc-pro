import type { LucideIcon } from "lucide-react";
import { Banknote, CreditCard, FileText, Landmark, PlugZap, ReceiptText, RotateCcw, WalletCards } from "lucide-react";

export type FinanceModule = {
  slug: string;
  title: string;
  description: string;
  icon: LucideIcon;
};

export const financeProfile = {
  officer: "Mr. George Kariuki",
  department: "Finance Department",
  activeTerm: "Term 2 2026",
  expected: "KES 10.2M",
  collected: "KES 8.4M",
  arrears: "KES 1.8M",
  collectionRate: "82%"
};

export const financeModules: FinanceModule[] = [
  module("fee-structures", "Fee Structures", "Grade and term billing setup with vote heads and due dates.", WalletCards),
  module("payments", "Payments", "Cash, bank, mobile money, references, receipts, and received-by records.", CreditCard),
  module("arrears", "Arrears", "Outstanding student balances, parent reminders, aging, and follow-up queue.", Banknote),
  module("reports", "Reports", "Daily, weekly, monthly, termly, and grade-level finance reports.", FileText),
  module("receipts", "Receipts", "Payment receipt register and receipt verification.", ReceiptText),
  module("reconciliation", "Reconciliation", "Match bank, mobile money, and cash payments to student accounts.", RotateCcw),
  module("integrations", "Payment Integrations", "M-Pesa, Airtel Money, bank payment readiness, and settlement tracking.", PlugZap)
];

export const fallbackFeeStructures = [
  { id: "fee-001", name: "Grade 6 Term 2 Fees", grade: "Grade 6", term: "Term 2 2026", amount: 28000, due: "2026-06-30", voteHeads: "Tuition, Meals, Activity" },
  { id: "fee-002", name: "Grade 7 Term 2 Fees", grade: "Grade 7", term: "Term 2 2026", amount: 34000, due: "2026-06-30", voteHeads: "Tuition, Meals, Lab, Activity" },
  { id: "fee-003", name: "Transport Route 4", grade: "All", term: "Term 2 2026", amount: 12000, due: "2026-06-20", voteHeads: "Transport" }
];

export const fallbackPayments = [
  { id: "pay-001", student: "Faith Njeri", admission: "G6E-001", amount: 28000, method: "M-Pesa", reference: "QF12ABC91", paidAt: "2026-06-10", status: "Receipted" },
  { id: "pay-002", student: "Ryan Mwangi", admission: "G4W-018", amount: 6200, method: "Bank", reference: "BNK88214", paidAt: "2026-06-09", status: "Pending allocation" },
  { id: "pay-003", student: "Asha Mohamed", admission: "G7S-006", amount: 34000, method: "Cash", reference: "RCPT-1442", paidAt: "2026-06-08", status: "Receipted" }
];

export const fallbackArrears = [
  { id: "arr-001", student: "Ryan Mwangi", admission: "G4W-018", grade: "Grade 4 West", balance: 7800, aging: "31 days", parent: "+254 711 201 018", status: "Reminder sent" },
  { id: "arr-002", student: "Samuel Kariuki", admission: "G6E-008", grade: "Grade 6 East", balance: 14900, aging: "45 days", parent: "+254 711 201 008", status: "Call parent" },
  { id: "arr-003", student: "Daniel Kiptoo", admission: "G6E-006", grade: "Grade 6 East", balance: 12400, aging: "28 days", parent: "+254 711 201 006", status: "Follow-up" }
];

export const fallbackReports = [
  { id: "rep-001", title: "Daily Collection", period: "2026-06-10", expected: "KES 410K", collected: "KES 326K", variance: "KES 84K", status: "Ready" },
  { id: "rep-002", title: "Grade Arrears", period: "Term 2 2026", expected: "KES 10.2M", collected: "KES 8.4M", variance: "KES 1.8M", status: "Ready" },
  { id: "rep-003", title: "Payment Method Mix", period: "June 2026", expected: "M-Pesa/Bank/Cash", collected: "67/24/9%", variance: "Balanced", status: "Draft" }
];

export const fallbackIntegrations = [
  { id: "int-001", name: "M-Pesa Paybill", provider: "Safaricom", status: "Ready", settlement: "T+1", lastSync: "2026-06-10 08:00" },
  { id: "int-002", name: "Airtel Money", provider: "Airtel", status: "Planned", settlement: "Pending", lastSync: "Not connected" },
  { id: "int-003", name: "Bank Import", provider: "KCB", status: "Testing", settlement: "Manual upload", lastSync: "2026-06-09 17:30" }
];

export function getFinanceModule(slug: string) {
  return financeModules.find((item) => item.slug === slug);
}

export function findFinanceFallbackRecord(id: string) {
  return [...fallbackFeeStructures, ...fallbackPayments, ...fallbackArrears, ...fallbackReports, ...fallbackIntegrations].find((item) => item.id === id);
}

function module(slug: string, title: string, description: string, icon: LucideIcon): FinanceModule {
  return { slug, title, description, icon };
}
