import React from 'react';
import { useSubMenu } from '@magento/peregrine/lib/talons/MegaMenu/useSubMenu';
import classes from 'src/styles/MegaMenu/submenu.module.css';
export default function withHOCPopover(WrapperComponent) {
    return (hocProps) => {
        const {
            isFocused,
            subMenuState,
            mainNavWidth,
            handleCloseSubMenu,
        } = hocProps;
        const talonProps = useSubMenu({
            isFocused,
            subMenuState,
            handleCloseSubMenu
        });
        const { isSubMenuActive } = talonProps;

        const subMenuClassname = isSubMenuActive
            ? classes.submenu_active
            : classes.submenu_inactive;
        return (
            <div className={subMenuClassname}>
                <div 
                    className={classes.submenuItems}
                    style={{ minWidth: mainNavWidth }}
                >
                    <WrapperComponent {...hocProps} />
                </div>
            </div>
        );
    }
}

/**
 *  propTypes = {
        items: PropTypes.arrayOf(
            PropTypes.shape({
                children: PropTypes.array,
                uid: PropTypes.string.isRequired,
                include_in_menu: PropTypes.number.isRequired,
                isActive: PropTypes.bool.isRequired,
                name: PropTypes.string.isRequired,
                path: PropTypes.array.isRequired,
                position: PropTypes.number.isRequired,
                url_path: PropTypes.string.isRequired
            })
        ).isRequired,
        name: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
        mainNavWidth: PropTypes.number.isRequired,
        categoryUrlSuffix: PropTypes.string,
        onNavigate: PropTypes.func.isRequired,
        handleCloseSubMenu: PropTypes.func.isRequired
    };
*/