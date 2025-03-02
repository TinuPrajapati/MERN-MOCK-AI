import Test from "../models/testModel.js";
import { generateQuestions } from "../utils/generateQuestions.js";

export const createTest = async (req, res) => {
  const { userId } = req.user;
  const { topic, number } = req.body;

  try {
    const questions = await generateQuestions(topic, number);
    const test = new Test({ title: topic, questions, createdBy: userId });
    await test.save();
    res.status(201).json({ message: "Test Create Successfully" });
  } catch (error) {
    console.log("Error come in createTest route:",error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getAllTests = async (req, res) => {
  try {
    const tests = await Test.find();
    res.status(200).json({ tests });
  } catch (error) {
    console.log("Error come in getAllTests route:",error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getTestById = async (req, res) => {
  const { id } = req.params;
  try {
    const test = await Test.findById(id);
    res.status(200).json({ test });
  } catch (error) {
    console.log("Error come in getTestById route:",error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};