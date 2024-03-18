import {
    addLocalStorage,
    getLocalStorage,
    addUsersLocalStorage,
    addCustomerOrderHistory,
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
addCustomerOrderHistory(123)

addUsersLocalStorage()
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
    statusPageUpdate,
};
function statusPageUpdate() {
    const uniqueOrderNr = '#12345';
    // Här ska det implementeras värde från funktion som skrivs senare.
    const orderNrRef = document.querySelector(".status__orderNr")
    let orderNr = uniqueOrderNr;
    let orderNrText = orderNrRef.textContent;
    orderNrText = orderNrText.replace("[ordernr]", orderNr);
    orderNrRef.textContent = orderNrText;

    const delivCountRef = document.querySelector(".status__delivCounter");
    let deliveryTime = 30;
    // ^ Här ska det istället för en siffra implementeras värde från funktion som skrivs senare.
    let counterText = delivCountRef.textContent;
    counterText = counterText.replace("[nr]", deliveryTime);
    delivCountRef.textContent = counterText;
}
// Simpel funktion för att slumpa tiden för leveransen. Mellan 13 och 20 minuter.
// Körs varje gång sidan laddas om.

function renderDeliveryTime() {
    var minuter = Math.floor(Math.random() * (20 - 13 + 1)) + 13;
    document.getElementById("deliveryCounter").innerHTML = "<strong>" + minuter + "</strong> minuter";
}


renderDeliveryTime();