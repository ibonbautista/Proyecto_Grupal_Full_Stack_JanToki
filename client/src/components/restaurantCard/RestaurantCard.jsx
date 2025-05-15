import { Link } from "react-router-dom";

import './RestaurantCard.css';

function RestaurantCard ({restaurant}){
    return(
        <article className="article restaurant">
			<Link to={`/restaurant/${restaurant._id}`}>
				{/* <section className="restaurant-image">
					<img src={restaurant.image} alt={restaurant.name}/>
				</section> */}
				<section className="restaurant-data">
					<h2>{restaurant.name}</h2>
					<p className="restaurant-council">{restaurant.council}</p>
					{restaurant.rating && <p className="restaurant-rating">{restaurant.rating}</p> }
				</section>
			</Link>
        </article>
    )
}

export default RestaurantCard;