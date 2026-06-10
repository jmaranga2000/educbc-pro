export type ParentRecord = {
  id: string;
  name: string;
  relationship: string;
  phone: string;
  email: string;
  nationalId: string;
  address: string;
  occupation: string;
  grade: string;
  gradeOrder: number;
  stream: string;
  guardianStatus: "Has guardian" | "No guardian listed";
  guardian?: {
    name: string;
    relationship: string;
    phone: string;
  };
  children: Array<{
    name: string;
    admissionNo: string;
    grade: string;
    stream: string;
    attendance: string;
    classTeacher: string;
    fees: {
      annualBill: number;
      paid: number;
      balance: number;
      lastPayment: string;
      nextDue: string;
    };
  }>;
  communication: Array<{
    date: string;
    note: string;
    status: string;
  }>;
};

export type ReportRecord = {
  id: string;
  title: string;
  type: string;
  period: string;
  owner: string;
  status: "Draft" | "Ready" | "Published";
  summary: string;
  metrics: Array<{ label: string; value: string; detail: string }>;
  sections: Array<{ heading: string; body: string; action: string }>;
};

export type WorkerCategory = {
  slug: string;
  title: string;
  description: string;
  head: {
    name: string;
    role: string;
    phone: string;
    shift: string;
  };
  workers: Array<{
    name: string;
    role: string;
    shift: string;
    status: string;
    phone: string;
  }>;
};

export const parentRecords = ([
  {
    id: "parent-otieno",
    name: "Mary Atieno Otieno",
    relationship: "Mother",
    phone: "+254 712 441 208",
    email: "mary.otieno@example.com",
    nationalId: "28441108",
    address: "Kisumu Road Estate, Block C",
    occupation: "Clinical officer",
    grade: "Grade 1",
    gradeOrder: 1,
    stream: "Blue",
    guardianStatus: "Has guardian",
    guardian: { name: "Peter Onyango", relationship: "Uncle", phone: "+254 733 210 884" },
    children: [
      {
        name: "Brian Otieno",
        admissionNo: "EDU-0018",
        grade: "Grade 1",
        stream: "Blue",
        attendance: "96%",
        classTeacher: "Ms. Wanjiru",
        fees: {
          annualBill: 72000,
          paid: 55000,
          balance: 17000,
          lastPayment: "KES 15,000 on May 18",
          nextDue: "KES 17,000 by Jun 28"
        }
      }
    ],
    communication: [
      { date: "Jun 03", note: "Fee reminder sent by SMS", status: "Delivered" },
      { date: "May 21", note: "Parent meeting attendance confirmed", status: "Confirmed" }
    ]
  },
  {
    id: "parent-njeri",
    name: "James Mwangi Njeri",
    relationship: "Father",
    phone: "+254 720 113 902",
    email: "james.njeri@example.com",
    nationalId: "30119382",
    address: "Riverside Court, House 12",
    occupation: "Business owner",
    grade: "Grade 1",
    gradeOrder: 1,
    stream: "Green",
    guardianStatus: "No guardian listed",
    children: [
      {
        name: "Amani Njeri",
        admissionNo: "EDU-0032",
        grade: "Grade 1",
        stream: "Green",
        attendance: "94%",
        classTeacher: "Mr. Kilonzo",
        fees: {
          annualBill: 72000,
          paid: 72000,
          balance: 0,
          lastPayment: "KES 22,000 on Apr 29",
          nextDue: "Cleared for 2026"
        }
      }
    ],
    communication: [{ date: "May 30", note: "Report card viewed in portal", status: "Read" }]
  },
  {
    id: "parent-cherono",
    name: "Grace Cherono",
    relationship: "Mother",
    phone: "+254 701 887 440",
    email: "grace.cherono@example.com",
    nationalId: "26690114",
    address: "Elgon View, Plot 44",
    occupation: "Accountant",
    grade: "Grade 3",
    gradeOrder: 3,
    stream: "East",
    guardianStatus: "Has guardian",
    guardian: { name: "Rose Kiptoo", relationship: "Aunt", phone: "+254 722 884 110" },
    children: [
      {
        name: "Linet Cherono",
        admissionNo: "EDU-0177",
        grade: "Grade 3",
        stream: "East",
        attendance: "98%",
        classTeacher: "Mrs. Adhiambo",
        fees: {
          annualBill: 81000,
          paid: 64000,
          balance: 17000,
          lastPayment: "KES 20,000 on Jun 01",
          nextDue: "KES 17,000 by Jul 05"
        }
      },
      {
        name: "Mark Kiplangat",
        admissionNo: "EDU-0281",
        grade: "Grade 5",
        stream: "North",
        attendance: "91%",
        classTeacher: "Mr. Mutiso",
        fees: {
          annualBill: 89000,
          paid: 52000,
          balance: 37000,
          lastPayment: "KES 12,000 on May 11",
          nextDue: "KES 20,000 by Jun 30"
        }
      }
    ],
    communication: [
      { date: "Jun 06", note: "Two sibling balances consolidated", status: "Open" },
      { date: "May 14", note: "Health clinic consent updated", status: "Signed" }
    ]
  },
  {
    id: "parent-hassan",
    name: "Fatuma Hassan",
    relationship: "Guardian",
    phone: "+254 734 992 771",
    email: "fatuma.hassan@example.com",
    nationalId: "31500441",
    address: "Mombasa Road, Flat 8B",
    occupation: "Hotel manager",
    grade: "Grade 6",
    gradeOrder: 6,
    stream: "South",
    guardianStatus: "Has guardian",
    guardian: { name: "Ahmed Ali", relationship: "Grandfather", phone: "+254 710 119 003" },
    children: [
      {
        name: "Zahra Ali",
        admissionNo: "EDU-0441",
        grade: "Grade 6",
        stream: "South",
        attendance: "97%",
        classTeacher: "Ms. Makena",
        fees: {
          annualBill: 93000,
          paid: 68000,
          balance: 25000,
          lastPayment: "KES 18,000 on May 26",
          nextDue: "KES 25,000 by Jul 01"
        }
      }
    ],
    communication: [{ date: "Jun 02", note: "Transport route change approved", status: "Done" }]
  },
  {
    id: "parent-odhiambo",
    name: "David Odhiambo",
    relationship: "Father",
    phone: "+254 718 556 090",
    email: "david.odhiambo@example.com",
    nationalId: "27650092",
    address: "Kileleshwa, House 22",
    occupation: "Engineer",
    grade: "Grade 8",
    gradeOrder: 8,
    stream: "JSS North",
    guardianStatus: "No guardian listed",
    children: [
      {
        name: "Victor Odhiambo",
        admissionNo: "EDU-0610",
        grade: "Grade 8",
        stream: "JSS North",
        attendance: "90%",
        classTeacher: "Mr. Limo",
        fees: {
          annualBill: 108000,
          paid: 91000,
          balance: 17000,
          lastPayment: "KES 31,000 on Apr 16",
          nextDue: "KES 17,000 by Jun 25"
        }
      }
    ],
    communication: [{ date: "May 19", note: "Discipline follow-up completed", status: "Closed" }]
  }
] satisfies ParentRecord[]).sort(
  (a, b) => a.gradeOrder - b.gradeOrder || a.stream.localeCompare(b.stream) || a.name.localeCompare(b.name)
);

