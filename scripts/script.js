// document.querySelector(`.NAV_SHOPPING_CART`).addEventListener(`click`, openShoppingCart)
// document.querySelectorAll(`.ADD-BUTTON_DRINK_MENU`).forEach(item => item.addEventListener(`click`, changeCartValue))

function openShoppingCart() {
    const modalRef = document.querySelector(`.shopping`)
    if (modalRef.open) {
        modalRef.open = false;
    } else {
        modalRef.open = true;
    }
}