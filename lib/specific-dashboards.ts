import type { IconName } from "@/lib/dashboard-ui";

export type SpecificDashboardKey =
  | "super-admin"
  | "teacher"
  | "class-teacher"
  | "parent"
  | "student"
  | "exams"
  | "workers"
  | "sports"
  | "finance"
  | "library"
  | "transport"
  | "health";

export type SpecificDashboardModule = {
  slug: string;
  title: string;
  description: string;
  records: string[];
};

export type SpecificDashboard = {
  key: SpecificDashboardKey;
  title: string;
  subtitle: string;
  icon: IconName;
  stats: Array<{ label: string; value: string; detail: string }>;
  modules: SpecificDashboardModule[];
};

export const specificDashboards: SpecificDashboard[] = [
  {
    key: "super-admin",
    title: "Super Admin Dashboard",
    subtitle: "Highest level access for managing the whole school system.",
    icon: "ShieldCheck",
    stats: [
      { label: "Total Students", value: "1,284", detail: "All active learners" },
      { label: "Total Teachers", value: "74", detail: "Primary and JSS" },
      { label: "Total Revenue", value: "KES 8.4M", detail: "Current term collection" },
      { label: "CBC Performance", value: "74%", detail: "School mean score" }
    ],
    modules: [
      module("schools", "Manage Schools", "School profile, branches, contacts, and operating setup.", ["School profile", "Branch setup", "School contacts", "Operating settings"]),
      module("academic-years", "Academic Years", "Create and manage academic years.", ["2026 active year", "Start and end dates", "Year archive", "Term linking"]),
      module("terms", "Terms", "Term setup for academic calendars and reporting.", ["Term 1", "Term 2 active", "Term 3", "Assessment windows"]),
      module("grades", "Grades", "Grade 1 to Grade 9 setup.", ["Lower Primary", "Upper Primary", "Junior Secondary", "Grade progression"]),
      module("streams", "Streams", "Class streams and learner allocation.", ["North", "South", "East", "West"]),
      module("teachers", "Teachers", "Teacher profiles, subjects, TSC numbers, and workload.", ["Teacher name", "Subjects", "Qualification", "TSC number"]),
      module("students", "Students", "Learner registry, admissions, parents, streams, and fee balances.", ["Admission number", "Student profile", "Parent links", "Fee balance"]),
      module("parents", "Parents", "Parent profiles, children, contacts, and communication.", ["Parent contacts", "Children", "Meetings", "Messages"]),
      module("workers", "Workers", "Non-teaching staff records and permissions.", ["Accountant", "Librarian", "Secretary", "Nurse", "Driver", "Store keeper"]),
      module("cbc-settings", "CBC Settings", "CBC bands, levels, subjects, and assessment setup.", ["EE 90-100", "ME 75-89", "AE 50-74", "BE 0-49"]),
      module("fees", "Fees", "Fee structures, payment records, arrears, and reports.", ["Fee structures", "Payments", "Arrears", "Collection reports"]),
      module("exams", "Exams", "Exam setup, marks, publishing, and report cards.", ["Exam setup", "Scores", "Positions", "Report cards"]),
      module("transport", "Transport", "Buses, routes, drivers, and student tracking.", ["School buses", "Routes", "Driver assignment", "Student tracking"]),
      module("timetables", "Timetables", "Automatic timetable generator and generated schedules.", ["Teacher availability", "Subject requirements", "Breaks", "Lunch time"]),
      module("notifications", "Notifications", "SMS alerts, notices, parent alerts, and emergency messaging.", ["Fee reminders", "Exam results", "Attendance alerts", "Event reminders"]),
      module("reports", "Reports", "Whole-school reports and analytics.", ["Enrollment trend", "Fee trend", "CBC competency", "Gender distribution"])
    ]
  },
  {
    key: "teacher",
    title: "Teacher Dashboard",
    subtitle: "Regular teacher workspace for assigned subjects, classes, learners, attendance, assignments, resources, communication, and CBC records.",
    icon: "Users",
    stats: [
      { label: "Assigned Subjects", value: "5", detail: "Active teaching load" },
      { label: "Classes", value: "6", detail: "Assigned streams" },
      { label: "Assignments", value: "14", detail: "4 due this week" },
      { label: "CBC Records", value: "186", detail: "Term entries" }
    ],
    modules: [
      module("assigned-subjects", "Assigned Subjects", "View teacher subjects and teaching load.", ["Mathematics", "English", "Kiswahili", "Science", "Agriculture"]),
      module("classes", "Classes", "View assigned classes and streams.", ["Grade 4 West", "Grade 6 East", "Grade 7 North", "Grade 8 South"]),
      module("students", "Students", "View students in assigned classes.", ["Class lists", "Learner profiles", "Parent links", "Performance flags"]),
      module("attendance", "Attendance", "Mark attendance and view attendance history.", ["Mark attendance", "Attendance history", "Late learners", "Absent learners"]),
      module("assignments", "Assignments", "Create, grade, and manage assignments.", ["Create assignments", "Grade assignments", "Due dates", "Submissions"]),
      module("resources", "Learning Resources", "Upload and manage notes, videos, and PDFs.", ["Notes", "Videos", "PDFs", "Assignment files"]),
      module("communication", "Communication", "Send messages and communicate with parents.", ["Teacher messages", "Parent communication", "Class notices", "Communication logs"]),
      module("cbc-assessment", "CBC Assessment", "Record competencies, projects, and practical activities.", ["Record competencies", "Record projects", "Practical activities", "CBC comments"])
    ]
  },
  {
    key: "class-teacher",
    title: "Class Teacher Dashboard",
    subtitle: "Special dashboard for promoted teachers who monitor a complete class profile.",
    icon: "ClipboardCheck",
    stats: [
      { label: "Class Learners", value: "42", detail: "Grade 6 East" },
      { label: "Attendance", value: "92%", detail: "Weekly summary" },
      { label: "Weak Learners", value: "6", detail: "Support tracking" },
      { label: "Top Performers", value: "8", detail: "EE/ME trend" }
    ],
    modules: [
      module("class-profile", "Complete Class Profile", "Class list, stream information, and learner overview.", ["Class profile", "Learner list", "Stream details", "Class teacher notes"]),
      module("discipline", "Discipline Records", "Student discipline records and interventions.", ["Incident records", "Severity", "Action taken", "Resolved cases"]),
      module("attendance-summary", "Attendance Summary", "Class attendance summary and learner attendance history.", ["Daily summary", "Weekly summary", "Absent learners", "Late learners"]),
      module("parent-contacts", "Parent Contacts", "Parent contacts for every learner.", ["Parent names", "Phone numbers", "Linked children", "Emergency contacts"]),
      module("parent-meetings", "Parent Meetings", "Meetings, follow-ups, and logs.", ["Meeting schedule", "Meeting notes", "Follow-ups", "Communication logs"]),
      module("academic-monitoring", "Academic Monitoring", "Track weak learners and top performers.", ["Weak learners", "Top performers", "Subject performance", "Class ranking"]),
      module("cbc-progress", "CBC Progress Tracking", "Monitor EE, ME, AE, and BE learner movement.", ["Exceeding Expectations", "Meeting Expectations", "Approaching Expectations", "Below Expectations"])
    ]
  },
  {
    key: "parent",
    title: "Parent Dashboard",
    subtitle: "Each parent sees only their linked children.",
    icon: "GraduationCap",
    stats: [
      { label: "Children", value: "2", detail: "Linked learners" },
      { label: "Fee Balance", value: "KES 18K", detail: "Current term" },
      { label: "Attendance", value: "96%", detail: "Child attendance" },
      { label: "Messages", value: "5", detail: "Teacher updates" }
    ],
    modules: [
      module("children", "Student Profile", "Child profile and learner information.", ["Student profile", "Grade", "Stream", "Class teacher"]),
      module("academics", "Academics", "CBC reports, exam results, homework, and assignments.", ["CBC reports", "Exam results", "Homework", "Assignments"]),
      module("fees", "Fees", "Fee balance, statement, and payment history.", ["Fee balance", "Fee statement", "Payment history", "Receipts"]),
      module("attendance", "Attendance", "Child attendance history and alerts.", ["Daily attendance", "Absence alerts", "Late records", "Term attendance"]),
      module("communication", "Communication", "School notifications, teacher messages, and events.", ["School notifications", "Teacher messages", "Events", "Alerts"]),
      module("progress", "Progress", "Child performance trend, class ranking, and subject performance.", ["Performance trend", "Class ranking", "Subject performance", "CBC band"])
    ]
  },
  {
    key: "student",
    title: "Student Dashboard",
    subtitle: "Learner portal for assignments, homework, notes, CBC projects, timetable, results, attendance, and resources.",
    icon: "BookOpen",
    stats: [
      { label: "Assignments", value: "8", detail: "2 due soon" },
      { label: "CBC Projects", value: "3", detail: "Active projects" },
      { label: "Resources", value: "41", detail: "Notes and PDFs" },
      { label: "Attendance", value: "97%", detail: "This term" }
    ],
    modules: [
      module("assignments", "Assignments", "Assignments and submissions.", ["Open assignments", "Due dates", "Submission status", "Teacher feedback"]),
      module("homework", "Homework", "Homework assigned by teachers.", ["Homework list", "Due soon", "Submitted", "Pending"]),
      module("notes", "Notes", "Learning notes and classroom resources.", ["Class notes", "Revision notes", "PDFs", "Videos"]),
      module("cbc-projects", "CBC Projects", "CBC project work and practical tasks.", ["Project tasks", "Practical activities", "Competency evidence", "Teacher comments"]),
      module("timetable", "Timetable", "Daily and weekly lesson schedule.", ["Today", "Weekly timetable", "Subjects", "Teachers"]),
      module("exam-results", "Exam Results", "Exam and CBC results.", ["Exam results", "CBC scores", "Band", "Comments"]),
      module("attendance", "Attendance", "Student attendance records.", ["Term attendance", "Absences", "Late records", "Excused days"]),
      module("resources", "Learning Resources", "Notes, videos, PDFs, and digital library items.", ["Notes", "Videos", "PDFs", "Digital library"])
    ]
  },
  {
    key: "exams",
    title: "Exams Department Dashboard",
    subtitle: "CBC assessment engine, grading, performance calculation, rankings, analysis, and report cards.",
    icon: "BarChart3",
    stats: [
      { label: "Assessments", value: "2,418", detail: "Term records" },
      { label: "Mean Score", value: "74%", detail: "School mean" },
      { label: "Reports", value: "316", detail: "Ready to publish" },
      { label: "Subjects", value: "17", detail: "CBC mapped" }
    ],
    modules: [
      module("cbc-engine", "CBC Assessment Engine", "Record and calculate CBC competency scores.", ["Individual score", "Subject score", "Competency score", "Overall score"]),
      module("lower-primary", "Lower Primary", "Grade 1-3 assessment areas.", ["Literacy", "Numeracy", "Environmental Activities", "Hygiene"]),
      module("upper-primary", "Upper Primary", "Grade 4-6 assessment areas.", ["Mathematics", "English", "Kiswahili", "Science & Technology", "Social Studies"]),
      module("junior-secondary", "Junior Secondary", "Grade 7-9 assessment areas.", ["Mathematics", "English", "Kiswahili", "Integrated Science", "Pre-Technical", "Agriculture", "Social Studies", "CRE/IRE/HRE"]),
      module("grading", "CBC Grading Algorithm", "EE, ME, AE, and BE grade bands.", ["90-100 EE", "75-89 ME", "50-74 AE", "0-49 BE"]),
      module("performance", "Performance Calculation", "Individual, class, and school performance analysis.", ["Position in class", "Trend analysis", "Mean score", "Mean grade"]),
      module("subject-analysis", "Subject Analysis", "Subject, teacher, grade, and stream analysis.", ["Subject performance", "Teacher analysis", "Grade performance", "Stream performance"]),
      module("reports", "Report Cards", "Generate and publish CBC reports.", ["CBC reports", "Exam reports", "Automated comments", "Publish results"])
    ]
  },
  {
    key: "workers",
    title: "Worker Dashboard",
    subtitle: "Non-teaching staff workspace with role-specific permissions.",
    icon: "BriefcaseBusiness",
    stats: [
      { label: "Workers", value: "38", detail: "Non-teaching staff" },
      { label: "Roles", value: "6", detail: "Worker categories" },
      { label: "Tasks", value: "24", detail: "Open tasks" },
      { label: "Permissions", value: "Role based", detail: "Scoped access" }
    ],
    modules: [
      module("accountant", "Accountant", "Finance task access and payment support.", ["Fee records", "Payments", "Reports", "Arrears"]),
      module("librarian", "Librarian", "Library operations access.", ["Book inventory", "Borrowing", "Returns", "Fines"]),
      module("secretary", "Secretary", "Front office and communication access.", ["Documents", "Notices", "Events", "Communication logs"]),
      module("nurse", "Nurse", "Health records and clinic visits.", ["Medical records", "Allergies", "Clinic visits", "Emergency contacts"]),
      module("driver", "Driver", "Transport route and bus assignment.", ["Assigned bus", "Route", "Pickup", "Dropoff"]),
      module("store-keeper", "Store Keeper", "Store and inventory operations.", ["Stock items", "Issue records", "Suppliers", "Reorder list"])
    ]
  },
  {
    key: "sports",
    title: "Sports Department Dashboard",
    subtitle: "Sports management for teams, training schedules, player profiles, match results, and tournaments.",
    icon: "Medal",
    stats: [
      { label: "Teams", value: "11", detail: "Registered teams" },
      { label: "Players", value: "162", detail: "Player profiles" },
      { label: "Fixtures", value: "8", detail: "This month" },
      { label: "Sports", value: "5", detail: "Football, volleyball, basketball, athletics, rugby" }
    ],
    modules: [
      module("football", "Football", "Football teams, training, players, and results.", ["Team registration", "Training schedule", "Player profiles", "Match results"]),
      module("volleyball", "Volleyball", "Volleyball teams, training, players, and results.", ["Team registration", "Training schedule", "Player profiles", "Match results"]),
      module("basketball", "Basketball", "Basketball teams, training, players, and results.", ["Team registration", "Training schedule", "Player profiles", "Match results"]),
      module("athletics", "Athletics", "Athletics profiles, training, events, and tournament tracking.", ["Player profiles", "Training schedule", "Event results", "Tournament tracking"]),
      module("rugby", "Rugby", "Rugby teams, training, players, and results.", ["Team registration", "Training schedule", "Player profiles", "Match results"]),
      module("tournaments", "Tournament Tracking", "Fixtures, tournaments, and season results.", ["Fixtures", "Tournament brackets", "Match results", "Season records"])
    ]
  },
  {
    key: "finance",
    title: "Finance Department Dashboard",
    subtitle: "Fees, structures, payments, arrears, reports, and payment integration readiness.",
    icon: "WalletCards",
    stats: [
      { label: "Expected", value: "KES 10.2M", detail: "Current term billing" },
      { label: "Collected", value: "KES 8.4M", detail: "Cash, bank, mobile money" },
      { label: "Arrears", value: "KES 1.8M", detail: "Reminder queue" },
      { label: "Today", value: "KES 326K", detail: "Daily collection" }
    ],
    modules: [
      module("fee-structures", "Fee Structures", "Grade and term fee setup.", ["Tuition", "Meals", "Transport", "Activity fees"]),
      module("payments", "Payment Records", "Cash, bank, and mobile money payment records.", ["Payment records", "Receipts", "References", "Received by"]),
      module("arrears", "Arrears", "Outstanding balances and reminders.", ["Student arrears", "Parent reminders", "Aging report", "Follow-up queue"]),
      module("reports", "Reports", "Daily, weekly, and monthly collection reports.", ["Daily collection", "Weekly collection", "Monthly collection", "Export report"]),
      module("integrations", "Payment Integration", "Future integrations for M-Pesa, Airtel Money, and bank payments.", ["M-Pesa", "Airtel Money", "Bank payments", "Reconciliation"])
    ]
  },
  {
    key: "library",
    title: "Library Module",
    subtitle: "Book inventory, borrowing, returns, fines, and digital library.",
    icon: "Library",
    stats: [
      { label: "Books", value: "4,820", detail: "Inventory records" },
      { label: "Borrowed", value: "318", detail: "Active loans" },
      { label: "Returns", value: "44", detail: "Due today" },
      { label: "Fines", value: "KES 7.2K", detail: "Outstanding" }
    ],
    modules: [
      module("inventory", "Book Inventory", "Catalog books and available copies.", ["Title", "Author", "ISBN", "Available copies"]),
      module("borrowing", "Borrowing", "Issue books to students and staff.", ["Borrower", "Borrowed at", "Due date", "Book copy"]),
      module("returns", "Returns", "Process returns and update availability.", ["Return date", "Returned books", "Late returns", "Availability"]),
      module("fines", "Fines", "Track fines for late returns.", ["Fine amount", "Borrower", "Due date", "Payment status"]),
      module("digital-library", "Digital Library", "Manage digital learning resources.", ["PDFs", "Videos", "Digital notes", "Resource uploads"])
    ]
  },
  {
    key: "transport",
    title: "Transport Module",
    subtitle: "School buses, routes, driver assignment, and student tracking.",
    icon: "Bus",
    stats: [
      { label: "Buses", value: "9", detail: "Active fleet" },
      { label: "Routes", value: "14", detail: "Morning and evening" },
      { label: "Drivers", value: "9", detail: "Assigned drivers" },
      { label: "Students", value: "426", detail: "Transport learners" }
    ],
    modules: [
      module("buses", "School Buses", "Fleet records and bus capacity.", ["Registration number", "Capacity", "Active status", "Assigned driver"]),
      module("routes", "Routes", "Route stops, pickup, and dropoff times.", ["Route name", "Stops", "Pickup time", "Dropoff time"]),
      module("drivers", "Driver Assignment", "Assign drivers to buses and routes.", ["Driver", "Bus", "Route", "Schedule"]),
      module("student-tracking", "Student Tracking", "Track students assigned to transport routes.", ["Student list", "Route assignment", "Pickup point", "Dropoff point"])
    ]
  },
  {
    key: "health",
    title: "Health Module",
    subtitle: "Student medical records, allergies, clinic visits, and emergency contacts.",
    icon: "HeartPulse",
    stats: [
      { label: "Medical Records", value: "1,184", detail: "Student files" },
      { label: "Allergies", value: "46", detail: "Flagged learners" },
      { label: "Clinic Visits", value: "17", detail: "This week" },
      { label: "Emergency Contacts", value: "96%", detail: "Completed" }
    ],
    modules: [
      module("medical-records", "Student Medical Records", "Student health notes and medical history.", ["Student", "Medical notes", "Health status", "Record history"]),
      module("allergies", "Allergies", "Allergy records and safety flags.", ["Allergy", "Severity", "Student", "Staff visibility"]),
      module("clinic-visits", "Clinic Visits", "Clinic visit records and treatment notes.", ["Visit date", "Symptoms", "Action taken", "Attended by"]),
      module("emergency-contacts", "Emergency Contacts", "Emergency contacts for learner safety.", ["Contact name", "Phone number", "Relationship", "Verified status"])
    ]
  }
];

export function getSpecificDashboard(key: string) {
  return specificDashboards.find((dashboard) => dashboard.key === key);
}

export function getSpecificModule(dashboardKey: string, moduleSlug: string) {
  return getSpecificDashboard(dashboardKey)?.modules.find((item) => item.slug === moduleSlug);
}

function module(slug: string, title: string, description: string, records: string[]): SpecificDashboardModule {
  return {
    slug,
    title,
    description,
    records
  };
}
