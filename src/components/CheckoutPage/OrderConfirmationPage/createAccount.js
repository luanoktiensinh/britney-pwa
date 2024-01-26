import React, { useCallback, useMemo } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Form } from 'informed';
import { func, shape, string } from 'prop-types';
import { useToasts } from '@magento/peregrine';
import { useCreateAccount } from '@magento/peregrine/lib/talons/CheckoutPage/OrderConfirmationPage/useCreateAccount';

import { useStyle } from '@magento/venia-ui/lib/classify';

import Button from '@magento/venia-ui/lib/components/Button';
import GoogleReCaptcha from '@magento/venia-ui/lib/components/GoogleReCaptcha';

import defaultClasses from '@magento/venia-ui/lib/components/CheckoutPage/OrderConfirmationPage/createAccount.module.css';

import FormInput from 'src/pages/register/form.js';

const CreateAccount = props => {
    const { formatMessage } = useIntl();
    const classes = useStyle(defaultClasses, props.classes);

    const [, { addToast }] = useToasts();

    const onSubmit = useCallback(() => {
        // TODO: Redirect to account/order page when implemented.
        const { scrollTo } = globalThis;

        if (typeof scrollTo === 'function') {
            scrollTo({
                left: 0,
                top: 0,
                behavior: 'smooth'
            });
        }

        addToast({
            type: 'info',
            message: formatMessage({
                id: 'checkoutPage.accountSuccessfullyCreated',
                defaultMessage: 'Account successfully created.'
            }),
            timeout: 5000
        });
    }, [addToast, formatMessage]);

    const talonProps = useCreateAccount({
        initialValues: {
            email: props.email,
            firstName: props.firstname,
            lastName: props.lastname
        },
        onSubmit
    });

    const {
        errors,
        handleSubmit,
        isDisabled,
        initialValues,
        recaptchaWidgetProps
    } = talonProps;
    const error = useMemo(() => errors.get('createAccountQuery')?.message, [errors]);
    return (
        <div className={classes.root}>
            <h2>
                <FormattedMessage
                    id={'checkoutPage.quickCheckout'}
                    defaultMessage={'Quick Checkout When You Return'}
                />
            </h2>
            <p>
                <FormattedMessage
                    id={'checkoutPage.setAPasswordAndSave'}
                    defaultMessage={
                        'Set a password and save your information for next time in one easy step!'
                    }
                />
            </p>
            { error && <p className='text-sm font-bold leading-[15px] text-errors-500' dangerouslySetInnerHTML={{__html: error}}></p> }
            <Form
                className={classes.form}
                initialValues={initialValues}
                onSubmit={handleSubmit}
            >
                <FormInput breakField={true} showLabel={true} showDesc={false}/>
                <div className='mb-2'></div>
                <GoogleReCaptcha {...recaptchaWidgetProps} />
                <div className={classes.actions}>
                    <Button
                        disabled={isDisabled}
                        type="submit"
                        className={classes.create_account_button}
                        data-cy="OrderConfirmationPage-CreateAccount-createAccountButton"
                    >
                        <FormattedMessage
                            id={'checkoutPage.createAccount'}
                            defaultMessage={'Create Account'}
                        />
                    </Button>
                </div>
            </Form>
        </div>
    );
};

export default CreateAccount;

CreateAccount.propTypes = {
    classes: shape({
        actions: string,
        create_account_button: string,
        form: string,
        root: string,
        subscribe: string
    }),
    initialValues: shape({
        email: string,
        firstName: string,
        lastName: string
    }),
    onSubmit: func
};
