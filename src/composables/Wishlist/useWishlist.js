import _ from "lodash";
export const useWishlist = () => {
    function getItems(data, defaultData = {}) {
        const itemsToAdd = _.cloneDeep(defaultData);
        const wishlists = data.customer.wishlists;
        wishlists.map(wishlist => {
            const wishlistId = wishlist.id;
            const items = wishlist.items_v2.items;
            items.map(item => {
                const sku = item.product.sku;
                if(!itemsToAdd[sku] || itemsToAdd[sku].wishlist !== wishlistId) {
                    itemsToAdd[sku] = {
                        wishlistId,
                        sku,
                        itemId: item.id
                    };
                }
            });
        });
        return itemsToAdd;
    }
    return {
        getItems
    }
}