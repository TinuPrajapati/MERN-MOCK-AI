import Test from "../models/testModel.js";
import { generateQuestions } from "../utils/generateQuestions.js";

export const createTest = async (req, res) => {
  const { userId } = req.user;
  const { topic, number,level } = req.body;

  try {
    const questions = await generateQuestions(topic, number,level);
    const test = new Test({ title: topic, questions, createdBy: userId,level });
    await test.save();
    console.log(test);
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