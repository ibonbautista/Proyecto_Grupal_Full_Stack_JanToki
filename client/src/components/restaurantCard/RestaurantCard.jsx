import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

import './RestaurantCard.css';

function RestaurantCard({ restaurant }) {
	return (
		<article className="article restaurant">
			<Link to={`/restaurant/${restaurant._id}`}>
				<section className="restaurant-image">
					<img src={restaurant.Image} alt={restaurant.Name} />
				</section>

				<section className="restaurant-data">
					<h2>{restaurant.Name}</h2>
					<p className="restaurant-council">{restaurant.Municipality}</p>
					{restaurant.Rating > 0 && (
						<p className="restaurant-card-rating">⭐ Valoración media: {restaurant.Rating}</p>
					)}

				</section>
			</Link>
		</article >
	)
}

export default RestaurantCard;