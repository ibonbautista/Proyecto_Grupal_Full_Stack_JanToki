import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import "./SearchFilter.css";

function SearchFilter({ onSearch }) {
	const [searchParams, setSearchParams] = useSearchParams();
	const [name, setName] = useState(searchParams.get("name") || "");
	const [town, setTown] = useState(searchParams.get("town") || "");

	const handleSearchName = (e) => {
		e.preventDefault();
		const params = {};
		if (name.trim()) {
			params.name = name.trim();
		}
		if (town.trim()) {
			params.town = town.trim();
		}
		params.page = 1;
		setSearchParams(params);
		setName("");
		setTown("");
	}

	return (
		<section className="search-bar">
			<h3>Explora la mejor gastronomía del País Vasco</h3>
			<form onSubmit={handleSearchName} className="search-filter">
				<div className="search-input">
					<input
						type="text"
						placeholder="Buscar por nombre"
						value={name}
						onChange={(e) => setName(e.target.value)}
						className="left-input"
					/>
					<input
						type="text"
						placeholder="Filtrar por población"
						value={town}
						onChange={(e) => setTown(e.target.value)}
						className="right-input"
					/>
				</div>
				<button type="submit" className="search-button">Buscar</button>
			</form>
		</section>
	)
}

export default SearchFilter;