import { createContext,useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login,logout, register } from "../utils/api/auth";
import { saveToken, removeToken } from "../utils/localStorage";

const AuthContext = createContext({
    userData: {},
    onLogin: async () => { },
    onLogout: () => { },
	onRegister: async () => { }
});

const AuthProvider = ({children}) => {
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async (email, password) => {
        const result = await login(email, password);
		console.log("result", result);
        if (result.error) {
            return result.error;
        } else {
            console.log("login", result)
            setUserData(result.user);
            saveToken(result.token);
            navigate("/");
            return null;
        }
    }
    const handleLogout = () => {
        logout();
        setUserData(null);
        navigate("/");
    }

	const handleRegister = async (name, email, password) => {
		const result = await register(name, email, password);
		if (result.error) {
			removeToken();
			return {error: result.error};
		} else {
			setUserData(result.user);
			saveToken(result.token);
			navigate("/");
			return {success: true};
		}
	}

    return (
        <AuthContext value={{userData:userData,onLogin:handleLogin,onLogout:handleLogout, onRegister:handleRegister}}>
            {children}
        </AuthContext>
    )
}

export {
    AuthContext,
    AuthProvider
}