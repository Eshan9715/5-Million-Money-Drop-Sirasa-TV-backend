import mongoose from "mongoose";

const Schema = mongoose.Schema;
const trySchema = new Schema({
    questions:{
        type: Number,
        required: true,
    },
    money:{
        type: Number,
        required: true,
    },
    percentage:{
        type: Number,
        required: true,
    },
    status:{
        type: String,
        required: true,
    },
    user:{
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
    },
    createdAt: {
        type: Date,
        immutable: true,
        default: ()=> Date.now()
    },
    updatedAt:  {
        type: Date,
        default: ()=> Date.now()
    },
}

);

export default mongoose.model("Try",trySchema);