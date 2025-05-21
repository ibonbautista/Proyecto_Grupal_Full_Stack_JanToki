import { useLoaderData, NavLink } from "react-router-dom";

import './CategoriesList.css';


function CategoriesList({ onSelectCategory }) {

    const categories = [
        "asador", "sidreria", "fusion", "alta cocina", "tradicional", "pintxos",
        "variado", "marisqueria", "asiatica", "vegetariano", "vegano",
        "francesa", "italiana", "riojana", "mediterranea", "internacional"
    ]

    return (
        <section className="categories-list">
            <h1>Categorías</h1>
            <div className="categories-list--categories">
                <div className="categories-item" onClick={() => onSelectCategory(null)}>
                    <div className="categories-img">
                        <img src="https://placehold.co/50x50" alt="category-icon" />
                    </div>
                    <p>Todas</p>
                </div>

                {categories.map((category) => (
                    <div className="categories-item" onClick={() => onSelectCategory(category)}>
                        <div className="categories-img">
                            <img src={`../../../public/images/${category}.jpg`} alt="category-icon" />
                        </div>
                        <p>{category}</p>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default CategoriesList;