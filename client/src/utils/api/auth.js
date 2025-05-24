import fetchData from "./fetch.js";
import { saveToken, removeToken } from "../localStorage.js";

async function login(email, password){
	try {
		const result = await fetchData("/login","POST",{
			email,
			password
		});
		if (result.token) {
			saveToken(result.token);
		}
		return result;
	} catch (error) {
		return { error: error.message };
	}
}
async function logout(){
	removeToken();
}

async function register(username, email, password) {
	try {
		const result = await fetchData("/register", "POST", {
			username,
			email,
			password
		});
		if (result.token) {
			saveToken(result.token);
		}
		return result;
	} catch (error) {
		return { error: error.message };
	}
}

async function getUserInfo() {
	const result = await fetchData("/user-info", "GET");
	return result;
}

export {
    login,
    logout,
    register,
	getUserInfo
}