import './RestaurantCard.css';

function RestaurantCard ({restaurant}){

    return(
        <article className="article restaurant">
            <section className="restaurant-image">
                <img src={restaurant.image} alt={restaurant.name}/>
            </section>
            <section className="restaurant-data">
                <h2>{restaurant.name}</h2>
                <p className="restaurant-council">{restaurant.council}</p>
                {restaurant.rating && <p className="restaurant-rating">{restaurant.rating}</p> }
            </section>
        </article>
    )
}

export default RestaurantCard;