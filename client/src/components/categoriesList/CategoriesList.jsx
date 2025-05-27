import React, { useRef, useState } from "react";
import './CategoriesList.css';


function CategoriesList({ onSelectCategory }) {

    const categories = [
        'Moderna',
        'Alta cocina',
        'Asador',
        'Tradicional',
        'Sidreria',
        'Fusion',
        'Pintxos',
        'Marisqueria',
        'Internacional',
        'Asiatica',
        'Francesa',
        'Autor',
        'Contemporanea',
        'Vegetariana'
    ];

    const scrollRef = useRef(null);

    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const scrollLeft = () => {
        scrollRef.current.scrollBy({ left: -200, behavior: "smooth" });
    };

    const scrollLeftClick = () => {
        scrollRef.current.scrollBy({ left: -200, behavior: "smooth" });
    };

    const scrollRightClick = () => {
        scrollRef.current.scrollBy({ left: 200, behavior: "smooth" });
    };

    const handleMouseDown = (e) => {
        setIsDragging(true);
        setStartX(e.pageX - scrollRef.current.offsetLeft);
    };

    const handleMouseLeave = () => setIsDragging(false);
    const handleMouseUp = () => setIsDragging(false);

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - scrollRef.current.offsetLeft;
        const walk = (x - startX) * 1.5; // velocidad
        scrollRef.current.scrollLeft = scrollLeft - walk;
    };

    return (
        <section className="categories-list">
            <h1>Categorías</h1>
            <div className="scroll-wrapper">
                <button className="scroll-button left" onClick={() => scrollLeftClick()}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-caret-left" viewBox="0 0 16 16">
                        <path d="M10 12.796V3.204L4.519 8zm-.659.753-5.48-4.796a1 1 0 0 1 0-1.506l5.48-4.796A1 1 0 0 1 11 3.204v9.592a1 1 0 0 1-1.659.753" />
                    </svg>
                </button>

                <div
                    className="scroll-container"
                    ref={scrollRef}
                    onMouseDown={handleMouseDown}
                    onMouseLeave={handleMouseLeave}
                    onMouseUp={handleMouseUp}
                    onMouseMove={handleMouseMove}
                >
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
                </div>

                <button className="scroll-button right" onClick={() => scrollRightClick()}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-caret-right" viewBox="0 0 16 16">
                        <path d="M6 12.796V3.204L11.481 8zm.659.753 5.48-4.796a1 1 0 0 0 0-1.506L6.66 2.451C6.011 1.885 5 2.345 5 3.204v9.592a1 1 0 0 0 1.659.753" />
                    </svg>
                </button>
            </div>
        </section>
    )
}

export default CategoriesList;