import React from 'react';
import { FormattedMessage } from 'react-intl';
import PriceSummary from '@magento/venia-ui/lib/components/CartPage/PriceSummary/priceSummary';
import { useStyle } from '@magento/venia-ui/lib/classify';

import defaultClasses from '@magento/venia-ui/lib/components/CheckoutPage/OrderSummary/orderSummary.module.css';

const OrderSummary = props => {
    const {setNeedToRefreshPayment} = props;
    const classes = useStyle(defaultClasses, props.classes);
    return (
        <div data-cy="OrderSummary-root" className={classes.root}>
            <h1 aria-live="polite" className={classes.title}>
                <FormattedMessage
                    id={'checkoutPage.orderSummary'}
                    defaultMessage={'Order Summary'}
                />
            </h1>
            <PriceSummary isUpdating={props.isUpdating} setNeedToRefreshPayment={setNeedToRefreshPayment}/>
        </div>
    );
};

export default OrderSummary;