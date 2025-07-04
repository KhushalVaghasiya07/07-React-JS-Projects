import {
  createStore,
  combineReducers,
  applyMiddleware,
  compose
} from 'redux';
import { thunk } from 'redux-thunk';

import {
  productListReducer,
  productDetailsReducer,
  productCategoryReducer
} from './Reducers/productReducer';
import { cartReducer } from './Reducers/cartReducer';
import authReducer from './Reducers/authReducer'; // ✅ import it

const rootReducer = combineReducers({
  productList: productListReducer,
  productDetail: productDetailsReducer,
  productCategory: productCategoryReducer,
  cart: cartReducer,
  authReducer, // ✅ finally added
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
