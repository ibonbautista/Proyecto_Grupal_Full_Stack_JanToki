import { useLoaderData, useNavigate } from "react-router-dom";
import MapLeaflet from "../../components/mapLeaflet/MapLeaflet";
import { AuthContext } from "../../context/AuthContext";
import { useContext, useEffect, useState } from "react";
import { getReviewsByRestaurant } from "../../utils/api/review";
import ReviewForm from "../../components/reviewForm/ReviewForm";
import { useFavorite } from "../../hooks/useFavorite";

import "./RestaurantDetail.css";

function RestaurantDetail() {
	const Navigate = useNavigate();

	const { userData } = useContext(AuthContext);
	const restaurant = useLoaderData();
	const [reviews, setReviews] = useState([]);
	const { isFavorite, toggleFavorite } = useFavorite(userData?.id, restaurant._id);
	const [averageRating, setAverageRating] = useState(restaurant.Rating || 0);

	const calculateAverageRating = (reviewsList) => {
		if (reviewsList.length === 0) return 0;
		const sum = reviewsList.reduce((acc, review) => acc + Number(review.rating), 0);
		return (sum / reviewsList.length).toFixed(1);
	}

	useEffect(() => {
		window.scrollTo({ top: 0 });
		const fetchReviews = async () => {
			try {
				const res = await getReviewsByRestaurant(restaurant._id);
				const fetchedReviews = res.results || [];

				setReviews(res.results || []);
				setAverageRating(res.updatedRestaurant?.Rating || restaurant.Rating);

				if (fetchedReviews.length > 0) {
					const avg = fetchedReviews.reduce((acc, review) => acc + review.rating, 0) / fetchedReviews.length;
					setAverageRating(avg.toFixed(1));
				} else {
					setAverageRating(0);
				}
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
			<button className="back-button" onClick={() => Navigate(-1)}>
				<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-caret-left" viewBox="0 0 16 16">
					<path d="M10 12.796V3.204L4.519 8zm-.659.753-5.48-4.796a1 1 0 0 1 0-1.506l5.48-4.796A1 1 0 0 1 11 3.204v9.592a1 1 0 0 1-1.659.753" />
				</svg>
			</button>
			<section className="restaurant-detail">
				<div className="restaurant-page-image">
					<h1>{restaurant.Name}</h1>
					<img src={restaurant.Image} alt={restaurant.Name} className="restaurant-detail--image" />
					{userData && (
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
					)}
				</div>
				<p className="restaurant-description">{restaurant.Description}</p>
				<p className="cuisine-type">Tipo de cocina: {restaurant.Categories.CuisineType}</p>
				<p className="restaurant-rating">Valoración media: ⭐ {averageRating}</p>				<div className="restaurant-address">
					<MapLeaflet latitude={restaurant.Latitude} longitude={restaurant.Longitude} />
					<p>{restaurant.Address}</p>
					<p>{restaurant.Municipality}</p>
					<p>{restaurant.Phone}</p>
				</div>
			</section>
			<section className="restaurant-reviews">
				<h2>Reseñas</h2>
				{reviews.length === 0 ? (
					<p>No hay reseñas todavía.</p>
				) : (
					<ul>
						{reviews.map((review, i) => (
							<li key={i} className="review-item">
								<div className="review-rating">⭐ {review.rating}</div>
								<p className="review-text">
									<strong>{review.user || "Anónimo"}:</strong> {review.text}
								</p>
								{review.image && (
									<div className="review-image">
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
					<div className="review-form-section">
						<h3>Deja tu reseña</h3>
						<ReviewForm
							restaurantId={restaurant._id}
							setReviews={setReviews}
						/>
					</div>
				)}

				<p className="restaurant-website">{restaurant.Website}</p>
			</section>
		</article>
	);
}

export default RestaurantDetail;