import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { addFavorite, deleteFavorite } from "../../utils/api/favorite";

import './RestaurantCard.css';

function RestaurantCard({ restaurant }) {
	const { userData, onLogout } = useContext(AuthContext);

	const [isSaved, setIsSaved] = useState(false);
	const handleToggleSave = async () => {
		try {
			if (isSaved) {
				await deleteFavorite(restaurant.favoriteId);
				setIsSaved(false);
			} else {
				const response = await addFavorite(restaurant._id);
				restaurant.favoriteId = response.favorite._id;
				setIsSaved(true);
			}
		} catch (error) {
			console.error("Error al guardar/eliminar favorito:", error);
			alert("Hubo un error, intenta de nuevo.");
		}
	};

	return (
		<article className="article restaurant">
			<Link to={`/restaurant/${restaurant._id}`}>
				<section className="restaurant-image">
					<img src={restaurant.Image} alt={restaurant.Name} />
				</section>

				<section className="restaurant-data">
					<h2>{restaurant.Name}</h2>
					<p className="restaurant-council">{restaurant.Municipality}</p>
					{restaurant.rating && <p className="restaurant-rating">{restaurant.rating}</p>}
				</section>
			</Link>

			{userData && (
				<button onClick={handleToggleSave} className="save-button">
					{isSaved ? (
						<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-bookmark-fill" viewBox="0 0 16 16" >
							<path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2z" />
						</svg>) : (
						<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-bookmark" viewBox="0 0 16 16">
							<path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1z" />
						</svg>)}
				</button>
			)}
		</article >
	)
}

export default RestaurantCard;