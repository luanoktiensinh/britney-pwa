import { gql } from '@apollo/client';

export const compareList = gql `
    fragment CompareDetail on CompareList {
        uid
        item_count,
        attributes {
            code
            label
        }
        items {
            attributes {
                code
                value
            }
            product {
                id
                uid
                url_rewrites {
                    url
                }
                url_suffix
                url_key
                name
                price_range {
                    maximum_price {
                        final_price {
                            currency
                            value
                        }
                        regular_price {
                            currency
                            value 
                        }
                        discount {
                            amount_off
                        }
                    }
                }
                sku
                stock_status
                review_count
                small_image {
                    label
                    url
                }
            }
        }
    }
`;

export const CREATE_COMPARE_LIST = gql `
    ${compareList}
    mutation ($input: CreateCompareListInput) {
        createCompareList(input: $input) {
            ...CompareDetail
        }
    }
`;
export const GET_COMPARE_LIST = gql `
    ${compareList}
    query ($id: ID!) {
        compareList(uid: $id) {
            ...CompareDetail
        }
    }
`;

export const GET_CUSTOMER_COMPARE_LIST = gql `
    ${compareList}
    {
        customer {
            compare_list {
                ...CompareDetail
            }
        }
    }
`;

export const ADD_COMPARE_ITEM = gql`
    ${compareList}
    mutation ($input: AddProductsToCompareListInput) {
        addProductsToCompareList(input: $input) {
            ...CompareDetail
        }
    }
`;

export const REMOVE_COMPARE_ITEM = gql `
    ${compareList}
    mutation($input: RemoveProductsFromCompareListInput) {
        removeProductsFromCompareList(input: $input) {
            ...CompareDetail
        }
    }
`;

export const REMOVE_COMPARE_LIST = gql `
    mutation ($uid_1: ID!) {
        deleteCompareList(uid: $uid_1) {
            result
        }
    }
`;
