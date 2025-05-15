import fetchData from "./fetch.js";

const BASE_URL = "http://localhost:3003";

async function getAllRestaurants() {
    const restaurants = await fetchData("/restaurant")
	console.log("restaurante", restaurants);
    return restaurants;
}

async function getRestaurantById(id) {
    const restaurant = await fetchData(`/restaurant/${id}`)
    return restaurant;
}

async function deleteRestaurant(id) {
    const response = await fetchData(`/restaurant/${id}`, "DELETE")
    return response
}

async function createRestaurant(name, description, ubication, category, phone, webpage, socialMedia, image) {
    // subir el contenido con formData para que detecte la imagen
    const data = {
        name,
        description,
        ubication,
        category,
        phone,
        webpage,
        socialMedia,
        image
    }
    const response = await fetchData("/restaurant", "POST", data);
    return response;
}

async function editRestaurant(restaurantId, restaurantData) {
    const response = await fetchData("/restaurant/" + restaurantId, "PUT", restaurantData);
    return response;
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