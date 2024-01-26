import React from "react";

import { isRequired } from '@magento/venia-ui/lib/util/formValidators';
import FormInput from "src/components/Form/input";
import FormCheckbox from 'src/components/Form/checkbox.js';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';
const LoginForm = (props) => {
    const { 
        isGuestCheckout,
        showForgotPassword
    } = props;
    const { formatMessage } = useIntl();
    
    return (
        <>
            <FormInput 
                field='email'
                autoComplete="false"
                placeholder='Email Address *'
                validate={isRequired}
                validateOnChange
            />
            <FormInput 
                field='password'
                placeholder='Password *'
                type='password'
                autoComplete="false"
                validate={isRequired}
                validateOnChange
            />
            <div className="flex-start justify-between">
                <FormCheckbox
                    field="keepSignIn"
                    id="keepSignIn"
                    label={formatMessage({
                        id: 'signIn.keepSignIn',
                        defaultMessage: 'Keep me signed in'
                    })}
                />
                {
                    isGuestCheckout ?
                        <button type="button" onClick={showForgotPassword} className='text-xsl leading-[1.5] hover_underline text-[#707070] hover_cursor-pointer'>
                            { formatMessage({
                                id: 'signIn.forgotPasswordText',
                                defaultMessage: 'Forgot Password?'
                            }) }
                        </button>
                        : <Link to={'/forgot-password'} className='text-xsl leading-[1.5] hover_underline text-[#707070]'>
                            { formatMessage({
                                id: 'signIn.forgotPasswordText',
                                defaultMessage: 'Forgot Password?'
                            }) }
                        </Link>
                }
            </div>
        </>
    )
}
export default LoginForm;