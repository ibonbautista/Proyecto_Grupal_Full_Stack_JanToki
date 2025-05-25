import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import './Navbar.css';
function Navbar({ onLoginClick, onRegisterClick }) {
    const { onLogout, userData } = useContext(AuthContext);
	
    return (
        <nav>
            <ul className="nav-list">
                <li className={"nav-logo "} >
                    <NavLink to="/" end>JanToki</NavLink>
                </li>

                <div className="nav-items">
                    {!userData ? (
                        <>
                            <button onClick={onLoginClick} className='nav-item'>Iniciar Sesión</button>
                            <button onClick={onRegisterClick} className='nav-item'>Registrarme</button>
                        </>
                    ) : (
                        <>
                            <NavLink to="/user"><span className='nav-item'>{userData.username}</span></NavLink>
                            <button onClick={onLogout} className='nav-item'>Logout</button>
                        </>
                    )}
                </div>
            </ul>
        </nav>
    )
}

export default Navbar;