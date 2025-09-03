import "dotenv/config";
import { db } from "../db";
import { questions } from "../db/schemas/questions.schema";

async function seed() {
	await db.insert(questions).values([
		{
			text: "What is the capital of France?",
			options: ["Paris", "Berlin", "Madrid", "London"],
			answer: "Paris",
		},
		{ text: "2 + 2 equals?", options: ["3", "4", "5", "6"], answer: "4" },
		{
			text: "What is the largest ocean?",
			options: ["Atlantic", "Pacific", "Indian", "Arctic"],
			answer: "Pacific",
		},
		{
			text: "Who wrote Hamlet?",
			options: ["Shakespeare", "Tolstoy", "Homer", "Jane Austen"],
			answer: "Shakespeare",
		},
		{
			text: "What is H2O?",
			options: ["Water", "Oxygen", "Hydrogen", "Helium"],
			answer: "Water",
		},
		{
			text: "What is the speed of light?",
			options: ["3x10^8 m/s", "1x10^6 m/s", "5x10^7 m/s", "10x10^8 m/s"],
			answer: "3x10^8 m/s",
		},
		{
			text: "Which planet is known as the Red Planet?",
			options: ["Mars", "Venus", "Jupiter", "Saturn"],
			answer: "Mars",
		},
		{
			text: "What language runs in a web browser?",
			options: ["Python", "JavaScript", "C++", "Ruby"],
			answer: "JavaScript",
		},
		{
			text: "What is the square root of 64?",
			options: ["6", "8", "10", "12"],
			answer: "8",
		},
		{
			text: "Who painted the Mona Lisa?",
			options: ["Van Gogh", "Da Vinci", "Picasso", "qualifie"],
			answer: "Da Vinci",
		},
	]);
	console.log("✅ Seed data inserted");
	process.exit(0);
}

seed().catch((err) => {
	console.error(err);
	process.exit(1);
});
