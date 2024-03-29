import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import Price from '@magento/venia-ui/lib/components/Price';
import { usePriceSummary } from '@magento/peregrine/lib/talons/CartPage/PriceSummary/usePriceSummary';
import Button from '@magento/venia-ui/lib/components/Button';
import { useStyle } from '@magento/venia-ui/lib/classify';
import defaultClasses from '@magento/venia-ui/lib/components/CartPage/PriceSummary/priceSummary.module.css';
import DiscountSummary from '@magento/venia-ui/lib/components/CartPage/PriceSummary/discountSummary';
import GiftCardSummary from '@magento/venia-ui/lib/components/CartPage/PriceSummary/giftCardSummary';
import GiftOptionsSummary from '@magento/venia-ui/lib/components/CartPage/PriceSummary/giftOptionsSummary';
import ShippingSummary from '@magento/venia-ui/lib/components/CartPage/PriceSummary/shippingSummary';
import TaxSummary from '@magento/venia-ui/lib/components/CartPage/PriceSummary/taxSummary';
import LoadingIndicator from '@magento/venia-ui/lib/components/LoadingIndicator';

/**
 * A child component of the CartPage component.
 * This component fetches and renders cart data, such as subtotal, discounts applied,
 * gift cards applied, tax, shipping, and cart total.
 *
 * @param {Object} props
 * @param {Object} props.classes CSS className overrides.
 * See [priceSummary.module.css]{@link https://github.com/magento/pwa-studio/blob/develop/packages/venia-ui/lib/components/CartPage/PriceSummary/priceSummary.module.css}
 * for a list of classes you can override.
 *
 * @returns {React.Element}
 *
 * @example <caption>Importing into your project</caption>
 * import PriceSummary from "@magento/venia-ui/lib/components/CartPage/PriceSummary";
 */
const PriceSummary = props => {
    const { isUpdating, setNeedToRefreshPayment } = props;
    const classes = useStyle(defaultClasses, props.classes);
    const talonProps = usePriceSummary({isUpdating, setNeedToRefreshPayment});

    const {
        handleProceedToCheckout,
        handleEnterKeyPress,
        hasError,
        hasItems,
        isCheckout,
        isLoading,
        flatData
    } = talonProps;
    const { formatMessage } = useIntl();

    if (hasError) {
        return (
            <div className={classes.root}>
                <span className={classes.errorText}>
                    <FormattedMessage
                        id={'priceSummary.errorText'}
                        defaultMessage={
                            'Something went wrong. Please refresh and try again.'
                        }
                    />
                </span>
            </div>
        );
    } else if (!hasItems) {
        return null;
    }

    const {
        subtotal,
        total,
        discounts,
        giftCards,
        giftOptions,
        taxes,
        shipping
    } = flatData;

    const isPriceUpdating = isUpdating || isLoading;
    const priceClass = isPriceUpdating ? classes.priceUpdating : classes.price;
    const totalPriceClass = isPriceUpdating
        ? classes.priceUpdating
        : classes.totalPrice;

    const totalPriceLabel = isCheckout
        ? formatMessage({
              id: 'priceSummary.total',
              defaultMessage: 'Total'
          })
        : formatMessage({
              id: 'priceSummary.estimatedTotal',
              defaultMessage: 'Estimated Total'
          });

    const proceedToCheckoutButton = !isCheckout ? (
        <div className={classes.checkoutButton_container}>
            <Button
                disabled={isPriceUpdating}
                priority={'high'}
                onClick={handleProceedToCheckout}
                onKeyDown={handleEnterKeyPress}
                data-cy="PriceSummary-checkoutButton"
            >
                <FormattedMessage
                    id={'priceSummary.checkoutButton'}
                    defaultMessage={'Proceed to Checkout'}
                />
            </Button>
        </div>
    ) : null;

    if(isUpdating || isLoading) {
        return <LoadingIndicator />
    } else
        return (
            <div className={classes.root} data-cy="PriceSummary-root">
                <div>
                    <ul>
                        <li className={classes.lineItems}>
                            <span
                                data-cy="PriceSummary-lineItemLabel"
                                className={classes.lineItemLabel}
                            >
                                <FormattedMessage
                                    id={'priceSummary.lineItemLabel'}
                                    defaultMessage={'Subtotal'}
                                />
                            </span>
                            <span
                                data-cy="PriceSummary-subtotalValue"
                                className={priceClass}
                            >
                                <Price
                                    value={subtotal.value}
                                    currencyCode={subtotal.currency}
                                />
                            </span>
                        </li>
                        {
                            discounts.length ?                     
                                <DiscountSummary
                                    classes={{
                                        lineItems: classes.lineItems,
                                        lineItemLabel: classes.lineItemLabel,
                                        price: priceClass
                                    }}
                                    data={discounts}
                                /> : null
                        }
                        <li className={classes.lineItems}>
                            <GiftCardSummary
                                classes={{
                                    lineItemLabel: classes.lineItemLabel,
                                    price: priceClass
                                }}
                                data={giftCards}
                            />
                        </li>
                        <li className={classes.lineItems}>
                            <GiftOptionsSummary
                                classes={{
                                    lineItemLabel: classes.lineItemLabel,
                                    price: priceClass
                                }}
                                data={giftOptions}
                            />
                        </li>
                        <li className={classes.lineItems}>
                            <TaxSummary
                                classes={{
                                    lineItemLabel: classes.lineItemLabel,
                                    price: priceClass
                                }}
                                data={taxes}
                                isCheckout={isCheckout}
                            />
                        </li>
                        <li className={classes.lineItems}>
                            <ShippingSummary
                                classes={{
                                    lineItemLabel: classes.lineItemLabel,
                                    price: priceClass
                                }}
                                data={shipping}
                                isCheckout={isCheckout}
                            />
                        </li>
                        <li className={classes.lineItems}>
                            <span
                                data-cy="PriceSummary-totalLabel"
                                className={classes.totalLabel}
                            >
                                {totalPriceLabel}
                            </span>
                            <span
                                data-cy="PriceSummary-totalValue"
                                className={totalPriceClass}
                            >
                                <Price
                                    value={total.value}
                                    currencyCode={total.currency}
                                />
                            </span>
                        </li>
                    </ul>
                </div>
                {proceedToCheckoutButton}
            </div>
        );
};

export default PriceSummary;