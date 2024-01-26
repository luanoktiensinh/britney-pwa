import { useLazyQuery } from '@apollo/client';
import { GET_BRANDS } from "../../queries/MegaMenu/brands.gql"
import { useEffect, useMemo, useState } from 'react';
export const useBrands = () => {
    const [ search, setSearch ] = useState({label: 'a', value: 'a'});
    const [runQuery, queryResponse] = useLazyQuery(GET_BRANDS, {
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-first'
    });
    useEffect(() => {
        runQuery({
            variables: {
                search: search.value
            }
        });
    }, [search]);
    const {
        loading,
        error,
        data: brandsData
    } = queryResponse;
    const data = useMemo(() => brandsData?.searchBrand?.items ?? [], [brandsData])
    return {
        loading,
        data,
        error,
        search,
        setSearch
    }
}