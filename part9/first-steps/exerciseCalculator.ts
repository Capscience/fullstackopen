interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: 1 | 2 | 3;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (dailyHours: Array<number>, target: number): Result => {
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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))
