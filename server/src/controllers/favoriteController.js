import favoriteModel from "../models/favorite.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const showFavorite = async (req, res) => {
  try {
    const token = req.cookies?.token;
    let user = null;

    if (token) {
      user = jwt.verify(token, process.env.JWT_SECRET);
    }

    const favorites = user
      ? await favoriteModel.find({ userId: user.id }).populate("restaurantId")
      : [];

    res.status(200).json({ favorites, user });

  } catch (error) {
    console.error("Error al obtener favoritos:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
};

const addFavorite = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).send("No autorizado");
    }

    const user = jwt.verify(token, process.env.JWT_SECRET);
    const { restaurantId } = req.body;

    await favoriteModel.create({
      userId: user.id,
      restaurantId,
    });

    res.status(201).json({ message: "Favorito agregado correctamente" });

  } catch (error) {
    console.error("Error al agregar favorito:", error);
    res.status(500).json({ error: "Error al agregar favorito" });
  }
};

const deleteFavorite = async (req, res) => {
  const favoriteId = req.params.id;

  try {
    await favoriteModel.findByIdAndDelete(favoriteId);
    res.status(200).json({ message: "Favorito eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar el favorito:", error);
    res.status(500).json({ error: "Error del servidor" });
  }
};


export default { showFavorite, addFavorite, deleteFavorite };
