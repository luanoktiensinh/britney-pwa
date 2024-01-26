import React, { useMemo } from "react";
import LoginForm from "./form";
import LoginBanner from "./banner";
import EntryLayout from "src/components/Entry/entryLayout";
import { Link } from 'react-router-dom';
import { useSignIn } from "@magento/peregrine/lib/talons/SignIn/useSignIn";
import { useSignInPage } from "node_modules/@magento/peregrine/lib/talons/SignInPage/useSignInPage.js";
import { StoreTitle } from '@magento/venia-ui/lib/components/Head';

const Login = (props) => {
    const { 
        isGuestCheckout,
        showCreateAccount,
        showForgotPassword
    } = props;
    const formBottom = useMemo(() => (
        <>
            Not a Member?
            {
                isGuestCheckout ? 
                    <button type="button" onClick={showCreateAccount} className="underline text-black mx-1.25 hover_cursor-pointer">Join Us</button> 
                    : <Link to="/register" className="underline text-black mx-1.25">Join Us</Link> 
            }
        </>
    ), []);
    const {
        handleSubmit,
        errors,
        isBusy
    } = useSignIn({
        handleTriggerClick: () => {}
    });
    const error = useMemo(() => errors.get('signInMutation')?.message, [errors]);
    useSignInPage({
        createAccountPageUrl: '/register',
        forgotPasswordPageUrl: '/forgot-password',
        signedInRedirectUrl: '/'
    });
    return (
        <>
            <StoreTitle>Login</StoreTitle>
            <EntryLayout
                form={isGuestCheckout ?  <LoginForm isGuestCheckout={isGuestCheckout} showForgotPassword={showForgotPassword} /> : <LoginForm />}
                right={isGuestCheckout ? null : <LoginBanner />}
                title="Login"
                formBottom={formBottom}
                handleSubmit={handleSubmit}
                formError={error}
                formBusy={isBusy}
                buttonLabel="LOGIN"
                />
            </>
    )
}
export default Login;