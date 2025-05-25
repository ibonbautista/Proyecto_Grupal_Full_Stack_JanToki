import { useLoaderData } from "react-router-dom";
import MapLeaflet from "../../components/mapLeaflet/MapLeaflet";
import { AuthContext } from "../../context/AuthContext";
import { useContext, useEffect, useState } from "react";
import { getReviewsByRestaurant, updateReview, deleteReview } from "../../utils/api/review";
import ReviewForm from "../../components/reviewForm/ReviewForm";
import { useFavorite } from "../../hooks/useFavorite";
import { deleteRestaurant, editRestaurant } from "../../utils/api/restaurant";

function RestaurantDetail() {
	const { userData } = useContext(AuthContext);
	const restaurant = useLoaderData();
	const [reviews, setReviews] = useState([]);
	const { isFavorite, toggleFavorite } = useFavorite(userData?.id, restaurant._id);
	const [isEditing, setIsEditing] = useState(false);
	const [editData, setEditData] = useState({
		Name: restaurant.Name || "",
		Description: restaurant.Description || "",
		CuisineType: restaurant.Categories?.CuisineType || "",
		Phone: restaurant.Phone || "",
		Website: restaurant.Website || "",
		SocialMedia: restaurant.SocialMedia || "",
		Image: null
	});
	const [editingReview, setEditingReview] = useState(null);
	
	useEffect(() => {
		const fetchReviews = async () => {
			try {
				const res = await getReviewsByRestaurant(restaurant._id);
				setReviews(res.results || []);
			} catch (error) {
				console.error("Error al cargar reseñas:", error);
			}
		};
		fetchReviews();
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

	const handleSaveEdit = async() => {
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

	const handleDelete = async() => {
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
		console.log("editingReview", editingReview);

		const formData = new FormData();
		formData.append("text", editingReview.text);
		formData.append("rating", editingReview.rating);
		if (editingReview.image) {
			formData.append("image", editingReview.image);
		}
		try {
			await updateReview(editingReview.id, formData);
			setEditingReview(null);
			const res = await getReviewsByRestaurant(restaurant._id);
			setReviews(res.results || []);
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
			const res = await getReviewsByRestaurant(restaurant._id);
			setReviews(res.results || []);
		} catch (error) {
			console.error("Error al eliminar la reseña:", error);
		}
	}

	return (
		<article className="restaurant-page">
			<section className="restaurant-detail">
				<h1>{restaurant.Name}</h1>
				<img src={
					restaurant.Image?.startsWith("http", "https")
					? restaurant.Image
					: `http://localhost:3003${restaurant.Image}`}
					alt={restaurant.Name} />
				<div className="restaurant-address">
					<p>{restaurant.Address}</p>
					<p>{restaurant.Municipality}</p>
					<p>{restaurant.Phone}</p>
				</div>

				{userData?.isAdmin && (
					<div className="admin-controls">
						<button onClick={() => handleEdit()}>Editar restuarante</button>
						<button onClick={() => handleDelete()}>Eliminar restuarante</button>
					</div>
				)}

				{isEditing && (
					<form className="edit-restaurant-form" 
						onSubmit={(e) => {
							e.preventDefault();
							handleSaveEdit();
						}}>
						<input type="text" name="Name" value={editData.Name} onChange={handleInputChange} placeholder="Nombre" />
						<input type="text" name="Description" value={editData.Description} onChange={handleInputChange} placeholder="Descripción"/>
						<select name="CuisineType" value={editData.CuisineType} onChange={handleInputChange} required>
							<option value="">Tipo de cocina</option>
							{[
								"asador", "sidreria", "fusion", "alta cocina", "tradicional", "pintxos",
								"variado", "marisqueria", "asiatica", "vegetariano", "halal", "vegano",
								"francesa", "italiana", "riojana", "mediterranea", "internacional"
							].map((cuisineType) => (
								<option key={cuisineType} value={cuisineType}>
									{cuisineType}
								</option>
							))}
						</select>
						<input type="text" name="Phone" value={editData.Phone} onChange={handleInputChange} placeholder="Teléfono"/>
						<input type="text" name="Website" value={editData.Website} onChange={handleInputChange} placeholder="Web"/>
						<input type="text" name="SocialMedia" value={editData.SocialMedia} onChange={handleInputChange} placeholder="Redes sociales"/>
						<input type="file" name="Image" onChange={handleImageChange} />
						<div>
							<button type="submit">Guardar cambios</button>
							<button type="button" onClick={handleCancel}>Cancelar</button>
						</div>
					</form>
				)}

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

								{userData?.id === review.userId && (
									<div className="review-controls">
										<button onClick={() => handleEditReview(review)}>Editar</button>
										<button onClick={() => handleDeleteReview(review)}>Eliminar</button>
									</div>
								)}
							</li>
						))}
					</ul>
				)}
				{editingReview && (
					<form onSubmit={handleUpdateReview} className="edit-review-form">
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
						<button type="submit">Guardar cambios</button>
						<button type="button" onClick={() => setEditingReview(null)}>Cancelar</button>
					</form>
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