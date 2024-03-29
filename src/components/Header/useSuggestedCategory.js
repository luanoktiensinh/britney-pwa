import { useCallback } from 'react';
import { useLocation } from 'react-router-dom';

import { DELIMITER } from '@magento/peregrine/lib/talons/FilterModal/helpers';

// TODO: derive from store config when available
const setSearchParams = (existing, options) => {
    const params = new URLSearchParams(existing);
    const { categoryId, label, searchValue } = options;

    params.set('query', searchValue);
    params.set('category_uid[filter]', `${label}${DELIMITER}${categoryId}`);

    return `${params}`;
};

/**
 * Return props necessary to render a SuggestedCategory component.
 *
 * @param {Object} props
 * @param {String} props.categoryId - category
 * @param {Function} props.onNavigate - callback to fire on link click
 * @param {String} props.searchValue - search term
 */
export const useSuggestedCategory = props => {
    const { onNavigate, ...restProps } = props;
    const { search } = useLocation();

    const nextSearchParams = setSearchParams(search, restProps);
    const destination = `/search.html?${nextSearchParams}`;

    const handleClick = useCallback(() => {
        if (typeof onNavigate === 'function') {
            onNavigate();
        }
    }, [onNavigate]);

    return {
        destination,
        handleClick
    };
};
