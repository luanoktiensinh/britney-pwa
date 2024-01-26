import { useCallback, useEffect, useMemo } from 'react';
import { useLazyQuery, useQuery } from '@apollo/client';

import mergeOperations from '@magento/peregrine/lib/util/shallowMerge';

import DEFAULT_OPERATIONS from '@magento/peregrine/lib/talons/CategoryTree/categoryTree.gql';
import megaMenuGql from 'src/queries/MegaMenu/megaMenu.gql';
import _ from 'lodash';
/**
 * @typedef {object} CategoryNode
 * @prop {object} category - category data
 * @prop {boolean} isLeaf - true if the category has no children
 */

/**
 * @typedef { import("graphql").DocumentNode } DocumentNode
 */

/**
 * Returns props necessary to render a CategoryTree component.
 *
 * @param {object} props
 * @param {number} props.categoryId - category id for this node
 * @param {DocumentNode} props.query - GraphQL query
 * @param {function} props.updateCategories - bound action creator
 * @return {{ childCategories: Map<number, CategoryNode> }}
 */
export const useCategoryTree = props => {
    const { categoryId, updateCategories, setCategoryId } = props;

    const operations = mergeOperations(DEFAULT_OPERATIONS, props.operations, {getNavigationMenuQuery: megaMenuGql.getMegaMenuQuery});
    const { getNavigationMenuQuery } = operations;

    const [runQuery, queryResult] = useLazyQuery(getNavigationMenuQuery, {
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-first'
    });
    const { data } = queryResult;
    const footerIcons = useMemo(() => data?.getDynamicMenu?.footer_icons ?? [], [data]);
    const addParent = useCallback((item = {}) => {
        const { children = [], id } = item;
        for(let child of children) {
            if(id) {
                child.parentId = id;
            }
            if(child?.children?.length) {
                addParent(child);
            }
        }
    }, []);
    const items = useMemo(() => {
        const items = _.cloneDeep(data?.getDynamicMenu?.menu_items ?? []);
        addParent({children: items});
        return items

    }, [data]);
    useEffect(() => runQuery() , []);
    // update redux with fetched categories
    useEffect(() => {
        if (data?.categories && data.categories.items[0]) {
            updateCategories(data.categories.items[0]);
        }
    }, [data, updateCategories]);
    const findNestedObj = useCallback((entireObj, keyToFind, valToFind) => {
        let foundObj;
        JSON.stringify(entireObj, (_, nestedValue) => {
          if (nestedValue && nestedValue[keyToFind] === valToFind) {
            foundObj = nestedValue;
          }
          return nestedValue;
        });
        return foundObj;
    });
    const rootCategory = useMemo(() => {
        return categoryId ? findNestedObj(items, 'id', categoryId) : { children: items };
    }, [data, categoryId, findNestedObj]);
    const { children = [] } = rootCategory || {};
    const childCategories = useMemo(() => {
        const childCategories = new Map();

        // Add the root category when appropriate.
        if (
            rootCategory &&
            rootCategory.id
        ) {
            childCategories.set(rootCategory.id, {
                category: rootCategory,
                isLeaf: true
            });
        }

        children.map(category => {
            if (category.id) {
                const isLeaf = !category.children?.length;
                childCategories.set(category.id, { category, isLeaf });
            }
        });

        return childCategories;
    }, [children, rootCategory]);
    const onBack = useCallback(() => {
        const parentId = rootCategory?.parentId ?? 0;
        setCategoryId(parentId);
    }, [categoryId]);
    return { childCategories, data, footerIcons, rootCategory, onBack };
};
