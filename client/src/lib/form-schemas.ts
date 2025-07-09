import { z } from "zod";

export const applicationDetailsSchema = z.object({
  applicationDate: z.string().min(1, "Application date is required"),
  buildingAddress: z.string().min(1, "Building address is required"),
  apartmentNumber: z.string().min(1, "Apartment number is required"),
  monthlyRent: z.string().min(1, "Monthly rent is required"),
  apartmentType: z.string().min(1, "Apartment type is required"),
  moveInDate: z.string().min(1, "Move-in date is required"),
  hearAbout: z.string().min(1, "Please specify how you heard about us"),
  brokerName: z.string().optional(),
  brokerPhone: z.string().optional(),
});

export const addressSchema = z.object({
  street: z.string().min(1, "Street address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zip: z.string().min(1, "ZIP code is required"),
});

export const applicantSchema = z.object({
  name: z.string().min(1, "Full name is required"),
  ssn: z.string().min(1, "Social security number is required"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  sex: z.string().min(1, "Sex is required"),
  email: z.string().email("Valid email is required"),
  homePhone: z.string().optional(),
  cellPhone: z.string().min(1, "Cell phone is required"),
  currentAddress: addressSchema,
  licenseNumber: z.string().optional(),
  licenseState: z.string().optional(),
  landlord: z.object({
    name: z.string().optional(),
    address: z.string().optional(),
  }),
  lengthAtAddress: z.object({
    years: z.number().optional(),
    months: z.number().optional(),
  }),
  currentRent: z.number().optional(),
  reasonForMoving: z.string().optional(),
  relationship: z.string().optional(),
});

export const financialInfoSchema = z.object({
  employer: z.string().min(1, "Employer is required"),
  employerAddress: z.string().min(1, "Employer address is required"),
  position: z.string().min(1, "Position is required"),
  employedSince: z.string().min(1, "Employment start date is required"),
  supervisor: z.string().optional(),
  supervisorPhone: z.string().optional(),
  income: z.number().min(1, "Income is required"),
  incomeFrequency: z.string().min(1, "Income frequency is required"),
  otherIncomeAmount: z.number().optional(),
  otherIncomePer: z.string().optional(),
  otherIncomeSource: z.string().optional(),
  checking: z.object({
    bank: z.string().optional(),
    address: z.string().optional(),
    phone: z.string().optional(),
  }),
  savings: z.object({
    bank: z.string().optional(),
    address: z.string().optional(),
    phone: z.string().optional(),
  }),
  investment: z.object({
    institution: z.string().optional(),
    address: z.string().optional(),
    phone: z.string().optional(),
  }),
});

export const legalQuestionsSchema = z.object({
  legalAction: z.string().min(1, "Please answer the legal action question"),
  legalActionExplanation: z.string().optional(),
  brokenLease: z.string().min(1, "Please answer the broken lease question"),
  brokenLeaseExplanation: z.string().optional(),
  bankruptcy: z.string().min(1, "Please answer the bankruptcy question"),
  bankruptcyExplanation: z.string().optional(),
  felony: z.string().min(1, "Please answer the felony question"),
  felonyExplanation: z.string().optional(),
});

export const signatureSchema = z.object({
  name: z.string().min(1, "Signature name is required"),
  date: z.string().min(1, "Signature date is required"),
  signature: z.string().min(1, "Digital signature is required"),
});

export const fullApplicationSchema = z.object({
  applicationDetails: applicationDetailsSchema,
  primaryApplicant: applicantSchema,
  hasCoApplicant: z.boolean(),
  coApplicant: applicantSchema.optional(),
  coApplicantSameAddress: z.boolean(),
  hasGuarantor: z.boolean(),
  guarantor: applicantSchema.optional(),
  financialInfo: z.object({
    primaryApplicant: financialInfoSchema,
    coApplicant: financialInfoSchema.optional(),
    guarantor: financialInfoSchema.optional(),
  }),
  legalQuestions: legalQuestionsSchema,
  signatures: z.object({
    primaryApplicant: signatureSchema,
    coApplicant: signatureSchema.optional(),
    guarantor: signatureSchema.optional(),
  }),
});
