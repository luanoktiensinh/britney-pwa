import React, { useEffect, useMemo, Fragment, Suspense, useState, useRef } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { arrayOf, bool, number, shape, string } from 'prop-types';
import { Form } from 'informed';
import { Info } from 'react-feather';

import { useProductFullDetail } from '@magento/peregrine/lib/talons/ProductFullDetail/useProductFullDetail';
import { isProductConfigurable } from '@magento/peregrine/lib/util/isProductConfigurable';

import { useStyle } from '@magento/venia-ui/lib/classify';
import Breadcrumbs from '@magento/venia-ui/lib/components/Breadcrumbs';
import Button from '@magento/venia-ui/lib/components/Button';
import Carousel from '@magento/venia-ui/lib/components/ProductImageCarousel';
import FormError from '@magento/venia-ui/lib/components/FormError';
import QuantityStepper from '@magento/venia-ui/lib/components/QuantityStepper';
import RichContent from '@magento/venia-ui/lib/components/RichContent/richContent';
import { ProductOptionsShimmer } from '@magento/venia-ui/lib/components/ProductOptions';
import CustomAttributes from '@magento/venia-ui/lib/components/ProductFullDetail/CustomAttributes';
import defaultClasses from '@magento/venia-ui/lib/components/ProductFullDetail/productFullDetail.module.css';
import overrideClasses from 'src/styles/ProductFullDetail/productFullDetail.module.css'
import RatingReview from '../ProductDetailPage/ratingReview';
import { useRatingReview }  from '../ProductDetailPage/useRatingReview';
import StarIcons from '../Gallery/starIcons';
import './rating-review.scss';
import PriceContent from '../Gallery/priceContent';
import ProductCarousel from '../carouselSlider/productCarousel';
import BadgeLabel from '../Gallery/badgeLabel';

const WishlistButton = React.lazy(() => import('@magento/venia-ui/lib/components/Wishlist/AddToListButton'));
const Options = React.lazy(() => import('@magento/venia-ui/lib/components/ProductOptions'));

// Correlate a GQL error message to a field. GQL could return a longer error
// string but it may contain contextual info such as product id. We can use
// parts of the string to check for which field to apply the error.
const ERROR_MESSAGE_TO_FIELD_MAPPING = {
    'The requested qty is not available': 'quantity',
    'Product that you are trying to add is not available.': 'quantity',
    "The product that was requested doesn't exist.": 'quantity'
};

// Field level error messages for rendering.
const ERROR_FIELD_TO_MESSAGE_MAPPING = {
    quantity: 'The requested quantity is not available.'
};

