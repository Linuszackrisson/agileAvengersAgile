import {
    addLocalStorage,
    getLocalStorage,
} from "./localStorage.js";

import {
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

export {
    countItemPrice,
    countTotalPrice,
    changeCartValue,
};

const navToggle = document.querySelector(".nav-toggle");
const links = document.querySelector(".links");




navToggle.addEventListener("click", function () {

    links.classList.toggle("show-links");
});

renderNavLinks()

function renderNavLinks() {


    const navObject = [
        [
            {
                text: `Meny`,
                href: `menu.html`
            },
            {
                text: `Vårt Kaffe`,
                href: `about.html`
            },
            {
                text: `Min profil`,
                href: `profil.html`
            },
            {
                text: `Orderstatus`,
                href: `status.html`
            }
        ],
        [
            {
                text: `Meny`,
                href: `menu.html`
            },
            {
                text: `Vårt Kaffe`,
                href: `about.html`
            },
            {
                text: `Login`,
                href: `login.html`
            },
            {
                text: `Registrera`,
                href: `register.html`
            },
            {
                text: `Orderstatus`,
                href: `status.html`
            }
        ],
        [
            {
                text: `Admin`,
                href: `admin.html`
            }
        ],
    ]


    const login = JSON.parse(localStorage.getItem('loginValue'))
    // To make this code work we need the loginValue from the
    // loginfoorm . You can test this function if you with this code:
    // const test =`user`. Change the login to test.
    if (login === `user`) {
        navObject[0].forEach(link => {
            const liRef = document.createElement(`li`)

            const aRef = document.createElement(`a`)
            aRef.href = link.href
            aRef.textContent = link.text

            liRef.appendChild(aRef)
            document.querySelector(`.links`).appendChild(liRef)
        })
    } else if (login === `guest`) {
        navObject[1].forEach(link => {
            const liRef = document.createElement(`li`)

            const aRef = document.createElement(`a`)
            aRef.href = link.href
            aRef.textContent = link.text

            liRef.appendChild(aRef)
            document.querySelector(`.links`).appendChild(liRef)
        })
    } else if (login === `admin`) {
        navObject[2].forEach(link => {
            const liRef = document.createElement(`li`)

            const aRef = document.createElement(`a`)
            aRef.href = link.href
            aRef.textContent = link.text

            liRef.appendChild(aRef)
            document.querySelector(`.links`).appendChild(liRef)
        })
    }
}