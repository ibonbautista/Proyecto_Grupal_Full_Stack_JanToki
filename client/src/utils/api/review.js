import fetchData from "./fetch.js";
import { getToken } from "../localStorage";

const BASE_URL = "http://localhost:3003";

async function addReview(restaurantId, formData) {
	const url = BASE_URL + "/review/" + restaurantId;
	const token = getToken();

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

async function updateReview(reviewId, data) {
	const response = await fetchData("/review/" + reviewId, "PUT", data);
	return response;
}

async function deleteReview(reviewId) {
	const response = await fetchData("/review/" + reviewId, "DELETE");
	return response;	
}

async function getReviewsByRestaurant(restaurantId) {
	const response = await fetchData("/review/restaurant/" + restaurantId, "GET");
	return response;
	
}


export { 
	addReview,
	updateReview,
	deleteReview,
	getReviewsByRestaurant
};