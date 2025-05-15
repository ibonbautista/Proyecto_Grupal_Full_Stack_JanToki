import RestaurantsList from "../publication/restaurantsList/RestaurantsList";
import SearchFilter from "../../components/searchFilter/SearchFilter";
import { useEffect, useState } from 'react';

import './Home.css';

function Home() {
    
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