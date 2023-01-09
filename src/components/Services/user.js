const saveToLocalStorage = (token) => {
    localStorage.setItem('accessToken', token);
}

const clearLocalStorage = (token) => {
    localStorage.removeItem('accessToken');
}

const getFromLocalStorage = (key) => {
    return localStorage.getItem(key) ?? null;
}

export {
    saveToLocalStorage,
    clearLocalStorage,
    getFromLocalStorage
}