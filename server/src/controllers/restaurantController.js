import restaurantModel from "../models/restaurant.js"

const getRestaurants = async(req,res)=>{

    const restaurants = await restaurantModel.find();

    res.json(restaurants);
}

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