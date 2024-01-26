import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { useUserContext } from '@magento/peregrine/lib/context/user';
import mergeOperations from '@magento/peregrine/lib/util/shallowMerge';
import defaultOperations from '@magento/peregrine/lib/hooks/useCustomerWishlistSkus/customerWishlist.gql.ee';
import { useWishlist } from 'src/composables/Wishlist/useWishlist';
/**
 * A hook that queries for products in a customer's wishlists and maintains a
 * list of skus in a local cache entry.
 *
 * @param {DocumentNode} props.operations operations used to prepare the local customer wishlist array
 * @returns {undefined}
 */
export const useCustomerWishlistSkus = (props = {}) => {
    const { getItems } = useWishlist();
    const operations = mergeOperations(defaultOperations, props.operations);
    const [{ isSignedIn }] = useUserContext();

    const [currentPage, setCurrentPage] = useState(1);

    const {
        client,
        data: { customerWishlistProducts }
    } = useQuery(operations.getProductsInWishlistsQuery);
    useQuery(operations.getWishlistItemsQuery, {
        fetchPolicy: 'cache-and-network',
        onCompleted: data => {
            const itemsToAdd = getItems(data, customerWishlistProducts);
            console.log(data, itemsToAdd);
            let shouldFetchMore = false;
            const wishlists = data.customer.wishlists;
            wishlists.map(wishlist => {
                const pageInfo = wishlist.items_v2.page_info;

                if (pageInfo.total_pages > pageInfo.current_page) {
                    shouldFetchMore = true;
                }
            });

            client.writeQuery({
                query: operations.getProductsInWishlistsQuery,
                data: {
                    customerWishlistProducts: itemsToAdd
                }
            });

            if (shouldFetchMore) {
                setCurrentPage(current => ++current);
            }
        },
        skip: !isSignedIn,
        variables: {
            currentPage
        }
    });
};
