import { useLoaderData } from "react-router-dom";
import MapLeaflet from "../../components/mapLeaflet/MapLeaflet";
import { AuthContext } from "../../context/AuthContext";
import { useContext, useEffect, useState } from "react";
import { getReviewsByRestaurant, addReview } from "../../utils/api/review";

function RestaurantDetail() {
	const { userData } = useContext(AuthContext);
	const restaurant = useLoaderData();
	const [reviews, setReviews] = useState([]);
	const [reviewText, setReviewText] = useState("");
	const [rating, setRating] = useState(0);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	
	useEffect(() => {
		const fetchReviews = async () => {
			try {
				const res = await getReviewsByRestaurant(restaurant._id);
				console.log("res", res);
				setReviews(res.results || []);
				console.log("reviews", reviews);
			} catch (error) {
				console.error("Error al cargar reseñas:", error);
			}
		};
		fetchReviews();
	}, [restaurant._id]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");
		setLoading(true);
		try {
			await addReview(restaurant._id, {
				text: reviewText, 
				rating: Number(rating)
			});
			setReviewText("");
			setRating(0); // Limpiar el rating después de enviar la reseña
			const response = await getReviewsByRestaurant(restaurant._id);
			setReviews(response.results || []);
		} catch (error) {
			console.error("Error al agregar reseña:", error);
			setError("Error al agregar reseña");
		} finally {
			setLoading(false);
		}
	};

	return (
		<article className="restaurant-page">
			<section className="restaurant-detail">
				<h1>{restaurant.name}</h1>
				<img src={restaurant.image} alt={restaurant.name} />
				<div className="restaurant-address">
					<p>{restaurant.ubication.address}</p>
					<p>{restaurant.ubication.town}</p>
					<p>{restaurant.phone}</p>
				</div>
				<p>{restaurant.category}</p>
				<p>{restaurant.description}</p>
				<p>{restaurant.webPage}</p>
				<p>{restaurant.rating}</p>
				<MapLeaflet latitude={restaurant.ubication.latitude} longitude={restaurant.ubication.longitude} />
			</section>
			<section className="restaurant-reviews">
				<h2>Reseñas</h2>
				{reviews.length === 0 ? (
					<p>No hay reseñas todavía.</p>
				) : (
					<ul>
						{reviews.map((review, i) => (
							console.log("review", review),
							<li key={i}>
								<strong>{review.user || "Anónimo"}:</strong> {review.text} - ⭐ {review.rating}
							</li>
						))}
					</ul>
				)}
			
			{userData && (
				<>
					<h3>Deja tu reseña</h3>
					<form onSubmit={handleSubmit}>
						<textarea
							value={reviewText}
							onChange={(e) => setReviewText(e.target.value)}
							placeholder="Escribe tu reseña..."
							required
						/>
						<input
							type="number"
							value={rating}
							min="0"
							max="5"
							onChange={(e) => setRating(Number(e.target.value))}
							required
						/>
						<button type="submit" disabled={loading}>
							{loading ? "Enviando..." : "Enviar reseña"}
						</button>
						{error && <p>{error}</p>}
					</form>
				</>
			)}
			</section>
		</article>
	);
}

export default RestaurantDetail;