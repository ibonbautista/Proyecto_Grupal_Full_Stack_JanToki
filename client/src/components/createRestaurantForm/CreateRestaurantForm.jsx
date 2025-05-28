import { useState } from "react";
import { createRestaurant } from "../../utils/api/restaurant";

const cuisine_types = [
	'Moderna',
	'Alta cocina',
	'Asador',
	'Tradicional',
	'Sidreria',
	'Fusion',
	'Pintxos',
	'Marisqueria',
	'Internacional',
	'Asiatica',
	'Francesa',
	'Autor',
	'Contemporanea',
	'Vegetariana'
];


export function CreateRestaurantForm({ onCreated }) {
	const [formData, setFormData] = useState({
		Name: "",
		Description: "",
		Town: "",
		Municipality: "",
		Address: "",
		Latitude: "",
		Longitude: "",
		CuisineType: "",
		Phone: "",
		Website: "",
		SocialMedia: "",
	});
	const [image, setImage] = useState(null);
	const [success, setSuccess] = useState("");
	const [error, setError] = useState("");

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleFileChange = (e) => {
		setImage(e.target.files[0]);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setSuccess("");
		setError("");

		const form = new FormData();
		form.append("Name", formData.Name);
		form.append("Description", formData.Description);
		form.append("Town", formData.Town);
		form.append("Municipality", formData.Municipality);
		if (formData.Address) form.append("Address", formData.Address);
		form.append("Latitude", formData.Latitude);
		form.append("Longitude", formData.Longitude);
		form.append("Categories[CuisineType]", formData.CuisineType.toLowerCase());
		if (formData.Phone) form.append("Phone", formData.Phone);
		if (formData.Website) form.append("Website", formData.Website);
		if (formData.SocialMedia) form.append("SocialMedia", formData.SocialMedia);
		if (image) {
			form.append("image", image);
		}

		try {
			const result = await createRestaurant(form);
			if (result.error) {
				setError(result.error);
			} else {
				setSuccess("Restaurante creado correctamente");
				setFormData({
					Name: "",
					Description: "",
					Town: "",
					Municipality: "",
					Address: "",
					Latitude: "",
					Longitude: "",
					CuisineType: "",
					Phone: "",
					Website: "",
					SocialMedia: null,
				});
				setImage(null);
				if (onCreated) onCreated();
			}
		} catch (error) {
			console.error("Error al crear el restaurante:", error);
			setError(error.message || "Error al crear el restaurante");
		}
	};

	return (
		<form onSubmit={handleSubmit} className="create-restaurant-form">
			<h3>Nuevo restaurante</h3>
			<input type="text" name="Name" value={formData.Name} onChange={handleChange} placeholder="Nombre" required />
			<input type="text" name="Description" value={formData.Description} onChange={handleChange} placeholder="Descripción" required />

			<div className="create-restaurant-form--location">
				<input type="text" name="Town" value={formData.Town} onChange={handleChange} placeholder="Pueblo" required />
				<input type="text" name="Municipality" value={formData.Municipality} onChange={handleChange} placeholder="Municipio" required />
			</div>

			<input type="text" name="Address" value={formData.Address} onChange={handleChange} placeholder="Dirección" />

			<div className="create-restaurant-form--coordinates">
				<input type="number" name="Latitude" value={formData.Latitude} onChange={handleChange} placeholder="Latitud" required />
				<input type="number" name="Longitude" value={formData.Longitude} onChange={handleChange} placeholder="Longitud" required />
			</div>

			<select name="CuisineType" value={formData.CuisineType} onChange={handleChange} required>
				<option value="">Tipo de cocina</option>
				{cuisine_types.map((cuisineType) => (
					<option key={cuisineType} value={cuisineType}>
						{cuisineType}
					</option>
				))}
			</select>

			<input type="text" name="Phone" value={formData.Phone} onChange={handleChange} placeholder="Teléfono" />
			<input type="text" name="Website" value={formData.Website} onChange={handleChange} placeholder="Página web" />
			<input type="text" name="SocialMedia" value={formData.SocialMedia} onChange={handleChange} placeholder="Red social" />
			<input type="file" className="create-restaurant-form--file" accept="image/*" onChange={handleFileChange} />

			<div className="create-restaurant-form--buttons">
				<button type="submit">Crear restaurante</button>
				<button type="button" onClick={onCreated}>Cancelar</button>
			</div>

			{success && <p className="modal-success">{success}</p>}
			{error && <p className="modal-error">{error}</p>}
		</form>
	);
}