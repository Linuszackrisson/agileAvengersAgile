import {
    addLocalStorage,
    getLocalStorage,
    addUsersLocalStorage,
} from "./localStorage.js";

import {
    renderNavLinks,
    renderShoppingModal,
    renderShoppingCart,
} from "./render.js";

import {
    fetchProducts,
} from "./fetch.js";

addUsersLocalStorage()
renderShoppingModal()

if (window.location.pathname === "/product-page.html") {
    document.querySelector(`.img-header-bag-icon`).addEventListener(`click`, openShoppingCart)
    document.querySelectorAll(`.img-add-icon`).forEach(item => item.addEventListener(`click`, changeCartValue))
}

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

function openShoppingCart() {
    const modalRef = document.querySelector(`.shopping`)
    if (modalRef.open) {
        modalRef.open = false;
    } else {
        modalRef.open = true;
    }
}

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

async function changeCartValue() {
    if (!getLocalStorage(`cart`)) {
        const products = await fetchProducts()
        const cart = []
        products.menu.forEach(item => {

            if (item.id === Number(this.dataset.id)) {
                const cartItem = {
                    "id": item.id,
                    "title": item.title,
                    "price": item.price,
                    "inCart": 1,
                }
                cart.push(cartItem)
            } else {
                const cartItem = {
                    "id": item.id,
                    "title": item.title,
                    "price": item.price,
                    "inCart": 0,
                }
                cart.push(cartItem)
            }
        });
        addLocalStorage(`cart`, cart);
        renderShoppingCart()
    } else {
        const cart = getLocalStorage(`cart`);
        if (this.alt.includes(`Add`)) {
            cart.forEach(item => {
                if (item.id === Number(this.dataset.id)) {
                    if (item.inCart >= 0) {
                        item.inCart++;
                    }
                }
            });
        } else if (this.alt.includes(`Remove`)) {
            cart.forEach(item => {
                if (item.id === Number(this.dataset.id)) {
                    if (item.inCart >= 0) {
                        item.inCart--;
                    }
                }
            });
        }
        addLocalStorage(`cart`, cart);
        renderShoppingCart();
    }
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

// Här ska det implementeras värde från funktion som skrivs senare.
function statusPageUpdate() {
    console.log(`test`);
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

// Här börjar funktionen för att generera unikt ordernummer.
function generateUniqueOrderNumber() {
    const orderArray = []
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    let orderNumber = '#';

    for (let i = 0; i < 2; i++) {
        orderNumber += letters.charAt(Math.floor(Math.random() * letters.length));
    }

    for (let i = 0; i < 10; i++) {
        orderNumber += numbers.charAt(Math.floor(Math.random() * numbers.length));
    }
    if (getLocalStorage('orderNumbers')) {
        const uniqueOrders = getLocalStorage('orderNumbers')
        uniqueOrders.forEach(item => {
            orderArray.push(item)
        })
    }
    if (orderArray.includes(orderNumber)) {
        generateUniqueOrderNumber()

    } else {
        orderArray.push(orderNumber)
        addLocalStorage('orderNumbers', orderArray)
    }

}

renderDeliveryTime();

//ˇˇˇˇˇˇ Den här funktionen får gärna flyttas upp senare när vi går igenom och snyggar till!!!
window.onload = function() {    
    if (window.location.pathname.endsWith("login.html")) {
        checkLoginDetails();
    }
};
//^^^^^^^ Den här funktionen får gärna flyttas upp senare när vi går igenom och snyggar till!!!

function checkLoginDetails() {
    let logInBtnRef = document.querySelector('.login-page__submit-btn');
    logInBtnRef.addEventListener('click', (event) => {
        event.preventDefault();
        validateLogin();
    })
}

function validateLogin() {
    try {
        const userNameRef = document.querySelector('#loginEmail');
        const passwordRef = document.querySelector('#loginPassword');
        let descriptionRef = document.querySelector('.login-page__form-description');
        const checkboxRef = document.querySelector('.login-page__check-container input[type="checkbox"]');

        const users = getLocalStorage("users");
        if (!users) {
            throw "No users found in localStorage!"
        }

        const user = users.find(user => user.email === userNameRef.value);
        console.log(user);

        // if(!users.some(user => user.username === userNameRef.value)){
        if(!user) {            
            descriptionRef.innerText = 'Kontrollera användarnamn!';
            userNameRef.focus();        
        } else {
            // const user = users.find(user => user.username === userNameRef.value);
            if(user.password !== passwordRef.value) {
                descriptionRef.innerText = 'Kontrollera lösenord!'
                passwordRef.focus();
            } else {
                if (!checkboxRef.checked) {
                    descriptionRef.innerText = 'Godkänn GDPR!';
                    checkboxRef.focus()
                } else {
                    descriptionRef.innerText ='Logga in på ditt konto nedan för att se din orderhistorik.';
                    addLocalStorage("currentUser", user)                    
                    window.location.href = 'product-page.html';
                }
            }
        }
    } catch (error) {
        console.error(error);
    }
}