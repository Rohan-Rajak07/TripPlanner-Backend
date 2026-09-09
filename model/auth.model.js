import mongoose from 'mongoose';

const tripSchema = new mongoose.Schema({
    destination: { type: String, default: "Bali" },
    days: { type: String, default: "5" },
    budget: { type: String, default: "cheap" },
    companions: { type: String, default: "solo" },
    tripDetails: { type: String, default: "<div>NOTHING</div>" } // can store HTML as string
  });

const userSchema = new mongoose.Schema({
        name:{type: String,required: true},
        password:{type: String,required: true},
        email: {type: String,required: true},
        myTrip: {
            type: [tripSchema],
          }
    });

const userModel=mongoose.model('user',userSchema);
export default userModel;