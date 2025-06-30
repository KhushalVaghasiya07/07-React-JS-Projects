import { combineReducers } from 'redux';
import {
  productListReducer,        // All products list
  productDetailsReducer,     // Single product detail
  productCategoryReducer     // Filtered by category
} from './productReducer';

import { cartReducer } from './cartReducer'; // ✅ Firebase-based cart reducer

const rootReducer = combineReducers({
  productList: productListReducer,
  productDetail: productDetailsReducer,
  productCategory: productCategoryReducer,
  cart: cartReducer
});

export default rootReducer;
