import { useState, useEffect, useContext, useRef } from "react";
import { useLoaderData } from "react-router-dom";

import RestaurantCard from "../restaurantCard/RestaurantCard";
import { getAllRestaurants } from "../../utils/api/restaurant";
import './RestaurantsList.css';


function RestaurantsList() {
    const allRestaurants = useLoaderData();    

    return (
        <section className="restaurants-list">
            <h1>Restaurantes</h1>
            <section className="restaurants-list--restaurants">
                {allRestaurants.map(restaurants => {
                    return <RestaurantCard restaurants={restaurants} key={restaurants.restaurants_id} />
                })
                }
            </section>
        </section>
    )
}

export default RestaurantsList;