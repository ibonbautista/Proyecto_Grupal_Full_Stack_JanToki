import restaurantModel from "../models/restaurant.js"
import { paginateQuery } from "../utils/paginate.js";

const getRestaurants = async (req, res) => {
  try {
    const { category, ubication, rating, name } = req.query;

    const filter = {};

    if (category) {
      filter.category = category;
    }

    if (ubication) {
      filter["ubication.town"] = {$regex: ubication, $options: "i"};
    }

    if (rating) {
      const ratingNum = Number(rating);
      if (!isNaN(ratingNum)) {
        filter.rating = { $gte: ratingNum };
      }
    }

	if (name) {
	  filter.name = { $regex: name, $options: "i" };
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

    res.status(200).json({
      page,
      limit,
      total,
      totalPages,
      restaurants: results,
    });

  } catch (error) {
    console.error("Error al obtener restaurantes:", error);
    res.status(500).json({ error: "Error al obtener restaurantes" });
  }
};


const getRestaurantById = async(req,res)=>{
    const id = req.params.id;
    const restaurant = await restaurantModel.findById(id);
    res.json(restaurant);
}

// ANAÍS (POR SI LA LIO)
const getRestaurantByCategory = async(req,res)=>{
    const category = req.params.category;
    const restaurant = await restaurantModel.find({categories});
    res.json(restaurant);
}

const createRestaurant = async(req,res)=>{
    const data = req.body;
    console.log("data",data);
    const newRestaurant = new restaurantModel(data);
    await newRestaurant.save();
    res.json(newRestaurant);
}

const updateRestaurant = async(req,res)=>{
    const data = req.body;
    console.log("data",data);
    const id = req.params.id;
    console.log("id",id);
    const updatedRestaurant = await restaurantModel.findByIdAndUpdate(id,data);
    res.json(updatedRestaurant);
}

const deleteRestaurant = async(req,res)=>{
    const id = req.params.id;
    console.log("id",id);
    const deletedRestaurant = await restaurantModel.findByIdAndDelete(id);
    res.json(deletedRestaurant);
}

export default {
    getRestaurants,
    getRestaurantById,
    getRestaurantByCategory,
    createRestaurant,
    updateRestaurant,
    deleteRestaurant
};