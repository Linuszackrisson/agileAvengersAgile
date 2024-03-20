import {
    addLocalStorage,
    getLocalStorage,
    addUsersLocalStorage,
    addProductsLocalStorage,
} from "./localStorage.js";

import {
    renderNavLinks,
    renderShoppingModal,
    renderShoppingCart,
    renderProfilePageInformation,
    renderProducts,
} from "./render.js";

import {
    fetchProducts,
} from "./fetch.js";

window.onload = function () {
    if (window.location.pathname.endsWith("login.html")) {
        checkLoginDetails();
    } else if (window.location.pathname.endsWith("status.html")) {
        statusPageUpdate();
    } else if (window.location.pathname.endsWith("profile.html")) {
        renderProfilePageInformation();
    } else if (window.location.pathname.endsWith("register.html")) {
        document.querySelector('.register-page__submit-btn').addEventListener(`click`, function(event){
            event.preventDefault();
            validateRegistration();
        });        
    }

    if (document.querySelector(`.main__nav-icon`)) {
        document.querySelector(`.main__nav-icon`).addEventListener(`click`, navMenuEvent)
    }
};

addUsersLocalStorage()
addProductsLocalStorage()
renderShoppingModal()

if (window.location.pathname === "/product-page.html") {
    document.querySelector(`.img-header-bag-icon`).addEventListener(`click`, openShoppingCart)
    document.querySelectorAll(`.img-add-icon`).forEach(item => item.addEventListener(`click`, changeCartValue))
    renderProducts()
    renderShoppingCart()
}

function navMenuEvent() {
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
}

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
    generateUniqueOrderNumber,
};

function statusPageUpdate() {
    const orderNumbers = getLocalStorage('orderNumbers');
    if (orderNumbers) {
        const latestOrderNumber = orderNumbers[orderNumbers.length - 1];
        document.getElementById("orderNr").textContent = "Ordernummer: " + latestOrderNumber;
    }
    var minuter = Math.floor(Math.random() * (20 - 13 + 1)) + 13;
    document.getElementById("deliveryCounter").textContent = minuter;
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

        if (!user) {
            descriptionRef.innerText = 'Kontrollera användarnamn!';
            userNameRef.focus();
        } else {
            if (user.password !== passwordRef.value) {
                descriptionRef.innerText = 'Kontrollera lösenord!'
                passwordRef.focus();
            } else {
                if (!checkboxRef.checked) {
                    descriptionRef.innerText = 'Godkänn GDPR!';
                    checkboxRef.focus()
                } else {
                    descriptionRef.innerText = 'Logga in på ditt konto nedan för att se din orderhistorik.';
                    addLocalStorage("currentUser", user)
                    window.location.href = 'product-page.html';
                }
            }
        }
    } catch (error) {
        console.error(error);
    }
}
// ========================================
// Här börjar kod för registreringsfunktion
// ========================================

function getUsers() {        
    const userString = localStorage.getItem('users');
    const users = userString ? JSON.parse(userString) : [];
    return users;
}

// ========================================
// Regex för att matcha en giltig e-postadress
// ========================================
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ========================================
// Validering av ny användare
// ========================================

let loginLinkAdded = false;
function validateRegistration() {    
    const users = getUsers();
    const emailInput = document.getElementById('loginEmail').value;
    const passwordInput = document.getElementById('loginPassword').value;
    const checkboxRef = document.querySelector('.register-page__check-container input[type="checkbox"]');

    if (!validateEmail(emailInput)) {        
        document.getElementById('emailAlert').style.display = 'block';        
        setTimeout(function(){            
            document.getElementById('emailAlert').style.display = 'none';
        }, 1200);
        return;
    }
    
    if (passwordInput.length < 8) {
        document.getElementById('passwordAlert').style.display = 'block';
        setTimeout(function(){
            document.getElementById('passwordAlert').style.display = 'none';
        }, 1200);
        return;
    }
    
    const emailExists = users.some(user => user.email === emailInput);
    
    if (emailExists) {        
        document.querySelector('.register-page__form-description').textContent = 'Användaren existerar redan.';
        if (!loginLinkAdded) {
        const loginLink = document.createElement('a');
        loginLink.textContent = 'Logga in';
        loginLink.href = 'login.html';
        loginLink.classList.add('register__loginBtn');
        document.querySelector('.register-page__form-container').appendChild(loginLink);
        loginLinkAdded = true;
        }
    } else {
            if (!checkboxRef.checked) {

                document.getElementById('gdprAlert').style.display = 'block';
                setTimeout(function(){
                    document.getElementById('gdprAlert').style.display = 'none';
                }, 1200);
            return;
            } else {
                console.log('välkommen in!')
                const usernameRef = emailInput.split('@')[0];
                    const newUser = {
                    username: usernameRef,
                    password: passwordInput,
                    role: 'user',
                    email: emailInput,
                    profile_image: 'assets/profile.svg'
                    };
            addLocalStorage("currentUser", newUser)
            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users));
         
            document.querySelector('.register-page__form-description').textContent = 'Registrera dig med namn och mailadress för att kunna beställa våra tjänster';
            const formContainer = document.querySelector('.register-page__form-container');
            const loginLink = formContainer.querySelector('.register__loginBtn');
            if (loginLink) {
                formContainer.removeChild(loginLink);
            }            
                window.location.href = 'profile.html';
            }
    }
};