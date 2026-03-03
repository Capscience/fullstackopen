import { z } from 'zod';
import { Gender, NewPatient } from "./types";

export const newPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.iso.date(),
  gender: z.enum(Gender),
  ssn: z.string(),
  occupation: z.string(),
});

export const toNewPatient = (object: unknown): NewPatient => {
  return newPatientSchema.parse(object);
};
