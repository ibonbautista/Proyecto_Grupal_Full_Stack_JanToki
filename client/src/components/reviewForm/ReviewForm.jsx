import { useState } from "react";
import { addReview, getReviewsByRestaurant } from "../../utils/api/review";
import "./ReviewForm.css";

function ReviewForm({ restaurantId, setReviews }) {
	const [reviewText, setReviewText] = useState("");
	const [rating, setRating] = useState(0);
	const [image, setImage] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");
		setLoading(true);
		try {
			const formData = new FormData(); // FormData para enviar los datos del formulario, incluyendo archivos
			formData.append("text", reviewText);
			formData.append("rating", rating);
			if (image) {
				formData.append("image", image);
			}

			await addReview(restaurantId, formData);

			setReviewText("");
			setRating(0);
			setImage(null);
			
			try {
				const res = await getReviewsByRestaurant(restaurantId);
				setReviews(res.results || []);
			} catch (error) {
				if (error.message === "No reviews for this restaurant") {
					setReviews([]);
				} else {
					console.error("Error al obtener reseñas:", error);
				}
			}
		} catch (error) {
			console.error("Error al agregar reseña:", error);
			setError("Error al agregar reseña");
		} finally {
			setLoading(false);
		}
	};

	return (
		<form onSubmit={handleSubmit} className="review-form">
			<textarea
				value={reviewText}
				onChange={(e) => setReviewText(e.target.value)}
				placeholder="Escribe tu reseña..."
				required
			/>
			<input
				type="number"
				value={rating}
				onChange={(e) => setRating(e.target.value)}
				min="0"
				max="5"
				step="1"
				required
			/>
			<input 
				type="file" 
				accept="image/*" 
				onChange={(e) => setImage(e.target.files[0])} 
			/>
			<button type="submit" disabled={loading}>
				{loading ? "Enviando..." : "Enviar reseña"}
			</button>
			{error && <p className="error">{error}</p>}
		</form>
	);
}

export default ReviewForm;