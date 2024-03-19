async function fetchProducts() {
    try {
        const response = await fetch('https://santosnr6.github.io/Data/airbeanproducts.json');
        const products = await response.json();

        return products;
    } catch (error) {
        console.log(error);
        return [];
    }
}

async function fetchUsers() {
    try {
        const response = await fetch('https://santosnr6.github.io/Data/airbeanusers.json');
        const users = await response.json();

        return users;
    } catch (error) {
        console.log(error);
        return [];
    }
}

export {
    fetchProducts,
    fetchUsers,
}