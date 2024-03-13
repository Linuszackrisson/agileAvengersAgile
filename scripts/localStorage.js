function addLocalStorage(title, item) {
    try {
        localStorage.setItem(title, JSON.stringify(item));
    } catch (error) {
        console.log(error);
    }
}

function getLocalStorage(title) {
    try {
        const respons = localStorage.getItem(title);
        return JSON.parse(respons);
    } catch (error) {
        console.log(error);
    }
}

function removeLocalStorage(title) {
    try {
        localStorage.removeItem(title);
    } catch (error) {
        console.log(error);
    }
}

export {
    addLocalStorage,
    getLocalStorage,
    removeLocalStorage,
};