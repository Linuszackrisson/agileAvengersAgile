import {
    getLocalStorage,
} from "./localStorage.js";

import {
    countItemPrice,
    countTotalPrice,
    changeCartValue,
    checkUserRole,
    createOrder,
    logOutEvent,
    saveProduct,
    changeProduct,
    SaveChangesProduct,
    removeProduct,
} from "./script.js";

function renderNavLinks() {

    const role = checkUserRole();
    const navObject = [
        [
            {
                text: `Meny`,
                href: `product-page.html`
            },
            {
                text: `Vårt Kaffe`,
                href: `about.html`
            },
            {
                text: `Min profil`,
                href: `profile.html`
            },
            {
                text: `Orderstatus`,
                href: `status.html`
            }
        ],
        [
            {
                text: `Meny`,
                href: `product-page.html`
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
                text: `Meny`,
                href: `product-page.html`
            },
            {
                text: `Vårt Kaffe`,
                href: `about.html`
            },
            {
                text: `Min profil`,
                href: `profile.html`
            },
            {
                text: `Orderstatus`,
                href: `status.html`
            },
            {
                text: `Login`,
                href: `login.html`
            },
            {
                text: `Registrera`,
                href: `register.html`
            },
        ],
    ]
    document.querySelector(`.nav-menu__list`).textContent = ``;
    if (role === `user`) {
        navObject[0].forEach(link => {
            const liRef = document.createElement(`li`);
            liRef.classList.add(`nav-menu__list-item`);

            const aRef = document.createElement(`a`);
            aRef.href = link.href;
            aRef.textContent = link.text;
            aRef.classList.add(`nav-menu__list-link`);
            liRef.appendChild(aRef);

            document.querySelector(`.nav-menu__list`).appendChild(liRef);
        })
    } else if (role === `guest`) {
        navObject[1].forEach(link => {
            const liRef = document.createElement(`li`);
            liRef.classList.add(`nav-menu__list-item`);

            const aRef = document.createElement(`a`);
            aRef.href = link.href;
            aRef.textContent = link.text;
            aRef.classList.add(`nav-menu__list-link`);
            liRef.appendChild(aRef);

            document.querySelector(`.nav-menu__list`).appendChild(liRef);
        })
    } else if (role === `admin`) {
        navObject[2].forEach(link => {
            const liRef = document.createElement(`li`);
            liRef.classList.add(`nav-menu__list-item`);

            const aRef = document.createElement(`a`);
            aRef.href = link.href;
            aRef.textContent = link.text;
            aRef.classList.add(`nav-menu__list-link`);
            liRef.appendChild(aRef);

            document.querySelector(`.nav-menu__list`).appendChild(liRef);
        })
    }
    if (role !== "guest") {
        const liRef = document.createElement(`li`)
        liRef.classList.add(`nav-menu__list-item`)

        const aRef = document.createElement(`a`)
        aRef.textContent = `Logout`
        aRef.classList.add(`nav-menu__list-link`)
        aRef.addEventListener(`click`, logOutEvent)
        liRef.appendChild(aRef)

        document.querySelector(`.nav-menu__list`).appendChild(liRef)
    }
}

function renderShoppingModal() {
    const modalRef = document.createElement(`dialog`);
    modalRef.classList.add(`shopping`);
    document.querySelector(`body`).appendChild(modalRef);
    const formRef = document.createElement(`form`);
    formRef.classList.add(`shopping__container`);
    formRef.method = `dialog`;
    modalRef.appendChild(formRef);
    const h2Ref = document.createElement(`h2`);
    h2Ref.classList.add(`shopping__title`);
    h2Ref.textContent = `Din Beställning`;
    formRef.appendChild(h2Ref);
    const sectionRef = document.createElement(`section`);
    sectionRef.classList.add(`shopping__cart`);
    formRef.appendChild(sectionRef);
    let divRef = document.createElement(`div`);
    divRef.classList.add(`shopping__cart-container`);
    sectionRef.appendChild(divRef);
    const articleRef = document.createElement(`article`);
    articleRef.classList.add(`shopping__total`);
    sectionRef.appendChild(articleRef);
    divRef = document.createElement(`div`);
    divRef.classList.add(`shopping__total-container`);
    articleRef.appendChild(divRef);
    let h3Ref = document.createElement(`h3`);
    h3Ref.classList.add(`shopping__total-title`);
    h3Ref.textContent = `Total`;
    divRef.appendChild(h3Ref);
    h3Ref = document.createElement(`h3`);
    h3Ref.classList.add(`shopping__total-price`);
    divRef.appendChild(h3Ref);
    const pRef = document.createElement(`p`);
    pRef.classList.add(`shopping__total-description`);
    pRef.textContent = `inkl moms + drönarleverans`;
    articleRef.appendChild(pRef);
    const btnRef = document.createElement(`button`);
    btnRef.classList.add(`shopping__btn`);
    btnRef.textContent = `Take my money!`;
    btnRef.addEventListener(`click`, createOrder);
    formRef.appendChild(btnRef);
}

