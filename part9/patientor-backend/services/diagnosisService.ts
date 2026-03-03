import diagnosisData from '../data/diagnoses';
import { Diagnosis } from '../types';

const data: Diagnosis[] = diagnosisData as Diagnosis[];

const getEntries = (): Diagnosis[] => {
  return data;
};

export default {
  getEntries,
};
