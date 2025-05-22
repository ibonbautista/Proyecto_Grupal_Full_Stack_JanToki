import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import './Navbar.css';
function Navbar({ onLoginClick, onRegisterClick }) {
    const { onLogout, userData } = useContext(AuthContext);
	console.log("userData", userData);
	
    return (
        <nav>
            <ul className="nav-list">
                <li className={"nav-logo "} >
                    <NavLink to="/">JanToki</NavLink>
                </li>

                <div className="nav-items">
                    {!userData ? (
                        <>
                            <button onClick={onLoginClick} className='nav-item'>Iniciar Sesión</button>
                            <button onClick={onRegisterClick} className='nav-item'>Registrarme</button>
                        </>
                    ) : (
                        <li className={"nav-item "}>
                            <NavLink to={`/profile/${userData.user_id}`}>{userData.username}</NavLink>
                            <button onClick={onLogout} className='nav-item'>Logout</button>
                        </li>
                    )}
                </div>
            </ul>
        </nav>
    )
}

export default Navbar;