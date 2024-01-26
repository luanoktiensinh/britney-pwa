import React, { useMemo } from 'react';
import { node, shape, string } from 'prop-types';
import { Menu as MenuIcon, X as XIcon } from 'react-feather';
import { useIntl } from 'react-intl';
import { useAppContext } from '@magento/peregrine/lib/context/app';
import Icon from '@magento/venia-ui/lib/components/Icon';
import { useStyle } from '@magento/venia-ui/lib/classify';
import defaultClasses from '@magento/venia-ui/lib/components/Header/navTrigger.module.css';
import { useNavigationTrigger } from '@magento/peregrine/lib/talons/Header/useNavigationTrigger';

/**
 * A component that toggles the navigation menu.
 */
const NavigationTrigger = props => {
    const { formatMessage } = useIntl();
    const { handleOpenNavigation } = useNavigationTrigger();
    const [appState, { closeDrawer }] = useAppContext();
    const classes = useStyle(defaultClasses, props.classes);
    const { drawer } = appState;
    const isShowNav = useMemo(() => drawer === 'nav', [drawer]);
    return (
        <button
            className={classes.root}
            data-cy="Header-NavigationTrigger-root"
            aria-label={formatMessage({
                id: 'navigationTrigger.ariaLabel',
                defaultMessage: 'Toggle navigation panel'
            })}
            onClick={isShowNav ? closeDrawer : handleOpenNavigation}
        >
            <Icon src={isShowNav ? XIcon : MenuIcon} />
        </button>
    );
};

NavigationTrigger.propTypes = {
    children: node,
    classes: shape({
        root: string
    })
};

export default NavigationTrigger;
