import { useLoaderData, NavLink } from "react-router-dom";

import './CategoriesList.css';


function CategoriesList() {
    const allCategories = useLoaderData();
    console.log(allCategories)

    return (
        <section className="categories-list">
            <h1>Categorías</h1>
            <ul className="categories-list--categories">
                <NavLink to=''>
                    <li className="categories-item">
                        <p>Vasca</p>
                    </li>
                </NavLink>

                <NavLink to=''>
                    <li className="categories-item">
                        <p>Tradicional</p>
                    </li>
                </NavLink>

                <NavLink to=''>
                    <li className="categories-item">
                        <p>Moderno</p>
                    </li>
                </NavLink>

                <NavLink to=''>
                    <li className="categories-item">
                        <p>Alta Cocina</p>
                    </li>
                </NavLink>

                <NavLink to=''>
                    <li className="categories-item">
                        <p>Mediterranea</p>
                    </li>
                </NavLink>

                <NavLink to=''>
                    <li className="categories-item">
                        <p>Asador</p>
                    </li>
                </NavLink>

                <NavLink to=''>
                    <li className="categories-item">
                        <p>Sidrería</p>
                    </li>
                </NavLink>

                <NavLink to=''>
                    <li className="categories-item">
                        <p>Caserío</p>
                    </li>
                </NavLink>

                <NavLink to=''>
                    <li className="categories-item">
                        <p>Fusión</p>
                    </li>
                </NavLink>

                <NavLink to=''>
                    <li className="categories-item">
                        <p>Pintxos</p>
                    </li>
                </NavLink>

                <NavLink to=''>
                    <li className="categories-item">
                        <p>Asiática</p>
                    </li>
                </NavLink>

                <NavLink to=''>
                    <li className="categories-item">
                        <p>Francesa</p>
                    </li>
                </NavLink>

                <NavLink to=''>
                    <li className="categories-item">
                        <p>Cafetería</p>
                    </li>
                </NavLink>

                <NavLink to=''>
                    <li className="categories-item">
                        <p>Cubana</p>
                    </li>
                </NavLink>
            </ul>
        </section>
    )
}

export default CategoriesList;