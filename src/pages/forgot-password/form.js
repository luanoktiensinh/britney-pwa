import React from "react";

import { isRequired } from '@magento/venia-ui/lib/util/formValidators';
import FormInput from "src/components/Form/input";
import { useIntl } from 'react-intl';
const LoginForm = () => {
    const { formatMessage } = useIntl();
    
    return (
        <>
            <div className="pb-3.75 text-sml tracking-[-0.1px] text-[#4e515e]">
                {formatMessage({
                        id: 'forgotPassword.instructions',
                        defaultMessage: 'Please enter your email address to reset your password:'
                    })}
            </div>
            <FormInput 
                field='email'
                autoComplete="false"
                label='Email'
                validate={isRequired}
                validateOnChange
            />
        </>
    )
}
export default LoginForm;