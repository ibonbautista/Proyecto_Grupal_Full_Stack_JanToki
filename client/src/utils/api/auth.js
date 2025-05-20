import fetchData from "./fetch.js";

async function login(email, password){
    const data = {
        email,
        password
    }
    const result = await fetchData("/login","POST",data);
    return result;
}
async function logout(){
    const result = await fetchData("/logout","POST");
}

async function register(username, email, password) {
    const data = {
        username,
        email,
        password
    }
    const result = await fetchData("/register", "POST", data);
    if (result.token) {
        saveToken(result.token);
    }
    return result;
}

async function profile(){
    const result = await fetchData("/profile");
    return result;
}

export {
    login,
    logout,
    register
}