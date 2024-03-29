import { gql } from '@apollo/client';

import { ProductDetailsFragment } from '@magento/peregrine/lib/talons/RootComponents/Product/productDetailFragment.gql';

export const GET_STORE_CONFIG_DATA = gql`
    query getStoreConfigData {
        # eslint-disable-next-line @graphql-eslint/require-id-when-available
        storeConfig {
            store_code
            product_url_suffix
        }
    }
`;

export const GET_PRODUCT_DETAIL_QUERY = gql`
    query getProductDetailForProductPage($urlKey: String!) {
        products(filter: { url_key: { eq: $urlKey } }) {
            items {
                id
                uid
                related_products {
                    id
                    uid
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
                    badges {
                        label
                        extra_text
                        type
                    }
                    small_image {
                        url
                    }
                    stock_status
                    __typename
                    url_key
                }
                crosssell_products {
                    id
                    uid
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
                    badges {
                        label
                        extra_text
                        type
                    }
                    small_image {
                        url
                    }
                    stock_status
                    __typename
                    url_key
                }
                upsell_products {
                    id
                    uid
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
                    badges {
                        label
                        extra_text
                        type
                    }
                    small_image {
                        url
                    }
                    stock_status
                    __typename
                    url_key
                }
                ...ProductDetailsFragment
            }
        }
    }
    ${ProductDetailsFragment}
`;

export default {
    getStoreConfigData: GET_STORE_CONFIG_DATA,
    getProductDetailQuery: GET_PRODUCT_DETAIL_QUERY
};