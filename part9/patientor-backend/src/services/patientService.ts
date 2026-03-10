import { v1 as uuid } from 'uuid';
import patients from '../../data/patients-full';
import { NewPatient, NonSensitivePatient, Patient } from '../types';

const getEntries = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({ id, name, dateOfBirth, gender, occupation }));
};

const getEntry = (id: string): Patient => {
  const patient = patients.find(entry => entry.id === id);
  if (!patient) {
    throw new Error("Patient not found!");
  }
  return patient;
}

const addEntry = (entry: NewPatient): NonSensitivePatient => {
  const patient: Patient = {
    id: uuid(),
    entries: [],
    ...entry
  };

  patients.push(patient);

  const { id, name, dateOfBirth, gender, occupation } = patient;
  return { id, name, dateOfBirth, gender, occupation };
};

export default {
  getEntries,
  getEntry,
  addEntry,
};
