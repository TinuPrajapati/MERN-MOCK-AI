import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { createRecord,getAllRecords,getRecordById } from "../controller/recordController.js";
const recordRouter = express.Router();

// Create Test (Admin Only)
recordRouter.post('/create',authMiddleware, createRecord);
// Fetch Tests
recordRouter.get('/all',authMiddleware, getAllRecords);
recordRouter.get('/:id',authMiddleware, getRecordById);

export default recordRouter;