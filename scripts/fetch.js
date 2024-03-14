async function fetchProducts() {
    try {
        const response = await fetch('https://santosnr6.github.io/Data/airbeanproducts.json');
        const products = await response.json();

        return products;
    } catch(error) {
        console.log(error);
        return [];
    }
}

export {
    fetchProducts,
}