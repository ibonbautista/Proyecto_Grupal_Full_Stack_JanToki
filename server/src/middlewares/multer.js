import multer from "multer";
import path from "path";
import fs from "fs";
import Restaurant from "../models/restaurant.js";
import Review from "../models/review.js";

// Middleware previo para obtener el restaurantName sincrónicamente para multer
export async function prepareRestaurantName(req, res, next) {
  try {
    const restaurantId = req.params.restaurantId;
    const reviewId = req.params.reviewId;
    let restaurantName = "unknown";

    if (restaurantId) {
      const restaurant = await Restaurant.findById(restaurantId);
      if (!restaurant) return res.status(404).json({ error: "Restaurante no encontrado" });

      restaurantName = restaurant.Name.replace(/\s+/g, "_").toLowerCase();

    } else if (reviewId) {
      const review = await Review.findById(reviewId);
      if (!review) return res.status(404).json({ error: "Review no encontrada" });
      const restaurant = await Restaurant.findById(review.restaurantId);
      if (!restaurant) return res.status(404).json({ error: "Restaurante no encontrado" });
      restaurantName = restaurant.Name.replace(/\s+/g, "_").toLowerCase();

      // Eliminar imagen previa si existe
      if (review.image) {
        const oldImagePath = path.join("public/images/reviews", review.image);
        if (fs.existsSync(oldImagePath)) {
          fs.unlink(oldImagePath, (err) => {
            if (err) console.error("Error eliminando imagen anterior:", err);
          });
        }
      }

    } else {
      return res.status(400).json({ error: "Ni restaurantId ni reviewId proporcionados" });
    }

    req.restaurantName = restaurantName;
    next();

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error interno preparando datos para imagen" });
  }
}

// Configuración Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images/reviews");
  },
  filename: (req, file, cb) => {
    const userId = req.user ? String(req.user._id).slice(0, 5) : "anon";
    const restaurantName = req.restaurantName /* || "unknown" */;
  
    const now = new Date();
    const shortYear = String(now.getFullYear()).slice(2);
    const month = ("0" + (now.getMonth() + 1)).slice(-2);
    const day = ("0" + now.getDate()).slice(-2);
    const time = now.toTimeString().slice(0, 8).replace(/:/g, "");
    const extension = path.extname(file.originalname);
  
    const formattedDate = `${shortYear}${month}${day}${time}`;
  
    cb(null, `${userId}-${restaurantName}-${formattedDate}${extension}`);
  }
});

const restaurantStorage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "public/images/restaurants");
	},
	filename: (req, file, cb) => {
		const userId = req.user ? String(req.user._id).slice(0, 5) : "anon";
		const now = new Date();
		const shortYear = String(now.getFullYear()).slice(2);
		const month = ("0" + (now.getMonth() + 1)).slice(-2);
		const day = ("0" + now.getDate()).slice(-2);
		const time = now.toTimeString().slice(0, 8).replace(/:/g, "");
		const extension = path.extname(file.originalname);
		const formattedDate = `${shortYear}${month}${day}${time}`;
		cb(null, `${userId}-restaurant-${formattedDate}${extension}`);
	}
})

export const upload = multer({ storage });
export const uploadRestaurant = multer({ storage: restaurantStorage });
