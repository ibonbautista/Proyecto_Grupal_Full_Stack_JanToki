import fetchData from "./fetch";

export async function addFavorite(restaurantId) {
	if (!restaurantId) {
		throw new Error("No se proporcionó el ID del restaurante");
	}
	const response = await fetchData(`/favorite/${restaurantId}`, "POST");
	return response;
}

export async function deleteFavorite(favoriteId) {
	if (!favoriteId) {
		throw new Error("No se proporcionó el ID del favorito");
	}
	const response = await fetchData(`/favorite/${favoriteId}`, "DELETE");
	return response;
}

export async function getFavorites(page = 1, limit=10) {
	const queryParams = `?page=${page}&limit=${limit}`;
	console.log("llamando a get/favorite", queryParams);
	try {
		const response = await fetchData(`/favorite${queryParams}`);
		return response;
	} catch (error) {
		console.error("Error al obtener los favoritos:", error);
		throw error;
	}
}