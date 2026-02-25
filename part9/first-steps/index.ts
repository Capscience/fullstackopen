import express from 'express';
import calculateBmi from './bmiCalculator';
import calculateExercises from './exerciseCalculator';
import { ExerciseInput } from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const { weight, height } = req.query;
  if (isNaN(Number(weight)) || isNaN(Number(height))) {
    res.status(400).json({ error: "malformatted parameters" });
    return;
  }
  const bmi = calculateBmi(Number(height), Number(weight));
  res.status(200).json({
    weight: Number(weight),
    height: Number(height),
    bmi,
  });
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { target, daily_exercises } = req.body;
  if (!target || !daily_exercises) {
    res.status(400).json({ error: "parameters missing" });
    return;
  }

  if (
    isNaN(Number(target))
    || !(daily_exercises instanceof Array)
    || (daily_exercises as Array<string>).map(value => Number(value)).some(value => isNaN(value))
  ) {
    res.status(400).json({ error: "malformatted parameters" });
    return;
  }

  const input: ExerciseInput = {
    target: Number(target),
    dailyHours: (daily_exercises as string[]).map((value: string) => Number(value))
  };

  res.status(201).json(calculateExercises(input));
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
