import React, { Fragment } from 'react';
import { useIntl } from 'react-intl';
import { bool, func, shape, string } from 'prop-types';
import { ChevronLeft as ArrowLeftIcon, X as CloseIcon } from 'react-feather';

import { useStyle } from '@magento/venia-ui/lib/classify';
import AccountChip from '@magento/venia-ui/lib/components/AccountChip';
import Icon from '@magento/venia-ui/lib/components/Icon';
import Trigger from '@magento/venia-ui/lib/components/Trigger';
import defaultClasses from '@magento/venia-ui/lib/components/Navigation/navHeader.module.css';
import { useNavigationHeader } from '@magento/peregrine/lib/talons/Navigation/useNavigationHeader';

const NavHeader = props => {
    const { isTopLevel, onBack, view } = props;
    const { formatMessage } = useIntl();

    const talonProps = useNavigationHeader({
        isTopLevel,
        onBack,
        view
    });

    const { handleBack, isTopLevelMenu } = talonProps;

    const classes = useStyle(defaultClasses, props.classes);

    let titleElement;
    if (['MY_ACCOUNT', 'SIGN_IN'].includes(view)) {
        titleElement = (
            <AccountChip
                fallbackText={formatMessage({
                    id: 'navHeader.accountText',
                    defaultMessage: 'Account'
                })}
            />
        );
    } else {
        const title = 'Back';
        titleElement = <span>{title}</span>;
    }

    const backIcon = isTopLevelMenu ? CloseIcon : ArrowLeftIcon;

    return (
        <Fragment>
            <Trigger key="backButton" action={handleBack} classes={{root: 'mx-4 flex items-center text-[#707070] font-bold uppercase'}}>
                <Icon src={backIcon} classes={{icon: ''}} />
                <span key="title">
                    {titleElement}
                </span>
            </Trigger>
            
        </Fragment>
    );
};

export default NavHeader;

NavHeader.propTypes = {
    classes: shape({
        title: string
    }),
    isTopLevel: bool,
    onBack: func.isRequired,
    view: string.isRequired
};
