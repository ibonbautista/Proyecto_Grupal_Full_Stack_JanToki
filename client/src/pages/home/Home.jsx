import RestaurantsList from "../../components/restaurantsList/RestaurantsList";
import CategoriesList from "../../components/categoriesList/CategoriesList";
import SearchFilter from "../../components/searchFilter/SearchFilter";
import { useLoaderData, useSearchParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';

import './Home.css';

function Home() {
	const { restaurants, page, totalPages } = useLoaderData();
	const [searchParams] = useSearchParams();
	const navigate = useNavigate();

	const [filteredRestaurants, setFilteredRestaurants] = useState(restaurants);
	const [selectedCategory, setSelectedCategory] = useState(null);

	const currentPage = parseInt(searchParams.get('page') || 1);

	const goToPage = (newPage) => {
		navigate(`?page=${newPage}`);
	};

	const handleCategorySelect = (category) => {
		setSelectedCategory(category);
		if (category) {
			const filtered = restaurants.filter(r =>
				r.category?.cuisineType?.toLowerCase() === category.toLowerCase()
			);
			setFilteredRestaurants(filtered);
		} else {
			setFilteredRestaurants(restaurants); // Mostrar todos
		}
	};

	useEffect(() => {
		setFilteredRestaurants(restaurants);
	}, [restaurants]);
    
    return (
        <article className="home-page">
            <section className="searchbar">
                <SearchFilter />
            </section>
            {/* <img src="/src/assets/logotipo.svg" alt="logotipo" className='logotipo-home-page' /> */}
			<CategoriesList onSelectCategory={handleCategorySelect} />
			<RestaurantsList restaurants={filteredRestaurants} />

			<section className="pagination">
				{currentPage > 1 && (
					<button onClick={() => goToPage(currentPage - 1)}>Anterior</button>
				)}
				<span>Página {currentPage} de {totalPages}</span>
				{currentPage < totalPages && (
					<button onClick={() => goToPage(currentPage + 1)}>Siguiente</button>
				)}
			</section>
        </article>
    )
}

export default Home;