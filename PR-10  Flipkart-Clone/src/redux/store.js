import { createStore, combineReducers, applyMiddleware } from "redux";
import {thunk} from "redux-thunk";

import {
  productListReducer,
  productDetailsReducer,
  productCategoryReducer,
} from "./Reducers/productReducer";

import { cartReducer } from "./Reducers/cartReducer";

const rootReducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  productCategory: productCategoryReducer,
  cart: cartReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
