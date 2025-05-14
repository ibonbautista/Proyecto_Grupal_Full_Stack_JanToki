import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
// import './Navbar.css';
function Navbar() {
    const { onLogout, userData } = useContext(AuthContext);
    return (
        <nav>
            <ul className="nav-list">
                <li className={"nav-item "} >
                    <NavLink to="/">JanToki</NavLink>
                </li>

                {userData ? (
                    <li className={"nav-item "}>
                        <button onClick={onLogout}>Logout</button>
                    </li>

                ) : (
                    <>
                        <li >
                            <NavLink to="/login">Login</NavLink>
                        </li>

                        <li>
                            <NavLink to="/register">Register</NavLink>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    )
}

export default Navbar;