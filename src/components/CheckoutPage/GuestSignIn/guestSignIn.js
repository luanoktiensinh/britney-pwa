import React from 'react';
import { bool, func, shape, string } from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { useGuestSignIn } from '@magento/peregrine/lib/talons/CheckoutPage/GuestSignIn/useGuestSignIn';

import { useStyle } from '@magento/venia-ui/lib/classify';
import LinkButton from '@magento/venia-ui/lib/components/LinkButton';
import Login from '../../../pages/login';
import Register from '../../../pages/register';
import ForgotPassword from '../../../pages/forgot-password';
import defaultClasses from '@magento/venia-ui/lib/components/CheckoutPage/GuestSignIn/guestSignIn.module.css';
import overrideClasses from 'src/styles/CheckoutPage/guestSignIn.module.css';

const GuestSignIn = props => {
    const { isActive, toggleActiveContent, initialValues } = props;

    const talonProps = useGuestSignIn({ toggleActiveContent });
    const {
        handleBackToCheckout,
        toggleCreateAccountView,
        toggleForgotPasswordView,
        view
    } = talonProps;

    const classes = useStyle(defaultClasses, props.classes, overrideClasses);

    const rootClass = isActive ? classes.root : classes.root_hidden;

    let content;
    if (view === 'SIGNIN') {
        content = (
            <Login 
                isGuestCheckout={true}
                showCreateAccount={toggleCreateAccountView}
                showForgotPassword={toggleForgotPasswordView}
            />
        );
    } else if (view === 'FORGOT_PASSWORD') {
        content = (
            <ForgotPassword
                isGuestCheckout={true}
                onCancel={toggleForgotPasswordView}
            />
        );
    } else if (view === 'CREATE_ACCOUNT') {
        content = (
            <Register
                isGuestCheckout={true}
                onCancel={toggleCreateAccountView}
            />
        );
    }

    return (
        <div className={rootClass}>
            <h1 aria-live="polite" className={classes.header}>
                <FormattedMessage
                    id="checkoutPage.guestSignIn.header"
                    defaultMessage="Account Sign-in"
                />
            </h1>
            <div className={classes.contentContainer}>
                {content}
                <div className={classes.backToCheckout}>
                    <LinkButton onClick={handleBackToCheckout}>
                        <FormattedMessage
                            id="checkoutPage.guestSignIn.backToCheckout"
                            defaultMessage="Back to Checkout"
                        />
                    </LinkButton>
                </div>
            </div>
        </div>
    );
};

export default GuestSignIn;

GuestSignIn.propTypes = {
    classes: shape({
        root: string,
        root_hidden: string,
        header: string,
        contentContainer: string,
        signInRoot: string,
        forgotPasswordRoot: string,
        createAccountRoot: string
    }),
    isActive: bool.isRequired,
    toggleActiveContent: func.isRequired,
    initialValues: shape({
        email: string.isRequired
    })
};