import generateContent from "../service/ai.service.js";

export const generateTrip=async(req,res)=>{

    const{destination,days,budget,companions}=req.body;
    if(!destination || !days || !budget || !companions)return res.json({success:false,message:"All fields are required"})

    if(days==0 || days>10)return res.json({success:false,message:"Days must be between 1 and 10"});
    
    try
    {
        const promt=`Place:${destination}
        Days: ${days}
        Companions: ${companions}
        Budget: ${budget}`


        const aiResponse=await generateContent(promt);
        return res.json({success:true,message:"Trip Generated",aiResponse});
    }catch(error)
    {
        console.log(error.message);
        return res.json({success:false,message:error.message})
    }
    
}