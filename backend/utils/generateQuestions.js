import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const genAI = new GoogleGenerativeAI(`${process.env.GOOGLE_API_KEY}` );

export const generateQuestions = async (topic,number,level) => {
  const prompt = `Generate ${number} multiple-choice questions on ${topic} for a ${level} level test. Each question should be designed to assess understanding at this difficulty level and include a small description explaining its relevance to the test objectives. Provide output in the following JSON format:
[
  {
    "question": "Your question text here",
    "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
    "answer": "Correct option",
    "level": "${level}",
    "description": "A small description about the test or the rationale behind this question."
  }
]`;


  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
  const result = await model.generateContent(prompt);
  const text = await result.response.text();
  const jsonStart = text.indexOf("[");
  const jsonEnd = text.lastIndexOf("]") + 1;
  return JSON.parse(text.substring(jsonStart, jsonEnd));
};
