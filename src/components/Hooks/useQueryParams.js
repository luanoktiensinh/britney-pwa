import { useCallback, useMemo, useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import { getSearchParam } from '@magento/peregrine/lib/hooks/useSearchParam.js';

/**
 * Sets a query parameter in history.
 *
 * @private
 */
const setQueryParam = ({ history, location, parameter, replace, value }) => {
    const { search } = location;
    const queryParams = new URLSearchParams(search);

    queryParams.set(parameter, value);
        const destination = { search: queryParams.toString() };

    if (replace) {
        history.replace(destination);
    } else {
        history.push(destination);
    }
};

export const useQueryParams = (props = {}) => {
    const { params = {pageSize: 'page_size', sort: 'sort', page: 'page'}, initialValues = {pageSize: 12, sort: ""}, namespace = '' } = props;

    const history = useHistory();
    const location = useLocation();

    const pageSearchParam = namespace ? `${namespace}_${params.page}` : params.page;
    const pageSizeSearchParam = namespace ? `${namespace}_${params.pageSize}` : params.pageSize;
    const sortSeachParam = namespace ? `${namespace}_${params.sort}` : params.sort;
    const currentPageSize = parseInt(getSearchParam(pageSizeSearchParam, location));
    const currentSortParam = getSearchParam(sortSeachParam, location);

    const setCurrentPage = useCallback(
        (page, replace = false) => {
            // Update the query parameter.
            setQueryParam({
                history,
                location,
                parameter: pageSearchParam,
                replace,
                value: page
            });
        },
        [history, location]
    );

    // use the location to hold state
    const setCurrentPageSize = useCallback(
        (value, replace = false) => {
            // Update the query parameter.
            setQueryParam({
                history,
                location,
                parameter: pageSizeSearchParam,
                replace,
                value
            });
        },
        [history, location]
    );

    const setCurrentSortParam = useCallback(
        (value, replace = false) => {
            // Update the query parameter.
            setQueryParam({
                history,
                location,
                parameter: sortSeachParam,
                replace,
                value
            });
        },
        [history, location]
    );

    // ensure the location contains a page number
    useEffect(() => {
        if (!currentPageSize) {
            setCurrentPageSize(initialValues.pageSize, true);
        }
        if (!currentSortParam) {
            setCurrentSortParam(initialValues.sort, true);
        }
    }, [
        currentPageSize,
        setCurrentPageSize,
        currentSortParam,
        setCurrentSortParam
    ]);

    const queryParamsState = {
        currentPageSize,
        currentSortParam
    };

    const queryParamsApi = useMemo(
        () => ({
            setCurrentPageSize,
            setCurrentSortParam,
            setCurrentPage
        }),
        [setCurrentPageSize, setCurrentSortParam, setCurrentPage]
    );

    return [queryParamsState, queryParamsApi];
};