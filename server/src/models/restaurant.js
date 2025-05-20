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
    town: {
        type: String,
        required:true,
        trim:true
    }, 
    municipality: {
      type: String,
      required: true,
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
    },
    category: {
        cuisineType: {
          type: String,
          required: true,
          enum: ["asador","sideria","fusion","alta cocina","tradicional","pintxos",
                 "variado","marisqueria","asiatica","vegetariano","halal","vegano",
                 "francesa","italiana","riojana","mediterranea","internacional"],
          default: "tradicional"
        },
        brands: {
            type: [String],
            required: false,
        },
        michelinStars: {
            type: Number,
            required: false,
        },
        repsolSuns: {
            type: Number,
            required: false,
        },
        recommended: {
            type: Boolean,
            required: false,
        }
    },
    phone: {
        type: String,
        required:true,
        trim:true
    },
    website: {
        type: String,
        required: false,
        trim:true
    },
    socialMedia: {
        type: String,
        required:false,
        enum: ["facebook","instagram","twitter"],
        default: null
    },
    image: {
        type: String,
        required:false
    },
    rating: {
        type: Number,
        required:false,
        default: 0
    }
});

export default mongoose.model("Restaurant",restaurantSchema)
