function saveToLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function getFromLocalStorage(key, defaultValue = null) {
    const result = localStorage.getItem(key);
    if (result) {
        return JSON.parse(result);
    } else {
        return defaultValue;
    }
}

function removeFromLocalStorage(key){
    localStorage.removeItem(key);
}

function saveToken(token) {
    saveToLocalStorage("token", token);
}

function getToken(){
    return getFromLocalStorage("token",null);
}

function removeToken(){
    removeFromLocalStorage("token");
}

export {
    saveToken,
    getToken,
    removeToken
}