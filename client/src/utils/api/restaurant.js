import fetchData from "./fetch.js";
import { getToken } from "../localStorage.js";

const BASE_URL = "http://localhost:3003";

async function getAllRestaurants({ request }) {
	const url = new URL(request.url); // para acceder a los parámetros
	const page = url.searchParams.get("page") || 1; // extraer los parámetros
	const name	= url.searchParams.get("name") || "";
	const town = url.searchParams.get("town") || "";
	
	// Montar la query para llamar a la API con los filtros
	let query = `?page=${page}&limit=10`;
	if (name) {
		query += `&Name=${name}`;
	} else if (town) {
		query += `&Municipality=${town}`;
	}
	// Llamar a la API con los filtros
    const restaurants = await fetchData(`/restaurant${query}`);
	console.log("restaurants", restaurants);
    return restaurants;
}

async function getRestaurantById({params}) {
    const restaurant = await fetchData(`/restaurant/${params.id}`)
    return restaurant;
}

async function deleteRestaurant(id) {
    const response = await fetchData(`/restaurant/${id}`, "DELETE")
    return response
}

async function createRestaurant(formData) {
	const url = BASE_URL + "/restaurant";
	const token = getToken();

	if (!token) {
		throw new Error("No hay token de autenticación");
	}

	const response = await fetch(url, {
		method: "POST",
		headers: {
			Authorization: `Bearer ${token}`
		},
		body: formData
	});
	let responseData;
	try {
		responseData = await response.json();
	} catch (e) {
		console.error("Error al parsear JSON:", e);
		throw new Error("Respuesta no válida del servidor");
	}

	if(!response.ok){
		console.error("Error response:", response.status, responseData);
		responseData.status = response.status;
		throw new Error(responseData?.error || "Error en la solicitud");
	}

	return responseData;
}

async function editRestaurant(restaurantId, formData) {
	const url = BASE_URL + "/restaurant/" + restaurantId;
	const token = getToken();
    const response = await fetch(url, {
		method: "PUT",
		headers: {
			Authorization: `Bearer ${token}`
		},
		body: formData,
	});
	let responseData;
	try {
		responseData = await response.json();
	} catch (e) {
		console.error("Error al parsear JSON:", e);
		throw new Error("Respuesta no válida del servidor");
	}
	if (!response.ok) {
		throw new Error(responseData?.error || "Error al actualizar restaurante");
	}
    return responseData;
}
function getRestaurantImage(restaurant) {
    const url = BASE_URL + "/images/" + restaurant.image;
    return url
}
export {
    getAllRestaurants,
    deleteRestaurant,
    createRestaurant,
    getRestaurantById,
    editRestaurant,
    getRestaurantImage
}