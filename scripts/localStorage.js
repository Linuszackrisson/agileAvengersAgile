import { fetchUsers, } from "./fetch.js";

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

async function addUsersLocalStorage() {
    const users = await fetchUsers()
    addLocalStorage("users", users.users)
}

export {
    addLocalStorage,
    getLocalStorage,
    removeLocalStorage,
    addUsersLocalStorage,
};