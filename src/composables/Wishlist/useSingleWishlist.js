import { useCallback, useMemo, useState } from 'react';
import { useIntl } from 'react-intl';
import { useMutation, useQuery } from '@apollo/client';

import { useUserContext } from '@magento/peregrine/lib/context/user';
import mergeOperations from '@magento/peregrine/lib/util/shallowMerge';

import defaultOperations from '@magento/peregrine/lib/talons/Wishlist/AddToListButton/addToListButton.gql';
import wishlistGql from 'src/queries/Wishlist/wishlist.gql';
import { REMOVE_PRODUCTS_FROM_WISHLIST } from '@magento/peregrine/lib/talons/WishlistPage/wishlistItem.gql';
import { useWishlist } from 'src/composables/Wishlist/useWishlist';
export const useSingleWishlist = props => {
    const { getItems } = useWishlist();
    const { afterAdd, beforeAdd, item } = props;
    const operations = mergeOperations(defaultOperations, props.operations, wishlistGql);
    const [ addAction, setAddAction ] = useState(false);
    const [
        addProductToWishlist,
        {
            data: addProductData,
            error: errorAddingProduct,
            loading: isAddingToWishlist
        }
    ] = useMutation(operations.addProductToWishlistMutation);
    const [
        removeProductToWishlist,
        {
            data: removeProductData,
            error: errorRemovingProduct,
            loading: isRemovingToWishlist
        }
    ] = useMutation(REMOVE_PRODUCTS_FROM_WISHLIST);

    const {
        client,
        data: { customerWishlistProducts }
    } = useQuery(operations.getProductsInWishlistsQuery);
    
    const itemInWishlist = useMemo(() => {
        return customerWishlistProducts[item.sku];
    }, [customerWishlistProducts, item]);
    const isSelected = useMemo(() => {
        return (
            itemInWishlist || isAddingToWishlist
        );
    }, [itemInWishlist, isAddingToWishlist, isRemovingToWishlist, item.sku]);

    const [showLoginToast, setShowLoginToast] = useState(0);

    const { formatMessage } = useIntl();
    const [{ isSignedIn }] = useUserContext();
    const handleClick = useCallback(async () => {
        if (!isSignedIn) {
            setShowLoginToast(current => ++current);
        } else {
            try {
                if (beforeAdd) {
                    await beforeAdd();
                }
                if(isSelected) {
                    if(itemInWishlist) {
                        setAddAction(false);
                        const { data } = await removeProductToWishlist({
                            variables: { wishlistId: itemInWishlist.wishlistId, wishlistItemsId: [itemInWishlist.itemId] }
                        }); 
                        if(data.removeProductsFromWishlist.wishlist.id === itemInWishlist.wishlistId) {
                            const _customerWishlistProducts = _.cloneDeep(customerWishlistProducts);
                            delete _customerWishlistProducts[itemInWishlist.sku];
                            client.writeQuery({
                                query: operations.getProductsInWishlistsQuery,
                                data: {
                                    customerWishlistProducts: _customerWishlistProducts
                                }
                            });
                        }
                    }
                }
                else {
                    setAddAction(true);
                    const { data } = await addProductToWishlist({
                        variables: { wishlistId: '0', itemOptions: item }
                    });
                    const items = getItems({customer: { wishlists: [data.addProductsToWishlist.wishlist] }}, customerWishlistProducts);
                    client.writeQuery({
                        query: operations.getProductsInWishlistsQuery,
                        data: {
                            customerWishlistProducts: items
                        }
                    });
                }

                if (afterAdd) {
                    afterAdd();
                }
            } catch (error) {
                console.error(error);
            }
        }
    }, [
        addProductToWishlist,
        afterAdd,
        beforeAdd,
        client,
        customerWishlistProducts,
        isSignedIn,
        item,
        itemInWishlist,
        operations.getProductsInWishlistsQuery
    ]);

    const loginToastProps = useMemo(() => {
        if (showLoginToast) {
            return {
                type: 'info',
                message: formatMessage({
                    id: 'wishlist.galleryButton.loginMessage',
                    defaultMessage:
                        'Please sign-in to your Account to save items for later.'
                }),
                timeout: 5000
            };
        }

        return null;
    }, [formatMessage, showLoginToast]);

    const successToastProps = useMemo(() => {
        if (removeProductData && !addAction) {
            return {
                type: 'success',
                message: formatMessage({
                    id: 'wishlist.galleryButton.successRemovedMessageGeneral',
                    defaultMessage:
                        'Item successfully removed from your favorites list.'
                }),
                timeout: 5000
            };
        }
        else if (addProductData && addAction) {
            return {
                type: 'success',
                message: formatMessage({
                    id: 'wishlist.galleryButton.successMessageGeneral',
                    defaultMessage:
                        'Item successfully added to your favorites list.'
                }),
                timeout: 5000
            };
        }

        return null;
    }, [addProductData, removeProductData, formatMessage]);

    const errorToastProps = useMemo(() => {
        if (errorAddingProduct && !addAction) {
            return {
                type: 'error',
                message: formatMessage({
                    id: 'wishlist.galleryButton.addError',
                    defaultMessage:
                        'Something went wrong adding the product to your wishlist.'
                }),
                timeout: 5000
            };
        }
        else if (errorRemovingProduct && addAction) {
            return {
                type: 'error',
                message: formatMessage({
                    id: 'wishlist.galleryButton.removeError',
                    defaultMessage:
                        'Something went wrong removing the product to your wishlist.'
                }),
                timeout: 5000
            };
        }

        return null;
    }, [errorAddingProduct, errorRemovingProduct, formatMessage]);

    const buttonProps = useMemo(
        () => ({
            'aria-label': formatMessage({
                id: 'wishlistButton.addText',
                defaultMessage: 'Add to Favorites'
            }),
            onPress: handleClick,
            type: 'button'
        }),
        [formatMessage, handleClick, isSelected]
    );

    return {
        buttonProps,
        buttonText: props.buttonText && props.buttonText(isSelected),
        customerWishlistProducts,
        errorToastProps,
        handleClick,
        isSelected,
        loginToastProps,
        successToastProps
    };
};
