"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Search,
  FileText,
  CreditCard,
  Banknote,
  Receipt,
  RotateCcw,
  Plus,
  CheckCircle,
  AlertCircle,
  ExternalLink,
  Printer,
  Calendar,
  User,
  Activity,
  ArrowRight,
  ShieldCheck,
  Building
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// --- COMMON HEADER COMPONENT ---
function ModuleHeader({
  title,
  description,
  dashboardSlug = "finance"
}: {
  title: string;
  description: string;
  dashboardSlug?: string;
}) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b border-slate-100 pb-5 mb-5">
      <div>
        <div className="flex items-center gap-2">
          <Link
            href={`/dashboard/${dashboardSlug}`}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 transition"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">Finance Workspace</span>
        </div>
        <h1 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">{title}</h1>
        <p className="mt-1 text-sm text-slate-500">{description}</p>
      </div>
    </div>
  );
}

// --- MODULE 1: FEE STRUCTURES ---
export function FeeStructuresPage({ data }: { data: any[] }) {
  const [search, setSearch] = useState("");
  const filtered = data.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.grade.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <ModuleHeader
        title="Fee Structures"
        description="Billing configuration per grade level and academic term."
      />

      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search fee structures..."
            className="pl-9 bg-white"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-500">
              <thead className="bg-slate-50 text-slate-700 text-xs uppercase font-semibold border-b border-slate-100">
                <tr>
                  <th className="px-6 py-4">Structure Name</th>
                  <th className="px-6 py-4">Grade</th>
                  <th className="px-6 py-4">Term</th>
                  <th className="px-6 py-4 text-right">Amount</th>
                  <th className="px-6 py-4">Due Date</th>
                  <th className="px-6 py-4">Vote Heads</th>
                  <th className="px-6 py-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {filtered.length > 0 ? (
                  filtered.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/50 transition">
                      <td className="px-6 py-4 font-bold text-slate-900">{item.name}</td>
                      <td className="px-6 py-4">{item.grade}</td>
                      <td className="px-6 py-4">{item.term}</td>
                      <td className="px-6 py-4 text-right font-semibold text-slate-900">
                        KES {Number(item.amount).toLocaleString()}
                      </td>
                      <td className="px-6 py-4">
                        <span className="flex items-center gap-1.5 text-xs text-slate-600 font-medium">
                          <Calendar className="h-3.5 w-3.5 text-slate-400" />
                          {item.due}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-xs max-w-xs truncate">{item.voteHeads}</td>
                      <td className="px-6 py-4 text-center">
                        <Link href={`/dashboard/finance/fee-structures/${item.id}`}>
                          <Button variant="ghost" className="h-8 px-2 text-xs font-bold text-primary flex items-center gap-1 mx-auto">
                            View details <ArrowRight className="h-3 w-3" />
                          </Button>
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="px-6 py-10 text-center text-slate-400">
                      No fee structures match your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// --- MODULE 2 & 5: PAYMENTS & RECEIPTS ---
export function PaymentsPage({ data, isReceipts = false }: { data: any[]; isReceipts?: boolean }) {
  const [search, setSearch] = useState("");
  const filtered = data.filter(
    (item) =>
      item.student.toLowerCase().includes(search.toLowerCase()) ||
      item.admission.toLowerCase().includes(search.toLowerCase()) ||
      item.reference.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <ModuleHeader
        title={isReceipts ? "Payment Receipts" : "Payments Registry"}
        description={isReceipts ? "Receipt verification and billing ledger history" : "Active cash flow, mobile money, and banking ledger."}
      />

      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search payments/references..."
            className="pl-9 bg-white"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-500">
              <thead className="bg-slate-50 text-slate-700 text-xs uppercase font-semibold border-b border-slate-100">
                <tr>
                  <th className="px-6 py-4">Student</th>
                  <th className="px-6 py-4">Admission</th>
                  <th className="px-6 py-4 text-right">Amount</th>
                  <th className="px-6 py-4">Method</th>
                  <th className="px-6 py-4">Reference</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Allocation</th>
                  <th className="px-6 py-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {filtered.length > 0 ? (
                  filtered.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/50 transition">
                      <td className="px-6 py-4 font-bold text-slate-900">{item.student}</td>
                      <td className="px-6 py-4 font-mono text-xs">{item.admission}</td>
                      <td className="px-6 py-4 text-right font-semibold text-slate-900">
                        KES {Number(item.amount).toLocaleString()}
                      </td>
                      <td className="px-6 py-4">
                        <Badge className="bg-slate-100 text-slate-800 border-none font-medium text-xs">
                          {item.method}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 font-mono text-xs text-slate-600">{item.reference}</td>
                      <td className="px-6 py-4 text-xs">{item.paidAt}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1 text-xs font-semibold ${
                          item.status === "Allocated" || item.status === "Receipted"
                            ? "text-emerald-600"
                            : "text-amber-600"
                        }`}>
                          <span className={`h-1.5 w-1.5 rounded-full ${
                            item.status === "Allocated" || item.status === "Receipted" ? "bg-emerald-500" : "bg-amber-500"
                          }`} />
                          {item.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <Link href={`/dashboard/finance/${isReceipts ? "receipts" : "payments"}/${item.id}`}>
                          <Button variant="ghost" className="h-8 px-2 text-xs font-bold text-primary flex items-center gap-1 mx-auto">
                            {isReceipts ? "Receipt" : "View"} <ArrowRight className="h-3 w-3" />
                          </Button>
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} className="px-6 py-10 text-center text-slate-400">
                      No payments found matching your query.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// --- MODULE 3: ARREARS ---
export function ArrearsPage({ data }: { data: any[] }) {
  const [search, setSearch] = useState("");
  const filtered = data.filter(
    (item) =>
      item.student.toLowerCase().includes(search.toLowerCase()) ||
      item.admission.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <ModuleHeader
        title="Outstanding Arrears"
        description="Monitor remaining student balances, view aging debt profiles, and coordinate parent communication."
      />

      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search student arrears..."
            className="pl-9 bg-white"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-500">
              <thead className="bg-slate-50 text-slate-700 text-xs uppercase font-semibold border-b border-slate-100">
                <tr>
                  <th className="px-6 py-4">Student</th>
                  <th className="px-6 py-4">Admission</th>
                  <th className="px-6 py-4">Grade</th>
                  <th className="px-6 py-4 text-right">Fee Balance</th>
                  <th className="px-6 py-4">Aging Period</th>
                  <th className="px-6 py-4">Parent Phone</th>
                  <th className="px-6 py-4">Reminder Status</th>
                  <th className="px-6 py-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {filtered.length > 0 ? (
                  filtered.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/50 transition">
                      <td className="px-6 py-4 font-bold text-slate-900">{item.student}</td>
                      <td className="px-6 py-4 font-mono text-xs">{item.admission}</td>
                      <td className="px-6 py-4">{item.grade}</td>
                      <td className="px-6 py-4 text-right font-semibold text-rose-600">
                        KES {Number(item.balance).toLocaleString()}
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-slate-600 font-medium text-xs bg-slate-100 px-2 py-1 rounded">
                          {item.aging}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-mono text-xs">{item.parent}</td>
                      <td className="px-6 py-4">
                        <Badge className={`border-none text-xs font-semibold ${
                          item.status === "Call parent"
                            ? "bg-rose-100 text-rose-800"
                            : "bg-amber-100 text-amber-800"
                        }`}>
                          {item.status}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <Link href={`/dashboard/finance/arrears/${item.id}`}>
                          <Button variant="ghost" className="h-8 px-2 text-xs font-bold text-primary flex items-center gap-1 mx-auto">
                            Statement <ArrowRight className="h-3 w-3" />
                          </Button>
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} className="px-6 py-10 text-center text-slate-400">
                      No arrears found matching your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// --- MODULE 4: REPORTS ---
export function ReportsPage({ data }: { data: any[] }) {
  return (
    <div className="space-y-6">
      <ModuleHeader
        title="Finance Reports"
        description="Exportable audits, payment distribution maps, and reconciliation updates."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {data.map((report) => (
          <Card key={report.id} className="hover:shadow-md transition">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-md font-bold text-slate-800">{report.title}</CardTitle>
              <FileText className="h-5 w-5 text-slate-400" />
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-400">Reporting Period:</span>
                  <span className="font-semibold text-slate-700">{report.period}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Target Value:</span>
                  <span className="font-semibold text-slate-700">{report.expected}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Actual Revenue:</span>
                  <span className="font-semibold text-emerald-600">{report.collected}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Variance:</span>
                  <span className="font-semibold text-slate-700">{report.variance}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                <Badge className={report.status === "Ready" ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"}>
                  {report.status}
                </Badge>
                <Button className="h-8 text-xs font-bold gap-1">
                  Export PDF <ExternalLink className="h-3.5 w-3.5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

// --- MODULE 6: RECONCILIATION ---
export function ReconciliationPage({ data }: { data: any[] }) {
  return (
    <div className="space-y-6">
      <ModuleHeader
        title="Bank & Mobile Reconciliation"
        description="Verify incoming deposits, allocate unresolved bank wires, and audit cash statements."
      />

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-500">
              <thead className="bg-slate-50 text-slate-700 text-xs uppercase font-semibold border-b border-slate-100">
                <tr>
                  <th className="px-6 py-4">Source</th>
                  <th className="px-6 py-4">Transaction Ref</th>
                  <th className="px-6 py-4">Student Target</th>
                  <th className="px-6 py-4 text-right">Amount</th>
                  <th className="px-6 py-4">Audit Status</th>
                  <th className="px-6 py-4">Action Recommendation</th>
                  <th className="px-6 py-4 text-center">Trigger</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {data.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/50 transition">
                    <td className="px-6 py-4 font-bold text-slate-900">{item.source}</td>
                    <td className="px-6 py-4 font-mono text-xs">{item.reference}</td>
                    <td className="px-6 py-4 font-semibold text-slate-800">{item.student}</td>
                    <td className="px-6 py-4 text-right font-semibold text-slate-900">
                      KES {Number(item.amount).toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 text-xs font-bold ${
                        item.status === "Matched" ? "text-emerald-600" : "text-amber-600"
                      }`}>
                        {item.status === "Matched" ? (
                          <CheckCircle className="h-4 w-4 text-emerald-500" />
                        ) : (
                          <AlertCircle className="h-4 w-4 text-amber-500" />
                        )}
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs font-medium text-slate-600">{item.action}</td>
                    <td className="px-6 py-4 text-center">
                      <Button className="h-8 text-xs font-bold">
                        Process
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// --- MODULE 7: INTEGRATIONS ---
export function IntegrationsPage({ data }: { data: any[] }) {
  return (
    <div className="space-y-6">
      <ModuleHeader
        title="Payment Integrations"
        description="Control API credentials, M-Pesa callbacks, Airtel settlement syncs, and banks imports."
      />

      <div className="grid gap-4 md:grid-cols-3">
        {data.map((gateway) => (
          <Card key={gateway.id} className="hover:shadow-md transition">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-md font-bold text-slate-800">{gateway.name}</CardTitle>
              <Building className="h-5 w-5 text-slate-400" />
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-400">API Provider:</span>
                  <span className="font-semibold text-slate-700">{gateway.provider}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Settlement:</span>
                  <span className="font-semibold text-slate-700">{gateway.settlement}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Last Sync:</span>
                  <span className="font-mono text-xs font-semibold text-slate-700">{gateway.lastSync}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                <Badge className={
                  gateway.status === "Ready"
                    ? "bg-emerald-100 text-emerald-800"
                    : gateway.status === "Testing"
                    ? "bg-blue-100 text-blue-800"
                    : "bg-slate-100 text-slate-800"
                }>
                  {gateway.status}
                </Badge>
                <Button variant="ghost" className="h-8 text-xs font-bold text-primary flex items-center gap-1">
                  Configure <ExternalLink className="h-3.5 w-3.5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

// --- RECORD DETAILS VIEW CONTAINER ---
export function FinanceRecordDetailsPage({ record }: { record: any }) {
  if (!record) {
    return (
      <div className="p-8 text-center max-w-md mx-auto space-y-4">
        <AlertCircle className="h-12 w-12 text-slate-400 mx-auto" />
        <h2 className="text-xl font-bold text-slate-800">Record Not Found</h2>
        <p className="text-slate-500 text-sm">We couldn't retrieve details for the specified billing or statement ledger.</p>
        <Link href="/dashboard/finance">
          <Button className="mt-2">Back to Finance Workspace</Button>
        </Link>
      </div>
    );
  }

  // Back destination mapping
  const getBackUrl = () => {
    switch (record.type) {
      case "payment":
        return "/dashboard/finance/payments";
      case "fee":
        return "/dashboard/finance/fee-structures";
      case "arrears":
        return "/dashboard/finance/arrears";
      default:
        return "/dashboard/finance";
    }
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div className="flex items-center gap-2">
          <Link
            href={getBackUrl()}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 transition"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">
            Detail Statement View
          </span>
        </div>
        <Button onClick={() => window.print()} variant="ghost" className="h-9 px-3 text-xs font-semibold gap-1.5 border border-slate-200 bg-white hover:bg-slate-50">
          <Printer className="h-4 w-4" /> Print Statement
        </Button>
      </div>

      {record.type === "payment" && (
        /* Receipt View */
        <div className="bg-white border border-slate-200/80 rounded-2xl shadow-lg overflow-hidden max-w-xl mx-auto">
          {/* Receipt Header Banner */}
          <div className="bg-slate-900 p-6 text-white text-center relative">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 mb-2 border border-emerald-500/30">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h2 className="text-lg font-bold tracking-tight uppercase">EduCBC Official Receipt</h2>
            <p className="text-xs text-slate-400 mt-0.5">Verification code: {record.reference}</p>
          </div>

          {/* Receipt Body */}
          <div className="p-6 sm:p-8 space-y-6">
            <div className="text-center pb-4 border-b border-slate-100">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Amount Received</span>
              <span className="text-3xl font-extrabold text-slate-900 block mt-1">
                KES {Number(record.amount).toLocaleString()}.00
              </span>
              <Badge className="bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-semibold mt-2 hover:bg-emerald-50">
                Payment Success
              </Badge>
            </div>

            {/* Receipt details list */}
            <div className="space-y-4 text-sm">
              <div className="flex justify-between py-1">
                <span className="text-slate-400">Student Name:</span>
                <span className="font-bold text-slate-900 text-right">{record.studentName}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-400">Admission No:</span>
                <span className="font-mono font-semibold text-slate-700">{record.studentAdmission}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-400">Grade Placement:</span>
                <span className="font-semibold text-slate-700">{record.grade}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-400">Fee Allocation:</span>
                <span className="font-semibold text-slate-700 text-right">{record.feeStructureName}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-400">Payment Channel:</span>
                <span className="font-semibold text-slate-700">{record.method}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-400">Txn Reference:</span>
                <span className="font-mono font-semibold text-slate-700">{record.reference}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-400">Transaction Date:</span>
                <span className="font-semibold text-slate-700">{record.paidAt}</span>
              </div>
            </div>

            {/* Decorative dashed separator */}
            <div className="border-t border-dashed border-slate-200 my-4" />

            <div className="text-center text-xs text-slate-400 italic">
              Thank you for supporting education. This receipt is automatically generated and digitally authenticated.
            </div>
          </div>
        </div>
      )}

      {record.type === "fee" && (
        /* Fee Structure Detail */
        <Card className="shadow-lg rounded-2xl border border-slate-200/80 overflow-hidden">
          <div className="bg-slate-900 px-6 py-5 text-white flex items-center justify-between">
            <div>
              <Badge className="bg-slate-800 text-slate-300 border-none uppercase text-xs tracking-wider">{record.term}</Badge>
              <h2 className="text-xl font-bold mt-1.5">{record.name}</h2>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-400 block uppercase font-medium">Structure Total</span>
              <span className="text-2xl font-black text-emerald-400">KES {Number(record.amount).toLocaleString()}</span>
            </div>
          </div>

          <CardContent className="p-6 space-y-6">
            <div className="grid gap-4 sm:grid-cols-3 text-sm border-b border-slate-100 pb-5">
              <div>
                <span className="text-slate-400 block text-xs">Target Level</span>
                <span className="font-bold text-slate-700">{record.grade}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-xs">Term Reference</span>
                <span className="font-bold text-slate-700">{record.term}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-xs">Due Date</span>
                <span className="font-bold text-slate-700">{record.due}</span>
              </div>
            </div>

            {/* Vote Heads breakdown */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-900">Vote Head Allocations</h3>
              <div className="border border-slate-200/60 rounded-xl overflow-hidden text-sm bg-slate-50/20">
                <div className="bg-slate-50 grid grid-cols-3 font-semibold text-slate-600 px-4 py-3 border-b border-slate-200/60">
                  <div>Vote Head Item</div>
                  <div>Account Code</div>
                  <div className="text-right">Allocated Amount</div>
                </div>
                <div className="divide-y divide-slate-100">
                  {record.voteHeads && record.voteHeads.length > 0 ? (
                    record.voteHeads.map((head: any, idx: number) => (
                      <div key={idx} className="grid grid-cols-3 px-4 py-3 bg-white">
                        <div className="font-bold text-slate-800">{head.name || head}</div>
                        <div className="text-slate-500 font-mono text-xs">{head.code || `VH-00${idx + 1}`}</div>
                        <div className="text-right font-semibold text-slate-900">
                          KES {Number(head.amount || (record.amount / record.voteHeads.length)).toLocaleString()}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="px-4 py-6 text-center text-slate-400">
                      No vote heads configured for this billing structure.
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="text-xs text-slate-400 pt-2 flex items-center justify-between">
              <span>Created on: {record.createdAt}</span>
              <span>Validated by: Finance Department</span>
            </div>
          </CardContent>
        </Card>
      )}

      {record.type === "arrears" && (
        /* Fee Statement / Arrears Detail */
        <div className="space-y-6">
          <Card className="shadow-lg rounded-2xl border border-slate-200/80 overflow-hidden">
            <div className="bg-slate-900 p-6 text-white flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400 block uppercase">Student Registry Info</span>
                <h2 className="text-xl font-bold mt-0.5">{record.studentName}</h2>
                <span className="text-xs text-slate-400 block mt-1 font-mono">ADM NO: {record.studentAdmission}</span>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-400 block uppercase font-medium">Current Balance</span>
                <span className="text-2xl font-black text-rose-400">KES {Number(record.balance).toLocaleString()}</span>
              </div>
            </div>

            <CardContent className="p-6">
              <div className="grid gap-4 sm:grid-cols-3 text-sm bg-slate-50/40 p-4 rounded-xl border border-slate-100">
                <div>
                  <span className="text-slate-400 block text-xs">Grade Placement</span>
                  <span className="font-bold text-slate-700">{record.grade}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-xs">Linked Parent</span>
                  <span className="font-bold text-slate-700">{record.parent}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-xs">Outstanding Since</span>
                  <span className="font-bold text-rose-600">Active Term Billing</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment History inside Statement */}
          <Card className="shadow-md rounded-2xl border border-slate-200/60 overflow-hidden">
            <CardHeader className="bg-slate-50 border-b border-slate-100 py-4 px-6">
              <CardTitle className="text-sm font-bold text-slate-800">Received Payments Statement Ledger</CardTitle>
            </CardHeader>
            <CardContent className="p-0 text-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-slate-500">
                  <thead className="bg-slate-50/50 text-slate-600 text-xs font-semibold uppercase border-b border-slate-100">
                    <tr>
                      <th className="px-6 py-3">Paid At</th>
                      <th className="px-6 py-3">Transaction Reference</th>
                      <th className="px-6 py-3">Payment Channel</th>
                      <th className="px-6 py-3 text-right">Credit Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white">
                    {record.payments && record.payments.length > 0 ? (
                      record.payments.map((p: any) => (
                        <tr key={p.id} className="hover:bg-slate-50/50 transition">
                          <td className="px-6 py-3.5 font-medium text-slate-700">{p.paidAt}</td>
                          <td className="px-6 py-3.5 font-mono text-xs text-slate-600">{p.reference}</td>
                          <td className="px-6 py-3.5 font-semibold text-slate-600">{p.method}</td>
                          <td className="px-6 py-3.5 text-right font-bold text-emerald-600">
                            KES {Number(p.amount).toLocaleString()}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={4} className="px-6 py-8 text-center text-slate-400">
                          No payments received on this account yet.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
