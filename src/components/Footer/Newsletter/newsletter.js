import React, { useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Form } from 'informed';
import { shape, string } from 'prop-types';

import { useNewsletter } from './useNewsletter';

import { isRequired } from '@magento/venia-ui/lib/util/formValidators';
import { useStyle } from '@magento/venia-ui/lib/classify';
import FormError from '@magento/venia-ui/lib/components/FormError';
import Field from '@magento/venia-ui/lib/components/Field';
import LoadingIndicator from '@magento/venia-ui/lib/components/LoadingIndicator';
import TextInput from '@magento/venia-ui/lib/components/TextInput';
import LinkButton from '@magento/venia-ui/lib/components/LinkButton';
import Shimmer from '@magento/venia-ui/lib/components/Newsletter/newsletter.shimmer';
import defaultClasses from '@magento/venia-ui/lib/components/Newsletter/newsletter.module.css';
import { Link } from 'react-router-dom';

const Newsletter = props => {
    const { formatMessage } = useIntl();
    const classes = useStyle(defaultClasses, props.classes);
    const talonProps = useNewsletter();
    const [ doesSubmitSuccessully, setDoesSubmitSuccessully ] = useState(false);
    const {
        isEnabled,
        errors,
        handleSubmit,
        isBusy,
        isLoading,
        setFormApi,
        newsLetterResponse,
        clearErrors
    } = talonProps;

    useEffect(() => {
        if (newsLetterResponse && newsLetterResponse.status) {
            setDoesSubmitSuccessully(true);
        }
    }, [newsLetterResponse]);

    if (isLoading) {
        return <Shimmer />;
    }

    if (!isEnabled) {
        return null;
    }

    const maybeLoadingIndicator = isBusy ? (
        <div className={classes.loadingContainer}>
            <LoadingIndicator>
                <FormattedMessage
                    id={'newsletter.loadingText'}
                    defaultMessage={'Subscribing'}
                />
            </LoadingIndicator>
        </div>
    ) : null;

    return (
        <div className="subscriber">
            {maybeLoadingIndicator}
            <p className="subscriber__text">
                <FormattedMessage
                    id={'newsletter.promoText'}
                    defaultMessage={
                        'SIGN UP AND GET $10 OFF YOUR FIRST ORDER OVER $50*'
                    }
                />
            </p>
            <FormError
                allowErrorMessages
                errors={Array.from(errors.values())}
            />
            {
                doesSubmitSuccessully ?
                (
                    <div className="subscriber__success">
                        <FormattedMessage
                            id={'newsletter.subscribeMessage'}
                            defaultMessage={'Thank you for subscribing to the Briscoes Club! Please check your inbox shortly'}
                        />
                    </div>
                ) : (
                    <React.Fragment>
                        <Form
                            getApi={setFormApi}
                            className="subscriber__form"
                            onSubmit={handleSubmit}
                        >
                            <Field
                                id="firstName"
                                label={formatMessage({
                                    id: 'global.firstName',
                                    defaultMessage: 'First name'
                                })}
                            >
                                <TextInput
                                    autoComplete="firstName"
                                    field="firstName"
                                    id="firstName"
                                    placeholder="First name"
                                />
                            </Field>
                            <Field
                                id="lastName"
                                label={
                                    <span>
                                        {formatMessage({
                                            id: 'global.lastName',
                                            defaultMessage: 'Last name'
                                        })}
                                        : <span className="error">*</span>
                                    </span>
                                }
                            >
                                <TextInput
                                    autoComplete="lastName"
                                    field="lastName"
                                    id="lastName"
                                    validate={isRequired}
                                    placeholder="Last name"
                                />
                            </Field>
                            <Field
                                id="email"
                                label={
                                    <span>
                                        {formatMessage({
                                            id: 'signIn.emailAddressText',
                                            defaultMessage: 'Email'
                                        })}
                                        : <span className="error">*</span>
                                    </span>
                                }
                            >
                                <TextInput
                                    autoComplete="email"
                                    field="email"
                                    id="email"
                                    validate={isRequired}
                                    placeholder="Email"
                                />
                            </Field>
                            <LinkButton
                                className="subscriber__button"
                                type="submit"
                                disabled={isBusy}
                                onClick={clearErrors}
                            >
                                <FormattedMessage
                                    id={'newsletter.subscribeText'}
                                    defaultMessage={'Submit'}
                                />
                            </LinkButton>
                        </Form>
                        <label className="subscriber__legacy">
                            By creating an account you agree to Briscoes&nbsp;
                            <Link to="/privacy-policy">
                                <FormattedMessage
                                    id={'footer.privacyText'}
                                    defaultMessage={'Privacy Policy'}
                                />
                            </Link>&nbsp;
                            and &nbsp;
                            <Link to="/terms-and-conditions">
                                <FormattedMessage
                                    id={'footer.termsText'}
                                    defaultMessage={'Terms of Use'}
                                />
                            </Link>
                        </label>
                    </React.Fragment>
                )
            }
        </div>
    );
};

Newsletter.propTypes = {
    classes: shape({
        modal_active: string,
        root: string,
        title: string,
        form: string,
        buttonsContainer: string
    })
};

export default Newsletter;
