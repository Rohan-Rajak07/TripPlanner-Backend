import express from "express";
import userAuth from "../middleware/auth.middleware.js";
import { generateTrip } from "../controller/ai.controller.js";
const aiRouter = express.Router();

aiRouter.post("/generate-trip",userAuth,generateTrip)

export default aiRouter;