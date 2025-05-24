import { useState, useEffect } from "react";
import { getReviewsByUser } from "../../utils/api/review";

export function ReviewsList() {
	const [reviews, setReviews] = useState([]);

	useEffect(() => {
		const fetchReviews = async () => {
			try {
				const res = await getReviewsByUser();
				setReviews(res.reviews || []);
			} catch (error) {
				if (error.message === "Review not Found") {
					setReviews([]);
				} else {
					console.error("Error al cargar reseñas:", error);
				}
			}
		};
		fetchReviews();
	}, []);

	return (
		<div>
			<h2>Reseñas</h2>
			<ul>
				{reviews.map((review) => (
					<li key={review._id}>{review.text} - {review.rating}</li>
				))}
			</ul>
		</div>
	)
}