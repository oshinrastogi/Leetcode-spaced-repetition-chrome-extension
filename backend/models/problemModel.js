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
});

problemSchema.index({ title: 1, email: 1 }, { unique: true });

export default mongoose.model("Problem",problemSchema);