export const reports: ReportRecord[] = [
  {
    id: "cbc-term-2",
    title: "Term 2 CBC Progress Report",
    type: "Academic",
    period: "Term 2 2026",
    owner: "Deputy Head Academics",
    status: "Ready",
    summary: "Competency progress is strongest in literacy and integrated science, with intervention needed in Grade 6 numeracy.",
    metrics: [
      { label: "Learners Covered", value: "1,284", detail: "All active learners" },
      { label: "Mean Competency", value: "74%", detail: "+3% from Term 1" },
      { label: "Reports Ready", value: "1,103", detail: "181 awaiting comments" }
    ],
    sections: [
      { heading: "Academic Trend", body: "Grade 3 East and Grade 8 JSS North posted the highest improvement this term.", action: "Publish class-level summaries" },
      { heading: "Teacher Follow-up", body: "Nine teachers have pending learner remarks before final report release.", action: "Send reminder" },
      { heading: "Parent Communication", body: "SMS release is prepared for parents with verified phone numbers.", action: "Queue notifications" }
    ]
  },
  {
    id: "fees-june",
    title: "June Fee Collection Report",
    type: "Finance",
    period: "June 2026",
    owner: "Bursar",
    status: "Draft",
    summary: "Collection is at 82 percent with Grade 5 and JSS arrears needing the closest follow-up.",
    metrics: [
      { label: "Collected", value: "KES 8.4M", detail: "Current term" },
      { label: "Outstanding", value: "KES 1.8M", detail: "Across 214 learners" },
      { label: "Cleared Accounts", value: "67%", detail: "Up from 61%" }
    ],
    sections: [
      { heading: "Arrears Risk", body: "Thirty-six accounts have balances above KES 25,000.", action: "Assign finance calls" },
      { heading: "Payment Channels", body: "Mobile money remains the leading channel for cleared accounts.", action: "Reconcile deposits" },
      { heading: "Sibling Billing", body: "Sibling discount review is pending for 18 households.", action: "Review discount list" }
    ]
  },
  {
    id: "staff-operations",
    title: "Workers and Operations Report",
    type: "Operations",
    period: "Week 23 2026",
    owner: "Administrator",
    status: "Published",
    summary: "Staffing is stable, with cleaning and health teams requesting two additional relief workers.",
    metrics: [
      { label: "Workers", value: "112", detail: "Teaching and non-teaching" },
      { label: "Open Shifts", value: "4", detail: "Weekend relief" },
      { label: "Compliance", value: "96%", detail: "Files complete" }
    ],
    sections: [
      { heading: "Health Desk", body: "Medicine stock checks and clinic logs are complete for the week.", action: "Archive clinic summary" },
      { heading: "Catering", body: "Menu cost rose by 4 percent due to produce price changes.", action: "Review supplier list" },
      { heading: "Security", body: "Gate logs show full coverage across morning and evening shifts.", action: "Approve rota" }
    ]
  }
];

