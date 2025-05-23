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
    const result = await fetchData("/logout","POST");
	removeToken();
	return result;
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

async function profile(){
    const result = await fetchData("/user");
    return result;
}

async function getUserInfo() {
	const result = await fetchData("/user-info");
	return result;
}

export {
    login,
    logout,
    register,
	profile,
	getUserInfo
}