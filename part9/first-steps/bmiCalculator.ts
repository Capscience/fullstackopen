const calculateBmi = (height: number, weight: number) => {
  // (weight (kg)) / (height (m))^2
  const ratio = weight / (height / 100 * height / 100);
  if (ratio < 18.5) {
    return "Underweight";
  } else if (ratio < 25.0) {
    return "Normal range";
  } else if (ratio < 30.0) {
    return "Overweight";
  } else {
    return "Obese";
  }
}

console.log(calculateBmi(180, 74))
