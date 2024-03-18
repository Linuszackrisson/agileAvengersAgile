import {
    getLocalStorage,
} from "./localStorage.js";

import {
    countItemPrice,
    countTotalPrice,
    changeCartValue,
    checkUserRole,
} from "./script.js";

function renderNavLinks() {

    const role = checkUserRole();
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
    document.querySelector(`.nav-menu__list`).textContent = ``
    if (role === `user`) {
        navObject[0].forEach(link => {
            const liRef = document.createElement(`li`)
            liRef.classList.add(`nav-menu__list-item`)

            const aRef = document.createElement(`a`)
            aRef.href = link.href
            aRef.textContent = link.text
            aRef.classList.add(`nav-menu__list-link`)
            liRef.appendChild(aRef)

            document.querySelector(`.nav-menu__list`).appendChild(liRef)
        })
    } else if (role === `guest`) {
        navObject[1].forEach(link => {
            const liRef = document.createElement(`li`)
            liRef.classList.add(`nav-menu__list-item`)

            const aRef = document.createElement(`a`)
            aRef.href = link.href
            aRef.textContent = link.text
            aRef.classList.add(`nav-menu__list-link`)
            liRef.appendChild(aRef)

            document.querySelector(`.nav-menu__list`).appendChild(liRef)
        })
    } else if (role === `admin`) {
        navObject[2].forEach(link => {
            const liRef = document.createElement(`li`)
            liRef.classList.add(`nav-menu__list-item`)

            const aRef = document.createElement(`a`)
            aRef.href = link.href
            aRef.textContent = link.text
            aRef.classList.add(`nav-menu__list-link`)
            liRef.appendChild(aRef)

            document.querySelector(`.nav-menu__list`).appendChild(liRef)
        })
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
    h2Ref.textContent = `Din Beställnin`;
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
    btnRef.addEventListener(`click`, () => { statusPageUpdate(), window.location.href = `status.html` });
    formRef.appendChild(btnRef);
    renderShoppingCart();
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

export {
    renderNavLinks,
    renderShoppingModal,
    renderShoppingCart,
};

