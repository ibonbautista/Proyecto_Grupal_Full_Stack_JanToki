import { useLoaderData } from "react-router-dom";
import MapLeaflet from "../../components/mapLeaflet/MapLeaflet";
import { AuthContext } from "../../context/AuthContext";
import { useContext, useEffect, useState } from "react";
import { getReviewsByRestaurant } from "../../utils/api/review";
import ReviewForm from "../../components/reviewForm/ReviewForm";
import { useFavorite } from "../../hooks/useFavorite";

function RestaurantDetail() {
	const { userData } = useContext(AuthContext);
	const restaurant = useLoaderData();
	const [reviews, setReviews] = useState([]);
	const { isFavorite, toggleFavorite } = useFavorite(userData?.id, restaurant._id);
	
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
				<div className="review-form">
					<h3>Deja tu reseña</h3>
					<ReviewForm
						restaurantId={restaurant._id}
						setReviews={setReviews}
					/>
				</div>
				<div className="favorite-button">
					<button onClick={toggleFavorite}>
					{isFavorite ? (
						<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-bookmark-fill" viewBox="0 0 16 16" >
							<path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2z" />
						</svg>) : (
						<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-bookmark" viewBox="0 0 16 16">
							<path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1z" />
						</svg>)}
					</button>
				</div>
				</>
			)}
			</section>
		</article>
	);
}

export default RestaurantDetail;