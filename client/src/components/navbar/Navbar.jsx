import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import user from '../../../../server/src/models/user';
import './Navbar.css';
function Navbar() {
    const { onLogout, userData } = useContext(AuthContext);
    return (
        <nav>
            <ul className="nav-list">
                <li className={"nav-logo "} >
                    <NavLink to="/">JanToki</NavLink>
                </li>

                <div className="nav-items">
                {userData ? (
                    <>
                        <li className="nav-item">
                            <NavLink to="/profile">{userData.username}</NavLink>
                        </li>
                        <li className="nav-item">
                            <button onClick={onLogout}>Logout</button>
                        </li>
                    </>

                ) : (
                    <>
                        <li className='nav-item'>
                            <NavLink to="/login">Login</NavLink>
                        </li>

                        <li className='nav-item'>
                            <NavLink to="/register">Register</NavLink>
                        </li>
                    </>
                )}
                </div>
            </ul>
        </nav>
    )
}

export default Navbar;