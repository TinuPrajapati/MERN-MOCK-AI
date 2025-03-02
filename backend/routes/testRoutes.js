import express from 'express';
import { authMiddleware } from "../middleware/authMiddleware.js";
import { createTest, getAllTests, getTestById } from '../controller/testController.js';

const testRouter = express.Router();

// Create Test (Admin Only)
testRouter.post('/create',authMiddleware, createTest);
// Fetch Tests
testRouter.get('/all',authMiddleware, getAllTests);
testRouter.get('/:id',authMiddleware, getTestById);

export default testRouter;
