import express from 'express';
import dotenv from 'dotenv';
import authRouter from './routes/auth.router.js';
import dbConnect from './config/db.config.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import aiRouter from './routes/ai.router.js';
dotenv.config();

const app=express();
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors({origin:"https://trip-planner-three-beryl.vercel.app",credentials:true}));
// dbConnect();

let isConnected = false;

async function connectToDatabase() {
    if (isConnected) {
        return;
    }

    try {
        await dbConnect();
        isConnected = true;
        console.log("Connected to the database successfully.");
    } catch (error) {
        console.error("Database connection failed:", error);
        throw error;
    }
}

// Routes
app.use("/auth", async (req, res, next) => {
    try {
        await connectToDatabase();
        next();
    } catch (error) {
        next(error);
    }
}, authRouter);

app.use("/ai", async (req, res, next) => {
    try {
        await connectToDatabase();
        next();
    } catch (error) {
        next(error);
    }
}, aiRouter);

// Test route
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Trip Planner Backend is running"
    });
});

// Error handler
app.use((err, req, res, next) => {
    console.error("Server Error:", err);

    res.status(500).json({
        success: false,
        message: "Internal Server Error"
    });
});

// IMPORTANT for Vercel
export default app;