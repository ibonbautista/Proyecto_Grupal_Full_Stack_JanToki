import reviewModel from "../models/review.js";
import { paginateQuery } from "../utils/paginate.js";

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
    
    await reviewModel.create({
      userId: userId,
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

export default { showReviewByUser, showReviewByRestaurant, addReview, updateReview, deleteReview };