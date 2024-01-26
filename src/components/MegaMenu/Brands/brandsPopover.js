import withHOCPopover from 'src/hoc/MegaMenu/HOCPopover';
import React from 'react';
import PropTypes from 'prop-types';
import Brands from './brands';
const MegaMenuBrandsPopover = (props) => {
    return <Brands {...props}/>
}
export default withHOCPopover(MegaMenuBrandsPopover);
MegaMenuBrandsPopover.propTypes = {
    data: PropTypes.shape({
        children: PropTypes.array,
        id: PropTypes.number.isRequired,
        isActive: PropTypes.bool.isRequired,
        name: PropTypes.string.isRequired,
        link: PropTypes.string.isRequired
    }).isRequired
};