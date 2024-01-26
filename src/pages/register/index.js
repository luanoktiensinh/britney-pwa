import React, { useCallback, useMemo } from "react";
import Form from "./form";
import Benefits from "./benefits";
import EntryLayout from "src/components/Entry/entryLayout";
import { Link } from 'react-router-dom';
import { useCreateAccount } from "@magento/peregrine/lib/talons/CreateAccount/useCreateAccount.js";
import { useCreateAccountPage } from "@magento/peregrine/lib/talons/CreateAccountPage/useCreateAccountPage.js";
import { StoreTitle } from '@magento/venia-ui/lib/components/Head';
import createAccountGql from 'src/queries/CreateAccount/createAccount.gql';
import Logo from 'src/images/Logo/logo.jpg';
const Register = (props) => {
    const { 
        isGuestCheckout,
        onCancel
    } = props;

    const formBottom = useMemo(() => (
        <>
            Already a Member?
            {
                isGuestCheckout ? 
                    <button type="button" onClick={onCancel} className="underline text-black mx-1.25 hover_cursor-pointer">Login</button> 
                    : <Link to="/login" className="underline text-black mx-1.25">Login</Link>
            }
        </>
    ), []);
    const {
        handleSubmit,
        errors,
        isDisabled
    } = useCreateAccount({
        operations: createAccountGql
    });
    const error = useMemo(() => errors.get('createAccountQuery')?.message, [errors]);
    useCreateAccountPage({
        signInPageUrl: '/login',
        signedInRedirectUrl: '/'
    });
    return (
        <>
            <StoreTitle>Register</StoreTitle>
            <EntryLayout
                form={<Form />}
                right={isGuestCheckout ? null : <Benefits />}
                title="Register"
                formBottom={formBottom}
                handleSubmit={handleSubmit}
                formError={error}
                formBusy={isDisabled}
                buttonLabel="JOIN US"
                logo={Logo}
                />
            </>
    )
}
export default Register;