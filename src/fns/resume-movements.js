function getProductsFromInventory(inventoryMovement) {
    const productsMap = {};

    // Processa cada movimento de inventário
    inventoryMovement.forEach(movement => {
        const { productId, quantity, type, product } = movement;

        // Inicializa o produto no mapa se ainda não estiver presente
        if (!productsMap[productId]) {
            productsMap[productId] = { name: product.name, quantity: 0 };
        }

        // Ajusta a quantidade com base no tipo de movimento ('in' ou 'out')
        const quantityChange = type === "in" ? quantity : -quantity;
        productsMap[productId].quantity += quantityChange;
    });

    // Converte o mapa em uma lista de produtos
    const products = Object.values(productsMap);

    return { products };
}

module.exports = getProductsFromInventory