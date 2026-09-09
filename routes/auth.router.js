import express from "express";
import{login, register,logout,isAuth,addTrip, getTrip} from "../controller/auth.controller.js"
import userAuth from "../middleware/auth.middleware.js";

const authRouter = express.Router();

authRouter.post("/register",register )
authRouter.post("/login",login )
authRouter.post("/logout",logout )
authRouter.get("/is-auth",userAuth,isAuth)
authRouter.post('/add-trip',userAuth,addTrip)
authRouter.get('/get-trip',userAuth,getTrip)


export default authRouter;