import { Schema, model, models } from "mongoose";

export type ClinicVisit = {
  visitedAt: Date;
  symptoms: string;
  actionTaken: string;
  attendedBy: string;
};

export type HealthRecordDocument = {
  studentId: string;
  allergies: string[];
  medicalNotes?: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  clinicVisits: ClinicVisit[];
};

const clinicVisitSchema = new Schema<ClinicVisit>(
  {
    visitedAt: { type: Date, required: true },
    symptoms: { type: String, required: true },
    actionTaken: { type: String, required: true },
    attendedBy: { type: String, required: true }
  },
  { _id: false }
);

const healthRecordSchema = new Schema<HealthRecordDocument>(
  {
    studentId: { type: String, required: true, unique: true },
    allergies: [{ type: String }],
    medicalNotes: { type: String },
    emergencyContactName: { type: String, required: true },
    emergencyContactPhone: { type: String, required: true },
    clinicVisits: [clinicVisitSchema]
  },
  { timestamps: true }
);

export const HealthRecord = models.HealthRecord || model<HealthRecordDocument>("HealthRecord", healthRecordSchema);
