import React, { useCallback } from 'react';
import { Check } from 'react-feather';
import { bool, func, shape, string } from 'prop-types';

import { useStyle } from '@magento/venia-ui/lib/classify';
import Icon from '@magento/venia-ui/lib/components/Icon';
import defaultClasses from 'src/styles/ProductSort/pageSizeItem.module.css';

const PageSizeItem = props => {
    const { active, onClick, pageSizeItem } = props;
    const classes = useStyle(defaultClasses, props.classes);

    const handleClick = useCallback(
        e => {
            // use only left click for selection
            if (e.button === 0) {
                onClick(pageSizeItem);
            }
        },
        [pageSizeItem, onClick]
    );

    const handleKeyDown = useCallback(
        e => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onClick(pageSizeItem);
            }
        },
        [onClick, pageSizeItem]
    );

    const activeIcon = active ? <Icon size={20} src={Check} /> : null;

    return (
        <button
            className={classes.root}
            data-cy={active ? 'PageSizeItem-activeButton' : 'PageSizeItem-button'}
            onMouseDown={handleClick}
            onKeyDown={handleKeyDown}
        >
            <span className={classes.content}>
                <span className={classes.text}>{pageSizeItem.text}</span>
                {activeIcon}
            </span>
        </button>
    );
};

PageSizeItem.propTypes = {
    active: bool,
    classes: shape({
        content: string,
        root: string,
        text: string
    }),
    onClick: func
};

export default PageSizeItem;
