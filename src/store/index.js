import { combineReducers, createStore, compose as composeEnhancers } from 'redux';
import { enhancer, reducers } from '@magento/peregrine';
import compareProductsReducer from './reducer/compare-products.reducer';

// This is the connective layer between the Peregrine store and the
// venia-concept UI. You can add your own reducers/enhancers here and combine
// them with the Peregrine exports.
//
// example:
// const rootReducer = combineReducers({ ...reducers, ...myReducers });
const rootEnhancer = composeEnhancers(enhancer);
// export default createStore(rootReducer, rootEnhancer);
const rootReducer = combineReducers({
    ...reducers, 
    compare: compareProductsReducer
});

const store = createStore(rootReducer, rootEnhancer);

export default store;
