import { useLoaderData } from "react-router-dom";

import CategoryIcon from "../categoryIcon/CategoryIcon";
import './CategoriesList.css';


function CategoriesList() {
    const allCategories = useLoaderData();    

    return (
        <section className="categories-list">
            <h1>Categorías</h1>
            <section className="categories-list--categories">
                {allCategories.map(categories => {
                    return <CategoryIcon categories={categories} />
                })
                }
            </section>
        </section>
    )
}

export default CategoriesList;