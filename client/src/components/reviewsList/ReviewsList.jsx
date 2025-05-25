import { useState, useEffect } from "react";
import { getReviewsByUser } from "../../utils/api/review";

export function ReviewsList() {
	const [reviews, setReviews] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchReviews = async () => {
			try {
				const res = await getReviewsByUser();
				setReviews(res.reviews || []);
			} catch (error) {
				setReviews([]);
			} finally {
				setLoading(false);
			}
		};
		fetchReviews();
	}, []);
	if (loading) return null;

	if (reviews.length === 0) {
		return <p>No has escrito ninguna reseña todavía.</p>;
	}
	return (
		<div>
			<h2>Reseñas</h2>
			<ul>
				{reviews.map((review) => (
					<li className="review-item" key={review._id}>
						{review.restaurant && <p><strong>Restaurante: {review.restaurant}</strong></p>}
						{review.text} - ⭐ {review.rating}
						{review.image && <img src={review.image} alt={review.text} />}
					</li>
				))}
			</ul>
		</div>
	)
}