import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useLoaderData } from "react-router-dom";
import fetchData from "../../utils/api/fetch";
import { getAllRestaurants } from "../../utils/api/restaurant";
// import { getUserImage } from "../../../utils/api/auth";

import './Profile.css';

function Profile() {
    const profile = useLoaderData();
    console.log(profile);

    const [user, setUser] = useState(null);

    const { userData, onLogout } = useContext(AuthContext);
    const [favoriteRestaurants, setFavoriteRestaurants] = useState([]);

    // const handleFetchData = async () => {
    //     const userResponse = await fetchData(`/profile`);
    //     const allFavoriteRestaurants = await getAllRestaurants();
    //     const userFavoriteRestaurants = allFavoriteRestaurants.filter(pub => pub.user_id === userData.user_id);

    //     setUser(userResponse);
    //     setFavoriteRestaurants(userFavoriteRestaurants);
    // }

    return (
        <article className="my-profile">
            <section className="my-profile__index">
                <h2>Jantoki</h2>
                <div className="index-item">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-bookmark-check" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M10.854 5.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0" />
                        <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1z" />
                    </svg>
                    <p className="saved-restaurants-link">Restaurantes guardados</p>
                </div>
                <div className="index-item">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-chat-left-quote" viewBox="0 0 16 16">
                        <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
                        <path d="M7.066 4.76A1.665 1.665 0 0 0 4 5.668a1.667 1.667 0 0 0 2.561 1.406c-.131.389-.375.804-.777 1.22a.417.417 0 1 0 .6.58c1.486-1.54 1.293-3.214.682-4.112zm4 0A1.665 1.665 0 0 0 8 5.668a1.667 1.667 0 0 0 2.561 1.406c-.131.389-.375.804-.777 1.22a.417.417 0 1 0 .6.58c1.486-1.54 1.293-3.214.682-4.112z" />
                    </svg>
                    <p className="reviews-link">Reseñas</p>
                </div>
            </section>

            <section className="my-profile__content">
                <section className="my-profile__data active">
                    <h2>Datos personales</h2>
                    <div className="data--info">
                        <img src="https://placehold.co/100x100" className="data--info-logo" alt={"AUX"} />
                        <div className="data--info-name">
                            <h3 className="data--name-lastname">nombre apellido</h3> {/* TODO CAMBIAR */}
                            <p className="data--username">@username</p> {/* TODO CAMBIAR */}
                        </div>
                    </div>
                    <form action="POST" className="data--configuration">
                        <input type="text" placeholder="Nombre" /> {/* TODO CAMBIAR POR DATOS DEL USER */}
                        <input type="text" placeholder="Email" />
                        <input type="text" placeholder="Contraseña" />
                        <div className="configuration-buttons">
                            <button type="submit">Guardar cambios</button>
                            <button className="logout-button" onClick={onLogout}>Logout</button>
                        </div>
                    </form>
                </section>

                <section className="my-profile__restaurants hidden">
                    <p>Restaurantes guardados</p>
                    {/* {restaurants.map(restaurant => (
                        <RestaurantCard restaurant={restaurant} key={restaurant._id} />
                    ))} */}
                </section>

                <section className="my-profile__reviews hidden">
                    <p>Reseñas</p>
                </section>
            </section>
        </article>
    );
}

export default Profile;