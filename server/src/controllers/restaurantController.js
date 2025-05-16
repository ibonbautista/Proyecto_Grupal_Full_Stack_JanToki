import restaurantModel from "../models/restaurant.js"

const getRestaurants = async (req, res) => {
  try {
    const { category, ubication, rating } = req.query;

    let pageNumber = parseInt(req.query.page, 10) || 1;
    let limitNumber = parseInt(req.query.limit, 10) || 10;

    if (pageNumber < 1) pageNumber = 1;
    if (limitNumber < 1) limitNumber = 10;

    const filter = {};

    if (category) {
      filter.category = category;
    }

    if (ubication) {
      filter["ubication.town"] = ubication;
    }

    if (rating) {
      const ratingNum = Number(rating);
      if (!isNaN(ratingNum)) {
        filter.rating = { $gte: ratingNum };
      }
    }

    const skip = (pageNumber - 1) * limitNumber;

    const restaurants = await restaurantModel.find(filter)
      .skip(skip)
      .limit(limitNumber);

    const total = await restaurantModel.countDocuments(filter);

    res.json({
      page: pageNumber,
      limit: limitNumber,
      total,
      totalPages: Math.ceil(total / limitNumber),
      restaurants,
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
    createRestaurant,
    updateRestaurant,
    deleteRestaurant
};