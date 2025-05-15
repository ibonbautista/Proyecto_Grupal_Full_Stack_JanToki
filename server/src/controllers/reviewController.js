import reviewModel from "../models/review.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const showReview = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "No autorizado" });
    }

    const token = authHeader.split(" ")[1];
    let user = null;

    if (token) {
      user = jwt.verify(token, process.env.JWT_SECRET);
    }

    const reviews = user
      ? await reviewModel.find({ userId: user._id }).populate("restaurantId")
      : [];
    // Aquí saco por consola los ids
    console.log("Reviews obtenidas:");
    reviews.forEach((r) => {
      console.log(`- id: ${r._id}, text: "${r.text}"`);
    });

    const formattedReviews = reviews.map((review) => ({
      text: review.text,
      rating: review.rating,
      restaurant: review.restaurantId ? review.restaurantId.name : null,
      createdAt: review.createdAt,
    }));

    res.status(200).json({ reviews: formattedReviews });

  } catch (error) {
    console.error("Error al obtener reviews:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
};


const addReview = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "No autorizado" });
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).send("No autorizado");
    }

    const user = jwt.verify(token, process.env.JWT_SECRET);
    const { restaurantId, text, rating } = req.body;
    
    await reviewModel.create({
      userId: user._id,
      restaurantId,
      text,
      rating
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

    const updatedReview = await reviewModel.findByIdAndUpdate(
      req.params.id,
      { text, rating },
      { new: true }
    ).populate("restaurantId", "name");

    if (!updatedReview) {
      return res.status(404).json({ error: "Review no encontrada" });
    }

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

const deleteReview = async (req, res) => {
  const reviewId = req.params.id;

  try {
    const deletedReview = await reviewModel.findByIdAndDelete(reviewId);
    if (!deletedReview) {
      return res.status(404).json({ error: "Review no encontrada" });
    }
    res.status(200).json({ message: "Review eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar la review:", error);
    res.status(500).json({ error: "Error del servidor" });
  }
};


export default { showReview, addReview, updateReview, deleteReview };