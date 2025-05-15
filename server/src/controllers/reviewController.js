import reviewModel from "../models/review.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const showReview = async (req, res) => {
  try {
    const token = req.cookies?.token;
    let user = null;

    if (token) {
      user = jwt.verify(token, process.env.JWT_SECRET);
    }

    const reviews = user
      ? await reviewModel.find({ userId: user.id }).populate("restaurantId")
      : [];

    res.status(200).json({ reviews, user });

  } catch (error) {
    console.error("Error al obtener reviews:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
};

const addReview = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).send("No autorizado");
    }

    const user = jwt.verify(token, process.env.JWT_SECRET);
    const { restaurantId, text, rating } = req.body;

    await reviewModel.create({
      userId: user.id,
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
    );

    if (!updatedReview) {
      return res.status(404).json({ error: "Review no encontrada" });
    }

    res.status(200).json({ message: "Review actualizada", review: updatedReview });
  } catch (error) {
    console.error("Error al actualizar la review:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
};

const deleteReview = async (req, res) => {
  const reviewId = req.params.id;

  try {
    await reviewModel.findByIdAndDelete(reviewId);
    res.status(200).json({ message: "Review eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar la review:", error);
    res.status(500).json({ error: "Error del servidor" });
  }
};


export default { showReview, addReview, updateReview, deleteReview };