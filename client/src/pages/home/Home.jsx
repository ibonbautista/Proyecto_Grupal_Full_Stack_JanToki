import RestaurantsList from "../../components/restaurantsList/RestaurantsList";
import SearchFilter from "../../components/searchFilter/SearchFilter";
import { useLoaderData } from "react-router-dom";
//import { useEffect, useState } from 'react';

import './Home.css';

function Home() {
	const restaurants = useLoaderData();
    
    return (
        <article className="home-page">
            <section className="searchbar">
                <SearchFilter />
            </section>
            {/* <img src="/src/assets/logotipo.svg" alt="logotipo" className='logotipo-home-page' /> */}
            <RestaurantsList restaurants={restaurants} />
        </article>
    )
}

export default Home;