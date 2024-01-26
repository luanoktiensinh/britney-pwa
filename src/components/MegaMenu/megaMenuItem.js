import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import resourceUrl from '@magento/peregrine/lib/util/makeUrl';
import { useMegaMenuItem } from '@magento/peregrine/lib/talons/MegaMenu/useMegaMenuItem';

import { useStyle } from '@magento/venia-ui/lib/classify.js';
import defaultClasses from '@magento/venia-ui/lib/components/MegaMenu/megaMenuItem.module.css';
import Submenu from './submenu2.js';
import Brands from './Brands/brandsPopover.js';
import { debounce } from 'lodash';

/**
 * The MegaMenuItem component displays mega menu item
 *
 * @param {MegaMenuCategory} props.category
 * @param {String} props.activeCategoryId - uid of active category
 * @param {int} props.mainNavWidth - width of the main nav. It's used for setting min-width of the submenu
 * @param {function} props.onNavigate - function called when clicking on Link
 */
const MegaMenuItem = props => {
    const {
        activeCategoryId,
        category,
        mainNavWidth,
        categoryUrlSuffix,
        subMenuState,
        disableFocus,
        onNavigate,
        handleSubMenuFocus,
        handleClickOutside,
        megaMenuFooterLinks
    } = props;

    const classes = useStyle(defaultClasses, props.classes);

    const talonProps = useMegaMenuItem({
        category,
        activeCategoryId,
        subMenuState,
        disableFocus
    });

    const {
        isFocused,
        isActive,
        handleMenuItemFocus,
        handleCloseSubMenu,
        isMenuActive,
        handleKeyDown
    } = talonProps;
    const megaMenuItemClassname = isMenuActive
        ? classes.megaMenuItem_active
        : classes.megaMenuItem;
    const children = useMemo(() => {
        const _props = {
            isFocused: isFocused,
            subMenuState: subMenuState,
            mainNavWidth: mainNavWidth,
            handleCloseSubMenu: handleCloseSubMenu,
            categoryUrlSuffix: categoryUrlSuffix,
            onNavigate: onNavigate,
            data: category,
            megaMenuFooterLinks
        }
        return category.children.length ? (
            (category.id === 9999) ? (
                <Brands
                    {..._props}
                />
            ): (
                <Submenu
                    {..._props}
                />
            )
        ) : null;
    }, [
        category,
        isFocused,
        mainNavWidth,
        subMenuState,
        handleCloseSubMenu,
        categoryUrlSuffix,
        onNavigate
    ]);

    const linkAttributes = category.children.length
        ? {
              'aria-label': `Category: ${category.name}. ${
                  category.children.length
              } sub-categories`
          }
        : {};

    return (
        <div
            className={megaMenuItemClassname}
            data-cy="MegaMenu-MegaMenuItem-megaMenuItem"
            onMouseEnter={() => {
                handleSubMenuFocus();
                handleMenuItemFocus();
            }}
            onFocus={() => {
                handleSubMenuFocus();
                handleMenuItemFocus();
            }}
            onTouchStart={() => {
                handleSubMenuFocus();
                handleMenuItemFocus();
            }}
            onMouseLeave={debounce(e => {
                handleClickOutside(e);
                handleCloseSubMenu();
            }, 50)}
        >
            <a
                {...linkAttributes}
                onKeyDown={handleKeyDown}
                className={
                    isMenuActive ? classes.megaMenuLinkActive : classes.megaMenuLink
                }
                data-cy="MegaMenu-MegaMenuItem-link"
                href={category.link}
                onClick={onNavigate}
            >
                {category.name}
            </a>
            {children}
        </div>
    );
};

export default MegaMenuItem;

MegaMenuItem.propTypes = {
    category: PropTypes.shape({
        children: PropTypes.array,
        id: PropTypes.number.isRequired,
        isActive: PropTypes.bool.isRequired,
        name: PropTypes.string.isRequired,
        link: PropTypes.string.isRequired
    }).isRequired,
    activeCategoryId: PropTypes.number,
    mainNavWidth: PropTypes.number.isRequired,
    categoryUrlSuffix: PropTypes.string,
    onNavigate: PropTypes.func.isRequired,
    handleSubMenuFocus: PropTypes.func.isRequired,
    handleClickOutside: PropTypes.func.isRequired,
    megaMenuFooterLinks: PropTypes.array
};
