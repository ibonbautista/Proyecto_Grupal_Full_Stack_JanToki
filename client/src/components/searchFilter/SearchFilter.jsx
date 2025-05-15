import { useState,useRef } from "react";

function SearchFilter ({onSearch}) {
    const [searchName, setsearchName] = useState("");
    // const [searchCouncil, setSearchCouncil] = useState(""); /* TODO AÑADIR BÚSQUEDA POR COUNCIL */
    const timeoutRef = useRef(null);

    const handleSearchName= (e)=>{
        const data = e.target.value;
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(()=>{
            console.log("busqueda",data);
            onSearch(data);
        },500)
        setsearchName(data);
    }

    // const handleSearchCouncil= (e)=>{
    //     const data = e.target.value;
    //     setSearchCouncil(data);
    // }

    return(
        <section className="search-bar">
            <h2>{searchName}</h2>
            <input onChange={handleSearchName} />
            {/* <select name="council" id="select-council"></select> */}
        </section>
    )
}

export default SearchFilter;