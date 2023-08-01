interface ExerciseResult {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
  }
  
  const calculateExercises = (
    dailyExerciseHours: number[],
    target: number
  ): ExerciseResult => {
    const periodLength = dailyExerciseHours.length;
    const trainingDays = dailyExerciseHours.filter((exerciseHour) => exerciseHour > 0).length;
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
  
  // Test the function with hard-coded values
  console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
  