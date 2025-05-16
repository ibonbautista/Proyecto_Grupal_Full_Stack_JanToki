import reviewModel from "../models/review.js";

const showReviewByUser = async (req, res) => {
  try {
    const userId = req.user?._id;

    let pageNumber = parseInt(req.query.page, 10) || 1;
    let limitNumber = parseInt(req.query.limit, 10) || 10;

    if (pageNumber < 1) pageNumber = 1;
    if (limitNumber < 1) limitNumber = 10;

    const skip = (pageNumber - 1) * limitNumber;

    const reviews = await reviewModel
      .find({ userId })
      .populate("restaurantId")
      .skip(skip)
      .limit(limitNumber);

    const total = await reviewModel.countDocuments({ userId });

    const formattedReviews = reviews.map((review) => ({
      text: review.text,
      rating: review.rating,
      restaurant: review.restaurantId ? review.restaurantId.name : null,
      createdAt: review.createdAt,
    }));

    res.status(200).json({
      page: pageNumber,
      limit: limitNumber,
      total,
      totalPages: Math.ceil(total / limitNumber),
      reviews: formattedReviews,
    });

  } catch (error) {
    console.error("Error al obtener reviews:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
};

const showReviewByRestaurant = async (req, res) => {
  try {
    const restaurantId = req.params.restaurantId;

    let pageNumber = parseInt(req.query.page, 10) || 1;
    let limitNumber = parseInt(req.query.limit, 10) || 10;

    if (pageNumber < 1) pageNumber = 1;
    if (limitNumber < 1) limitNumber = 10;

    const skip = (pageNumber - 1) * limitNumber;

    const reviews = await reviewModel
      .find({ restaurantId })
      .populate("restaurantId")
      .populate("userId")
      .skip(skip)
      .limit(limitNumber);

    const total = await reviewModel.countDocuments({ restaurantId });

    const formattedReviews = reviews.map((review) => ({
      text: review.text,
      rating: review.rating,
      restaurant: review.restaurantId ? review.restaurantId.name : null,
      user: review.userId?.username,
      createdAt: review.createdAt,
    }));

    res.status(200).json({
      page: pageNumber,
      limit: limitNumber,
      total,
      totalPages: Math.ceil(total / limitNumber),
      reviews: formattedReviews,
    });

  } catch (error) {
    console.error("Error al obtener reviews:", error);
    res.status(500).json({ error: "Error en el servidor" });
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