import React, { useMemo, useCallback, useState, useEffect } from 'react';
import { ChevronDown as ArrowDown } from 'react-feather';
import { FormattedMessage, useIntl } from 'react-intl';
import { useLocation } from 'react-router-dom';
import { number, shape, string } from 'prop-types';
import { useDropdown } from '@magento/peregrine/lib/hooks/useDropdown';

import { useStyle } from '@magento/venia-ui/lib/classify';
import PageSizeItem from './pageSizeItem';
import defaultClasses from 'src/styles/ProductSort/pageSizeSelection.module.css';
import Button from '@magento/venia-ui/lib/components/Button';
import Icon from '@magento/venia-ui/lib/components/Icon';

const PageSizeSelection = props => {
    const classes = useStyle(defaultClasses, props.classes);
    const { currentPageSize, setCurrentPageSize } = props;
    const { elementRef, expanded, setExpanded } = useDropdown();
    const { formatMessage, locale } = useIntl();
    const search = useLocation();
    const listPageSizes = [
        {
            id: 'pageSize_24',
            text: formatMessage({
                id: 'pagination.itemPerPage',
                defaultMessage: 'Items Per Page : '
            }) + 24,
            value: 24
        },
        {
            id: 'pageSize_35',
            text: formatMessage({
                id: 'pagination.itemPerPage',
                defaultMessage: 'Items Per Page : '
            }) + 35,
            value: 35
        },
        {
            id: 'pageSize_48',
            text: formatMessage({
                id: 'pagination.itemPerPage',
                defaultMessage: 'Items Per Page : '
            }) + 48,
            value: 48
        }
    ];
    const [currentPageSizeItem, setCurrentPageSizeItem] = useState({});

    useEffect(() => {
        if(currentPageSize) {
            const matchItem = listPageSizes.filter(item => item.value === Number(currentPageSize));
            if(matchItem.length) {
                setCurrentPageSizeItem(matchItem[0]);
            } else {
                setCurrentPageSizeItem(listPageSizes[0]);
            }
        } else {
            setCurrentPageSizeItem(listPageSizes[0]);
        }
    }, [currentPageSize]);

    // click event for menu items
    const handleItemClick = useCallback(
        pageSizeItem => {
            setCurrentPageSizeItem(pageSizeItem);
            setCurrentPageSize(pageSizeItem.value);
            setExpanded(false);
        },
        [setExpanded, search]
    );

    const pageSizeElements = useMemo(() => {
        // should be not render item in collapsed mode.
        if (!expanded) {
            return null;
        };

        const itemElements = Array.from(listPageSizes, item => {
            const { id } = item;
            const isActive = false;
            return (
                <li key={id} className={classes.menuItem}>
                    <PageSizeItem
                        pageSizeItem={item}
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
        expanded,
        formatMessage,
        handleItemClick,
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
              id: 'pagination.itemPerPageButtonExpanded',
              defaultMessage: 'Items Per Page Button Expanded'
          })
        : formatMessage({
              id: 'pagination.itemPerPageButtonCollapsed',
              defaultMessage: 'Items Per Page Button Collapsed'
          });

    return (
        <div
            ref={elementRef}
            className={classes.root}
            data-cy="PageSizeSelection-root"
            aria-busy="false"
        >
            <Button
                priority={'low'}
                classes={{
                    root_lowPriority: classes.sortButton
                }}
                onClick={handleSortClick}
                data-cy="PageSizeSelection-sortButton"
                onKeyDown={handleKeypress}
                aria-label={result}
            >
                <span className={classes.mobileText}>
                    {currentPageSizeItem.text}
                </span>
                <span className={classes.desktopText}>
                    <span className={classes.sortText}>
                        {currentPageSizeItem.text}
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
            {pageSizeElements}
        </div>
    );
};

PageSizeSelection.propTypes = {
    classes: shape({
        menuItem: string,
        menu: string,
        root: string,
        sortButton: string
    }),
    currentPageSizeItem: shape({
        id: string,
        text: string,
        value: number
    }),
};

export default PageSizeSelection;
