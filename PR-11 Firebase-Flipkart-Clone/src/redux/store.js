import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { thunk } from "redux-thunk";

import {
  productListReducer,
  productDetailsReducer,
  productCategoryReducer,
} from "./Reducers/productReducer";

import { cartReducer } from "./Reducers/cartReducer";

// ✅ Combine all reducers
const rootReducer = combineReducers({
  productList: productListReducer,
  productDetail: productDetailsReducer,     // ✅ Renamed to match useSelector
  productCategory: productCategoryReducer,
  cart: cartReducer,
});

// ✅ Setup for Redux DevTools + Thunk Middleware
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
