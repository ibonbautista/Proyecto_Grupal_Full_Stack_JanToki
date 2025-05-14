import fetchData from "./fetch.js";

const BASE_URL = "http://localhost:3003";

async function getAllRestaurants() {
    const restaurants = await fetchData("/restaurants")
    return restaurants;
}

async function getRestaurantById(id) {
    const restaurant = await fetchData(`/restaurants/${id}`)
    return restaurant;
}

async function deleteRestaurant(id) {
    const response = await fetchData(`/restaurants/${id}`, "DELETE")
    return response
}

// async function createRestaurant(restaurantData) {
//     // subir el contenido con formData para que detecte la imagen
//     const formData = new FormData();
//     formData.append("name", restaurantData.name);
//     formData.append("description", restaurantData.description);
//     formData.append("council", restaurantData.council);
//     formData.append("category", restaurantData.category);
//     formData.append("stand_id", restaurantData.stand_id);
//     formData.append("image", restaurantData.image);
//     console.log("restauran image",restaurantData.image);
//     const response = await fetchData("/restaurans", "POST", formData);
//     return response;
// } /* TODO CUANDO ESTE EL MODEL */

async function editRestaurant(restaurantId, restaurantData) {
    const response = await fetchData("/restaurants/" + restaurantId, "PUT", restaurantData);
    return response;
}
function getRestaurantImage(restauran) {
    const url = BASE_URL + "/images/" + restaurant.image;
    return url
}
export {
    getAllRestaurants,
    deleteRestaurant,
    // createRestaurant,
    getRestaurantById,
    editRestaurant,
    getRestaurantImage
}