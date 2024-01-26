import React from "react";
import combine from '@magento/venia-ui/lib/util/combineValidators';
import { isRequired, validatePassword, isEqualToField, hasLengthAtLeast } from '@magento/venia-ui/lib/util/formValidators';
import FormInput from "src/components/Form/input";
import FormCheckbox from 'src/components/Form/checkbox.js';
import FormSelect from 'src/components/Form/select';
import { useIntl } from 'react-intl';
import { days, months } from "../../mock/birth";
import { stores } from "../../mock/store";
import { Link } from 'react-router-dom';
import { bool } from "prop-types";
const RegisterForm = ({showDesc, breakField, showLabel}) => {
    const { formatMessage } = useIntl();
    return (
        <>
            { showDesc && (<p className="text-sm text-[#707070] pb-1.25 text-center">
                Join Briscoes club and get emailed a $10 off coupon
                <br />
                You also get access to faster checkout, redeem exclusive offers and get early access to sales.
            </p>) }
            <FormInput
                label={showLabel ? "Email Address" : '' }
                field='email'
                autoComplete="false"
                placeholder={showLabel ? '' :'Email Address *'}
                validate={isRequired}
                validateOnChange
            />
            <div className={breakField ? '' : "flex-start justify-between gap-3"}>
                <FormInput
                    label={showLabel ? "Password" : '' }
                    className={breakField ? 'w-full' : "w-1/2"}
                    required
                    field='password'
                    placeholder={showLabel ? '' :'Password *'}
                    type='password'
                    autoComplete="false"
                    validate={combine([
                        isRequired,
                        [hasLengthAtLeast, 8],
                        validatePassword
                    ])}
                    validateOnChange
                />
                <FormInput
                    label={showLabel ? "Comfirm Password" : '' }
                    required
                    className={breakField ? 'w-full' : "w-1/2"}
                    field='comfirm-password'
                    placeholder={showLabel ? '' :'Comfirm Password *'}
                    type='password'
                    autoComplete="false"
                    validate={combine([
                        [isEqualToField, 'password']
                    ])}
                    validateOnChange
                />
            </div>
            <div className={breakField ? '' : "flex-start justify-between gap-3"}>
                <FormInput
                    label={showLabel ? "First Name" : '' }
                    className={breakField ? 'w-full' : "w-1/2"}
                    field='firstname'
                    placeholder={showLabel ? '' :'First Name *'}
                    autoComplete="given-name"
                    validate={isRequired}
                    validateOnChange
                />
                <FormInput
                    label={showLabel ? "Last Name" : '' }
                    className={breakField ? 'w-full' : "w-1/2"}
                    field='lastname'
                    autoComplete="family-name"
                    placeholder={showLabel ? '' :'Last Name *'}
                    validate={isRequired}
                    validateOnChange
                />
            </div>
            <FormInput 
                label={showLabel ? "Phone Number" : '' }
                field='phone_number'
                placeholder={showLabel ? '' :'Phone number'}
                autoComplete="false"
            />
            <div className="flex-start justify-between gap-3">
                <FormSelect
                    className="w-1/2"
                    field="birth_day"
                    items={days}
                    label="Birth Day"
                    initialValue={1}
                />
                <FormSelect
                    className="w-1/2"
                    field="birth_month"
                    items={months}
                    label="Birth Month"
                    initialValue={1}
                />
            </div>
            <FormSelect
                field="local_store_id"
                items={stores}
                validate={isRequired}
                validateOnChange
            />
            <p className="text-[15px] text-[#4e515e] font-bold pb-1.25">Want to hear more from us?</p>
            <FormCheckbox
                field="is_subscribed"
                id="is_subscribed"
                label={formatMessage({
                    id: 'createAccount.subscribeEmail',
                    defaultMessage: 'Sign up for emails to get updates from Briscoes on products, offers, and your Member benefits'
                })}
                className="pb-1.25"
            />
            <FormCheckbox
                field="is_promotion_subscribed"
                id="is_promotion_subscribed"
                label={formatMessage({
                    id: 'createAccount.subscribePhone',
                    defaultMessage: 'Sign up for text message updates on promotions and offers'
                })}
                className="pb-1.25"
            />
            <p className="text-sm text-[#4e515e] -mb-2">
                By creating an account you agree to Briscoes <Link className="underline" to="/privacy-policy">Privacy Policy</Link> and <Link className="underline" to="/terms-and-conditions">Terms of Use</Link>
            </p>
        </>
    )
}
export default RegisterForm;
RegisterForm.propTypes = {
    showDesc: bool,
    breakField: bool,
    showLabel: bool
}
RegisterForm.defaultProps = {
    showDesc: true,
    breakField: false,
    showLabel: false
}