import { useMemo, useState, useCallback, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useInternalLink } from '@magento/peregrine/lib/hooks/useInternalLink';

import { useQuery } from '@apollo/client';
import { useEventListener } from '@magento/peregrine/lib/hooks/useEventListener';

import mergeOperations from '@magento/peregrine/lib/util/shallowMerge';
import DEFAULT_OPERATIONS from '@magento/peregrine/lib/talons/MegaMenu/megaMenu.gql';
import megaMenuGql from 'src/queries/MegaMenu/megaMenu.gql';
import mockBrands from 'src/mock/brands.js';
/**
 * The useMegaMenu talon complements the MegaMenu component.
 *
 * @param {Object} props
 * @param {*} props.operations GraphQL operations used by talons
 * @param {React.RefObject} props.mainNavRef Reference to main navigation DOM node
 *
 * @return {MegaMenuTalonProps}
 */
export const useMegaMenu = (props = {}) => {
    const operations = mergeOperations(DEFAULT_OPERATIONS, megaMenuGql, props.operations);
    const { getMegaMenuQuery, getStoreConfigQuery } = operations;

    const location = useLocation();
    const [activeCategoryId, setActiveCategoryId] = useState(null);
    const [subMenuState, setSubMenuState] = useState(false);
    const [disableFocus, setDisableFocus] = useState(false);

    const { data: storeConfigData } = useQuery(getStoreConfigQuery, {
        fetchPolicy: 'cache-and-network'
    });

    const { data } = useQuery(getMegaMenuQuery, {
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-first'
    });

    /**
     * Check if category should be visible on the storefront.
     *
     * @param {MegaMenuCategory} category
     * @returns {boolean}
     */
    const shouldRenderMegaMenuItem = category => {
        return !!category.include_in_menu;
    };

    /**
     * Check if category is the active category based on the current location.
     *
     * @param {MegaMenuCategory} category
     * @returns {boolean}
     */

    const isActive = useCallback(
        ({ link }) => {
            if (!link) return false;


            return location.pathname === link;
        },
        [location.pathname]
    );

    /**
     * Recursively map data returned by GraphQL query.
     *
     * @param {MegaMenuCategory} category
     * @param {array} - path from the given category to the first level category
     * @param {boolean} isRoot - describes is category a root category
     * @return {MegaMenuCategory}
     */
    const processData = useCallback(
        (category, path = []) => {
            if (!category) {
                return;
            }

            const megaMenuCategory = Object.assign({}, category);
            megaMenuCategory.isActive = isActive(megaMenuCategory);

            if (megaMenuCategory.children) {
                megaMenuCategory.children = [...megaMenuCategory.children]
                    // .filter(category => shouldRenderMegaMenuItem(category))
                    // .sort((a, b) => (a.position > b.position ? 1 : -1))
                    .map(child =>
                        processData(child)
                    );
            }

            return megaMenuCategory;
        },
        [isActive]
    );

    const megaMenuData = useMemo(() => {
        return data ? processData({children: [...data.getDynamicMenu.menu_items, mockBrands]}) : {};
    }, [data, processData]);
    const megaMenuFooterLinks = useMemo(() => {
        return data?.getDynamicMenu?.footer_icons ?? [];
    }, [data]);

    const findActiveCategory = useCallback(
        (pathname, category) => {
            if (isActive(category)) {
                return category;
            }

            if (category.children) {
                return category.children.find(category =>
                    findActiveCategory(pathname, category)
                );
            }
        },
        [isActive]
    );

    const handleClickOutside = e => {
        if (!props.mainNavRef.current.contains(e.target)) {
            setSubMenuState(false);
            setDisableFocus(true);
        }
    };

    useEventListener(globalThis, 'keydown', handleClickOutside);

    const handleSubMenuFocus = useCallback(() => {
        setSubMenuState(true);
    }, [setSubMenuState]);

    useEffect(() => {
        const activeCategory = findActiveCategory(
            location.pathname,
            megaMenuData
        );

        if (activeCategory) {
            setActiveCategoryId(activeCategory.id);
        } else {
            setActiveCategoryId(null);
        }
    }, [findActiveCategory, location.pathname, megaMenuData]);

    /**
     * Sets next root component to show proper loading effect
     *
     * @returns {void}
     */
    const { setShimmerType } = useInternalLink('category');

    return {
        megaMenuData,
        megaMenuFooterLinks,
        activeCategoryId,
        handleClickOutside,
        subMenuState,
        disableFocus,
        handleSubMenuFocus,
        handleNavigate: setShimmerType
    };
};

/** JSDocs type definitions */

/**
 * @typedef {Object} MegaMenuTalonProps
 *
 * @property {MegaMenuCategory} megaMenuData - The Object with categories contains only categories
 *                                             with the include_in_menu = 1 flag. The categories are sorted
 *                                             based on the field position.
 * @property {String} activeCategoryId returns the currently selected category uid.
 * @property {Function} handleClickOutside function to handle mouse/key events.
 * @property {Boolean} subMenuState maintaining sub-menu open/close state
 * @property {Boolean} disableFocus state to disable focus
 * @property {Function} handleSubMenuFocus toggle function to handle sub-menu focus
 * @property {function} handleNavigate - callback to fire on link click
 */

/**
 * Object type returned by the {@link useMegaMenu} talon.
 * @typedef {Object} MegaMenuCategory
 *
 * @property {Number} id - id of the category
 * @property {String} name - name of the category
 * @property {MegaMenuCategory} children - child category
 */
