import restaurantModel from "../models/restaurant.js"

const getRestaurants = async (req, res) => {
  try {
    const { category, ubication, rating } = req.query;

    const filter = {};

    if (category) {
      filter.category = category;
    }

    if (ubication) {
      filter["ubication.town"] = ubication;
    }

    if (rating) {
      filter.rating = { $gte: Number(rating) };
    }

    const restaurants = await restaurantModel.find(filter);
    res.json(restaurants);

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