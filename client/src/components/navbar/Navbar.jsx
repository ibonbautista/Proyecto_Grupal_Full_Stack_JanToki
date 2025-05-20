import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
// import './Navbar.css';
function Navbar({onLoginClick, onRegisterClick}) {
    const { onLogout, userData } = useContext(AuthContext);
    return (
        <nav>
            <ul className="nav-list">
                <li className={"nav-item "} >
                    <NavLink to="/">JanToki</NavLink>
                </li>

                {!userData ? (
                    <>
                        <button onClick={onLoginClick}>Iniciar Sesión</button>
						<button onClick={onRegisterClick}>Registrarme</button>
                    </>

                ) : (
                    <li className={"nav-item "}>
						<span>{userData.username}</span>
                        <button onClick={onLogout}>Logout</button>
                    </li>
                )}
            </ul>
        </nav>
    )
}

export default Navbar;