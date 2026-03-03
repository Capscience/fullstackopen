import { v1 as uuid } from 'uuid';
import patientData from '../../data/patients';
import { NewPatient, NonSensitivePatient, Patient } from '../types';
import { toNewPatient } from '../utils';

const data: Patient[] = patientData.map(obj => {
  const patient = toNewPatient(obj) as Patient;
  patient.id = obj.id;
  return patient;
});

const getEntries = (): NonSensitivePatient[] => {
  return data.map(({ id, name, dateOfBirth, gender, occupation }) => ({ id, name, dateOfBirth, gender, occupation }));
};

const addEntry = (entry: NewPatient): NonSensitivePatient => {
  const patient: Patient = {
    id: uuid(),
    ...entry
  };

  data.push(patient);

  const { id, name, dateOfBirth, gender, occupation } = patient;
  return { id, name, dateOfBirth, gender, occupation };
}

export default {
  getEntries,
  addEntry,
};
