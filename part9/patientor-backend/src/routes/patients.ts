import express from 'express';
import { Request, Response, NextFunction } from 'express';
import { Patient, NewPatient, NonSensitivePatient } from '../types';
import patientService from '../services/patientService';
import { newPatientSchema } from '../utils';
import { ZodError } from 'zod';

const router = express.Router();

router.get('/', (_req, res: Response<NonSensitivePatient[]>) => {
  const patients = patientService.getEntries();
  res.json(patients);
});

router.get('/:id', (req, res: Response<Patient>) => {
  const patient = patientService.getEntry(req.params.id);
  res.json(patient);
})

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    newPatientSchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

const errorMiddleware = (error: unknown, _req: Request, res: Response, next: NextFunction) => {
  if (error instanceof ZodError) {
    res.status(400).send({ error: error.issues });
  } else if (error instanceof Error) {
    res.status(404).send({ error: "Patient not found" });
  } else {
    next(error);
  }
};

router.post('/', newPatientParser, (req: Request<unknown, unknown, NewPatient>, res: Response<NonSensitivePatient>) => {
  const newEntry = patientService.addEntry(req.body);
  res.json(newEntry);
});

router.use(errorMiddleware);

export default router;
