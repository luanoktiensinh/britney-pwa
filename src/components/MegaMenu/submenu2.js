import React from 'react';
import PropTypes from 'prop-types';

import MainSide from './MainSide/mainSide';
import withHOCPopover from 'src/hoc/MegaMenu/HOCPopover';
import "src/styles/pagebuilder.scss";

/**
 * The Submenu component displays submenu in mega menu
 *
 * @param {array} props.items - categories to display
 * @param {int} props.mainNavWidth - width of the main nav. It's used for setting min-width of the submenu
 * @param {function} props.onNavigate - function called when clicking on Link
 */
const Submenu = props => {
    const {
        data,
        megaMenuFooterLinks,
    } = props;
    return <MainSide
        data={data}
        footerLinks={megaMenuFooterLinks}
    />
};

export default withHOCPopover(Submenu);

Submenu.propTypes = {
    data: PropTypes.shape({
        children: PropTypes.array,
        id: PropTypes.number.isRequired,
        isActive: PropTypes.bool.isRequired,
        name: PropTypes.string.isRequired,
        link: PropTypes.string.isRequired
    }).isRequired,
    mainNavWidth: PropTypes.number.isRequired,
    categoryUrlSuffix: PropTypes.string,
    onNavigate: PropTypes.func.isRequired,
    handleCloseSubMenu: PropTypes.func.isRequired,
    megaMenuFooterLinks: PropTypes.array
};
