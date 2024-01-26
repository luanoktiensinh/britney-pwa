import { handleActions } from 'redux-actions';
import { ACTIONS, keyStore } from '../actions/compare-products.action';

const initialState = {
    uid: '',
    isLoaded: false,
    attributes: [],
    products: []
};

const reducerMap = {
    [ACTIONS.SET_STATE]: (state, {payload}) => {
        const { uid, products, attributes, isSignedIn } = payload;
        if(payload.uid && !isSignedIn) {
            localStorage.setItem(keyStore, payload.uid)
        }
        return {
            ...state,
            isLoaded: true,
            ...{ uid, products, attributes }
        }
    }
}
export default handleActions(reducerMap, initialState);