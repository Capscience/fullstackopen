interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: 1 | 2 | 3;
  ratingDescription: string;
  target: number;
  average: number;
}

interface ExerciseInput {
  target: number;
  dailyHours: Array<number>;
}

const parseExerciseArguments = (args: Array<string>): ExerciseInput => {
  if (args.length < 4) throw new Error('Too few arguments!');

  const [, , stringTarget, ...stringDailyHours] = args;
  if (isNaN(Number(stringTarget))) throw new Error('Target must be a number!');
  const target = Number(stringTarget);
  const dailyHours = stringDailyHours.map(value => Number(value))
  if (dailyHours.some(value => isNaN(value))) throw new Error('Hours must be numbers!');
  return {
    target,
    dailyHours,
  }
}

const calculateExercises = (input: ExerciseInput): Result => {
  const { target, dailyHours } = input;
  const descriptions = [
    "Time to lock in",
    "Not bad, not bad",
    "We cooking",
  ];

  const periodLength = dailyHours.length;
  const trainingDays = dailyHours.filter(hours => hours > 0).length;
  const average = dailyHours.reduce((hours, sum) => sum + hours) / dailyHours.length;
  const success = average >= target;
  const rating = calculateRating(average, target);
  const ratingDescription = descriptions[rating - 1];

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  }
}

const calculateRating = (average: number, target: number): 1 | 2 | 3 => {
  const lowerBound = 0.9 * target;
  const upperBound = 1.1 * target;
  if (average < lowerBound) {
    return 1;
  } else if (average > upperBound) {
    return 3;
  } else {
    return 2;
  }
}

try {
  console.log(calculateExercises(parseExerciseArguments(process.argv)))
} catch (error: unknown) {
  let errorMessage = 'Something went wrong.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
    console.error(errorMessage);
  }
}
