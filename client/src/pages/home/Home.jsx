import RestaurantsList from "../../components/restaurantsList/RestaurantsList";
import SearchFilter from "../../components/searchFilter/SearchFilter";
import { useLoaderData, useSearchParams, useNavigate } from "react-router-dom";
import { useEffect } from 'react';

import './Home.css';

function Home() {
	const { restaurants, page, totalPages} = useLoaderData();
	const [searchParams] = useSearchParams();
	const navigate = useNavigate();

	const currentPage = parseInt(searchParams.get('page') || 1);

	useEffect(() => {
		window.scrollTo({ top: 0, behavior: 'auto' });
	}, [currentPage]);

	const goToPage = (newPage) => {
		navigate(`?page=${newPage}`);
	};
    
    return (
        <article className="home-page">
            <section className="searchbar">
                <SearchFilter />
            </section>
            {/* <img src="/src/assets/logotipo.svg" alt="logotipo" className='logotipo-home-page' /> */}
            <RestaurantsList restaurants={restaurants} />

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