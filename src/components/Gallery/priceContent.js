import React, { Fragment } from 'react';
import { any, string, shape, number } from 'prop-types';
import { FormattedMessage } from 'react-intl';
import Price from '@magento/venia-ui/lib/components/Price';
import { useStyle } from '@magento/venia-ui/lib/classify.js';
import defaultClasses from 'src/styles/Gallery/item.module.css';

const PriceContent = props => {
    const { productDetail, productPrice } = props;
    const { __typename: productType } = productDetail;

    const {
        final_price: maximumFinalPrice, 
        regular_price: maximumRegularPrice,
        discount: maximumDiscountPrice,
    } = productPrice || productDetail?.price_range?.maximum_price || {};

    const classes = useStyle(defaultClasses, props.classes);

    const priceSource = maximumFinalPrice || maximumRegularPrice;

    const isSaleOf = maximumDiscountPrice && maximumDiscountPrice.amount_off > 0 && maximumFinalPrice && maximumRegularPrice; 
    
    const isSimplePrice = !isSaleOf && productType === 'SimpleProduct';

    const regularPrice = (
        <Price
            value={maximumRegularPrice.value}
            currencyCode={maximumRegularPrice.currency}
        />
    );
    
    const specialPrice = (
        <Price
            value={priceSource.value}
            currencyCode={priceSource.currency}
        />
    );
    
    const simplePrice = (
        <Price
            value={priceSource.value}
            currencyCode={priceSource.currency}
        />
    );

    return isSaleOf ? (
        <Fragment>
            <div className={productPrice ? classes.finalPricePdp : classes.finalPrice}>           
                <span>
                    <FormattedMessage
                        id={'galleryItem.specialPrice'}
                        defaultMessage={'Special Price: '}
                    />
                </span>
                <strong className={classes.boldPrice}>
                    {specialPrice}
                </strong>
            </div>
            <div className={productPrice ? classes.regularPricePdp : classes.regularPrice}>
                <span>
                    <FormattedMessage
                        id={'galleryItem.regularPrice'}
                        defaultMessage={'Regular Price: '}
                    />
                </span>
                <span className='ml-1'>
                    {regularPrice}
                </span>
            </div>
        </Fragment>
    ) : (
        <Fragment>
            <div className={productPrice ? classes.simplePricePdp : classes.simplePrice}>
                {
                    isSimplePrice ? 
                        "" :
                        <FormattedMessage
                            id={'galleryItem.asLowAsPrice'}
                            defaultMessage={'Price: '}
                        />
                }
                <strong className={classes.boldPrice}>
                    {simplePrice}
                </strong>
            </div>
            <div className={productPrice ? classes.invisiblePricePdp : classes.invisiblePrice}>
                <span>
                    <FormattedMessage
                        id={'galleryItem.regularPrice'}
                        defaultMessage={'Regular Price: '}
                    />
                </span>
                <span className='ml-1'>
                    {regularPrice}
                </span>
            </div>
        </Fragment>
    );
};

export default PriceContent;

PriceContent.propTypes = {
    classes: shape({
        finalPrice: string,
        regularPrice: string,
        boldPrice: string,
        invisiblePrice: string
    }),
    productDetail: shape({
        __typename: string,
        price_range: shape({
            maximum_price: shape({
                final_price: shape({
                    currency: string,
                    value: number
                }),
                regular_price: shape({
                    currency: string,
                    value: number
                }),
                discount: shape({
                    amount_off: number
                })
            })
        }).isRequired
    })
};