import React, { useMemo, useCallback, useEffect } from 'react';
import { ChevronDown as ArrowDown } from 'react-feather';
import { FormattedMessage, useIntl } from 'react-intl';
import { useLocation } from 'react-router-dom';
import { array, arrayOf, shape, string } from 'prop-types';
import { useDropdown } from '@magento/peregrine/lib/hooks/useDropdown';

import { useStyle } from '@magento/venia-ui/lib/classify';
import SortItem from '@magento/venia-ui/lib/components/ProductSort/sortItem.js';
import defaultClasses from '@magento/venia-ui/lib/components/ProductSort/productSort.module.css';
import Button from '@magento/venia-ui/lib/components/Button';
import Icon from '@magento/venia-ui/lib/components/Icon';

const ProductSort = props => {
    const classes = useStyle(defaultClasses, props.classes);
    const { 
        availableSortMethods, 
        sortProps,
        currentSortParam,
        setCurrentSortParam
    } = props;
    const [currentSort, setSort] = sortProps;
    const { elementRef, expanded, setExpanded } = useDropdown();
    const { formatMessage, locale } = useIntl();
    const search = useLocation();

    const defaultSortItem = {
        id: 'sortItem.position',
        text: formatMessage({
            id: 'sortItem.position',
            defaultMessage: 'Position'
        }),
        attribute: 'position',
        sortDirection: 'ASC'
    }

    const orderSortingList = useCallback(
        list => {
            return list.sort((a, b) => {
                return a.text.localeCompare(b.text, locale, {
                    sensitivity: 'base'
                });
            });
        },
        [locale]
    );

    const getLabelSortMethod = (sortName, sortLabel, sortOrder) => {
        switch(sortName) {
            case "name":
                return `Product ${sortOrder === "ASC" ? " (A-Z)" : " (Z-A)"}`;
                break;
            case "product_published_on":
                return `${sortOrder === "ASC" ? "Oldest" : "Latest"}`;
                break;
            default:
                return sortLabel;
        }
    }

    const getSortMethodsFromConfig = () => {
        const listSortMethods = [];
        if(availableSortMethods) {
            availableSortMethods.forEach(method => {
                const { value, label } = method;
                if (value !== 'price' && value !== 'position') {
                    listSortMethods.push({
                        id: `sortItem.${value}`,
                        text: getLabelSortMethod(value, label, "ASC"),
                        attribute: value,
                        sortDirection: 'ASC'
                    });
                    if(value === "name" || value === "product_published_on") {
                        listSortMethods.push({
                            id: `sortItem.${value}`,
                            text: getLabelSortMethod(value, label, "DESC"),
                            attribute: value,
                            sortDirection: 'DESC'
                        });
                    }
                }
            });
        }
        return listSortMethods;
    }

    const sortMethodsFromConfig = availableSortMethods
        ? availableSortMethods
            .map(method => {
                const { value, label } = method;
                if (value !== 'price' && value !== 'position') {
                    return {
                        id: `sortItem.${value}`,
                        text: label,
                        attribute: value,
                        sortDirection: 'ASC'
                    };
                }
            })
            .filter(method => !!method)
        : null;

    const getAllSortingMethods = useMemo(() => {
        const defaultSortMethods = [
            {
                id: 'sortItem.relevance',
                text: formatMessage({
                    id: 'sortItem.relevance',
                    defaultMessage: 'Best Match'
                }),
                attribute: 'relevance',
                sortDirection: 'DESC'
            },
            {
                id: 'sortItem.priceDesc',
                text: formatMessage({
                    id: 'sortItem.priceDesc',
                    defaultMessage: 'Price: High to Low'
                }),
                attribute: 'price',
                sortDirection: 'DESC'
            },
            {
                id: 'sortItem.priceAsc',
                text: formatMessage({
                    id: 'sortItem.priceAsc',
                    defaultMessage: 'Price: Low to High'
                }),
                attribute: 'price',
                sortDirection: 'ASC'
            }
        ];

        // Do not display Position in Search
        if (!currentSort.sortFromSearch) {
            defaultSortMethods.push(defaultSortItem);
        }

        return getSortMethodsFromConfig()
            ? orderSortingList(
                [getSortMethodsFromConfig(), defaultSortMethods].flat()
            )
            : defaultSortMethods;
    }, [        
        orderSortingList,
        getSortMethodsFromConfig
    ]);

    const setSortItem = (sortItem, isFirstLoad = false) => {
        setSort(prevSort => {
            return {
                sortText: sortItem.text,
                sortId: sortItem.id,
                sortAttribute: sortItem.attribute,
                sortDirection: sortItem.sortDirection,
                sortFromSearch: prevSort.sortFromSearch,
                isFirstLoad
            };
        });
    }

    // click event for menu items
    const handleItemClick = useCallback(
        sortAttribute => {
            setSortItem(sortAttribute);
            setCurrentSortParam(`${sortAttribute.attribute}__${sortAttribute.sortDirection}`);
            setExpanded(false);
        },
        [setExpanded, setSort, search]
    );

    useEffect(() => {
        if(currentSortParam && currentSortParam.split("__").length == 2) {
            const matchItem = Array.from(getAllSortingMethods).filter(item => item.attribute === currentSortParam.split("__")[0] && item.sortDirection === currentSortParam.split("__")[1]);
            if(matchItem.length) {
                setSortItem(matchItem[0], true);
            } else {
                setSortItem(defaultSortItem);
            }
        } else {
            setSortItem(defaultSortItem);
        }
    }, [currentSortParam]);

    const sortElements = useMemo(() => {
        // should be not render item in collapsed mode.
        if (!expanded) {
            return null;
        }

        const itemElements = Array.from(getAllSortingMethods, sortItem => {
            const { attribute, sortDirection } = sortItem;
            const isActive =
                currentSort.sortAttribute === attribute &&
                currentSort.sortDirection === sortDirection;

            const key = `${attribute}--${sortDirection}`;
            return (
                <li key={key} className={classes.menuItem}>
                    <SortItem
                        sortItem={sortItem}
                        active={isActive}
                        onClick={handleItemClick}
                    />
                </li>
            );
        });

        return (
            <div className={classes.menu}>
                <ul>{itemElements}</ul>
            </div>
        );
    }, [
        classes.menu,
        classes.menuItem,
        currentSort.sortAttribute,
        currentSort.sortDirection,
        currentSort.sortFromSearch,
        expanded,
        formatMessage,
        handleItemClick
    ]);

    // expand or collapse on click
    const handleSortClick = () => {
        setExpanded(!expanded);
    };

    const handleKeypress = e => {
        if (e.code == 'Enter') {
            setExpanded(expanded);
        }
    };
    const result = expanded
        ? formatMessage({
              id: 'productSort.sortButtonExpanded',
              defaultMessage: 'Sort Button Expanded'
          })
        : formatMessage({
              id: 'productSort.sortButtonCollapsed',
              defaultMessage: 'Sort Button Collapsed'
          });

    return (
        <div
            ref={elementRef}
            className={classes.root}
            data-cy="ProductSort-root"
            aria-busy="false"
        >
            <Button
                priority={'low'}
                classes={{
                    root_lowPriority: classes.sortButton
                }}
                onClick={handleSortClick}
                data-cy="ProductSort-sortButton"
                onKeyDown={handleKeypress}
                aria-label={result}
            >
                <span className={classes.mobileText}>
                    <FormattedMessage
                        id={'productSort.sortButton'}
                        defaultMessage={'Sort'}
                    />
                </span>
                <span className={classes.desktopText}>
                    <span className={classes.sortText}>
                        <FormattedMessage
                            id={'productSort.sortByButton'}
                            defaultMessage={'Sort by'}
                        />
                        &nbsp;{currentSort.sortText}
                    </span>
                    <Icon
                        src={ArrowDown}
                        classes={{
                            root: classes.desktopIconWrapper,
                            icon: classes.desktopIcon
                        }}
                    />
                </span>
            </Button>
            {sortElements}
        </div>
    );
};

ProductSort.propTypes = {
    classes: shape({
        menuItem: string,
        menu: string,
        root: string,
        sortButton: string
    }),
    availableSortMethods: arrayOf(
        shape({
            label: string,
            value: string
        })
    ),
    sortProps: array,
    currentSortValue: string
};

export default ProductSort;