function renderShoppingCart() {
    const cart = getLocalStorage(`cart`);
    document.querySelector(`.shopping__cart-container`).innerHTML = ``;
    if (cart) {
        cart.forEach(item => {
            if (item.inCart > 0) {
                const articleRef = document.createElement(`article`);
                articleRef.classList.add(`shopping__cart-item`);
                document.querySelector(`.shopping__cart-container`).appendChild(articleRef);
                let divRef = document.createElement(`div`);
                divRef.classList.add(`shopping__item-container`);
                articleRef.appendChild(divRef);
                let h3Ref = document.createElement(`h3`);
                h3Ref.classList.add(`shopping__item-title`);
                h3Ref.textContent = item.title;
                divRef.appendChild(h3Ref);
                let pRef = document.createElement(`p`);
                pRef.classList.add(`shopping__item-price`);
                pRef.textContent = `${countItemPrice(item.price, item.inCart)} kr`;
                divRef.appendChild(pRef);
                divRef = document.createElement(`div`);
                divRef.classList.add(`shopping__item-container`, `shopping__item-container--stock`);
                articleRef.appendChild(divRef);
                let imgRef = document.createElement(`img`);
                imgRef.src = `../Assets/arrow-up.svg`;
                imgRef.alt = `Add to ${item.title}`;
                imgRef.classList.add(`shopping__stock-arrow`);
                imgRef.dataset.id = item.id;
                imgRef.addEventListener(`click`, changeCartValue);
                divRef.appendChild(imgRef);
                pRef = document.createElement(`p`);
                pRef.classList.add(`shopping__item-stock`);
                pRef.textContent = item.inCart;
                divRef.appendChild(pRef);
                imgRef = document.createElement(`img`);
                imgRef.src = `../Assets/arrow-down.svg`;
                imgRef.alt = `Remove from ${item.title}`;
                imgRef.classList.add(`shopping__stock-arrow`);
                imgRef.dataset.id = item.id;
                imgRef.addEventListener(`click`, changeCartValue);
                divRef.appendChild(imgRef);
            }
        });
        document.querySelector(`.shopping__total-price`).textContent = countTotalPrice(cart) + ` kr`;
    }
}

function renderProfilePageInformation() {

    const currentUser = getLocalStorage(`currentUser`);
    let totalSum = 0;

    if (currentUser) {
        document.querySelector(`.profile__image`).src = currentUser.profile_image;
        document.querySelector(`.profile__name`).textContent = currentUser.username;
        document.querySelector(`.profile__mail`).textContent = currentUser.email;

        if (currentUser.orders) {
            currentUser.orders.forEach(item => {
                renderOrderHistory(item);
                totalSum += item.price;
            });
        }
    }
    const articleRef = document.createElement(`article`);
    articleRef.classList.add(`total-spent`);
    document.querySelector(`.orderhistory-container`).appendChild(articleRef);
    let pRef = document.createElement(`p`);
    pRef.classList.add(`total-spent__title`);
    pRef.textContent = `Totalt Spenderat`;
    articleRef.appendChild(pRef);

    pRef = document.createElement(`p`);
    pRef.classList.add(`total-spent__sum`);
    pRef.textContent = `${totalSum} kr`;
    articleRef.appendChild(pRef);
}

function renderOrderHistory(order) {
    const articleRef = document.createElement(`article`);
    articleRef.classList.add(`order`);
    document.querySelector(`.orderhistory-container`).appendChild(articleRef);

    const mainDivRef = document.createElement(`div`);
    mainDivRef.classList.add(`order-details`);
    articleRef.appendChild(mainDivRef);

    let divRef = document.createElement(`div`);
    divRef.classList.add(`order-flex`);
    mainDivRef.appendChild(divRef);

    let pRef = document.createElement(`p`);
    pRef.classList.add(`order-number`);
    pRef.innerHTML = `#<span class="orderNumber1">${order.orderNumber} <span>`;
    divRef.appendChild(pRef);

    pRef = document.createElement(`p`);
    pRef.classList.add(`order-date`);
    pRef.textContent = order.date;
    divRef.appendChild(pRef);

    divRef = document.createElement(`div`);
    divRef.classList.add(`order-flex`);
    mainDivRef.appendChild(divRef);

    pRef = document.createElement(`p`);
    pRef.classList.add(`order-total`);
    pRef.textContent = `total ordersumma`;
    divRef.appendChild(pRef);

    pRef = document.createElement(`p`);
    pRef.classList.add(`order-total`);
    pRef.textContent = `${order.price} kr`;
    divRef.appendChild(pRef);
}

