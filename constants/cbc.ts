export const CBC_BANDS = [
  { label: "EE", name: "Exceeding Expectations", min: 90, max: 100, range: "90 - 100" },
  { label: "ME", name: "Meeting Expectations", min: 75, max: 89, range: "75 - 89" },
  { label: "AE", name: "Approaching Expectations", min: 50, max: 74, range: "50 - 74" },
  { label: "BE", name: "Below Expectations", min: 0, max: 49, range: "0 - 49" }
] as const;

export const CBC_ASSESSMENT_LEVELS = {
  lowerPrimary: {
    code: "LOWER_PRIMARY",
    label: "Lower Primary",
    grades: ["Grade 1", "Grade 2", "Grade 3"],
    subjects: ["Literacy", "Numeracy", "Environmental Activities", "Hygiene"]
  },
  upperPrimary: {
    code: "UPPER_PRIMARY",
    label: "Upper Primary",
    grades: ["Grade 4", "Grade 5", "Grade 6"],
    subjects: ["Mathematics", "English", "Kiswahili", "Science & Technology", "Social Studies"]
  },
  juniorSecondary: {
    code: "JUNIOR_SECONDARY",
    label: "Junior Secondary",
    grades: ["Grade 7", "Grade 8", "Grade 9"],
    subjects: [
      "Mathematics",
      "English",
      "Kiswahili",
      "Integrated Science",
      "Pre-Technical Studies",
      "Agriculture",
      "Social Studies",
      "CRE/IRE/HRE"
    ]
  }
} as const;

export const CBC_COMPETENCY_AREAS = ["Knowledge", "Skills", "Values", "Projects", "Practical Activities"] as const;
