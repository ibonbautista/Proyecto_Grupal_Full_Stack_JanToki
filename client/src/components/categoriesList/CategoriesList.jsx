import { useLoaderData } from "react-router-dom";

import './CategoriesList.css';


function CategoriesList() {
    const allCategories = useLoaderData();    

    return (
        <section className="categories-list">
            <h1>Categorías</h1>
            <ul className="categories-list--categories">
                <li className="categories-item">
                    <p>Asador</p>
                </li>
                <li className="categories-item">
                    <p>Asador</p>
                </li>
                <li className="categories-item">
                    <p>Asador</p>
                </li>
                <li className="categories-item">
                    <p>Asador</p>
                </li>
                <li className="categories-item">
                    <p>Asador</p>
                </li>
                <li className="categories-item">
                    <p>Asador</p>
                </li>
                <li className="categories-item">
                    <p>Asador</p>
                </li>
                <li className="categories-item">
                    <p>Asador</p>
                </li>
                <li className="categories-item">
                    <p>Asador</p>
                </li>
                <li className="categories-item">
                    <p>Asador</p>
                </li>
            </ul>
        </section>
    )
}

export default CategoriesList;