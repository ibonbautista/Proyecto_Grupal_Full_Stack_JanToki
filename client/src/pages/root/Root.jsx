import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import { AuthProvider } from "../../context/AuthContext";
function Root() {
    useEffect(() => {
        const toggleButton = document.getElementById('theme-toggle');
        const body = document.body;

        const toggleTheme = () => {
            body.classList.toggle('light-theme');

            if (body.classList.contains('light-theme')) {
                toggleButton.textContent = 'Activar tema oscuro';
            } else {
                toggleButton.textContent = 'Activar tema claro';
            }
        };
        
        toggleButton?.addEventListener('click', toggleTheme);

        return () => {
          toggleButton?.removeEventListener('click', toggleTheme);
        };
      }, []);

    return (
        <AuthProvider>
            <header>
                <Navbar />
            </header>
            <main>
                <Outlet />
                <button id="theme-toggle">Activar tema claro</button>
            </main>
            <footer>

            </footer>
        </AuthProvider>
    )
}

export default Root;