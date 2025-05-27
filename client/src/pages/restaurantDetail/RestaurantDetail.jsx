import { useLoaderData, useNavigate } from "react-router-dom";
import MapLeaflet from "../../components/mapLeaflet/MapLeaflet";
import { AuthContext } from "../../context/AuthContext";
import { useContext, useEffect, useState } from "react";
import { getReviewsByRestaurant, updateReview, deleteReview } from "../../utils/api/review";
import ReviewForm from "../../components/reviewForm/ReviewForm";
import { useFavorite } from "../../hooks/useFavorite";
import { deleteRestaurant, editRestaurant } from "../../utils/api/restaurant";

import "./RestaurantDetail.css";

function RestaurantDetail() {
	const Navigate = useNavigate();
	const { userData } = useContext(AuthContext);
	const restaurant = useLoaderData();
	const [reviews, setReviews] = useState([]);
	const { isFavorite, toggleFavorite } = useFavorite(userData?.id, restaurant._id);
	const [isEditing, setIsEditing] = useState(false);
	const [editData, setEditData] = useState({
		Name: restaurant.Name || "",
		Description: restaurant.Description || "",
		CuisineType: restaurant.Categories?.CuisineType?.toLowerCase() || "",
		Phone: restaurant.Phone || "",
		Website: restaurant.Website || "",
		SocialMedia: restaurant.SocialMedia || "",
		Image: null
	});
	const [editingReview, setEditingReview] = useState(null);
	const [averageRating, setAverageRating] = useState(restaurant.Rating || 0);

	const calculateAverageRating = (reviewsList) => {
		if (reviewsList.length === 0) {
			return 0;
		}
		const sum = reviewsList.reduce((acc, review) => acc + Number(review.rating), 0);
		return (sum / reviewsList.length).toFixed(1);
	};

	const updateReviewAndRating = async () => {
		try {
			const res = await getReviewsByRestaurant(restaurant._id);
			const reviewsList = res.results || [];
			setReviews(reviewsList);
			setAverageRating(calculateAverageRating(reviewsList));
		} catch (error) {
			console.error("Error al actualizar reseñas y rating", error);
			setReviews([]);
			setAverageRating(0);
		}
	}

	useEffect(() => {
		window.scrollTo({ top: 0 });
		updateReviewAndRating();
	}, [restaurant._id]);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setEditData({ ...editData, [name]: value });
	};

	const handleImageChange = (e) => {
		setEditData({ ...editData, Image: e.target.files[0] });
	};

	const handleEdit = () => {
		setIsEditing(true);
	}

	const handleCancel = () => {
		setIsEditing(false);
	}

	const handleSaveEdit = async () => {
		const form = new FormData();
		form.append("Name", editData.Name);
		form.append("Description", editData.Description);
		form.append("Phone", editData.Phone);
		form.append("Website", editData.Website);
		form.append("Categories[CuisineType]", editData.CuisineType);

		if (editData.SocialMedia.trim() !== "") {
			form.append("SocialMedia", editData.SocialMedia);
		};

		if (editData.Image) {
			form.append("image", editData.Image);
		}

		try {
			await editRestaurant(restaurant._id, form);
			alert("Restaurante actualizado");
			setIsEditing(false);
			window.location.reload();
		} catch (err) {
			console.error("Error al guardar cambios:", err);
			alert("No se pudo actualizar el restaurante");
		}
	};

	const handleDelete = async () => {
		const confirmation = window.confirm("¿Estás seguro de que deseas eliminar este restaurante?");
		if (!confirmation) {
			return;
		}
		try {
			await deleteRestaurant(restaurant._id);
			alert("Restaurante eliminado exitosamente");
			window.location.href = "/";
		} catch (error) {
			console.error("Error al eliminar el restaurante:", error);
			alert("No se pudo eliminar el restaurante");
		}
	};

	const handleEditReview = (review) => {
		setEditingReview({
			id: review._id,
			text: review.text,
			rating: review.rating,
			image: null
		});
	};

	const handleUpdateReview = async (e) => {
		e.preventDefault();

		const formData = new FormData();
		formData.append("text", editingReview.text);
		formData.append("rating", editingReview.rating);
		if (editingReview.image) {
			formData.append("image", editingReview.image);
		}
		try {
			await updateReview(editingReview.id, formData);
			setEditingReview(null);
			await updateReviewAndRating();
		} catch (error) {
			console.error("Error al actualizar la reseña:", error);
		}
	}

	const handleEditInputChange = (e) => {
		const { name, value } = e.target;
		setEditingReview({ ...editingReview, [name]: value });
	};

	const handleEditImageChange = (e) => {
		setEditingReview({ ...editingReview, image: e.target.files[0] });
	};

	const handleDeleteReview = async (review) => {
		const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar esta reseña?");
		if (!confirmDelete) {
			return;
		}
		try {
			await deleteReview(review._id);
			await updateReviewAndRating();
		} catch (error) {
			console.error("Error al eliminar la reseña:", error);
		}
	}

	return (
		<article className="restaurant-page">
			<button className="back-button" onClick={() => Navigate(-1)}>
				<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-caret-left" viewBox="0 0 16 16">
					<path d="M10 12.796V3.204L4.519 8zm-.659.753-5.48-4.796a1 1 0 0 1 0-1.506l5.48-4.796A1 1 0 0 1 11 3.204v9.592a1 1 0 0 1-1.659.753" />
				</svg>
			</button>
			<section className="restaurant-detail">
				<div className="restaurant-page-image">
					<div className="restaurant-page-title">
						<h1>{restaurant.Name}</h1>
					</div>
					<img src={
						restaurant.Image?.startsWith("http", "https")
							? restaurant.Image
							: `http://localhost:3003${restaurant.Image}`}
						alt={restaurant.Name} />
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


				{userData?.isAdmin && (
					<div className="admin-controls">
						<button onClick={() => handleEdit()}>Editar restaurante</button>
						<button onClick={() => handleDelete()}>Eliminar restaurante</button>
					</div>
				)}

				{isEditing && (
					<form className="edit-restaurant-form"
						onSubmit={(e) => {
							e.preventDefault();
							handleSaveEdit();
						}}>
						<input type="text" name="Name" value={editData.Name} onChange={handleInputChange} placeholder="Nombre" />
						<input type="text" name="Description" value={editData.Description} onChange={handleInputChange} placeholder="Descripción" />
						<select name="CuisineType" value={editData.CuisineType} onChange={handleInputChange}>
							<option value="">Tipo de cocina</option>
							{[
								'moderna',
								'alta cocina',
								'asador',
								'tradicional',
								'sidreria',
								'fusion',
								'pintxos',
								'marisqueria',
								'internacional',
								'asiatica',
								'francesa',
								'autor',
								'contemporanea',
								'vegetariana'
							].map((cuisineType) => (
								<option key={cuisineType} value={cuisineType}>
									{cuisineType.split(' ')
										.map(word => word.charAt(0).toUpperCase() + word.slice(1))
										.join(' ')}
								</option>
							))}
						</select>
						<input type="text" name="Phone" value={editData.Phone} onChange={handleInputChange} placeholder="Teléfono" />
						<input type="text" name="Website" value={editData.Website} onChange={handleInputChange} placeholder="Web" />
						<input type="text" name="SocialMedia" value={editData.SocialMedia} onChange={handleInputChange} placeholder="Redes sociales" />
						<input type="file" name="Image" onChange={handleImageChange} />
						<div>
							<button type="submit">Guardar cambios</button>
							<button type="button" onClick={handleCancel}>Cancelar</button>
						</div>
					</form>
				)}

				<p className="cuisine-type">Tipo de cocina: {restaurant.Categories.CuisineType}</p>
				<p className="restaurant-description">{restaurant.Description}</p>
				{averageRating > 0 &&
					<p className="restaurant-rating">
						{<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star" viewBox="0 0 16 16">
							<path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z" />
						</svg>}
						Valoración media: {averageRating}</p>
				}

				<div className="restaurant-address">
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
					<div className="restaurant-reviews--review">
						{reviews.map((review) => (
							<>
								<ul key={review._id}>
									<li className="review-user">{review.user || "Anónimo"}:</li>
									<li>{review.text}</li>
									<li>
										{<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star" viewBox="0 0 16 16">
											<path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z" />
										</svg>} {review.rating}
									</li>

									<li>
										{review.image && (
											<div>
												<img
													src={`http://localhost:3003/images/reviews/${review.image}`}
													alt="Imagen de la reseña"
												/>
											</div>
										)}
									</li>

									<li>
										{userData?.id === review.userId && (
											<div className="review-controls">
												<button onClick={() => handleEditReview(review)}>Editar</button>
												<button onClick={() => handleDeleteReview(review)}>Eliminar</button>
											</div>
										)}
									</li>
								</ul>
							</>
						))}
					</div>
				)}
				{editingReview && (
					<div className="editing-review">
						<form onSubmit={handleUpdateReview} className="edit-review-form">
							<h2>Editar reseña</h2>
							<textarea
								name="text"
								value={editingReview.text}
								onChange={handleEditInputChange}
							/>
							<input
								type="number"
								name="rating"
								value={editingReview.rating}
								onChange={handleEditInputChange}
								min="0"
								max="5"
								step="1"
							/>
							<input
								type="file"
								name="image"
								onChange={handleEditImageChange}
							/>
							<div className="edit-review-form-buttons">
								<button type="submit">Guardar cambios</button>
								<button type="button" onClick={() => setEditingReview(null)}>Cancelar</button>
							</div>
						</form>
					</div>
				)}

				{userData && (
					<div className="review-form-section">
						<h3>Deja tu reseña</h3>
						<ReviewForm
							restaurantId={restaurant._id}
							refreshReviews={updateReviewAndRating}
						/>
					</div>
				)}
				<p className="restaurant-website">{restaurant.Website}</p>
			</section>
		</article>
	);
}

export default RestaurantDetail;