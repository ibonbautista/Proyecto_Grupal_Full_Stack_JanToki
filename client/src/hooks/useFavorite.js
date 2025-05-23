import { useState, useEffect } from "react";
import { addFavorite, deleteFavorite, getFavorites } from "../utils/api/favorite";

export function useFavorite(userId, restaurantId) {
	const [isFavorite, setIsFavorite] = useState(false);
	const [favoriteId, setFavoriteId] = useState(null);
	
	useEffect(() => {
		const checkFavorite = async () => {
			console.log("check favorite",userId,restaurantId)
			if (!userId || !restaurantId) return;

			try {
				const data = await getFavorites();
				const fav = data.results.find(fav => fav.restaurantId._id === restaurantId);
				if (fav) {
					setIsFavorite(true);
					setFavoriteId(fav._id);
				} else {
					setIsFavorite(false);
					setFavoriteId(null);
				}
			} catch (err) {
				console.error("Error al comprobar favorito", err);
			}
		};
		checkFavorite();
	}, [userId, restaurantId]);

	const toggleFavorite = async () => {
		try {
			if (isFavorite) {
				await deleteFavorite(favoriteId);
				setIsFavorite(false);
				setFavoriteId(null);
			} else {
				const res = await addFavorite(restaurantId);
				setIsFavorite(true);
				setFavoriteId(res.favorite._id);
			}
		} catch (error) {
			console.error("Error al alternar favorito:", error);
		}
	};
	return { isFavorite, toggleFavorite};
}