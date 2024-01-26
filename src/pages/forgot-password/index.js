import React, { useMemo } from 'react';
import { func, shape, string } from 'prop-types';

import { useForgotPassword } from '@magento/peregrine/lib/talons/ForgotPassword/useForgotPassword';

import forgotPasswordOperations from '@magento/venia-ui/lib/components/ForgotPassword/forgotPassword.gql';

import EntryLayout from "src/components/Entry/entryLayout";
import { Link } from 'react-router-dom';
import { useForgotPasswordPage } from "@magento/peregrine/lib/talons/ForgotPasswordPage/useForgotPasswordPage.js";
import { StoreTitle } from '@magento/venia-ui/lib/components/Head';
import Logo from 'src/images/Logo/logo.jpg';
import Banner from './banner';
import Form from './form';

const ForgotPassword = props => {
    const { 
        isGuestCheckout,
        onCancel 
    } = props;
    
    const formBottom = useMemo(() => (
        <>
            {
                isGuestCheckout ? 
                    <button type="button" onClick={onCancel} className="hover_underline text-primary-400 text-sml hover_cursor-pointer">Back to Login</button> 
                    : <Link to="/login" className="hover_underline text-primary-400 text-sml">Back to Login</Link>
            }
        </>
    ), []);
    const formSuccess = useMemo(() => (
        <>
            <h4 className='mb-2 font-bold text-black'>Password Reset Email Sent!</h4>
            <p className='text-sm mb-4 text-[#707070]/90'>
             We have sent you an email with instruction on how to reset your password.
             Check your inbox and click on the link provided. If it does not appear, please check your junk mail.
            </p>
            <p className='text-sm mb-4 text-[#707070]/90'>If you have any issues <Link className="underline" to={'/contact-us'}>contact us.</Link></p>
        </>
    ), []);
    const {
        handleFormSubmit: handleSubmit,
        formErrors: errors,
        isResettingPassword: isBusy
    } = useForgotPassword({
        onCancel,
        ...forgotPasswordOperations
    });
    const error = useMemo(() => errors?.[0]?.message, [errors]);
    useForgotPasswordPage({
        signInPageUrl: '/login',
        signedInRedirectUrl: '/'
    });
    return (
        <>
            <StoreTitle>Forgot Password</StoreTitle>
            <EntryLayout
                logo={Logo}
                form={<Form />}
                right={isGuestCheckout ? null : <Banner />}
                title="Forgot Password"
                formBottom={formBottom}
                handleSubmit={handleSubmit}
                formError={error}
                errorPosition='bottom'
                formBusy={isBusy}
                buttonLabel="Submit"
                formSuccess={formSuccess}
            />
        </>
    )
};

export default ForgotPassword;

ForgotPassword.propTypes = {
    classes: shape({
        instructions: string,
        root: string
    }),
    onCancel: func
};

ForgotPassword.defaultProps = {
    onCancel: () => {}
};
