import { Outlet } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import LoginModal from "../../components/loginModal/LoginModal";
import RegisterModal from "../../components/registerModal/RegisterModal";
import { AuthProvider } from "../../context/AuthContext";
import { useState } from "react";
function Root() {
	const [showLoginModal, setShowLoginModal] = useState(false);
	const [showRegisterModal, setShowRegisterModal] = useState(false);
    return (
        <AuthProvider>
            <header>
                <Navbar 
					onLoginClick={() => setShowLoginModal(true)}
					onRegisterClick={() => setShowRegisterModal(true)}
				/>
					{showLoginModal && <LoginModal onClose={() => setShowLoginModal(false)} />}
					{showRegisterModal && <RegisterModal onClose={() => setShowRegisterModal(false)} />}
            </header>
            <main>
                <h1>JanToki</h1>
                <Outlet />
            </main>
            <footer>

            </footer>
        </AuthProvider>
    )
}

export default Root;