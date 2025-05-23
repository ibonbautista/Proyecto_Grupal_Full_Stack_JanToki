
import RestaurantCard from "../restaurantCard/RestaurantCard";

import './RestaurantsList.css';


function RestaurantsList({ restaurants = [] }) {
	
    return (
        <section className="restaurants-list">
            <h1>Restaurantes</h1>
            <section className="restaurants-list--restaurants">
                {restaurants.length === 0 ? (
                    <p>No hay restaurantes disponibles.</p>
                ) : (
                    restaurants.map((restaurant) => (
						<RestaurantCard restaurant={restaurant} key={restaurant._id} />
					))
                )}
            </section>
        </section>
    )
}

export default RestaurantsList;