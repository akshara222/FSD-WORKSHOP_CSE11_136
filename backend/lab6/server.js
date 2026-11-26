import express from "express";
import dotenv from "dotenv";
import connectDB from "./db.js";    
import Student from "./models/student.js";

dotenv.config();
const app = express();
app.use(express.json());

app.post("/test-db", async(req,res) => {
    try{
        const student = await Student.create({
            name:"Akshara",
            email:"sangalakshara@gmail.com",
            course:"MongoDB"
        });
        res.status(201).json({
            message:"Data inserted successfully!",
            data:student,
        });
    }
    catch(error){
    res.status(500).json({
        message:error.message,
    });
    }
});

app.get("/test-db", async(req,res)=>{
    try{
        const student = await Student.find();
        res.status(200).json(students);
    }
    catch(error){
        res.status(500).json({
            message:error.message
        });
    }
});

app.get("/", (req, res) => {
    res.send("Server running successfully!");
});
const PORT = process.env.PORT || 3000;
const startServer = async () => {
    await connectDB();
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
};
startServer();