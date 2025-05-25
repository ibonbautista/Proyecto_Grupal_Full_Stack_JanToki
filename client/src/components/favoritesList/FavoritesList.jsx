import { useState, useEffect } from "react";
import { getFavorites } from "../../utils/api/favorite";
import RestaurantCard from "../restaurantCard/RestaurantCard";

export function FavoritesList() {
	const [favorites, setFavorites] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchFavorites = async () => {
			try {
				const data = await getFavorites();
				setFavorites(data.results || []);
			} catch (error) {
				setFavorites([]);
			} finally {
				setLoading(false);
			}
		};
		fetchFavorites();
	}, []);

	if (loading) return null;

	if (favorites.length === 0) {
		return <p>No tienes favoritos todavía.</p>;
	}

	return (
		<div>
			<h2>Favoritos</h2>
			<ul>
				{favorites.map((favorite) => (
					<li key={favorite._id}><RestaurantCard restaurant={favorite.restaurantId}/></li>
				))}
			</ul>
		</div>
	);
}