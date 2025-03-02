import mongoose from "mongoose";
const TestSchema = new mongoose.Schema({
    title: String,
    questions: [{ 
        question: String, 
        options: [String], 
        answer: String ,
        level: String,
        description: String
    }],
    level: String,
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    timeLimit: {
        type:Number,
        default:10
    }
});

export default mongoose.model('Test', TestSchema);
