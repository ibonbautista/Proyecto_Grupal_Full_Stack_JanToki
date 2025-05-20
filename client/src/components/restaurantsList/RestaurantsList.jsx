import { useState, useEffect, useContext, useRef } from "react";
import { useLoaderData } from "react-router-dom";

import RestaurantCard from "../restaurantCard/RestaurantCard";
import { getAllRestaurants } from "../../utils/api/restaurant";
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