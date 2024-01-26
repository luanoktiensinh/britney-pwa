import React, { Suspense } from 'react';
import { useIntl } from 'react-intl';
import { func } from 'prop-types';

import LoadingIndicator from '@magento/venia-ui/lib/components/LoadingIndicator';
import { useStyle } from '@magento/venia-ui/lib/classify';
import { Accordion, Section } from '@magento/venia-ui/lib/components/Accordion';
import defaultClasses from 'node_modules/@magento/venia-ui/lib/components/CartPage/PriceAdjustments/priceAdjustments.module.css';

const CouponCode = React.lazy(() => import('@magento/venia-ui/lib/components/CartPage/PriceAdjustments/CouponCode'));
const ShippingMethods = React.lazy(() => import('@magento/venia-ui/lib/components/CartPage/PriceAdjustments/ShippingMethods'));
const GiftCards  = React.lazy(() => import('@magento/venia-ui/lib/components/CartPage/GiftCards/giftCards.js'));

/**
 * PriceAdjustments is a child component of the CartPage component.
 * It renders the price adjustments forms for applying gift cards, coupons, and the shipping method.
 * All of which can adjust the cart total.
 *
 * @param {Object} props
 * @param {Function} props.setIsCartUpdating A callback function for setting the updating state of the cart.
 * @param {Object} props.classes CSS className overrides.
 * See [priceAdjustments.module.css]{@link https://github.com/magento/pwa-studio/blob/develop/packages/venia-ui/lib/components/CartPage/PriceAdjustments/priceAdjustments.module.css}
 * for a list of classes you can override.
 *
 * @returns {React.Element}
 *
 * @example <caption>Importing into your project</caption>
 * import PriceAdjustments from '@magento/venia-ui/lib/components/CartPage/PriceAdjustments'
 */
const PriceAdjustments = props => {
    const classes = useStyle(defaultClasses, props.classes);

    const { setIsCartUpdating } = props;
    const { formatMessage } = useIntl();

    return (
        <div className={classes.root} data-cy="PriceAdjustments-root">
            <Accordion canOpenMultiple={true}>
                <Section
                    id={'shipping_method'}
                    data-cy="PriceAdjustments-shippingMethodSection"
                    title={formatMessage({
                        id: 'priceAdjustments.shippingMethod',
                        defaultMessage: 'Estimate your Shipping'
                    })}
                >
                    <Suspense fallback={<LoadingIndicator />}>
                        <ShippingMethods
                            setIsCartUpdating={setIsCartUpdating}
                        />
                    </Suspense>
                </Section>
                <Section
                    id={'coupon_code'}
                    data-cy="PriceAdjustments-couponCodeSection"
                    title={formatMessage({
                        id: 'priceAdjustments.couponCode',
                        defaultMessage: 'Enter Coupon Code'
                    })}
                >
                    <Suspense fallback={<LoadingIndicator />}>
                        <CouponCode setIsCartUpdating={setIsCartUpdating} />
                    </Suspense>
                </Section>
                <Section
                    id={'gift_card'}
                    data-cy="PriceAdjustments-giftCardSection"
                    title={formatMessage({
                        id: 'priceAdjustments.giftCard',
                        defaultMessage: 'Enter Gift Card'
                    })}
                >
                    <Suspense fallback={<LoadingIndicator />}>
                        <GiftCards setIsCartUpdating={setIsCartUpdating} />
                    </Suspense>
                </Section>
            </Accordion>
        </div>
    );
};

export default PriceAdjustments;

PriceAdjustments.propTypes = {
    setIsCartUpdating: func
};