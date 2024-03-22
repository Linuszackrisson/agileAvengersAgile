import {
    fetchProducts,
    fetchUsers,
} from "./fetch.js";

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
    const users = await fetchUsers();
    addLocalStorage("users", users.users);
}

async function addProductsLocalStorage() {
    const products = await fetchProducts();
    addLocalStorage("products", products.menu);
}

async function addCustomerOrderHistory(price) {
    if (getLocalStorage(`currentUser`)) {
        const order = []
        const date = new Date();
        const day = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
        const currentUser = getLocalStorage(`currentUser`)
        const users = getLocalStorage(`users`)
        const userIndex = users.indexOf(users.find((user) => user.username === currentUser.username))
        const allOrders = getLocalStorage(`orderNumbers`)

        if (currentUser.orders) {
            currentUser.orders.forEach(item => {
                order.push(item)
            });
        }
        order.unshift(
            {
                "orderNumber": allOrders[allOrders.length - 1],
                "price": price,
                "date": day,
            }
        )

        const updatedUser = {
            "username": currentUser.username,
            "password": currentUser.password,
            "role": currentUser.role,
            "email": currentUser.email,
            "profile_image": currentUser.profile_image,
            "orders": order,
        }
        users.splice(userIndex, 1, updatedUser)
        addLocalStorage("currentUser", updatedUser)
        addLocalStorage("users", users)
    }
}

export {
    addLocalStorage,
    getLocalStorage,
    removeLocalStorage,
    addUsersLocalStorage,
    addProductsLocalStorage,
    addCustomerOrderHistory,
};