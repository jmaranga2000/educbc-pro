export type SuperAdminModule = {
  slug: string;
  title: string;
  description: string;
  records: Array<{
    label: string;
    value: string;
    status: string;
  }>;
};

export const superAdminStats = [
  { label: "Total Students", value: "1,284", detail: "+8.6% enrollment growth" },
  { label: "Total Teachers", value: "74", detail: "12 JSS specialists" },
  { label: "Total Parents", value: "1,061", detail: "93% contacts verified" },
  { label: "Total Staff", value: "112", detail: "Teaching and non-teaching" },
  { label: "Total Revenue", value: "KES 8.4M", detail: "Current term collected" },
  { label: "Fee Collection", value: "82%", detail: "KES 1.8M arrears" },
  { label: "Attendance", value: "94.2%", detail: "+2.1% this week" },
  { label: "CBC Performance", value: "74%", detail: "School mean score" },
  { label: "School Population Growth", value: "+8.6%", detail: "Year over year" }
];

export const superAdminCharts = [
  {
    title: "Student Enrollment Trend",
    values: [
      { label: "2022", value: 820 },
      { label: "2023", value: 940 },
      { label: "2024", value: 1088 },
      { label: "2025", value: 1182 },
      { label: "2026", value: 1284 }
    ]
  },
  {
    title: "Fee Collection Trend",
    values: [
      { label: "Jan", value: 42 },
      { label: "Feb", value: 58 },
      { label: "Mar", value: 71 },
      { label: "Apr", value: 77 },
      { label: "May", value: 82 }
    ]
  },
  {
    title: "CBC Competency Analysis",
    values: [
      { label: "EE", value: 22 },
      { label: "ME", value: 38 },
      { label: "AE", value: 27 },
      { label: "BE", value: 13 }
    ]
  },
  {
    title: "Gender Distribution",
    values: [
      { label: "Girls", value: 51 },
      { label: "Boys", value: 49 }
    ]
  }
];

export const superAdminModules: SuperAdminModule[] = [
  module("schools", "Manage Schools", "School profile, branches, contacts, and system setup.", [
    ["School Profile", "Main school identity and contacts", "Active"],
    ["Branches", "Campuses and departments", "Ready"],
    ["Settings", "Core school operating settings", "Configured"]
  ]),
  module("academic-years", "Manage Academic Years", "Create, activate, archive, and report by academic year.", [
    ["2026", "Current academic year", "Active"],
    ["2025", "Archived academic year", "Archived"],
    ["Planning", "Next year setup", "Draft"]
  ]),
  module("terms", "Manage Terms", "Term setup for calendars, assessments, and fee billing.", [
    ["Term 1", "Closed reporting period", "Closed"],
    ["Term 2", "Current reporting period", "Active"],
    ["Term 3", "Future reporting period", "Draft"]
  ]),
  module("grades", "Manage Grades", "Grade 1 to Grade 9 setup for primary and junior secondary.", [
    ["Lower Primary", "Grade 1 to Grade 3", "Mapped"],
    ["Upper Primary", "Grade 4 to Grade 6", "Mapped"],
    ["Junior Secondary", "Grade 7 to Grade 9", "Mapped"]
  ]),
  module("streams", "Manage Streams", "Class streams, capacity, and learner allocation.", [
    ["North", "JSS stream", "Active"],
    ["East", "Upper primary stream", "Active"],
    ["Blue", "Lower primary stream", "Active"]
  ]),
  module("teachers", "Manage Teachers", "Teacher profiles, subjects, qualification, TSC number, level, and availability.", [
    ["Primary Teachers", "Grade 1 to Grade 6", "52 teachers"],
    ["JSS Teachers", "Grade 7 to Grade 9", "22 teachers"],
    ["Availability", "Timetable constraints", "Configured"]
  ]),
  module("students", "Manage Students", "Student profiles, admissions, streams, parents, attendance, and fee balances.", [
    ["Admissions", "New and continuing learners", "46 pending"],
    ["Learner Profiles", "Grade, stream, parent links", "1,284 active"],
    ["Fee Balances", "Student billing status", "Synced"]
  ]),
  module("parents", "Manage Parents", "Parent profiles, contacts, linked children, meetings, and communication logs.", [
    ["Contacts", "Parent phone and email records", "93% verified"],
    ["Linked Children", "Parent to student mapping", "Ready"],
    ["Meetings", "Class teacher follow-ups", "9 scheduled"]
  ]),
  module("workers", "Manage Workers", "Non-teaching staff, roles, departments, and permissions.", [
    ["Accountants", "Finance office users", "Active"],
    ["Librarians", "Library module users", "Active"],
    ["Nurses", "Health module users", "Active"],
    ["Drivers", "Transport module users", "Active"]
  ]),
  module("cbc-settings", "Manage CBC Settings", "CBC levels, assessment areas, grading bands, and competency rules.", [
    ["Lower Primary", "Literacy, Numeracy, Environmental Activities, Hygiene", "Configured"],
    ["Upper Primary", "Mathematics, English, Kiswahili, Science, Social Studies", "Configured"],
    ["Junior Secondary", "Mathematics, English, Kiswahili, Integrated Science, and more", "Configured"],
    ["Grading Bands", "EE, ME, AE, BE", "Active"]
  ]),
  module("fees", "Manage Fees", "Fee structures, payment records, arrears, and collection reports.", [
    ["Fee Structures", "Grade and term billing", "Active"],
    ["Payments", "Cash, bank, and mobile money records", "KES 8.4M"],
    ["Arrears", "Outstanding balances", "KES 1.8M"]
  ]),
  module("exams", "Manage Exams", "Exam setup, CBC assessments, scores, positions, and report cards.", [
    ["Exam Setup", "Subjects, classes, terms", "Ready"],
    ["CBC Assessments", "Competency scoring", "2,418 records"],
    ["Report Cards", "Publishing queue", "316 ready"]
  ]),
  module("transport", "Manage Transport", "School buses, routes, driver assignment, and student tracking.", [
    ["School Buses", "Fleet and capacity", "9 active"],
    ["Routes", "Pickup and dropoff stops", "14 routes"],
    ["Drivers", "Driver assignment", "9 assigned"]
  ]),
  module("timetables", "Manage Timetables", "Automatic timetable generator, teacher constraints, and generated schedules.", [
    ["Teacher Availability", "Unavailable days and load", "Configured"],
    ["Subject Requirements", "Weekly lesson demand", "Mapped"],
    ["Generated Timetables", "Class schedules", "Ready"]
  ]),
  module("notifications", "Manage Notifications", "Africa's Talking SMS alerts, reminders, events, and emergency messages.", [
    ["Fee Reminders", "Parent SMS queue", "Ready"],
    ["Exam Results", "Result alerts", "Ready"],
    ["Attendance Alerts", "Absence notices", "Ready"],
    ["Emergency Alerts", "Urgent messages", "Ready"]
  ]),
  module("reports", "View Reports", "School performance, CBC analytics, attendance analytics, and financial analytics.", [
    ["School Performance", "Population and academic reports", "Ready"],
    ["CBC Analytics", "Competency bands and trends", "Ready"],
    ["Attendance Analytics", "Learner and class patterns", "Ready"],
    ["Financial Analytics", "Revenue, arrears, and collection", "Ready"]
  ])
];

export function getSuperAdminModule(slug: string) {
  return superAdminModules.find((item) => item.slug === slug);
}

function module(slug: string, title: string, description: string, rows: string[][]): SuperAdminModule {
  return {
    slug,
    title,
    description,
    records: rows.map(([label, value, status]) => ({ label, value, status }))
  };
}
