import express from 'express';
import { Response } from 'express';
import diagnoseService from '../services/diagnosisService';
import { Diagnosis } from '../types';

const router = express.Router();

router.get('/', (_req, res: Response<Diagnosis[]>) => {
  const diagnoses = diagnoseService.getEntries();
  res.json(diagnoses);
});

export default router;
