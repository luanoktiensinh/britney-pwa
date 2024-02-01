import React, { Fragment, useMemo } from 'react';
import { FormattedMessage } from 'react-intl';
import { Info } from 'react-feather';
import { string, number, shape } from 'prop-types';
import { Link } from 'react-router-dom';
import { UNCONSTRAINED_SIZE_KEY } from '@magento/peregrine/lib/talons/Image/useImage';
import { useGalleryItem } from '@magento/peregrine/lib/talons/Gallery/useGalleryItem';
import resourceUrl from '@magento/peregrine/lib/util/makeUrl';

import { useStyle } from '@magento/venia-ui/lib/classify.js';
import Image from '@magento/venia-ui/lib/components/Image';
import GalleryItemShimmer from '@magento/venia-ui/lib/components/Gallery/item.shimmer.js';
import defaultClasses from '@magento/venia-ui/lib/components/Gallery/item.module.css';
import overrideClasses from 'src/styles/Gallery/item.module.css';
import WishlistGalleryButton from '@magento/venia-ui/lib/components/Wishlist/AddToListButton';
import addToListButtonClasses from 'src/styles/Gallery/addToListButton.module.css';
import CompareGalleryButton from './compareGalleryButton';
import AddToCartButton from '@magento/venia-ui/lib/components/Gallery/addToCartButton';
import StarIcons from './starIcons';
import PriceContent from './priceContent';
import BadgeLabel from './badgeLabel';
// eslint-disable-next-line no-unused-vars
// import Rating from '@magento/venia-ui/lib/components/Rating';
// The placeholder image is 4:5, so we should make sure to size our product
// images appropriately.
const IMAGE_WIDTH = 300;
const IMAGE_HEIGHT = 375;

// Gallery switches from two columns to three at 640px.
const IMAGE_WIDTHS = new Map()
    .set(640, IMAGE_WIDTH)
    .set(UNCONSTRAINED_SIZE_KEY, 840);

const GalleryItem = props => {
    const {
        handleLinkClick,
        item,
        itemRef,
        wishlistButtonProps,
        isSupportedProductType
    } = useGalleryItem(props);
    const _wishlistButtonProps = wishlistButtonProps ? {...wishlistButtonProps, classes: addToListButtonClasses} : wishlistButtonProps;
    const { storeConfig, productContentType } = props;

    const productUrlSuffix = storeConfig && storeConfig.product_url_suffix;

    const classes = useStyle(defaultClasses, props.classes, overrideClasses);
    if (!item) {
        return <GalleryItemShimmer classes={classes} />;
    }

    // eslint-disable-next-line no-unused-vars
    const { name, price_range, small_image, url_key, rating_summary } = item;

    const { url: smallImageURL } = small_image;
    const productLink = resourceUrl(`/${url_key}${productUrlSuffix || ''}`);
    const wishlistButton = _wishlistButtonProps ? (
        <WishlistGalleryButton {..._wishlistButtonProps} />
    ) : null;
    const compareButton = _wishlistButtonProps ? (
        <CompareGalleryButton {..._wishlistButtonProps} itemUid={item.uid} itemId={item.id} />
    ) : null;
    const addButton = isSupportedProductType ? (
        <AddToCartButton item={item} urlSuffix={productUrlSuffix} />
    ) : (
        <div className={classes.unavailableContainer}>
            <Info />
            <p>
                <FormattedMessage
                    id={'galleryItem.unavailableProduct'}
                    defaultMessage={'Currently unavailable for purchase.'}
                />
            </p>
        </div>
    );

    // fallback to regular price when final price is unavailable
    // Hide the Rating component until it is updated with the new look and feel (PWA-2512).
    const ratingAverage = null;
    // const ratingAverage = rating_summary ? (
    //     <Rating rating={rating_summary} />
    // ) : null;

    const getBadgeLabelClass = useMemo(() => {
        let className = classes.labelWrapper;
        if(productContentType === "plp") {
            className += " " + classes.labelWrapperPlp;
        } else if (productContentType === "pdp-product-carousel") {
            className += " " + classes.labelWrapperPdpProductCarousel;
        }
        return className;
    }, [productContentType]);

    return (
        <div data-cy="GalleryItem-root" className={classes.root} ref={itemRef}>
            <Link
                aria-label={name}
                onClick={handleLinkClick}
                to={productLink}
                className={classes.images}
            >
                <BadgeLabel productDetail={item} className={getBadgeLabelClass}></BadgeLabel>
                <Image
                    alt={name}
                    classes={{
                        image: classes.image,
                        loaded: classes.imageLoaded,
                        notLoaded: classes.imageNotLoaded,
                        root: classes.imageContainer
                    }}
                    height={IMAGE_HEIGHT}
                    resource={smallImageURL}
                    widths={IMAGE_WIDTHS}
                />
                {ratingAverage}
            </Link>
            <Link
                onClick={handleLinkClick}
                to={productLink}
                className={classes.name}
                data-cy="GalleryItem-name"
            >
                <span>{name}</span>
            </Link>
            <StarIcons ratingSummary={rating_summary} className={classes.starIcons}></StarIcons>
            <div data-cy="GalleryItem-price" className={classes.price}>
                <PriceContent productDetail={item}></PriceContent>
            </div>

            <div className={classes.actionsContainer}>
                {' '}
                {addButton}
                {wishlistButton}
                {compareButton}
            </div>
        </div>
    );
};

GalleryItem.propTypes = {
    classes: shape({
        image: string,
        imageLoaded: string,
        imageNotLoaded: string,
        imageContainer: string,
        images: string,
        name: string,
        price: string,
        root: string
    }),
    item: shape({
        id: number.isRequired,
        uid: string.isRequired,
        name: string.isRequired,
        small_image: shape({
            url: string.isRequired
        }),
        stock_status: string.isRequired,
        __typename: string.isRequired,
        url_key: string.isRequired,
        sku: string.isRequired,
        price_range: shape({
            maximum_price: shape({
                final_price: shape({
                    value: number.isRequired,
                    currency: string.isRequired
                }),
                regular_price: shape({
                    value: number.isRequired,
                    currency: string.isRequired
                }).isRequired,
                discount: shape({
                    amount_off: number.isRequired
                }).isRequired
            }).isRequired
        }).isRequired
    }),
    storeConfig: shape({
        magento_wishlist_general_is_enabled: string.isRequired,
        product_url_suffix: string
    })
};

export default GalleryItem;