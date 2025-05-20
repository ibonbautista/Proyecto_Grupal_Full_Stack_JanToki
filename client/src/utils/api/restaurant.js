import fetchData from "./fetch.js";

const BASE_URL = "http://localhost:3003";

async function getAllRestaurants({ request }) {
	const url = new URL(request.url); // para acceder a los parámetros
	const page = url.searchParams.get("page") || 1; // extraer los parámetros
	const name	= url.searchParams.get("name") || "";
	const ubication = url.searchParams.get("town") || "";
	
	// Montar la query para llamar a la API con los filtros
	let query = `?page=${page}`;
	if (name) {
		query += `&name=${name}`;
	} else if (ubication) {
		query += `&ubication=${ubication}`;
	}
	// Llamar a la API con los filtros
    const restaurants = await fetchData(`/restaurant${query}`);
	console.log("filtros", query);
    return restaurants;
}

async function getRestaurantById({params}) {
    const restaurant = await fetchData(`/restaurant/${params.id}`)
    return restaurant;
}

async function getRestaurantByCategory({params}) {
    const restaurant = await fetchData(`/restaurant/category/${params.category}`)
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
    getRestaurantByCategory,
    editRestaurant,
    getRestaurantImage
}