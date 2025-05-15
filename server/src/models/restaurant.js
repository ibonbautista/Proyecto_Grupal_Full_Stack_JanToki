import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema({
    name: {
        type: String,
        required:true,
        trim:true
    },
    description: {
        type: String,
        required:true,
        trim:true
    },
    ubication: {
        town: {
            type: String,
            required:true,
            trim:true
        }, 
        address: {
            type: String,
            required:true,
            trim:true
        },
        latitude: {
            type: Number,
            required:true
        },
        longitude: {
            type: Number,
            required:true
        }
    },
    category: {
        type: String,
        required:true,
        enum: ["asador","sideria","fusion","alta cocina","tradicional","pintxos",
               "variado","marisqueria","asiatica","vegetariano","halal","vegano",
               "francesa","italiana","riojana","mediterranea","internacional"],
        default: "tradicional"
    },
    phone: {
        type: String,
        required:true,
        trim:true
    },
    webPage: {
        type: String,
        required: false,
        trim:true
    },
    socialMedia: {
        type: String,
        required:false,
        enum: ["facebook","instagram","twitter"]
    },
    rating: {
        type: Number,
        required:false,
        default: 0
    },
    image: {
        type: String,
        required:false
    }
});

export default mongoose.model("Restaurant",restaurantSchema)
