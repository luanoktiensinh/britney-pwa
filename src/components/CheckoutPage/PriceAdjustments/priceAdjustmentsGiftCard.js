import React, { Suspense } from 'react';
import { useIntl } from 'react-intl';
import { func } from 'prop-types';

import { useStyle } from '@magento/venia-ui/lib/classify';
import LoadingIndicator from '@magento/venia-ui/lib/components/LoadingIndicator';
import { Accordion, Section } from '@magento/venia-ui/lib/components/Accordion';
import defaultClasses from '@magento/venia-ui/lib/components/CheckoutPage/PriceAdjustments/priceAdjustments.module.css';

const GiftCards  = React.lazy(() => import('@magento/venia-ui/lib/components/CartPage/GiftCards/giftCards.js'));

/**
 * PriceAdjustments component for the Checkout page.

 * @param {Function} props.setIsCartUpdating callback that sets checkout page updating state
 */
const PriceAdjustmentsGiftCard = props => {
    const classes = useStyle(defaultClasses, props.classes);

    const { setIsCartUpdating } = props;
    const { formatMessage } = useIntl();

    return (
        <>
            <div className={classes.root}>
                <Accordion canOpenMultiple={true}>
                    <Section
                        data-cy="PriceAdjustments-giftCardSection"
                        id={'gift_card'}
                        title={formatMessage({
                            id: 'checkoutPage.giftCard',
                            defaultMessage: 'Enter Gift Card'
                        })}
                    >
                        <Suspense fallback={<LoadingIndicator />}>
                            <GiftCards setIsCartUpdating={setIsCartUpdating} />
                        </Suspense>
                    </Section>
                </Accordion>                
            </div>
        </>
    );
};

export default PriceAdjustmentsGiftCard;

PriceAdjustmentsGiftCard.propTypes = {
    setIsCartUpdating: func
};