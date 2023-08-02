import express from "express";
import { calculateBmi } from "./bmiCalculator";

const app = express();

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
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

const PORT = 3003;

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
