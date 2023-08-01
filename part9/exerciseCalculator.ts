interface ExerciseResult {
	periodLength: number;
	trainingDays: number;
	success: boolean;
	rating: number;
	ratingDescription: string;
	target: number;
	average: number;
}

interface calculateValues {
	dailyExerciseHours: number[];
	target: number;
}

const parseExerciseArguments = (args: string[]): calculateValues => {
	if (args.length < 4) throw new Error("Not enough arguments");

	const target = Number(args[2]);
	if (isNaN(target)) {
		throw new Error("Target value is not a number!");
	}

	const dailyExerciseHours = args.slice(3).map((arg) => {
		const exerciseHour = Number(arg);
		if (isNaN(exerciseHour)) {
			throw new Error("One or more exercise hour values are not numbers!");
		}
		return exerciseHour;
	});

	return {
		target,
		dailyExerciseHours,
	};
};
const calculateExercises = (
	dailyExerciseHours: number[],
	target: number
): ExerciseResult => {
	const periodLength = dailyExerciseHours.length;
	const trainingDays = dailyExerciseHours.filter(
		(exerciseHour) => exerciseHour > 0
	).length;
	const success = trainingDays >= target;
	const totalHour = dailyExerciseHours.reduce((acc, curr) => acc + curr);
	const average = totalHour / periodLength;
	const rating = getRating(average, target);
	const ratingDescription = getRatingDescription(rating);

	const exerciseResult: ExerciseResult = {
		periodLength,
		trainingDays,
		target,
		average,
		success,
		rating,
		ratingDescription,
	};

	return exerciseResult;
};

const getRating = (average: number, target: number): number => {
	const percentage = (average / target) * 100;
	if (percentage >= 200) {
		return 3;
	} else if (percentage >= 100) {
		return 2;
	} else {
		return 1;
	}
};

const getRatingDescription = (rating: number): string => {
	switch (rating) {
		case 3:
			return "excellent";
		case 2:
			return "not too bad but could be better";
		case 1:
			return "you should aim higher";
		default:
			return "";
	}
};

try {
	const { target, dailyExerciseHours } = parseExerciseArguments(process.argv);
	console.log(calculateExercises(dailyExerciseHours, target));
} catch (error: unknown) {
	let errorMessage = "Something bad happened.";
	if (error instanceof Error) {
		errorMessage += " Error: " + error.message;
	}
	console.log(errorMessage);
}
