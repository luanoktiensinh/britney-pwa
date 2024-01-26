import { useMutation } from '@apollo/client';
import { CREATE_COMPARE_LIST, ADD_COMPARE_ITEM, REMOVE_COMPARE_ITEM } from '/src/queries/compare-product.gql.js';
import { useDispatch, useSelector } from 'react-redux';
import { setStateCreditor } from 'src/store/actions/compare-products.action';

const arrAttrs2Obj = attrs => {
    let result = {};
    attrs.forEach(attr => result[attr.code] = attr.value);
    return result;
}
export const getProductFromRes = resItems => {
    let products = [];
    if(resItems?.length) {
        products = resItems.map(resItem => (
            {
                ...resItem.product,
                _attributes: arrAttrs2Obj(resItem.attributes)
            }
        ));
    }
    return products;
}
export const useCompareProduct = () => {
    const dispatch = useDispatch();
    const compareListUid = useSelector(state => state.compare.uid);
    const products = useSelector(state => state.compare.products);
    const isSignedIn = useSelector(state => state.user.isSignedIn);
    const [_addProducts] = useMutation(compareListUid ? ADD_COMPARE_ITEM : CREATE_COMPARE_LIST);
    const [removeProduct] = useMutation(REMOVE_COMPARE_ITEM);

    const handleResponse = (data, strFn) => {
        const compareList = data[strFn];
        const { uid, items, attributes } = compareList;
        const products = getProductFromRes(items);
        dispatch(setStateCreditor({uid, products, attributes, isSignedIn}))
        return {
            products
        };
    }
    const addProducts = async (productIds) => {
        const variables = {
            input: {
                products: productIds
            }
        }
        if(compareListUid) {
            variables.input.uid = compareListUid
        }
        try {
            const {data} = await _addProducts({variables});
            const { products } = handleResponse(data, compareListUid ? 'addProductsToCompareList': 'createCompareList');
            return {
                success: true,
                products: products.filter(product => productIds.includes(product.id))
            };
        }
        catch(e) {
            console.log(e);
            return {
                success: false,
                message: e.message
            };
        }
    };
    const removeProducts = async (productIds = [], uid = compareListUid) => {

        const variables = {
            input: {
                uid,
                products: productIds
            }
        }
        try {
            const { data } = await removeProduct({variables});
            handleResponse(data, 'removeProductsFromCompareList');
            return {
                success: true,
                products: products.filter(product => productIds.includes(product.id))
            };
        }
        catch(e) {
            console.log(e);
            return {
                success: false,
                message: e.message
            }
        }
    };
    return {
        addProducts,
        removeProducts
    };
}
