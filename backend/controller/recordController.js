import {Record} from "../models/recordModel.js";

export const createRecord = async(req,res)=>{
    try {
        const {userId} = req.user;
        const {testId,score} = req.body;
        const record = new Record({testId,userId,score});
        await record.save();
        res.status(201).json({message:"Record Create Successfully"});
    } catch (error) {
        console.log("Error come in createRecord route:",error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const getAllRecords = async(req,res)=>{
    try {
        const records = await Record.find().populate("testId");
        res.status(200).json({records});
    } catch (error) {
        console.log("Error come in getAllRecords route:",error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const getRecordById = async(req,res)=>{
    const {id} = req.params;
    try {
        const record = await Record.findById(id);
        res.status(200).json({record});
    } catch (error) {
        console.log("Error come in getRecordById route:",error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};