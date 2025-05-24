import { createContext,useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login,logout, register, getUserInfo } from "../utils/api/auth";
import { saveToken, removeToken, getToken } from "../utils/localStorage";

const AuthContext = createContext({
    userData: {},
    onLogin: async () => { },
    onLogout: () => { },
	onRegister: async () => { }
});

const AuthProvider = ({children}) => {
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();

	const handleGetUserInfo = async() => {
		try {
			const result = await getUserInfo();
			if(result.user) {
				setUserData(result.user);
			}
		} catch (error) {
			console.error("Error al cargar perfil:", error);
			removeToken();
			setUserData(null);
		}
	}

	useEffect(() => {
		const token = getToken();
		if(token) {
			handleGetUserInfo();
		}
	}, [])
	
    const handleLogin = async (email, password) => {
        const result = await login(email, password);
        if (result.error) {
			removeToken();
            return {error: result.error};
        } else {
            setUserData(result.user);
            saveToken(result.token);
            navigate("/");
            return { success: true};
        }
    }
    const handleLogout = () => {
        logout();
        setUserData(null);
		removeToken();
        navigate("/");
    }

	const handleRegister = async (name, email, password) => {
		const result = await register(name, email, password);
		
		if (result.error) {
			return {error: result.error};
		} else {
			setUserData(result.user);
			navigate("/");
			console.log("token",result.token);
			return {success: true};
		}
	}

    return (
        <AuthContext.Provider value={{userData, setUserData, onLogin:handleLogin,onLogout:handleLogout, onRegister:handleRegister}}>
            {children}
        </AuthContext.Provider>
    )
}

export {
    AuthContext,
    AuthProvider
}