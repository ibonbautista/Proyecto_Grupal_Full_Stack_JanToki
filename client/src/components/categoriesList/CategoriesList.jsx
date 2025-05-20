import { useLoaderData, NavLink } from "react-router-dom";

import './CategoriesList.css';


function CategoriesList({ onSelectCategory }) {

    const categories = [
        "Asador", "Sidrería", "Fusión", "Alta Cocina", "Tradicional", "Pintxos",
        "Variado", "Marisquería", "Asiática", "Vegetariano", "Halal", "Vegano",
        "Francesa", "Italiana", "Riojana", "Mediterránea", "Internacional"
    ]

    return (
        <section className="categories-list">
            <h1>Categorías</h1>
            <div className="categories-list--categories">
                <button className="categories-item" onClick={() => onSelectCategory(null)}>Todas</button>

                {categories.map((category) => (
                    <button
                        key={category}
                        className="categories-item"
                        onClick={() => onSelectCategory(category)}
                    >
                        {category}
                    </button>
                ))}
            </div>
        </section>
    )
}

export default CategoriesList;