import Favorite from "../models/favorite.js";
import dotenv from "dotenv";

dotenv.config();

const showFavorite = async(req,res)=>{
    try {
    const token = req.cookies?.token;
    let user = null;

    if (token) {
      user = jwt.verify(token, process.env.JWT_SECRET);
    }

    //Filter
    const favorites = user ? await Favorite.find({userId: user.id }).populate("restaurantId") : [];

    res.json('index', { favorites, user });
    
  } catch (error) {
    console.error('Error al obtener favoritos:', error);
    res.status(500).send('Error en el servidor');
  }
}

const addFavorite = async(req,res)=>{

};


const deleteFavorite = async(req,res)=>{
    
}

export default {showFavorite, addFavorite, deleteFavorite   };