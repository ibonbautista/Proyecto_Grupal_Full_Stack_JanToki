import { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import './Navbar.css';

import LightLogo from '../../../public/images/JanToki.svg';
import DarkLogo from '../../../public/images/JanToki-white.svg';
function Navbar({ onLoginClick, onRegisterClick }) {
    const { onLogout, userData } = useContext(AuthContext);

    return (
        <nav>
            <ul className="nav-list">
                <li className={"nav-logo "} >
                    <NavLink to="/" end>
                        <img src={LightLogo} alt="logo claro" className='logo logo-light' />
                        <img src={DarkLogo} alt="logo oscuro" className='logo logo-dark' />
                    </NavLink>
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