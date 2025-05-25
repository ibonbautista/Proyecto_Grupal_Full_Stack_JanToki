import favoriteModel from "../models/favorite.js";
import { paginateQuery } from "../utils/paginate.js";
import {
  NoFavoritesFound,
  RestaurantIdNotProvided,
  FavoriteAlreadyExists,
  FavoriteNotFound,
  NotAuthorizedToDeleteFavorite
} from "../utils/errors.js";

const showFavorite = async (req, res, next) => {
  try {
    const userId = req.user?._id;

    const data = await paginateQuery(
      favoriteModel,
      { userId },
      {
        page: req.query.page,
        limit: req.query.limit,
        populate: [{ path: "restaurantId" }],
      }
    );

    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};



const addFavorite = async (req, res, next) => {
  try {
    const userId = req.user?._id;
    const restaurantId = req.params.restaurantId;

    if (!restaurantId) {
      return next(new RestaurantIdNotProvided());
    }

    const existingFavorite = await favoriteModel.findOne({ userId, restaurantId });
    if (existingFavorite) {
      return next(new FavoriteAlreadyExists());
    }

    const favorite = await favoriteModel.create({ userId, restaurantId });

    res.status(201).json({ message: "Favorito agregado correctamente", favorite });
  } catch (error) {
    next(error);
  }
};


const deleteFavorite = async (req, res, next) => {
  const userId = req.user._id;
  const favoriteId = req.params.favoriteId;

  try {
    const favorite = await favoriteModel.findById(favoriteId);

    if (!favorite) {
      throw new FavoriteNotFound();
    }

    if (favorite.userId.toString() !== userId.toString()) {
      throw new NotAuthorizedToDeleteFavorite();
    }

    await favorite.deleteOne();

    res.status(200).json({ message: "Favorito eliminado correctamente" });
  } catch (error) {
    next(error);
  }
};
export default { showFavorite, addFavorite, deleteFavorite };
