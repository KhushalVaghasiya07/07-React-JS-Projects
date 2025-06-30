import {
  createStore,
  combineReducers,
  applyMiddleware,
  compose
} from 'redux';
import {thunk} from 'redux-thunk';

import {
  productListReducer,
  productDetailsReducer,
  productCategoryReducer
} from './Reducers/productReducer';
import { cartReducer } from './Reducers/cartReducer';

// Combine all reducers
const rootReducer = combineReducers({
  productList: productListReducer,
  productDetail: productDetailsReducer,
  productCategory: productCategoryReducer,
  cart: cartReducer,
});

// Middlewares
const middleware = [thunk];

// DevTools setup
const composeEnhancers =
  (typeof window !== 'undefined' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

// Create and export the store
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middleware))
);

export default store;
