import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true,
    },
    restaurantId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant',
        required:true,
    },
    text: {
        type: String,
        required:true,
        trim:true
    },
    rating: {
        type: Number,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
});

export default mongoose.model("Review", reviewSchema)