export const workerCategories: WorkerCategory[] = [
  {
    slug: "health",
    title: "Health Section",
    description: "Clinic, first aid, medical records, and learner wellness support.",
    head: { name: "Nurse Irene Wambui", role: "Head Nurse", phone: "+254 711 309 220", shift: "Day clinic" },
    workers: [
      { name: "Peter Mwiti", role: "Clinic Assistant", shift: "Morning", status: "On duty", phone: "+254 700 112 904" },
      { name: "Mercy Akoth", role: "Wellness Officer", shift: "Afternoon", status: "On duty", phone: "+254 722 881 440" }
    ]
  },
  {
    slug: "chefs",
    title: "Chefs and Catering",
    description: "Kitchen production, menu planning, food stores, and dining supervision.",
    head: { name: "Chef Daniel Kariuki", role: "Head Chef", phone: "+254 719 334 660", shift: "Full day" },
    workers: [
      { name: "Alice Moraa", role: "Cook", shift: "Morning", status: "On duty", phone: "+254 733 991 010" },
      { name: "Samson Karanja", role: "Stores Clerk", shift: "Day", status: "Stock check", phone: "+254 701 440 002" },
      { name: "Janet Naliaka", role: "Dining Supervisor", shift: "Lunch", status: "On duty", phone: "+254 740 100 221" }
    ]
  },
  {
    slug: "cleaners",
    title: "Cleaners",
    description: "Classrooms, offices, washrooms, dormitory areas, and compound sanitation.",
    head: { name: "Beatrice Achieng", role: "Cleaning Supervisor", phone: "+254 713 802 445", shift: "Morning" },
    workers: [
      { name: "John Kamau", role: "Classroom Cleaner", shift: "Morning", status: "On duty", phone: "+254 755 002 902" },
      { name: "Lucy Wairimu", role: "Sanitation Attendant", shift: "Day", status: "On duty", phone: "+254 712 760 188" },
      { name: "Hellen Muthoni", role: "Compound Cleaner", shift: "Evening", status: "Relief", phone: "+254 724 412 008" }
    ]
  },
  {
    slug: "security",
    title: "Security",
    description: "Gate control, patrols, visitor logs, CCTV checks, and emergency response.",
    head: { name: "Joseph Muli", role: "Chief Security Officer", phone: "+254 722 678 330", shift: "Rotating" },
    workers: [
      { name: "Eric Ouma", role: "Gate Officer", shift: "Morning", status: "On duty", phone: "+254 706 918 771" },
      { name: "Naomi Chebet", role: "CCTV Operator", shift: "Afternoon", status: "On duty", phone: "+254 711 445 290" },
      { name: "Moses Langat", role: "Night Guard", shift: "Night", status: "Resting", phone: "+254 700 882 118" }
    ]
  },
  {
    slug: "library",
    title: "Library",
    description: "Book lending, cataloguing, reading programs, and library discipline.",
    head: { name: "Lilian Wekesa", role: "Head Librarian", phone: "+254 734 880 120", shift: "Day" },
    workers: [
      { name: "Stephen Odero", role: "Assistant Librarian", shift: "Morning", status: "On duty", phone: "+254 716 003 909" },
      { name: "Faith Nyambura", role: "Reading Program Aide", shift: "Afternoon", status: "On duty", phone: "+254 723 559 337" }
    ]
  },
  {
    slug: "staff-office",
    title: "Staff Office",
    description: "Secretary, front office, records, reception, procurement, and admin support.",
    head: { name: "Martha Njoki", role: "School Secretary", phone: "+254 720 411 540", shift: "Day" },
    workers: [
      { name: "Kelvin Maina", role: "Receptionist", shift: "Morning", status: "On duty", phone: "+254 701 223 004" },
      { name: "Rosemary Wanjala", role: "Records Clerk", shift: "Day", status: "Filing admissions", phone: "+254 733 440 128" },
      { name: "George Mutua", role: "Procurement Assistant", shift: "Day", status: "Supplier follow-up", phone: "+254 710 883 501" }
    ]
  }
];

export function getParentRecord(id: string) {
  return parentRecords.find((parent) => parent.id === id);
}

export function getReport(id: string) {
  return reports.find((report) => report.id === id);
}

export function formatKes(amount: number) {
  return new Intl.NumberFormat("en-KE", {
    style: "currency",
    currency: "KES",
    maximumFractionDigits: 0
  }).format(amount);
}
