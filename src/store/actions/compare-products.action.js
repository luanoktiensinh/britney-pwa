
import { GET_COMPARE_LIST, GET_CUSTOMER_COMPARE_LIST } from 'src/queries/compare-product.gql';
import { getProductFromRes } from 'src/composables/useCompareProduct.js';
import { ApolloError } from '@apollo/client';
export const keyStore = 'pwa-compare-list-id';
export const ACTIONS = {
    SET_STATE: 'set_state'
}
export const getInitialValue = async ({currentUser, isSignedIn}, dispatch, a, {apolloClient}) => {
    if(isSignedIn && !currentUser.email) return;
    let compareList = [];
    let uid = '';
    try {
        if(isSignedIn) {
            const { data } = await apolloClient.query({
                query: GET_CUSTOMER_COMPARE_LIST,
                fetchPolicy: "no-cache"
            });
            compareList = data.customer.compare_list ?? {};
        }
        else {
            uid = localStorage.getItem(keyStore);
            if(uid) {
                const { data } = await apolloClient.query({
                    query: GET_COMPARE_LIST,
                    variables: { id: uid },
                    fetchPolicy: "no-cache"
                });
                compareList = data.compareList;
            }
        }
    }
    catch(e) {
        if(e instanceof ApolloError) {
            localStorage.removeItem(keyStore);
        }
    }
    uid = compareList?.uid || '';
    const products = getProductFromRes(compareList?.items);
    const {attributes = []} = compareList || [];
    dispatch(setStateCreditor({products, attributes, uid, isSignedIn}));
}

export const setStateCreditor = payload => {
    return {
        type: ACTIONS.SET_STATE,
        payload
    }
}