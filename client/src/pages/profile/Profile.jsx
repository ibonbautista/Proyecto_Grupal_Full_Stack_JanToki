import { useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { FavoritesList } from "../../components/favoritesList/FavoritesList";
import { ReviewsList } from "../../components/reviewsList/ReviewsList";
import { updateUser } from "../../utils/api/user";

import './Profile.css';

function Profile() {
    const { userData, setUserData, onLogout } = useContext(AuthContext);
	if (!userData) {
		return <Navigate to="/" replace />;
	}

	const [activeSection, setActiveSection] = useState("profile");
	const [username, setUserName] = useState(userData.username);
	const [email, setEmail] = useState(userData.email);
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");
		setSuccess("");

		if (password && password !== confirmPassword) {
			setError("Las contraseñas no coinciden");
			return;
		}

		const result = await updateUser({username, email, password});
		if (result.error) {
			setError(result.error);
		} else {
			setUserData({...userData, username, email});
			setPassword("");
			setSuccess("Perfil actualizado correctamente");

			setTimeout(() => {
				setSuccess("");
			}, 3000);
		}
	};


    return (
        <article className="my-profile">
            <section className="my-profile__index">
                <h2>Jantoki</h2>
				<div className="index-item" onClick={() => setActiveSection("profile")}>
					<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
						<path d="..." /> {/* Icono perfil */}
					</svg>
					<p className="profile-link">Perfil</p>
				</div>
                <div className="index-item" onClick={() => setActiveSection("favorites")}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-bookmark-check" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M10.854 5.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0" />
                        <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1z" />
                    </svg>
                    <p className="saved-restaurants-link">Restaurantes guardados</p>
                </div>
                <div className="index-item" onClick={() => setActiveSection("reviews")}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-chat-left-quote" viewBox="0 0 16 16">
                        <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
                        <path d="M7.066 4.76A1.665 1.665 0 0 0 4 5.668a1.667 1.667 0 0 0 2.561 1.406c-.131.389-.375.804-.777 1.22a.417.417 0 1 0 .6.58c1.486-1.54 1.293-3.214.682-4.112zm4 0A1.665 1.665 0 0 0 8 5.668a1.667 1.667 0 0 0 2.561 1.406c-.131.389-.375.804-.777 1.22a.417.417 0 1 0 .6.58c1.486-1.54 1.293-3.214.682-4.112z" />
                    </svg>
                    <p className="reviews-link">Reseñas</p>
                </div>
            </section>

            <section className="my-profile__content">
                <section className={`my-profile__data ${activeSection === "profile" ? "active" : "hidden"}`}>
                    <h2>Datos personales</h2>
                    <div className="data--info">
                        <img src="https://placehold.co/100x100" className="data--info-logo" alt="Perfil" />
                        <div className="data--info-name">
                            <h3 className="data--name">{userData.username}</h3>
                            <p className="data--email">{userData.email}</p>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit} className="data--configuration">
                        <input type="text" value={username} onChange={(e) => setUserName(e.target.value)} placeholder={userData.username} />
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={userData.email} />
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Cambiar contraseña" />
                        <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirmar contraseña" />
                        <div className="configuration-buttons">
                            <button type="submit">Guardar cambios</button>
                            <button className="logout-button" onClick={onLogout}>Cerrar sesión</button>
                        </div>
						{success && <p className="modal-success">{success}</p>}
						{error && <p className="modal-error">{error}</p>}
                    </form>
                </section>

                <section className={`my-profile__restaurants ${activeSection === "favorites" ? "active" : "hidden"}`}>
                    <p>Restaurantes guardados</p>
                    <FavoritesList/>
                </section>

                <section className={`my-profile__reviews ${activeSection === "reviews" ? "active" : "hidden"}`}>
                    <p>Reseñas</p>
					<ReviewsList/>
                </section>
            </section>
        </article>
    );
}

export default Profile;