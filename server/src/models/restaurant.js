import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema({
    Name: {
        type: String,
        required:true,
        trim:true
    },
    Description: {
        type: String,
        required:true,
        trim:true
    },
    Town: {
        type: String,
        required:true,
        trim:true
    }, 
    Municipality: {
      type: String,
      required: true,
    },
    Address: {
        type: String,
        required: false,
        trim:true
    },
    Latitude: {
        type: Number,
        required:true
    },
    Longitude: {
        type: Number,
        required:true
    },
    Categories: {
        CuisineType: {
          type: String,
          required: true,
          enum: ["asador","sidreria","fusion","alta cocina","tradicional","pintxos",
                 "variado","marisqueria","asiatica","vegetariano","halal","vegano",
                 "francesa","italiana","riojana","mediterranea","internacional"],
          default: "tradicional"
        },
        Brands: {
            type: [String],
            required: false,
        },
        MichelinStars: {
            type: Number,
            required: false,
        },
        RepsolSuns: {
            type: Number,
            required: false,
        },
        Recommended: {
            type: Boolean,
            required: false,
        }
    },
    Phone: {
        type: String,
        required: false,
        trim:true
    },
    Website: {
        type: String,
        required: false,
        trim:true
    },
    SocialMedia: {
        type: String,
        required:false,
        enum: ["facebook","instagram","twitter"],
        default: null,
		validate: {
			validator: function (v) {
				// Permitir null o string vacío además del enum
				return !v || ["facebook", "instagram", "twitter"].includes(v);
			},
			message: props => `"${props.value}" no es una red social válida`
		}
    },
    Image: {
        type: String,
        required:false
    },
    Rating: {
        type: Number,
        required:false,
        default: 0
    }
});

export default mongoose.model("Restaurant",restaurantSchema)
