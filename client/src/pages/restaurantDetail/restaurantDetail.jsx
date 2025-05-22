import { useLoaderData } from "react-router-dom";
import MapLeaflet from "../../components/mapLeaflet/MapLeaflet";
import { AuthContext } from "../../context/AuthContext";
import { useContext, useEffect, useState } from "react";
import { getReviewsByRestaurant } from "../../utils/api/review";
import ReviewForm from "../../components/reviewForm/ReviewForm";

function RestaurantDetail() {
	const { userData } = useContext(AuthContext);
	const restaurant = useLoaderData();
	const [reviews, setReviews] = useState([]);
	
	useEffect(() => {
		const fetchReviews = async () => {
			try {
				const res = await getReviewsByRestaurant(restaurant._id);
				setReviews(res.results || []);
			} catch (error) {
				if (error.message === "No reviews for this restaurant") {
					setReviews([]);
				} else {
					console.error("Error al cargar reseñas:", error);
				}
			}
		};
		fetchReviews();
	}, [restaurant._id]);

	return (
		<article className="restaurant-page">
			<section className="restaurant-detail">
				<h1>{restaurant.Name}</h1>
				<img src={restaurant.Image} alt={restaurant.Name} />
				<div className="restaurant-address">
					<p>{restaurant.Address}</p>
					<p>{restaurant.Municipality}</p>
					<p>{restaurant.Phone}</p>
				</div>
				<p>{restaurant.Categories.CuisineType}</p>
				<p>{restaurant.Description}</p>
				<p>{restaurant.Website}</p>
				<p>{restaurant.rating}</p>
				<MapLeaflet latitude={restaurant.Latitude} longitude={restaurant.Longitude} />
			</section>
			<section className="restaurant-reviews">
				<h2>Reseñas</h2>
				{reviews.length === 0 ? (
					<p>No hay reseñas todavía.</p>
				) : (
					<ul>
						{reviews.map((review, i) => (
							<li key={i}>
								<strong>{review.user || "Anónimo"}:</strong> {review.text} - ⭐ {review.rating}
								{review.image && (
									<div>
										<img
											src={`http://localhost:3003/images/reviews/${review.image}`}
											alt="Imagen de la reseña"
										/>
									</div>
								)}
							</li>
						))}
					</ul>
				)}
			
			{userData && (
				<>
					<h3>Deja tu reseña</h3>
					<ReviewForm
						restaurantId={restaurant._id}
						setReviews={setReviews}
					/>
				</>
			)}
			</section>
		</article>
	);
}

export default RestaurantDetail;