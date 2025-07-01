// src/redux/store.js

import {
  createStore,
  combineReducers, // Keep combineReducers here
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
// ✅ Import the new authReducer
import authReducer from './Reducers/authReducer'; // Adjust path if needed

const rootReducer = combineReducers({
  productList: productListReducer,
  productDetail: productDetailsReducer,
  productCategory: productCategoryReducer,
  cart: cartReducer,
  // ✅ Add the authReducer here
  auth: authReducer,
});

const middleware = [thunk];

const composeEnhancers =
  (typeof window !== 'undefined' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middleware))
);

export default store;