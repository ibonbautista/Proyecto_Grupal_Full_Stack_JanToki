import mongoose from "mongoose";
import restaurantModel from "../models/restaurant.js"
import reviewModel from "../models/review.js"
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
    const { Category, Municipality, Rating, Name } = req.query;

    const filter = {};
    let activeFilters = [];

    if (Category) {
      filter["Category.CuisineType"] = Category;
      activeFilters.push(`de categoría "${Category}"`);
    }
    console.log("Filtro construido:", filter);

    if (Municipality) {
      filter["Municipality"] = { $regex: Municipality, $options: "i" };
      activeFilters.push(`en la ubicación "${Municipality}"`);
    }

    if (Rating) {
      const ratingNum = Number(Rating);
      if (!isNaN(ratingNum)) {
        filter.Rating = { $gte: ratingNum };
        activeFilters.push(`con valoración mínima de ${Rating}`);
      }
    }

    if (Name) {
      filter.Name = { $regex: Name, $options: "i" };
      activeFilters.push(`con nombre parecido a "${Name}"`);
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

    if (!data.Name || !data.Municipality || !data.Category) {
      throw new InvalidRestaurantData("Faltan campos obligatorios (Name, Municipality o category)");
    }

    if (data.Rating !== undefined) {
      const ratingNum = Number(data.Rating);
      if (isNaN(ratingNum) || ratingNum < 1 || ratingNum > 10) {
        throw new InvalidRestaurantData("El rating debe ser un número entre 1 y 10");
      }
      data.Rating = ratingNum;
    }

    const existingRestaurant = await restaurantModel.findOne({
      Name: data.Name,
      "Municipality": data.Municipality,
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


const validSocialMedia = ["facebook","instagram","twitter"];

const updateRestaurant = async (req, res, next) => {
  const id = req.params.id;
  const {
    Name,
    Description,
    Town,
    Municipality,
    Address,
    Category,
    Phone,
    Website,
    SocialMedia,
    Rating,
    Image,
  } = req.body || {};

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new InvalidRestaurantId());
  }

  try {
    if (Name !== undefined && typeof Name !== "string") {
      return next(new ValidationError("El nombre debe ser una cadena de texto"));
    }
    if (Description !== undefined && typeof Description !== "string") {
      return next(new ValidationError("La descripción debe ser una cadena de texto"));
    }
    if (Town !== undefined && typeof Town !== "string") {
      return next(new ValidationError("La ciudad debe ser una cadena de texto"));
    }
    if (Municipality !== undefined && typeof Municipality !== "string") {
      return next(new ValidationError("El municipio debe ser una cadena de texto"));
    }
    if (Address !== undefined && typeof Address !== "string") {
      return next(new ValidationError("La dirección debe ser una cadena de texto"));
    }
    if (Category !== undefined) {
      if (typeof Category !== "object") {
        return next(new ValidationError("Category debe ser un objeto"));
      }

      const { CuisineType, Brands, MichelinStars, RepsolSuns, Recommended } = Category;

      const validCategories = [
        "asador", "sideria", "fusion", "alta cocina", "tradicional", "pintxos",
        "variado", "marisqueria", "asiatica", "vegetariano", "halal", "vegano",
        "francesa", "italiana", "riojana", "mediterranea", "internacional"
      ];

      if (CuisineType !== undefined && !validCategories.includes(CuisineType)) {
        return next(new ValidationError("CuisineType inválido"));
      }

      if (Brands !== undefined && !Array.isArray(Brands)) {
        return next(new ValidationError("Brands debe ser un array de strings"));
      }

      if (MichelinStars !== undefined && typeof MichelinStars !== "number") {
        return next(new ValidationError("MichelinStars debe ser un número"));
      }

      if (RepsolSuns !== undefined && typeof RepsolSuns !== "number") {
        return next(new ValidationError("RepsolSuns debe ser un número"));
      }

      if (Recommended !== undefined && typeof Recommended !== "boolean") {
        return next(new ValidationError("Recommended debe ser booleano"));
      }
    }
    if (Phone !== undefined && typeof Phone !== "string") {
      return next(new ValidationError("Teléfono debe ser texto"));
    }
    if (Website !== undefined && typeof Website !== "string") {
      return next(new ValidationError("Website debe ser texto"));
    }
    if (SocialMedia !== undefined && !validSocialMedia.includes(SocialMedia)) {
      return next(new ValidationError("Red social inválida"));
    }
    if (Rating !== undefined) {
      if (typeof Rating !== "number" || Rating < 1 || Rating > 10) {
        return next(new ValidationError("La valoración debe estar entre 1 y 10"));
      }
    }
    if (Image !== undefined && typeof Image !== "string") {
      return next(new ValidationError("Image debe ser texto"));
    }

    const updateData = {};
    if (Name !== undefined) updateData.Name = Name;
    if (Description !== undefined) updateData.Description = Description;
    if (Town !== undefined) updateData.Town = Town;
    if (Municipality !== undefined) updateData.Municipality = Municipality;
    if (Address !== undefined) updateData.Address = Address;
    if (Category !== undefined) updateData.Category = Category;
    if (Phone !== undefined) updateData.Phone = Phone;
    if (Website !== undefined) updateData.Website = Website;
    if (SocialMedia !== undefined) updateData.SocialMedia = SocialMedia;
    if (Rating !== undefined) updateData.Rating = Rating;
    if (Image !== undefined) updateData.Image = Image;

    const updatedRestaurant = await restaurantModel.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedRestaurant) {
      return next(new RestaurantNotFound());
    }

    if (Rating === undefined) {
      const reviews = await reviewModel.find({ restaurantId: id });
      const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
      const averageRating = reviews.length > 0 ? totalRating / reviews.length : 0;

      updatedRestaurant.Rating = averageRating;
      await updatedRestaurant.save();
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