import fetchData from "./fetch.js";

const BASE_URL = "http://localhost:3003";

async function addReview(restaurantId, data) {
	const response = await fetchData("/review/" + restaurantId, "POST", data);
	return response;
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