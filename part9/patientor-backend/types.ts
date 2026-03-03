export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
};

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  gender: "male" | "female" | "other";
  ssn: string;
  occupation: string;
}

export type NonSensitivePatient = Omit<Patient, 'ssn'>;

export default {}
