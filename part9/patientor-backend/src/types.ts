import z from "zod";
import { newPatientSchema } from "./utils";

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
};

export interface Patient extends NewPatient {
  id: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

export type NonSensitivePatient = Omit<Patient, 'ssn'>;
export type NewPatient = z.infer<typeof newPatientSchema>;
