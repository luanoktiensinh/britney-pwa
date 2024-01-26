import { useCallback, useMemo, useState } from 'react';
import { useMutation } from '@apollo/client';

import mergeOperations from '@magento/peregrine/lib/util/shallowMerge';
import { useUserContext } from '@magento/peregrine/lib/context/user';
import { useCartContext } from '@magento/peregrine/lib/context/cart';
import { useAwaitQuery } from '@magento/peregrine/lib/hooks/useAwaitQuery';
import { useGoogleReCaptcha } from '@magento/peregrine/lib/hooks/useGoogleReCaptcha';

import DEFAULT_OPERATIONS from '@magento/peregrine/lib/talons/CheckoutPage/OrderConfirmationPage/createAccount.gql';
import createAccountGql from './createAccount.gql';
import { useEventingContext } from '@magento/peregrine/lib/context/eventing';

/**
 * Returns props necessary to render CreateAccount component. In particular this
 * talon handles the submission flow by first doing a pre-submisson validation
 * and then, on success, invokes the `onSubmit` prop, which is usually the action.
 *
 * This talon is almost identical to the other useCreateAccount but does not
 * return `isSignedIn`.
 *
 * @param {Object} props.initialValues initial values to sanitize and seed the form
 * @param {Function} props.onSubmit the post submit callback
 * @param {Object} props.operations GraphQL operations use by talon
 * @returns {{
 *   errors: Map,
 *   handleSubmit: function,
 *   handleEnterKeyPress: function,
 *   isDisabled: boolean,
 *   initialValues: object,
 *   recaptchaWidgetProps: { containerElement: function, shouldRender: boolean }
 * }}
 */
export const useCreateAccount = props => {
    const { initialValues = {}, onSubmit } = props;

    const operations = mergeOperations(DEFAULT_OPERATIONS, createAccountGql, props.operations);
    const {
        createAccountMutation,
        createCartMutation,
        getCartDetailsQuery,
        getCustomerQuery,
        signInMutation
    } = operations;
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [, { createCart, getCartDetails, removeCart }] = useCartContext();
    const [
        { isGettingDetails },
        { getUserDetails, setToken }
    ] = useUserContext();

    const [, { dispatch }] = useEventingContext();

    const [fetchCartId] = useMutation(createCartMutation);

    // For create account and sign in mutations, we don't want to cache any
    // personally identifiable information (PII). So we set fetchPolicy to 'no-cache'.
    const [createAccount, { error: createAccountError }] = useMutation(
        createAccountMutation,
        {
            fetchPolicy: 'no-cache'
        }
    );
    const [signIn, { error: signInError }] = useMutation(signInMutation, {
        fetchPolicy: 'no-cache'
    });

    const fetchUserDetails = useAwaitQuery(getCustomerQuery);
    const fetchCartDetails = useAwaitQuery(getCartDetailsQuery);

    const {
        generateReCaptchaData,
        recaptchaLoading,
        recaptchaWidgetProps
    } = useGoogleReCaptcha({
        currentForm: 'CUSTOMER_CREATE',
        formAction: 'createAccount'
    });

    const handleSubmit = useCallback(
        async formValues => {
            setIsSubmitting(true);
            try {
                // Get reCaptchaV3 Data for createAccount mutation
                const recaptchaDataForCreateAccount = await generateReCaptchaData();

                // Create the account and then sign in.
                await createAccount({
                    variables: formValues,
                    ...recaptchaDataForCreateAccount
                });

                dispatch({
                    type: 'USER_CREATE_ACCOUNT',
                    payload: formValues
                });

                // Get reCaptchaV3 Data for signIn mutation
                const recaptchaDataForSignIn = await generateReCaptchaData();

                const signInResponse = await signIn({
                    variables: {
                        email: formValues.email,
                        password: formValues.password
                    },
                    ...recaptchaDataForSignIn
                });
                const token = signInResponse.data.generateCustomerToken.token;
                await setToken(token);

                // Clear guest cart from redux.
                await removeCart();

                // Create a new customer cart.
                await createCart({
                    fetchCartId
                });

                // Ensure old stores are updated with any new data.
                await getUserDetails({ fetchUserDetails });
                await getCartDetails({
                    fetchCartId,
                    fetchCartDetails
                });

                // Finally, invoke the post-submission callback.
                if (onSubmit) {
                    onSubmit();
                }
            } catch (error) {
                if (process.env.NODE_ENV !== 'production') {
                    console.error(error);
                }
                setIsSubmitting(false);
            }
        },
        [
            createAccount,
            createCart,
            fetchCartDetails,
            fetchCartId,
            fetchUserDetails,
            generateReCaptchaData,
            getCartDetails,
            getUserDetails,
            onSubmit,
            removeCart,
            setToken,
            signIn,
            dispatch
        ]
    );

    const handleEnterKeyPress = useCallback(() => {
        event => {
            if (event.key === 'Enter') {
                handleSubmit();
            }
        };
    }, [handleSubmit]);

    const sanitizedInitialValues = useMemo(() => {
        const { email, firstName, lastName, ...rest } = initialValues;

        return {
            email,
            firstname: firstName,
            lastname: lastName,
            ...rest
        };
    }, [initialValues]);

    const errors = useMemo(
        () =>
            new Map([
                ['createAccountQuery', createAccountError],
                ['signInMutation', signInError]
            ]),
        [createAccountError, signInError]
    );

    return {
        errors,
        handleSubmit,
        handleEnterKeyPress,
        isDisabled: isSubmitting || isGettingDetails || recaptchaLoading,
        initialValues: sanitizedInitialValues,
        recaptchaWidgetProps
    };
};
