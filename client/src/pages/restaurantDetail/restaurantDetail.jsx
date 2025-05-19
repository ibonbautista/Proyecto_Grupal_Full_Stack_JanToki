import { useLoaderData } from "react-router-dom";
import MapLeaflet from "../../components/mapLeaflet/MapLeaflet";

function RestaurantDetail() {
	const restaurant = useLoaderData();
	console.log(restaurant);

	return (
		<section className="restaurant-detail">
			<h1>{restaurant.name}</h1>
			<img src={restaurant.image} alt={restaurant.name} />
			<div className="restaurant-address">
				<p>{restaurant.ubication.address}</p>
				<p>{restaurant.ubication.town}</p>
				<p>{restaurant.phone}</p>
			</div>
			<p>{restaurant.category}</p>
			<p>{restaurant.description}</p>
			<p>{restaurant.webPage}</p>
			<p>{restaurant.rating}</p>
			<MapLeaflet latitude={restaurant.ubication.latitude} longitude={restaurant.ubication.longitude} />
		</section>
	);
}

export default RestaurantDetail;