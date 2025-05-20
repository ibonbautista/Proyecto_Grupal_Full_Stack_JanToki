import multer from "multer";
import path from "path";
import fs from "fs";
import Restaurant from "../models/restaurant.js";
import Review from "../models/review.js";

// Configuración de almacenamiento
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images");
  },

  filename: async function (req, file, cb) {
    const userId = req.user ? req.user._id : "anonymous";
    const restaurantId = req.params.restaurantId;
    const reviewId = req.params.reviewId;

    let oldImagePath = null;

    try {
      let restaurantName = "unknown";

      if (restaurantId) {
        // Nueva imagen para un restaurante
        const restaurant = await Restaurant.findById(restaurantId);
        if (!restaurant) {
          return cb(new Error("Restaurante no encontrado"));
        }

        restaurantName = restaurant.name.replace(/\s+/g, "_").toLowerCase();

      } else if (reviewId) {
        // Actualización de imagen en una review
        const review = await Review.findById(reviewId);
        if (!review) {
          return cb(new Error("Review no encontrada"));
        }

        const restaurant = await Restaurant.findById(review.restaurantId);
        if (!restaurant) {
          return cb(new Error("Restaurante no encontrado"));
        }

        restaurantName = restaurant.name.replace(/\s+/g, "_").toLowerCase();

        // ✅ **Eliminación de la imagen previa si existe**
        if (review.image) {
          oldImagePath = path.join("public/images", review.image);

          if (fs.existsSync(oldImagePath)) {
            fs.unlink(oldImagePath, (err) => {
              if (err) {
                console.error("Error al eliminar la imagen anterior:", err);
              }
            });
          }
        }
      } else {
        return cb(new Error("Ni restaurantId ni reviewId proporcionados"));
      }

      // Generar el nombre del nuevo archivo
      const now = new Date();
      const formattedDate =
        now.toISOString().slice(0, 10).replace(/-/g, "") +
        "-" +
        now.toTimeString().slice(0, 8).replace(/:/g, "");
      const extension = path.extname(file.originalname);

      cb(null, `${userId}-${restaurantName}-${formattedDate}${extension}`);

    } catch (error) {
      console.error("Error al procesar la imagen:", error);
      cb(new Error("Error al procesar la imagen"));
    }
  },
});

export const upload = multer({ storage });
