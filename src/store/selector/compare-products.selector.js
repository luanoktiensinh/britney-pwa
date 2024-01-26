export const isProductSelected = uid => store => {
    return store.compare.products.some(product => product.uid == uid);
}