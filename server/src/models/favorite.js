import mongoose from "mongoose";

const favoriteSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true,
    },
    restaurantId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant',
        required:true,
    }
});

export default mongoose.model("Favorite", favoriteSchema)
