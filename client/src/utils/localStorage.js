function saveToLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function getFromLocalStorage(key, defaultValue = null) {
    const result = localStorage.getItem(key);
    if (!result || result === "undefined") {
        return defaultValue;
    }

    try {
        return JSON.parse(result);
    } catch (e) {
        console.error(`Error parsing localStorage key "${key}":`, e);
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