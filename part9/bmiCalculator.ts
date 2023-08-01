const calculateBmi = (height: number, weight: number): string => {
    const bmi = weight / ((height / 100) ** 2);

    if (bmi < 16) {
        return "Severely Underweight";
    } else if (bmi >= 16 && bmi < 18.5) {
        return "Underweight";
    } else if (bmi >= 18.5 && bmi < 25) {
        return "Normal (Healthy Weight)";
    } else if (bmi >= 25 && bmi < 30) {
        return "Overweight";
    } else if (bmi >= 30 && bmi < 35) {
        return "Obese Class I (Moderate)";
    } else if (bmi >= 35 && bmi < 40) {
        return "Obese Class II (Severe)";
    } else {
        return "Obese Class III (Very Severe or Morbidly Obese)";
    }
};

console.log(calculateBmi(180, 74));