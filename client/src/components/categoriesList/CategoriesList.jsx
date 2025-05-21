import { useLoaderData, NavLink } from "react-router-dom";

import './CategoriesList.css';


function CategoriesList({ onSelectCategory }) {

    const categories = [
        "Asador", "Sidrería", "Fusión", "Alta Cocina", "Tradicional", "Pintxos",
        "Variado", "Marisquería", "Asiática", "Vegetariano", "Vegano",
        "Francesa", "Italiana", "Riojana", "Mediterránea", "Internacional"
    ]

    return (
        <section className="categories-list">
            <h1>Categorías</h1>
            <div className="categories-list--categories">
                <div className="categories-item" onClick={() => onSelectCategory(null)}>
                    <div className="categories-img">
                        <img src="../../../public/images/todas.jpg" alt="category-icon" />
                    </div>
                    <p>Todas</p>
                </div>

                {categories.map((category) => (
                    <div className="categories-item" onClick={() => onSelectCategory(category)}>
                        <div className="categories-img">
                            <img src={`../../../public/images/${category.toLowerCase()}.jpg`} alt="category-icon" />
                        </div>
                        <p>{category}</p>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default CategoriesList;