const ProductFullDetail = props => {
    const ratingReviewRef = useRef();
    const pdpDescriptionRef = useRef();
    const pdpDetailRef = useRef();
    const ratingFormRef = useRef();
    const { product } = props;

    const talonProps = useProductFullDetail({ product });

    const {
        breadcrumbCategoryId,
        errorMessage,
        handleAddToCart,
        handleSelectionChange,
        isOutOfStock,
        isEverythingOutOfStock,
        outOfStockVariants,
        isAddToCartDisabled,
        isSupportedProductType,
        mediaGalleryEntries,
        productDetails,
        customAttributes,
        wishlistButtonProps,
        defaultOptionSelectionWithLabel,
        productPrice
    } = talonProps;
    const {
        productRatingReview
    } = useRatingReview({productDetail: productDetails});
    const getDefaultImages = () => {
        let result = [];
        const fields = ['image', 'small_image', 'thumbnail', 'swatch_image'];
        let field;
        let data;
        for(field of fields) {
            data = product[field];
            if(data && !data?.disabled) {
                data = typeof data === 'string' ? { url: data } : data;
                result = [{
                    file: data.url,
                    label: data.label || product.name,
                    media_type: 'image',
                    uid: 'default'
                }];
                break;
            }
        }
        return result;
    }

    const _mediaGalleryEntries = mediaGalleryEntries?.length ? mediaGalleryEntries : getDefaultImages();
    const getNumberReview = () => {
        return productRatingReview?.products?.items[0]?.review_count ? productRatingReview?.products?.items[0]?.review_count : 0;
    }

    const getRatingSummary = () => {
        return productRatingReview?.products?.items[0]?.rating_summary ? productRatingReview?.products?.items[0]?.rating_summary : 0;
    }

    const displayNumberReviews = () => {
        if(getNumberReview()) {
            return (
                <span>({getNumberReview()})</span>
            )
        } else {
            return (
                <span></span>
            )
        }
    }

    const [activeTab, setActiveTab] = useState("pdp-description");
    const handleChangeTab = (elemId, elemRef = undefined, evt = undefined) => {
        evt && evt.preventDefault();
        setActiveTab(elemId);
        window.history.pushState(null, null, '#' + elemId);
        if (elemRef && elemRef.current) {
            setTimeout(() => {
                elemRef.current?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                    inline: 'center'
                });
            }, 200)
        }
    }

    const [isFirstLoadActiveTab, setIsFirstLoadActiveTab] = useState(true);
    useEffect(() => {
        if (isFirstLoadActiveTab) {
            const locationHash = window.location.hash;
            if(locationHash && ["pdp-description", "pdp-detail", "pdp-rating-review"].indexOf(locationHash)) {
                handleChangeTab(locationHash.replace("#", ""));
            }
            setIsFirstLoadActiveTab(false);
        }
    });

    const displayRatingSummary = () => {
        if(getNumberReview()) {
            return (
                <div className='pdp-rating-review__summary'>
                    <StarIcons className="pdp-rating-review__summary--rating" ratingSummary={getRatingSummary()}></StarIcons>
                    <div className='pdp-rating-review__summary--action pdp-rating-review__summary--total-review' onClick={(evt) => {handleChangeTab("pdp-rating-review", ratingReviewRef, evt)}}>
                        <a href="#pdp-rating-review">{getNumberReview()} Reviews</a>
                    </div>
                    <div className='pdp-rating-review__summary--action'>
                        <a href="#pdp-rating-review" className="productFullDetail-infor__tab" onClick={(evt) => {handleChangeTab("pdp-rating-review", ratingFormRef, evt)}}>Add review</a>
                    </div>
                </div>
            )
        } else {
            return (
                <div className='pdp-rating-review__summary'>
                    <div className="pdp-rating-review__summary--action" onClick={(evt) => {handleChangeTab("pdp-rating-review", ratingReviewRef, evt)}}>
                        <a href="#pdp-rating-review">Be the first to review this product</a>
                    </div>
                </div>
            )
        }
    }

    const { formatMessage } = useIntl();

    const classes = useStyle(defaultClasses, props.classes, overrideClasses);
    const optionsDefaultSelectedValue = useMemo(() => (
        Array.from(defaultOptionSelectionWithLabel).map(([id, value_label]) => ({id, value_label}))
    ), [defaultOptionSelectionWithLabel]);
    const options = isProductConfigurable(product) ? (
        <Suspense fallback={<ProductOptionsShimmer />}>
            <Options
                onSelectionChange={handleSelectionChange}
                options={product.configurable_options}
                isEverythingOutOfStock={isEverythingOutOfStock}
                outOfStockVariants={outOfStockVariants}
                selectedValues={optionsDefaultSelectedValue}
            />
        </Suspense>
    ) : null;

    const breadcrumbs = breadcrumbCategoryId ? (
        <Breadcrumbs
            categoryId={breadcrumbCategoryId}
            currentProduct={productDetails.name}
        />
    ) : null;

    // Fill a map with field/section -> error.
    const errors = new Map();
    if (errorMessage) {
        Object.keys(ERROR_MESSAGE_TO_FIELD_MAPPING).forEach(key => {
            if (errorMessage.includes(key)) {
                const target = ERROR_MESSAGE_TO_FIELD_MAPPING[key];
                const message = ERROR_FIELD_TO_MESSAGE_MAPPING[target];
                errors.set(target, message);
            }
        });

        // Handle cases where a user token is invalid or expired. Preferably
        // this would be handled elsewhere with an error code and not a string.
        if (errorMessage.includes('The current user cannot')) {
            errors.set('form', [
                new Error(
                    formatMessage({
                        id: 'productFullDetail.errorToken',
                        defaultMessage:
                            'There was a problem with your cart. Please sign in again and try adding the item once more.'
                    })
                )
            ]);
        }

        // Handle cases where a cart wasn't created properly.
        if (
            errorMessage.includes('Variable "$cartId" got invalid value null')
        ) {
            errors.set('form', [
                new Error(
                    formatMessage({
                        id: 'productFullDetail.errorCart',
                        defaultMessage:
                            'There was a problem with your cart. Please refresh the page and try adding the item once more.'
                    })
                )
            ]);
        }

        // An unknown error should still present a readable message.
        if (!errors.size) {
            errors.set('form', [
                new Error(
                    formatMessage({
                        id: 'productFullDetail.errorUnknown',
                        defaultMessage:
                            'Could not add item to cart. Please check required options and try again.'
                    })
                )
            ]);
        }
    }

    const customAttributesDetails = useMemo(() => {
        const list = [];
        const pagebuilder = [];
        const skuAttribute = {
            attribute_metadata: {
                uid: 'attribute_sku',
                used_in_components: ['PRODUCT_DETAILS_PAGE'],
                ui_input: {
                    ui_input_type: 'TEXT'
                },
                label: formatMessage({
                    id: 'global.sku',
                    defaultMessage: 'SKU'
                })
            },
            entered_attribute_value: {
                value: productDetails.sku
            }
        };
        if (Array.isArray(customAttributes)) {
            customAttributes.forEach(customAttribute => {
                if (
                    customAttribute.attribute_metadata.ui_input
                        .ui_input_type === 'PAGEBUILDER'
                ) {
                    pagebuilder.push(customAttribute);
                } else {
                    list.push(customAttribute);
                }
            });
        }
        list.unshift(skuAttribute);
        return {
            list: list,
            pagebuilder: pagebuilder
        };
    }, [customAttributes, productDetails.sku, formatMessage]);

    const cartCallToActionText =
        !isEverythingOutOfStock || !isOutOfStock ? (
            <FormattedMessage
                id="productFullDetail.addItemToCart"
                defaultMessage="Add to Cart"
            />
        ) : (
            <FormattedMessage
                id="productFullDetail.itemOutOfStock"
                defaultMessage="Out of Stock"
            />
        );
    // Error message for screen reader
    const cartActionContent = isSupportedProductType ? (
        <section className={classes.actButton}>
            <Button
                data-cy="ProductFullDetail-addToCartButton"
                disabled={isAddToCartDisabled}
                aria-disabled={isAddToCartDisabled}
                aria-label={
                    isEverythingOutOfStock
                        ? formatMessage({
                              id: 'productFullDetail.outOfStockProduct',
                              defaultMessage:
                                  'This item is currently out of stock'
                          })
                        : ''
                }
                priority="high"
                type="submit"
            >
                {cartCallToActionText}
            </Button>
        </section>
    ) : (
        <div className={classes.unavailableContainer}>
            <Info />
            <p>
                <FormattedMessage
                    id={'productFullDetail.unavailableProduct'}
                    defaultMessage={
                        'This product is currently unavailable for purchase.'
                    }
                />
            </p>
        </div>
    );

    const shortDescription = productDetails.shortDescription ? (
        <RichContent html={productDetails.shortDescription.html} />
    ) : null;

    const pageBuilderAttributes = customAttributesDetails.pagebuilder.length ? (
        <section className={classes.detailsPageBuilder}>
            <CustomAttributes
                classes={{ list: classes.detailsPageBuilderList }}
                customAttributes={customAttributesDetails.pagebuilder}
                showLabels={false}
            />
        </section>
    ) : null;

    const carouselSettings = {
        arrows: true,
        dots: true,
        autoplay: false,
        draggable: true,
        centerPadding: "40px"
    };

    const productCarouselsContent = useMemo(() => {
        return (
            <Fragment>
                {
                    // related product carousel
                    product.related_products?.length ?
                        <div className={classes.carouselContainer}>
                            <div className={classes.carouselTitle}>
                                <FormattedMessage
                                    id={'productFullDetail.carouselRelatedProductsTitle'}
                                    defaultMessage={
                                        'Related Products'
                                    }
                                />
                            </div>
                            <ProductCarousel {...carouselSettings} productList={product.related_products}></ProductCarousel>
                        </div>
                        : ""
                }
                {
                    // cross-sell product carousel
                    product.crosssell_products?.length ?
                        <div className={classes.carouselContainer}>
                            <div className={classes.carouselTitle}>
                                <FormattedMessage
                                    id={'productFullDetail.carouselCrossSellProductsTitle'}
                                    defaultMessage={
                                        'Cross-Sell Products'
                                    }
                                />
                            </div>
                            <ProductCarousel {...carouselSettings} productList={product.crosssell_products}></ProductCarousel>
                        </div>
                        : ""
                }
                {
                    // up-sell product carousel
                    product.upsell_products?.length ?
                        <div className={classes.carouselContainer}>
                            <div className={classes.carouselTitle}>
                                <FormattedMessage
                                    id={'productFullDetail.carouselUpSellProductsTitle'}
                                    defaultMessage={
                                        'Up-Sell Products'
                                    }
                                />
                            </div>
                            <ProductCarousel {...carouselSettings} productList={product.upsell_products}></ProductCarousel>
                        </div>
                        : ""
                }
            </Fragment>
        )
    }, [product, classes]);

    return (
        <Fragment>
            {breadcrumbs}
            <div
                className={classes.root}
                data-cy="ProductFullDetail-root"
            >
                <section className={classes.imageCarousel}>
                    <Carousel images={_mediaGalleryEntries}>
                        <BadgeLabel productDetail={product} className={classes.labelWrapper}></BadgeLabel>
                    </Carousel>
                </section>
                <section className="border-solid border-subtle border-t-0 border-r-0 border-b border-l-0 my-0 mx-sm px-0 py-xs leading-normal px-sm py-xs">
                    <h1
                        aria-live="polite"
                        className={classes.productName}
                        data-cy="ProductFullDetail-productName"
                    >
                        {productDetails.name}
                    </h1>
                    {displayRatingSummary()}
                    <div
                        data-cy="ProductFullDetail-productPrice"
                        className="my-2 text-sm lg_text-base"
                    >
                        <PriceContent productDetail={product} productPrice={productPrice} isPDP={true}></PriceContent>
                    </div>
                    {shortDescription}
                </section>
                <Form onSubmit={handleAddToCart}>
                    <FormError
                        classes={{
                            root: classes.formErrors
                        }}
                        errors={errors.get('form') || []}
                    />
                    <section className={classes.options}>{options}</section>
                    <section className={classes.quantity}>
                        <span
                            data-cy="ProductFullDetail-quantityTitle"
                            className={classes.quantityTitle}
                        >
                            <FormattedMessage
                                id={'global.quantity'}
                                defaultMessage={'Quantity'}
                            />
                        </span>
                        <QuantityStepper
                            classes={{ root: classes.quantityRoot }}
                            min={1}
                            message={errors.get('quantity')}
                        />
                    </section>
                    <section className={classes.actions}>
                        {cartActionContent}
                        <Suspense fallback={null}>
                            <WishlistButton {...wishlistButtonProps} />
                        </Suspense>
                    </section>
                    {pageBuilderAttributes}
                </Form>
            </div>
            <div className={[classes.root, "productFullDetail-infor"].join(" ")}>
                <section className="productFullDetail-infor__container">
                    <a onClick={(evt) => {handleChangeTab("pdp-description", null, evt)}} className={`productFullDetail-infor__tab ${activeTab === 'pdp-description' ? 'active' : ''}`} href="#pdp-description">
                        <span className='productFullDetail-infor__tab-content'>Details</span>
                        <span className='arrow down'></span>
                    </a>
                    <section ref={pdpDescriptionRef} className={`${classes.description} productFullDetail-infor__section ${activeTab === 'pdp-description' ? '' : 'hidden'}`} id='pdp-description'>
                        <span
                            data-cy="ProductFullDetail-descriptionTitle"
                            className={classes.descriptionTitle}
                        >
                            <FormattedMessage
                                id={'productFullDetail.description'}
                                defaultMessage={'Description'}
                            />
                        </span>
                        <RichContent html={productDetails.description} />
                    </section>
                    <a onClick={(evt) => {handleChangeTab("pdp-detail", null, evt)}} className={`productFullDetail-infor__tab ${activeTab === 'pdp-detail' ? 'active' : ''}`} href="#pdp-detail">
                        <span className='productFullDetail-infor__tab-content'>More Information</span>
                        <span className='arrow down'></span>
                    </a>
                    <section ref={pdpDetailRef} className={`${classes.details} productFullDetail-infor__section ${activeTab === 'pdp-detail' ? '' : 'hidden'}`} id="pdp-detail">
                        <span
                            data-cy="ProductFullDetail-detailsTitle"
                            className={classes.detailsTitle}
                        >
                            <FormattedMessage
                                id={'productFullDetail.details'}
                                defaultMessage={'Details'}
                            />
                        </span>
                        <CustomAttributes
                            customAttributes={customAttributesDetails.list}
                        />
                    </section>
                    <a onClick={(evt) => {handleChangeTab("pdp-rating-review", null, evt)}} className={`productFullDetail-infor__tab ${activeTab === 'pdp-rating-review' ? 'active' : ''}`} href="#pdp-rating-review">
                        <span className='productFullDetail-infor__tab-content'>Reviews {displayNumberReviews()}</span>
                        <span className='arrow down'></span>
                    </a>
                    <section ref={ratingReviewRef} className={`productFullDetail-infor__section pdp-rating-review ${activeTab === 'pdp-rating-review' ? '' : 'hidden'}`} id='pdp-rating-review'>
                        <div className='pdp-rating-review__title'>
                            <FormattedMessage
                                id={'ratingReview.title'}
                                defaultMessage={'Customer Reviews'}
                            />
                        </div>
                        <RatingReview formRef={ratingFormRef} productDetail={productDetails} productRatingReview={productRatingReview?.products?.items[0]}></RatingReview>
                    </section>
                </section>
            </div>
            <div
                className="mx-4 mb-8"
                data-cy="ProductFullDetail-carousel"
            >
                {productCarouselsContent}
            </div>
        </Fragment>
    );
};

ProductFullDetail.propTypes = {
    classes: shape({
        cartActions: string,
        description: string,
        descriptionTitle: string,
        details: string,
        detailsPageBuilder: string,
        detailsPageBuilderList: string,
        detailsTitle: string,
        imageCarousel: string,
        options: string,
        productName: string,
        productPrice: string,
        quantity: string,
        quantityTitle: string,
        quantityRoot: string,
        root: string,
        title: string,
        unavailableContainer: string
    }),
    product: shape({
        __typename: string,
        id: number,
        stock_status: string,
        sku: string.isRequired,
        price: shape({
            regularPrice: shape({
                amount: shape({
                    currency: string.isRequired,
                    value: number.isRequired
                })
            }).isRequired
        }).isRequired,
        media_gallery_entries: arrayOf(
            shape({
                uid: string,
                label: string,
                position: number,
                disabled: bool,
                file: string.isRequired
            })
        ),
        description: string,
        short_description: shape({
            html: string,
            __typename: string
        })
    }).isRequired
};

export default ProductFullDetail;
