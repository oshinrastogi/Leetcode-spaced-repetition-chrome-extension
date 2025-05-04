import mongoose, { mongo } from "mongoose";

const problemSchema = new mongoose.Schema({
    id:{
        type:String,
    },
    title:{
        type:String,
    },
    url:{
        type:String
    },
    email:{
        type:String,
    },
    addedDate:{
        type:Date,
        default:Date.now
    },
})

export default mongoose.model("Problem",problemSchema);



