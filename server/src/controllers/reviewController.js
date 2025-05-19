import reviewModel from "../models/review.js";
import { paginateQuery } from "../utils/paginate.js";
import path from "path"; //Modulo path para trabajar con rutas sin confundir slashes
import fs from "fs/promises"; //Modulo fs para trabajar con archivos y promesas para poder usar await
import { fileURLToPath } from 'url'; //Funcion para convertir URL en path de sistema de archivos
import { dirname } from 'path'; //Funcion que extrae solo la carpeta de un path

//Con import y export ya no existen las variables globales filename y dirname del require
const __filename = fileURLToPath(import.meta.url); //Crea una ruta completa como string
const __dirname = dirname(__filename);


const showReviewByUser = async (req, res) => {
  try {
    const userId = req.user?._id;

    const { page, limit, total, totalPages, results } = await paginateQuery(
      reviewModel,
      { userId },
      {
        page: req.query.page,
        limit: req.query.limit,
        populate: ["restaurantId"],
        sort: { createdAt: -1 },
      }
    );

    const formattedReviews = results.map((review) => ({
      text: review.text,
      rating: review.rating,
      restaurant: review.restaurantId?.name || null,
      createdAt: review.createdAt,
    }));

    res.status(200).json({
      page,
      limit,
      total,
      totalPages,
      reviews: formattedReviews,
    });

  } catch (error) {
    console.error("Error al obtener reviews del usuario:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
};

const showReviewByRestaurant = async (req, res) => {
  try {
    const restaurantId = req.params.restaurantId;

    const data = await paginateQuery(reviewModel, { restaurantId }, {
      page: req.query.page,
      limit: req.query.limit,
      populate: [
        { path: "restaurantId", select: "name" },
        { path: "userId", select: "username" }
      ],
      sort: { createdAt: -1 },
    });

    const formattedReviews = data.results.map((review) => ({
      text: review.text,
      rating: review.rating,
      restaurant: review.restaurantId?.name || null,
      user: review.userId?.username || null,
      createdAt: review.createdAt,
      image: review.image
    }));

    res.status(200).json({
      ...data,
      results: formattedReviews,
    });
  } catch (error) {
    console.error("Error al obtener reviews:", error.message);
    res.status(400).json({ error: error.message });
  }
};


const addReview = async (req, res) => {
  try {
    const userId = req.user?._id;
    const restaurantId = req.params.restaurantId;
    const { text, rating } = req.body;
    const image = req.file ? req.file.filename : null;
    
    await reviewModel.create({
      userId: userId,
      restaurantId,
      text,
      rating,
      image: image
    });

    res.status(201).json({ message: "Review agregado correctamente" });

  } catch (error) {
    console.error("Error al agregar la review:", error);
    res.status(500).json({ error: "Error al agregar la review" });
  }
};

const updateReview = async (req, res) => {
  try {
    const { text, rating } = req.body;

    const review = await reviewModel.findById(req.params.id).populate("restaurantId", "name");

    if (!review) {
      return res.status(404).json({ error: "Review no encontrada" });
    }

    if (review.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: "No autorizado para modificar esta review" });
    }

    review.text = text;
    review.rating = rating;
    const updatedReview = await review.save();

    const formattedReview = {
      text: updatedReview.text,
      rating: updatedReview.rating,
      restaurant: updatedReview.restaurantId ? updatedReview.restaurantId.name : null,
      createdAt: updatedReview.createdAt,
    };

    res.status(200).json({ message: "Review actualizada", review: formattedReview });

  } catch (error) {
    console.error("Error al actualizar la review:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
};

const updateReviewImage = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const newImage = req.file;

    if (!newImage) {
      return res.status(400).json({ error: "New image not found" });
    }

    const review = await reviewModel.findById(reviewId);
    if (!review) {
      return res.status(404).json({ error: "Review not found" });
    }

    // Si la review ya tiene una imagen
    if (review.image) {
      // Eliminar la imagen anterior
      const oldImagePath = path.join(__dirname, "../public/images", review.image);
      // Verificar si la imagen anterior existe
      if (fs.existsSync(oldImagePath)) {
        await fs.unlink(oldImagePath, (err) => {
          if (err) {
            console.error("Error deleting old image:", err);
          }
        });
      }
    }

    // Actualizar la review con la nueva imagen
    review.image = newImage.filename;
    await review.save();

    res.json({
      message: "Image updated successfully",
      image: newImage.filename,
    });
  } catch (error) {
    console.error("Error updating review image:", error);
    res.status(500).json({ error: "Error updating review image" });
  }
};

const deleteReview = async (req, res) => {
  const reviewId = req.params.id;

  try {
    const review = await reviewModel.findById(reviewId);

    if (!review) {
      return res.status(404).json({ error: "Review no encontrada" });
    }

    if (review.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: "No autorizado para eliminar esta review" });
    }

    await review.deleteOne();

    res.status(200).json({ message: "Review eliminada correctamente" });

  } catch (error) {
    console.error("Error al eliminar la review:", error);
    res.status(500).json({ error: "Error del servidor" });
  }
};

const deleteReviewImage = async (req, res) => {
  try {
    const { reviewId } = req.params;

    const review = await reviewModel.findById(reviewId);
    if (!review) {
      return res.status(404).json({ error: "Review not found" });
    }

    // Se asegura de: que tenga una imagen/ que sea un string valido/ que no este vacio
    if (!review.image || typeof review.image !== "string" || review.image.trim() === "") {
      return res.status(400).json({ error: "Not a valid image in this review" });
    }

    const imagePath = path.join(__dirname, "../public/images", review.image);
    /* console.log("Ruta absoluta de la imagen:", imagePath); // <- VERIFICA esta ruta */

    try {
      await fs.unlink(imagePath);
      console.log("Image deleted successfully");
    } catch (err) {
      if (err.code === "ENOENT") {
        // Archivo no existe, ignorar
        console.warn("Image not found, skipping deletion");
      } else {
        console.error("Error deleting image from server:", err);
        return res.status(500).json({ error: "Error deleting image from server" });
      }
    }

    // Actualizar la review sin la imagen
    review.image = null;
    await review.save();

    return res.json({ message: "Image deleted successfully" });
  } catch (error) {
    console.error("General error:", error);
    return res.status(500).json({ error: "Error deleting image" });
  }
};

export default { showReviewByUser, showReviewByRestaurant, addReview, updateReview, deleteReview, updateReviewImage, deleteReviewImage };