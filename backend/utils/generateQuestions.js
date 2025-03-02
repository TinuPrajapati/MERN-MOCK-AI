import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const genAI = new GoogleGenerativeAI(`${process.env.GOOGLE_API_KEY}` );

export const generateQuestions = async (topic,number) => {
  const prompt = `Generate ${number} multiple-choice questions on ${topic}. Provide JSON format: 
    [{"question": "...", "options": ["...", "...", "...", "..."], "answer": "..."}]`;

  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
  const result = await model.generateContent(prompt);
  const text = await result.response.text();
  const jsonStart = text.indexOf("[");
  const jsonEnd = text.lastIndexOf("]") + 1;
  return JSON.parse(text.substring(jsonStart, jsonEnd));
};
