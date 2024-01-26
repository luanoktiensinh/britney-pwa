import { gql } from '@apollo/client';

export const ADD_TO_WISHLIST = gql`
    mutation AddProductToWishlistFromGallery(
        $wishlistId: ID!
        $itemOptions: WishlistItemInput!
    ) {
        addProductsToWishlist(
            wishlistId: $wishlistId
            wishlistItems: [$itemOptions]
        ) {
            user_errors {
                code
                message
            }
          wishlist {
            id
            items_v2 {
              items {
                id
                product {
                    sku
                    uid
                }
              }
            }
          }
        }
    }
`;


export default {
    addProductToWishlistMutation: ADD_TO_WISHLIST
};
