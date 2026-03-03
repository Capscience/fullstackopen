import patientData from '../data/patients';
import { NonSensitivePatient, Patient } from '../types';

const data: Patient[] = patientData as Patient[];

const getEntries = (): NonSensitivePatient[] => {
  return data.map(({ id, name, dateOfBirth, gender, occupation }) => ({ id, name, dateOfBirth, gender, occupation }));
};

export default {
  getEntries,
};
