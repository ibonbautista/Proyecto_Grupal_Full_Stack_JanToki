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
async function getUserInfo(){
    const result = await fetchData("/user-info");
    return result;
}

async function register(name, email, password) {
    const data = {
        name,
        email,
        password
    }
    const result = await fetchData("/auth/register", "POST", data);
    if (result.token) {
        saveToken(result.token);
    }
    return result;
}

export {
    login,
    logout,
    getUserInfo,
    register
}