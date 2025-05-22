import { createContext,useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login,logout, register } from "../utils/api/auth";
import { saveToken, removeToken, getToken } from "../utils/localStorage";
import { profile } from "../utils/api/auth";

const AuthContext = createContext({
    userData: {},
    onLogin: async () => { },
    onLogout: () => { },
	onRegister: async () => { }
});

const AuthProvider = ({children}) => {
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();

	useEffect(()=>{
		const token = getToken();
		if(token){
			profile().then((data)=>{
				setUserData(data.user);
			}).catch(err => {
				console.error("Error al cargar perfil:", err);
				removeToken();
				setUserData(null);
			});
		}
	},[]);
		

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
			saveToken(result.token);
			setUserData(result.user);
			navigate("/");
			return {success: true};
		}
	}

    return (
        <AuthContext.Provider value={{userData:userData,onLogin:handleLogin,onLogout:handleLogout, onRegister:handleRegister}}>
            {children}
        </AuthContext.Provider>
    )
}

export {
    AuthContext,
    AuthProvider
}