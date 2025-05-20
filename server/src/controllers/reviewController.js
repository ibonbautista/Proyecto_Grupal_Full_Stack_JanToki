import reviewModel from "../models/review.js";
import { paginateQuery } from "../utils/paginate.js";
import path from "path"; //Modulo path para trabajar con rutas sin confundir slashes
import fs from "fs/promises"; //Modulo fs para trabajar con archivos y promesas para poder usar await
import { fileURLToPath } from 'url'; //Funcion para convertir URL en path de sistema de archivos
import { dirname } from 'path'; //Funcion que extrae solo la carpeta de un path
import {
  NoReviewsFound,
  NoRestaurantReviewsFound,
  MissingReviewFields,
  ReviewAlreadyExists,
  ReviewNotFound,
  NotAuthorizedToUpdateReview,
  NoImageProvided,
  NotAuthorizedToDeleteReview,
  ReviewImageNotValid,
  ErrorDeleteImage,
} from "../utils/errors.js";
//Con import y export ya no existen las variables globales filename y dirname del require
const __filename = fileURLToPath(import.meta.url); //Crea una ruta completa como string
const __dirname = dirname(__filename);


const showReviewByUser = async (req, res, next) => {
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

    if (!results.length) {
      throw new NoReviewsFound();
    }

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
    next(error);
  }
};

const showReviewByRestaurant = async (req, res, next) => {
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

    if (!data.results.length) {
      throw new NoRestaurantReviewsFound();
    }

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
    next(error);
  }
};



const addReview = async (req, res, next) => {
  try {
    const userId = req.user?._id;
    const restaurantId = req.params.restaurantId;
    const { text, rating } = req.body;
    const image = req.file ? req.file.filename : null;

    if (!text || typeof rating === "undefined") {
      throw new MissingReviewFields();
    }

    const existingReview = await reviewModel.findOne({ userId, restaurantId });
    if (existingReview) {
      throw new ReviewAlreadyExists();
    }

    await reviewModel.create({
      userId,
      restaurantId,
      text,
      rating,
      image
    });

    res.status(201).json({ message: "Review agregada correctamente" });
  } catch (error) {
    next(error);
  }
};
const updateReview = async (req, res, next) => {
  try {
    const { text, rating } = req.body;
    const userId = req.user._id;

    if (!text || typeof rating === "undefined") {
      throw new MissingReviewFields();
    }

    const review = await reviewModel.findById(req.params.id).populate("restaurantId", "name");

    if (!review) {
      throw new ReviewNotFound();
    }

    if (review.userId.toString() !== userId.toString()) {
      throw new NotAuthorizedToUpdateReview();
    }

    review.text = text;
    review.rating = rating;
    const updatedReview = await review.save();

    const formattedReview = {
      text: updatedReview.text,
      rating: updatedReview.rating,
      restaurant: updatedReview.restaurantId?.name || null,
      createdAt: updatedReview.createdAt,
    };

    res.status(200).json({ message: "Review actualizada", review: formattedReview });

  } catch (error) {
    next(error);
  }
};
const updateReviewImage = async (req, res, next) => {
  try {
    const { reviewId } = req.params;
    const newImage = req.file;

    if (!newImage) {
      throw new NoImageProvided();
    }

    const review = await reviewModel.findById(reviewId);
    if (!review) {
      throw new ReviewNotFound();
    }

    if (review.image) {
      const oldImagePath = path.join(__dirname, "../public/images", review.image);
      if (fs.existsSync(oldImagePath)) {
        try {
          fs.unlinkSync(oldImagePath);
        } catch (err) {
          console.error("Error al eliminar la imagen anterior:", err);
        }
      }
    }

    review.image = newImage.filename;
    await review.save();

    res.json({
      message: "Imagen actualizada correctamente",
      image: newImage.filename,
    });

  } catch (error) {
    next(error);
  }
};

const deleteReview = async (req, res, next) => {
  try {
    const reviewId = req.params.id;

    const review = await reviewModel.findById(reviewId);
    if (!review) {
      throw new ReviewNotFound();
    }

    if (review.userId.toString() !== req.user._id.toString()) {
      throw new NotAuthorizedToDeleteReview();
    }

    await review.deleteOne();

    res.status(200).json({ message: "Review eliminada correctamente" });

  } catch (error) {
    next(error);
  }
};

const deleteReviewImage = async (req, res, next) => {
  try {
    const { reviewId } = req.params;

    const review = await reviewModel.findById(reviewId);
    if (!review) {
      throw new ReviewNotFound();
    }

    if (!review.image || typeof review.image !== "string" || review.image.trim() === "") {
      throw new ReviewImageNotValid();
    }

    const imagePath = path.join(__dirname, "../public/images", review.image);

    try {
      await fs.unlink(imagePath);
      console.log("Image deleted successfully");
    } catch (err) {
      if (err.code === "ENOENT") {
        console.warn("Image not found, skipping deletion");
      } else {
        console.error("Error deleting image from server:", err);
        throw new ErrorDeleteImage();
      }
    }

    review.image = null;
    await review.save();

    res.json({ message: "Imagen eliminada correctamente" });
  } catch (error) {
    next(error);
  }
};

export default { showReviewByUser, showReviewByRestaurant, addReview, updateReview, deleteReview, updateReviewImage, deleteReviewImage };