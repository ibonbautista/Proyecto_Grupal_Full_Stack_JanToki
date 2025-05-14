import RestaurantsList from "../publication/restaurantsList/RestaurantsList";
import { useEffect, useState } from 'react';

import './Home.css';

function Home() {
    return (
        <article className="home-page">
            {/* <img src="/src/assets/logotipo.svg" alt="logotipo" className='logotipo-home-page' /> */}
            <RestaurantsList restaurants={restaurants} />
        </article>
    )
}

export default Home;