import RestaurantsList from "../../components/restaurantsList/RestaurantsList";
import CategoriesList from "../../components/categoriesList/CategoriesList";
import SearchFilter from "../../components/searchFilter/SearchFilter";
import { useLoaderData, useSearchParams, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState, useRef } from 'react';

import './Home.css';

function Home() {
	const { restaurants, page, totalPages } = useLoaderData();
	const [searchParams] = useSearchParams();
	const navigate = useNavigate();
	const location = useLocation();

	const [filteredRestaurants, setFilteredRestaurants] = useState(restaurants);
	const [selectedCategory, setSelectedCategory] = useState(null);
	const currentPage = parseInt(searchParams.get('page') || 1);

	const prevPage = useRef(currentPage);
	const isFirstRender = useRef(true);
	const restaurantsRef = useRef(null);
	const fromNavigation = useRef(false);

	// Detectar si venimos del NavLink (JanToki) o de cambio de página
	useEffect(() => {
		// Si la URL no tiene parámetros y venimos de otra URL, asumimos que es clic en logo
		if (location.search === "" && !isFirstRender.current) {
			fromNavigation.current = true;
			window.scrollTo({ top: 0, behavior: 'smooth' });
		} else {
			fromNavigation.current = false;
		}
		isFirstRender.current = false;
	}, [location]);

	// Scroll a la lista de restaurantes si se cambia de página manualmente
	useEffect(() => {
		if (prevPage.current !== currentPage && !fromNavigation.current) {
			if (restaurantsRef.current) {
				restaurantsRef.current.scrollIntoView({ behavior: 'smooth' });
			}
		}
		prevPage.current = currentPage;
	}, [currentPage]);

	const goToPage = (newPage) => {
		navigate(`?page=${newPage}`);
	};

	const handleCategorySelect = (category) => {
		setSelectedCategory(category);
		console.log("category", category)
		if (category) {
			const filtered = restaurants.filter(r =>
				r.Categories?.CuisineType?.toLowerCase() === category.toLowerCase(),
			);
			setFilteredRestaurants(filtered);
			console.log("filtered", filtered)
		} else {
			setFilteredRestaurants(restaurants);
			console.log("restaurants", restaurants);
		}
	};

	useEffect(() => {
		if (!selectedCategory) {
			setFilteredRestaurants(restaurants);
		}
	}, [restaurants, selectedCategory]);


	return (
		<article className="home-page">
			<section className="searchbar">
				<SearchFilter />
			</section>
			{/* <img src="/src/assets/logotipo.svg" alt="logotipo" className='logotipo-home-page' /> */}
			<CategoriesList onSelectCategory={handleCategorySelect} />
			<div ref={restaurantsRef}>
				<RestaurantsList restaurants={filteredRestaurants} />
			</div>

			<section className="pagination">
				{currentPage > 1 && (
					<button onClick={() => goToPage(currentPage - 1)}>
						<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-caret-left" viewBox="0 0 16 16">
							<path d="M10 12.796V3.204L4.519 8zm-.659.753-5.48-4.796a1 1 0 0 1 0-1.506l5.48-4.796A1 1 0 0 1 11 3.204v9.592a1 1 0 0 1-1.659.753" />
						</svg>
					</button>
				)}
				<span>Página {currentPage} de {totalPages}</span>
				{currentPage < totalPages && (
					<button onClick={() => goToPage(currentPage + 1)}>
						<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-caret-right" viewBox="0 0 16 16">
							<path d="M6 12.796V3.204L11.481 8zm.659.753 5.48-4.796a1 1 0 0 0 0-1.506L6.66 2.451C6.011 1.885 5 2.345 5 3.204v9.592a1 1 0 0 0 1.659.753" />
						</svg>
					</button>
				)}
			</section>
		</article>
	)
}

export default Home;