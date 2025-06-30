import { combineReducers } from 'redux';
import {
  productListReducer,      
  productDetailsReducer,
  productCategoryReducer
} from './productReducer';

import { cartReducer } from './cartReducer';

const rootReducer = combineReducers({
  productList: productListReducer,
  productDetail: productDetailsReducer,
  productCategory: productCategoryReducer,
  cart: cartReducer
});

export default rootReducer;
