// src/redux/Reducers/index.js

import { combineReducers } from 'redux';
import {
  productListReducer,
  productDetailsReducer,
  productCategoryReducer
} from './productReducer';

import { cartReducer } from './cartReducer';
// ✅ Import the new authReducer
import authReducer from './authReducer';

const rootReducer = combineReducers({
  productList: productListReducer,
  productDetail: productDetailsReducer,
  productCategory: productCategoryReducer,
  cart: cartReducer,
  // ✅ Add the authReducer to your combined reducers
  auth: authReducer
});

export default rootReducer;