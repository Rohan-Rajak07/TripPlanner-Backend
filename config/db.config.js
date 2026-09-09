import dns from "dns";
import mongoose from "mongoose";
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const dbConnect= async()=>{
    await mongoose.connect(process.env.MONGODB_URL)
    .then(()=>console.log("Connect Successfully"))
    .catch((err)=>console.log("Error in DB Connection: ", err));
}

export default dbConnect;