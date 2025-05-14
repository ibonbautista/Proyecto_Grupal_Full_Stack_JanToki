import { createContext,useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserInfo, login,logout } from "../utils/api/auth";
import { saveToken } from "../utils/localStorage";

const AuthContext = createContext({
    userData: {},
    onLogin: async () => { },
    onLogout: () => { }
})

const AuthProvider = ({children}) => {
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();

    useEffect(()=>{
        handleGetUserInfo();
    },[])
    const handleGetUserInfo= async()=>{
        const result = await getUserInfo();
        console.log("user info",result);
        if(result.user){
            setUserData(result.user);
        }
    }
    const handleLogin = async (email, password) => {
        const result = await login(email, password);
        if (result.error) {
            return result.error;
        } else {
            console.log("login", result)
            setUserData(result.user);
            saveToken(result.token);
            navigate("/trivias");
            return null;
        }
    }
    const handleLogout = () => {
        logout();
        setUserData(null);
        navigate("/");
    }
    return (
        <AuthContext value={{userData:userData,onLogin:handleLogin,onLogout:handleLogout}}>
            {children}
        </AuthContext>
    )
}

export {
    AuthContext,
    AuthProvider
}