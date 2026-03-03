import express from 'express';
import { Response } from 'express';
import { NonSensitivePatient } from '../types';
import patientService from '../services/patientService';
import { toNewPatient } from '../utils';

const router = express.Router();

router.get('/', (_req, res: Response<NonSensitivePatient[]>) => {
  const patients = patientService.getEntries();
  res.json(patients);
});

router.post('/', (req, res: Response<NonSensitivePatient | string>) => {
  try {
    const data = toNewPatient(req.body);
    const newEntry = patientService.addEntry(data);
    res.json(newEntry);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  };
});

export default router;
