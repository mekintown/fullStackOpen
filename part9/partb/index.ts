import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";

const app = express();
app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack");
});

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack");
});

app.get("/bmi", (req, res) => {
  try {
    const height = req.query.height?.toString();
    const weight = req.query.weight?.toString();

    if (
      !height ||
      !weight ||
      isNaN(parseInt(height)) ||
      isNaN(parseInt(weight))
    ) {
      throw new Error("malformatted parameters");
    }

    const bmi = calculateBmi(parseInt(height), parseInt(weight));
    res.json({ weight, height, bmi });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    }
  }
});

app.post("/exercises", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;
  if (!daily_exercises || !target) {
    res.status(400).json({ error: "parameters missing" });
  }
  if (!Array.isArray(daily_exercises) || typeof target !== "number") {
    res.status(400).json({ error: "malformatted parameters" });
  }
  res
    .status(200)
    .json(calculateExercises(daily_exercises as number[], target as number));
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
