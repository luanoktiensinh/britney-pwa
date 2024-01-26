import React, { useEffect, useMemo } from 'react';
import { Trash2 } from 'react-feather';
import { useIntl } from 'react-intl';
import { useToasts } from '@magento/peregrine';
import { useWishlistItem } from '@magento/peregrine/lib/talons/WishlistPage/useWishlistItem';

import { useStyle } from '@magento/venia-ui/lib/classify';
import Icon from '@magento/venia-ui/lib/components/Icon';
import Image from '@magento/venia-ui/lib/components/Image';
import Price from '@magento/venia-ui/lib/components/Price';

import defaultClasses from '@magento/venia-ui/lib/components/WishlistPage/wishlistItem.module.css';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

const WishlistItem = props => {
    const { item } = props;

    const { configurable_options: configurableOptions = [], product } = item;
    const {
        name,
        price_range: priceRange,
        stock_status: stockStatus
    } = product;
    const { maximum_price: maximumPrice } = priceRange;
    const { final_price: finalPrice } = maximumPrice;
    const { currency, value: unitPrice } = finalPrice;

    const talonProps = useWishlistItem(props);
    const {
        addToCartButtonProps,
        handleRemoveProductFromWishlist,
        hasError,
        isRemovalInProgress,
        isSupportedProductType
    } = talonProps;

    const { formatMessage } = useIntl();
    const [, { addToast }] = useToasts();

    useEffect(() => {
        if (hasError) {
            addToast({
                type: 'error',
                message: formatMessage({
                    id: 'wishlistItem.addToCartError',
                    defaultMessage:
                        'Something went wrong. Please refresh and try again.'
                }),
                timeout: 5000
            });
        }
    }, [addToast, formatMessage, hasError]);

    const classes = useStyle(defaultClasses, props.classes);

    const optionElements = useMemo(() => {
        return configurableOptions.map(option => {
            const {
                id,
                option_label: optionLabel,
                value_label: valueLabel
            } = option;

            const optionString = `${optionLabel} : ${valueLabel}`;

            return (
                <span className={classes.option} key={id}>
                    {optionString}
                </span>
            );
        });
    }, [classes.option, configurableOptions]);

    const imageProps = {
        classes: {
            image:
                stockStatus === 'OUT_OF_STOCK'
                    ? classes.image_disabled
                    : classes.image
        },
        ...talonProps.imageProps
    };

    const removeProductAriaLabel = formatMessage({
        id: 'wishlistItem.removeAriaLabel',
        defaultMessage: 'Remove Product from wishlist'
    });

    const rootClass = isRemovalInProgress
        ? classes.root_disabled
        : classes.root;

    const addToCart = isSupportedProductType ? (
        <button
            className={classes.addToCart}
            {...addToCartButtonProps}
            data-cy="wishlistItem-addToCart"
        >
            {formatMessage({
                id: 'wishlistItem.addToCart',
                defaultMessage: 'Add to Cart'
            })}
        </button>
    ) : null;
    const productUrl = product.url_key + product.url_suffix;
    return (
        <div className={rootClass} data-cy="wishlistItem-root">
            <Link to={productUrl}>
                <Image {...imageProps} />
            </Link>
            <div className={classes.actionWrap}>
                <Link to={productUrl}>
                    <span
                        className={classes.name}
                        data-cy="wishlistItem-productName"
                    >
                        {name}
                    </span>{' '}
                </Link>
                <button
                    className={classNames(classes.deleteItem, 'translate-y-1')}
                    onClick={handleRemoveProductFromWishlist}
                    aria-label={removeProductAriaLabel}
                    data-cy="wishlistItem-deleteItem"
                >
                    <Icon size={16} src={Trash2} />
                </button>
            </div>
            <div
                className={classes.priceContainer}
                data-cy="wishlistItem-priceContainer"
            >
                <Price currencyCode={currency} value={unitPrice} />
            </div>
            {optionElements}
            {addToCart}
        </div>
    );
};

export default WishlistItem;
