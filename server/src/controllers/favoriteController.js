import favoriteModel from "../models/favorite.js";

const showFavorite = async (req, res) => {
  try {
    const userId = req.user._id;
    let { page = 1, limit = 10 } = req.query;

    page = parseInt(page, 10);
    limit = parseInt(limit, 10);

    if (isNaN(page) || page < 1) page = 1;
    if (isNaN(limit) || limit < 1) limit = 10;

    const skip = (page - 1) * limit;

    const favorites = await favoriteModel
      .find({ userId })
      .populate("restaurantId")
      .skip(skip)
      .limit(limit);

    const total = await favoriteModel.countDocuments({ userId });

    res.status(200).json({
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      favorites,
    });

  } catch (error) {
    console.error("Error al obtener favoritos:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
};

const addFavorite = async (req, res) => {
  try {
    const userId = req.user._id;
    const restaurantId = req.params.restaurantId;

    if (!restaurantId) {
      return res.status(400).json({ error: "Falta el ID del restaurante" });
    }

    const existingFavorite = await favoriteModel.findOne({ userId, restaurantId });
    if (existingFavorite) {
      return res.status(400).json({ error: "Favorito ya agregado" });
    }

    await favoriteModel.create({ userId, restaurantId });

    res.status(201).json({ message: "Favorito agregado correctamente" });

  } catch (error) {
    console.error("Error al agregar favorito:", error);
    res.status(500).json({ error: "Error al agregar favorito" });
  }
};

const deleteFavorite = async (req, res) => {
  const userId = req.user._id;
  const favoriteId = req.params.favoriteId;

  try {
    const favorite = await favoriteModel.findById(favoriteId);

    if (!favorite) {
      return res.status(404).json({ error: "Favorito no encontrado" });
    }

    if (favorite.userId.toString() !== userId.toString()) {
      return res.status(403).json({ error: "No autorizado para eliminar este favorito" });
    }

    await favorite.deleteOne();

    res.status(200).json({ message: "Favorito eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar el favorito:", error);
    res.status(500).json({ error: "Error del servidor" });
  }
};

export default { showFavorite, addFavorite, deleteFavorite };
