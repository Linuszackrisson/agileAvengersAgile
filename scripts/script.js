import {
    addLocalStorage,
    getLocalStorage,
} from "./localStorage.js";

import {
    renderNavLinks,
    renderShoppingModal,
    renderShoppingCart,
} from "./render.js";

const cart = [
    {
        "id": 1,
        "title": "Bryggkaffe",
        "price": 29,
        "inCart": 2
    },
    {
        "id": 2,
        "title": "Caffè Doppio",
        "price": 59,
        "inCart": 1
    },
    {
        "id": 3,
        "title": "Cappuccino",
        "price": 49,
        "inCart": 0
    },
    {
        "id": 4,
        "title": "Latte Macchiato",
        "price": 49,
        "inCart": 0
    },
    {
        "id": 5,
        "title": "Kaffe Latte",
        "price": 59,
        "inCart": 3
    },
    {
        "id": 6,
        "title": "Cortado",
        "price": 55,
        "inCart": 0
    },
    {
        "id": 7,
        "title": "Santos Special",
        "price": 69,
        "inCart": 0
    }
]

addLocalStorage(`cart`, cart);
renderShoppingModal();

document.querySelector(`.main__nav-icon`).addEventListener(`click`, () => {
    const iconRef = document.querySelector(`.main__nav-icon`)
    const iconImgRef = document.querySelector(`.main__nav-icon img`)
    const navRef = document.querySelector(`.nav-menu`)

    if (document.querySelector(`.nav-menu--open`)) {
        iconImgRef.src = `../assets/navicon.svg`
        navRef.classList.remove(`nav-menu--open`)
        iconRef.classList.remove(`main__nav-icon--close`)
    } else {
        iconImgRef.src = `../assets/close.svg`
        navRef.classList.add(`nav-menu--open`)
        iconRef.classList.add(`main__nav-icon--close`)
    }
    renderNavLinks();
})

function countItemPrice(price, quantity) {
    return price * quantity;
}

function countTotalPrice(cart) {
    const deliveryFee = 25;
    let totalPrice = 0;
    totalPrice += deliveryFee;
    cart.forEach(item => {
        totalPrice += (item.price * item.inCart);
    });
    return totalPrice;
}

function changeCartValue() {
    const cart = getLocalStorage(`cart`);
    if (this.alt.includes(`Add`)) {
        cart.forEach(item => {
            if (item.id === Number(this.dataset.id)) {
                if (item.inCart > 0) {
                    item.inCart++;
                }
            }
        });
    } else if (this.alt.includes(`Remove`)) {
        cart.forEach(item => {
            if (item.id === Number(this.dataset.id)) {
                if (item.inCart > 0) {
                    item.inCart--;
                }
            }
        });
    }
    addLocalStorage(`cart`, cart);
    renderShoppingCart();
}

function checkUserRole() {
    const currentUser = getLocalStorage(`currentUser`)
    if (!currentUser) {
        return `guest`
    } else {
        return currentUser.role
    }

}

export {
    countItemPrice,
    countTotalPrice,
    changeCartValue,
    checkUserRole,
};