interface calculateValues {
	height: number;
	weight: number;
}

export const parseArguments = (args: string[]): calculateValues => {
	if (args.length < 4) throw new Error("Not enough arguments");

	if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
		return {
			height: Number(args[2]),
			weight: Number(args[3]),
		};
	} else {
		throw new Error("Provided values were not numbers!");
	}
};

export const calculateBmi = (height: number, weight: number): string => {
	const bmi = weight / (height / 100) ** 2;

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

try {
	const { height, weight } = parseArguments(process.argv);
	console.log(calculateBmi(height, weight));
} catch (error: unknown) {
	let errorMessage = "Something bad happened.";
	if (error instanceof Error) {
		errorMessage += " Error: " + error.message;
	}
	console.log(errorMessage);
}
