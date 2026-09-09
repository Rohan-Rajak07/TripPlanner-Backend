import userModel from "../model/auth.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 7 * 24 * 60 * 60 * 1000
};

export const register=async(req,res)=>{

    const{name,email,password}=req.body;
    if(!name || !email || !password){
        return res.json({success:false,message:"All fields are required"});
    }

    const existingUser= await userModel.findOne({email});
    if(existingUser){
        return res.json({success:false,message:"User already exists"});
    }

    try
    {
        const hashPassword=await bcrypt.hash(password,10);
        const user=new userModel({name,email,password:hashPassword});
        await user.save();

        const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"7d"});
        res.cookie("token",token, cookieOptions);
        return res.json({success:true,message:"User registered successfully"});

    }catch(error){
        console.log(error.message);
        return res.json({success:false,message:error.message});
    }

   


    
}

export const login=async(req,res)=>{

    const{email,password}=req.body;
    if(!email || !password){
        return res.json({success:false,message:"All fields are required"});
    }
    try
    {
        const user=await userModel.findOne({email});
        if(!user)return res.json({success:false,message:"User not found"});

        const isMatch=await bcrypt.compare(password,user.password)

        if(!isMatch)return res.json({success:false,message:"Invalid credentials"});

        const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"7d"});
        res.cookie("token",token,cookieOptions);

        return res.json({success:true,message:"Login successfully"});

    }catch(error)
    {
        console.log(error.message);
        return res.json({success:false,message:error.message});
    }

}

export const logout=async(req,res)=>{

    try
    {
        res.clearCookie("token",{
            httpOnly:true,
            secure:process.env.NODE_ENV==="production",
        });
        return res.json({success:true,message:"Logout successfully"});
    }catch(error)    
    {
        console.log(error.message);
        return res.json({success:false,message:error.message});
    }

}

export const isAuth=async(req,res)=>{
    try
    {
        const userData=await userModel.findById(req.body.userId);
        if(!userData)return res.json({success:false,message:"Not Authorized"});
        return res.json({success:true,message:"Authorized",userData});
    }catch(error)
    {
        console.log(error.message);
        return res.json({success:false,message:error.message});
    }
}

export const addTrip=async(req,res)=>{

    const{userId}=req.body;
    try
    {
        const user=await userModel.findById(userId);
        if(!user)return res.json({success:false,message:"User not found"});

        const updatedUser = await userModel.findByIdAndUpdate(userId,               // user ID from URL
            { $push: { myTrip: req.body } },// add new trip to array
            { new: true })  

        return res.json({success:true,message:"Trip saved successfully",updatedUser});
    }catch(error)
    {
        console.log(error.message);
        return res.json({success:false,message:error.message});
    }

}

export const getTrip=async(req,res)=>{

    const{userId}=req.body;
    try
    {
        const user=await userModel.findById(userId);
        if(!user)return res.json({success:false,message:"User not found"}); 

        return res.json({success:true,message:"Get Your Trip",getTrip:user.myTrip});
    }catch(error)
    {
        console.log(error.message);
        return res.json({success:false,message:error.message});
    }

}