import { useState, useEffect } from "react";
import { getFavorites } from "../../utils/api/favorite";
import RestaurantCard from "../restaurantCard/RestaurantCard";

import './FavoritesList.css';

export function FavoritesList() {
	const [favorites, setFavorites] = useState([]);

	useEffect(() => {
		const fetchFavorites = async () => {
			try {
				const data = await getFavorites();
				setFavorites(data.results || []);
			} catch (error) {
				if (error.message !== "No favorites yet") {
					console.error("Error al obtener los favoritos:", error);
				} else {
					setFavorites([]);
				}
			}
		};
		fetchFavorites();
	}, []);

	return (
		<div>
			<h2>Restaurantes guardados</h2>
			<ul className="favorites-list">
				{favorites.map((favorite) => (
					<li key={favorite._id}><RestaurantCard restaurant={favorite.restaurantId}/></li>
				))}
			</ul>
		</div>
	);
}