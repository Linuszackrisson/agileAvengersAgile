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

async function addCustomerOrderHistory(orderNumber, price) {

    if (getLocalStorage(`currentUser`)) {
        const order = []
        const date = new Date();
        const day = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
        const user = getLocalStorage(`currentUser`)

        if (user.orders) {
            user.orders.forEach(item => {
                order.push(item)
            });
        }
        order.unshift(
            {
                "orderNumber": orderNumber,
                "price": price,
                "date": day,
            }
        )

        const updatedUser = {
            "username": user.username,
            "password": user.password,
            "role": user.role,
            "email": user.email,
            "profile_image": user.profile_image,
            "orders": order,
        }

        addLocalStorage("currentUser", updatedUser)
    }
}

export {
    addLocalStorage,
    getLocalStorage,
    removeLocalStorage,
    addUsersLocalStorage,
    addCustomerOrderHistory,
};