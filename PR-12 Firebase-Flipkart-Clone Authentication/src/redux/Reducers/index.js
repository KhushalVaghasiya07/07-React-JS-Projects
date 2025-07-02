// redux/reducers/rootReducer.js
import { combineReducers } from 'redux';
import {
  productListReducer,
  productDetailsReducer,
  productCategoryReducer
} from './productReducer';

import { cartReducer } from './cartReducer';
import authReducer from './authReducer'; // ✅ Import it

const rootReducer = combineReducers({
  productList: productListReducer,
  productDetail: productDetailsReducer,
  productCategory: productCategoryReducer,
  cart: cartReducer,
  authReducer: authReducer, // ✅ Add this here
});

export default rootReducer;
