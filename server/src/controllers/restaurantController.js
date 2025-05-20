import mongoose from "mongoose";
import restaurantModel from "../models/restaurant.js"
import { paginateQuery } from "../utils/paginate.js";
import {
  RestaurantNotFound,
  InvalidRestaurantId,
  InvalidRestaurantData,
  RestaurantAlreadyExists,
  ValidationError
} from "../utils/errors.js";

const getRestaurants = async (req, res) => {
  try {
    const { category, ubication, rating, name } = req.query;

    const filter = {};
    let activeFilters = [];

    if (category) {
      filter.category = category;
      activeFilters.push(`de categoría "${category}"`);
    }

    if (ubication) {
      filter["ubication.town"] = { $regex: ubication, $options: "i" };
      activeFilters.push(`en la ubicación "${ubication}"`);
    }

    if (rating) {
      const ratingNum = Number(rating);
      if (!isNaN(ratingNum)) {
        filter.rating = { $gte: ratingNum };
        activeFilters.push(`con valoración mínima de ${rating}`);
      }
    }

    if (name) {
      filter.name = { $regex: name, $options: "i" };
      activeFilters.push(`con nombre parecido a "${name}"`);
    }

    const { page, limit, total, totalPages, results } = await paginateQuery(
      restaurantModel,
      filter,
      {
        page: req.query.page,
        limit: req.query.limit,
        sort: { name: 1 },
      }
    );

    if (results.length === 0) {
      const message = activeFilters.length > 0
        ? `No se encontraron restaurantes ${activeFilters.join(", ")}.`
        : "No hay restaurantes registrados.";

      return res.status(200).json({
        message,
        restaurants: [],
        total: 0,
        totalPages: 0,
        page,
        limit,
      });
    }

    res.status(200).json({
      restaurants: results,
      total,
      totalPages,
      page,
      limit,
    });

  } catch (error) {
    console.error("Error al obtener restaurantes:", error);
    res.status(500).json({ error: "Error al obtener restaurantes" });
  }
};

const getRestaurantById = async (req, res, next) => {
  const id = req.params.id;


  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new InvalidRestaurantId());
  }

  try {
    const restaurant = await restaurantModel.findById(id);

    if (!restaurant) {
      return next(new RestaurantNotFound());
    }

    res.json(restaurant);
  } catch (error) {
    next(error);
  }
};

const createRestaurant = async (req, res, next) => {
  try {
    const data = req.body;

    if (!data.name || !data.ubication || !data.category) {
      throw new InvalidRestaurantData("Faltan campos obligatorios (name, ubication o category)");
    }

    if (data.rating !== undefined) {
      const ratingNum = Number(data.rating);
      if (isNaN(ratingNum) || ratingNum < 1 || ratingNum > 10) {
        throw new InvalidRestaurantData("El rating debe ser un número entre 1 y 10");
      }
      data.rating = ratingNum;
    }

    const existingRestaurant = await restaurantModel.findOne({
      name: data.name,
      "ubication.town": data.ubication.town,
    });

    if (existingRestaurant) {
      throw new RestaurantAlreadyExists();
    }

    const newRestaurant = new restaurantModel(data);
    await newRestaurant.save();

    res.status(201).json(newRestaurant);

  } catch (error) {
    next(error);
  }
};

const validCategories = [
  "asador","sideria","fusion","alta cocina","tradicional","pintxos",
  "variado","marisqueria","asiatica","vegetariano","halal","vegano",
  "francesa","italiana","riojana","mediterranea","internacional"
];

const validSocialMedia = ["facebook","instagram","twitter"];

const updateRestaurant = async (req, res, next) => {
  const id = req.params.id;
  const {
    name,
    description,
    ubication,
    category,
    phone,
    webPage,
    socialMedia,
    rating,
    image,
  } = req.body || {};

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new InvalidRestaurantId());
  }

  try {
    if (name !== undefined && typeof name !== "string") {
      return next(new ValidationError("El nombre debe ser una cadena de texto"));
    }
    if (description !== undefined && typeof description !== "string") {
      return next(new ValidationError("La descripción debe ser una cadena de texto"));
    }
    if (ubication !== undefined) {
      if (typeof ubication !== "object" || ubication === null) {
        return next(new ValidationError("Ubicación debe ser un objeto"));
      }
      if (
        ubication.town !== undefined &&
        (typeof ubication.town !== "string" || ubication.town.trim() === "")
      ) {
        return next(new ValidationError("Ubicación: town debe ser texto no vacío"));
      }
      if (
        ubication.address !== undefined &&
        (typeof ubication.address !== "string" || ubication.address.trim() === "")
      ) {
        return next(new ValidationError("Ubicación: address debe ser texto no vacío"));
      }
      if (
        ubication.latitude !== undefined &&
        typeof ubication.latitude !== "number"
      ) {
        return next(new ValidationError("Ubicación: latitude debe ser número"));
      }
      if (
        ubication.longitude !== undefined &&
        typeof ubication.longitude !== "number"
      ) {
        return next(new ValidationError("Ubicación: longitude debe ser número"));
      }
    }
    if (category !== undefined && !validCategories.includes(category)) {
      return next(new ValidationError("Categoría inválida"));
    }
    if (phone !== undefined && typeof phone !== "string") {
      return next(new ValidationError("Teléfono debe ser texto"));
    }
    if (webPage !== undefined && typeof webPage !== "string") {
      return next(new ValidationError("WebPage debe ser texto"));
    }
    if (socialMedia !== undefined && !validSocialMedia.includes(socialMedia)) {
      return next(new ValidationError("Red social inválida"));
    }
    if (rating !== undefined) {
      if (typeof rating !== "number" || rating < 1 || rating > 10) {
        return next(new ValidationError("La valoración debe estar entre 1 y 10"));
      }
    }
    if (image !== undefined && typeof image !== "string") {
      return next(new ValidationError("Image debe ser texto"));
    }

    // Solo actualizar campos que están definidos
    const updateData = {};
    if (name !== undefined) updateData.name = name;
    if (description !== undefined) updateData.description = description;
    if (ubication !== undefined) updateData.ubication = ubication;
    if (category !== undefined) updateData.category = category;
    if (phone !== undefined) updateData.phone = phone;
    if (webPage !== undefined) updateData.webPage = webPage;
    if (socialMedia !== undefined) updateData.socialMedia = socialMedia;
    if (rating !== undefined) updateData.rating = rating;
    if (image !== undefined) updateData.image = image;

    const updatedRestaurant = await restaurantModel.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedRestaurant) {
      return next(new RestaurantNotFound());
    }

    res.json(updatedRestaurant);
  } catch (error) {
    next(error);
  }
};


const deleteRestaurant = async (req, res, next) => {
  const id = req.params.id;
  console.log("id", id);

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new InvalidRestaurantId());
  }

  try {
    const deletedRestaurant = await restaurantModel.findByIdAndDelete(id);

    if (!deletedRestaurant) {
      return next(new RestaurantNotFound());
    }

    res.json({ message: "Restaurante eliminado correctamente", deletedRestaurant });
  } catch (error) {
    next(error);
  }
};

export default {
    getRestaurants,
    getRestaurantById,
    createRestaurant,
    updateRestaurant,
    deleteRestaurant
};