import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useStyle } from '@magento/venia-ui/lib/classify.js';
import defaultClasses from '@magento/venia-ui/lib/components/SignIn/signIn.module.css';
import Image from '@magento/venia-ui/lib/components/Image';
import IconAccount from "src/images/Icons/icon-account.png";
import Icon from '@magento/venia-ui/lib/components/Icon/index.js';
import { X as IconClose } from 'react-feather';

const SignIn = props => {
    const {
        setAccountMenuIsOpen
    } = props;
    const classes = useStyle(defaultClasses, props.classes);
    const { formatMessage } = useIntl();

    return (
        <div data-cy="SignIn-root" className="signIn-root gap-sm justify-items-stretch px-sm py-xs">
            <div className="dropdown-heading">
                <div className="dropdown-title">
                    <div className="icon-account">
                        <Image src={IconAccount} className="icon-account__img" alt="Account"></Image>
                    </div>
                    <Icon
                        className="svg-icon-close"
                        src={IconClose}
                        size={30}
                        onClick={() => setAccountMenuIsOpen(false)}
                    />
                </div>
            </div>
            <ul className="account-link-list">
                <li>
                    <a href="/login/" title="Login">
                        <FormattedMessage
                            id={'navHeader.loginText'}
                            defaultMessage={'Login'}
                        />
                    </a>
                </li>
                <li>
                    <a href="/register/">
                        <FormattedMessage
                            id={'navHeader.registerText'}
                            defaultMessage={'Register'}
                        />
                    </a>
                </li>
            </ul>
        </div>
    );
};

export default SignIn;
