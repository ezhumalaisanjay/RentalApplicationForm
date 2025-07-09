import { pgTable, text, serial, integer, boolean, jsonb, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const rentalApplications = pgTable("rental_applications", {
  id: serial("id").primaryKey(),
  applicationDate: text("application_date").notNull(),
  buildingAddress: text("building_address").notNull(),
  apartmentNumber: text("apartment_number").notNull(),
  monthlyRent: integer("monthly_rent").notNull(),
  apartmentType: text("apartment_type").notNull(),
  moveInDate: text("move_in_date").notNull(),
  hearAbout: text("hear_about"),
  brokerName: text("broker_name"),
  brokerPhone: text("broker_phone"),
  
  // Primary Applicant
  primaryApplicant: jsonb("primary_applicant").notNull(),
  
  // Co-applicant (optional)
  hasCoApplicant: boolean("has_co_applicant").default(false),
  coApplicant: jsonb("co_applicant"),
  coApplicantSameAddress: boolean("co_applicant_same_address").default(false),
  
  // Guarantor (optional)
  hasGuarantor: boolean("has_guarantor").default(false),
  guarantor: jsonb("guarantor"),
  
  // Financial Information
  financialInfo: jsonb("financial_info").notNull(),
  
  // Legal Questions
  legalQuestions: jsonb("legal_questions").notNull(),
  
  // Documents
  documents: jsonb("documents"),
  
  // Signatures
  signatures: jsonb("signatures").notNull(),
  
  // Status
  status: text("status").default("draft"), // draft, submitted, approved, rejected
  
  // Timestamps
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertRentalApplicationSchema = createInsertSchema(rentalApplications).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertRentalApplication = z.infer<typeof insertRentalApplicationSchema>;
export type RentalApplication = typeof rentalApplications.$inferSelect;

// Supporting schemas for nested objects
export const addressSchema = z.object({
  street: z.string(),
  city: z.string(),
  state: z.string(),
  zip: z.string(),
});

export const landlordSchema = z.object({
  name: z.string().optional(),
  address: z.string().optional(),
});

export const lengthAtAddressSchema = z.object({
  years: z.number().optional(),
  months: z.number().optional(),
});

export const applicantSchema = z.object({
  name: z.string(),
  ssn: z.string(),
  dateOfBirth: z.string(),
  sex: z.string(),
  email: z.string().email(),
  homePhone: z.string().optional(),
  cellPhone: z.string(),
  currentAddress: addressSchema,
  licenseNumber: z.string().optional(),
  licenseState: z.string().optional(),
  landlord: landlordSchema,
  lengthAtAddress: lengthAtAddressSchema,
  currentRent: z.number().optional(),
  reasonForMoving: z.string().optional(),
  relationship: z.string().optional(), // for co-applicant and guarantor
});

export const bankInfoSchema = z.object({
  bank: z.string().optional(),
  address: z.string().optional(),
  phone: z.string().optional(),
});

export const financialInfoSchema = z.object({
  employer: z.string(),
  employerAddress: z.string(),
  position: z.string(),
  employedSince: z.string(),
  supervisor: z.string().optional(),
  supervisorPhone: z.string().optional(),
  income: z.number(),
  incomeFrequency: z.string(),
  otherIncomeAmount: z.number().optional(),
  otherIncomePer: z.string().optional(),
  otherIncomeSource: z.string().optional(),
  checking: bankInfoSchema,
  savings: bankInfoSchema,
  investment: bankInfoSchema,
});

export const legalQuestionsSchema = z.object({
  legalAction: z.string(),
  legalActionExplanation: z.string().optional(),
  brokenLease: z.string(),
  brokenLeaseExplanation: z.string().optional(),
  bankruptcy: z.string(),
  bankruptcyExplanation: z.string().optional(),
  felony: z.string(),
  felonyExplanation: z.string().optional(),
});

export const signatureSchema = z.object({
  name: z.string(),
  date: z.string(),
  signature: z.string(), // base64 encoded signature image
});

export const signaturesSchema = z.object({
  primaryApplicant: signatureSchema,
  coApplicant: signatureSchema.optional(),
  guarantor: signatureSchema.optional(),
});
