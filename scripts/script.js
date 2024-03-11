function countItemPrice(price, quantity) {
    return price * quantity
}

function countTotalPrice(cart) {
    let totalPrice = 0
    cart.forEach(item => {
        totalPrice += (item.price * item.inCart)
    });
    return totalPrice
}

function changeCartValue() {
    const cart = getLocalStorage(`cart`)
    if (this.alt === `arrow-up icon`) {
        cart.forEach(item => {
            if (item.id === Number(this.dataset.id)) {
                if (item.inCart > 0) {
                    item.inCart++
                    console.log(item.inCart);
                }
            }
        });
    } else if (this.alt === `arrow-down icon`) {
        cart.forEach(item => {
            if (item.id === Number(this.dataset.id)) {
                if (item.inCart > 0) {
                    item.inCart--
                    console.log(item.inCart);
                }
            }
        });
    }
    addLocalStorage(`cart`, cart)
}

function renderCart() {
    const cart = getLocalStorage(`cart`)
    cart.forEach(item => {
        if (item.inCart > 0) {
            console.log(item.title, item.inCart);
            console.log(countItemPrice(item.price, item.inCart));
        }
    });
    console.log(`total`, countTotalPrice(cart));
}

function addLocalStorage(title, item) {
    localStorage.setItem(title, JSON.stringify(item))
}

function getLocalStorage(title) {
    const respons = localStorage.getItem(title)
    return JSON.parse(respons)
}

function removeLocalStorage(title) {
    localStorage.removeItem(title)
}

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

document.querySelectorAll(`.order__stock-arrow`).forEach(arrow => {
    arrow.addEventListener(`click`, changeCartValue)
})

document.querySelector(`.order__btn`).addEventListener(`click`, () => { window.location.href = `status.html` })

addLocalStorage(`cart`, cart)
renderCart();