function renderProducts() {
    const products = getLocalStorage(`products`);
    document.querySelector(`.menu-coffee-cont`).textContent = ``;
    if (products) {
        products.forEach(item => {
            const articleRef = document.createElement(`article`);
            articleRef.classList.add(`row`);
            document.querySelector(`.menu-coffee-cont`).appendChild(articleRef);

            const imgRef = document.createElement(`img`);
            imgRef.classList.add(`img-add-icon`);
            imgRef.src = `./Assets/add.svg`;
            imgRef.alt = `Add to ${item.title}`;
            imgRef.dataset.id = item.id;
            imgRef.addEventListener(`click`, changeCartValue);
            articleRef.appendChild(imgRef);

            let divRef = document.createElement(`div`);
            divRef.classList.add(`menu-coffe-text`);
            articleRef.appendChild(divRef);

            const h2Ref = document.createElement(`h2`);
            h2Ref.textContent = item.title;
            divRef.appendChild(h2Ref);

            const pRef = document.createElement(`p`);
            pRef.textContent = item.desc;
            divRef.appendChild(pRef);

            divRef = document.createElement(`div`);
            divRef.classList.add(`menu-coffe-text`);
            articleRef.appendChild(divRef);

            const h3Ref = document.createElement(`h3`);
            h3Ref.textContent = `${item.price}kr`;
            divRef.appendChild(h3Ref);



            if (checkUserRole() === `admin`) {
                divRef = document.createElement(`div`);
                divRef.classList.add(`admin__container`);
                articleRef.appendChild(divRef);

                let removeRef = document.createElement(`img`)
                removeRef.src = `./Assets/close.svg`
                removeRef.alt = `Remove ${item.title}`
                removeRef.classList.add(`admin__remove-btn`)
                removeRef.dataset.id = item.id
                removeRef.addEventListener(`click`, removeProduct)
                divRef.appendChild(removeRef)

                let changeRef = document.createElement(`img`)
                changeRef.src = `./Assets/logo-sml.svg`
                changeRef.alt = `Change ${item.title}`
                changeRef.classList.add(`admin__change-btn`)
                changeRef.dataset.id = item.id
                changeRef.addEventListener(`click`, changeProduct)
                divRef.appendChild(changeRef)
            }

        });
    }
    if (checkUserRole() === `admin`) {
        const imgRef = document.createElement(`img`);
        imgRef.src = `./Assets/add.svg`;
        imgRef.alt = `Create new product`;
        imgRef.classList.add(`menu-coffee-add`);
        imgRef.addEventListener(`click`, renderForm);

        document.querySelector(`.menu-coffee-cont`).appendChild(imgRef);
    }
}

function renderForm(change) {
    if (document.querySelector(`.menu-coffee-add`))
        document.querySelector(`.menu-coffee-add`).remove();
    if (!document.querySelector(`.add-form`)) {
        const formRef = document.createElement(`form`);
        formRef.classList.add(`add-form`);

        const pRef = document.createElement(`p`);
        pRef.textContent = `Fyll i uppgifter om den nya producten`;
        pRef.classList.add(`add-form__message`);

        document.querySelector(`.menu-coffee-cont`).appendChild(formRef);
        formRef.appendChild(pRef);

    } else {
        document.querySelector(`.add-form`).textContent = ""
    }

    const formInput = [
        {
            "input": `input`,
            "label": `Produkt namn`,
            "id": `productName`,
            "type": `text`,
            "attribute": `maxlength`,
            "length": 20,
            "class": `add-form__input`
        },
        {
            "input": `input`,
            "label": `Produkt pris`,
            "id": `productPrice`,
            "type": `number`,
            "attribute": `max`,
            "length": 9999,
            "class": `add-form__input`
        },
        {
            "input": `textarea`,
            "label": `Kort Beskrivning `,
            "id": `productShortDesc`,
            "type": `text`,
            "attribute": `maxlength`,
            "length": 80,
            "class": `add-form__textarea`
        },
        {
            "input": `textarea`,
            "label": `Beskrivning`,
            "id": `productDesc`,
            "type": `text`,
            "attribute": `maxlength`,
            "length": 250,
            "class": `add-form__large-textarea`
        },
    ]

    formInput.forEach(item => {
        const divRef = document.createElement(`div`);
        divRef.classList.add(`add-form__box`);

        const labelRef = document.createElement(`label`);
        labelRef.textContent = item.label;
        labelRef.classList.add(`add-form__label`);
        labelRef.setAttribute(`for`, item.id);
        divRef.appendChild(labelRef);

        const inputRef = document.createElement(item.input);
        if (item.input === `label`)
            inputRef.type = item.type;
        inputRef.id = item.id;
        inputRef.classList.add(item.class);
        inputRef.setAttribute(item.attribute, item.length);
        divRef.appendChild(inputRef);
        document.querySelector(`.add-form`).appendChild(divRef);
    })
    if (!change.type) {
        const btnRef = document.createElement(`button`);
        btnRef.textContent = `Ändra produktinformation`;
        btnRef.classList.add(`add-form__btn`);
        btnRef.dataset.id = change.dataset.id
        btnRef.addEventListener(`click`, SaveChangesProduct);
        document.querySelector(`.add-form`).appendChild(btnRef);
    } else {
        const btnRef = document.createElement(`button`);
        btnRef.textContent = `Lägg till produkten`;
        btnRef.classList.add(`add-form__btn`);
        btnRef.addEventListener(`click`, saveProduct);
        document.querySelector(`.add-form`).appendChild(btnRef);
    }

    document.querySelector(`.add-form`).scrollIntoView(`smooth`)
}

export {
    renderNavLinks,
    renderShoppingModal,
    renderShoppingCart,
    renderProfilePageInformation,
    renderProducts,
    renderForm,
};

