// redux/Reducers/productReducer.js

import {
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAIL,
  FETCH_PRODUCT_BY_ID_REQUEST,
  FETCH_PRODUCT_BY_ID_SUCCESS,
  FETCH_PRODUCT_BY_ID_FAIL,
  CLEAR_PRODUCT_DETAIL,
  FETCH_PRODUCTS_BY_CATEGORY,
  ADD_PRODUCT,
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
} from "../Actions/productActions";


// 🛒 Product List Reducer
const productListState = {
  products: [],
  loading: false,
  error: null,
};

export const productListReducer = (state = productListState, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS_REQUEST:
      return { ...state, loading: true };

    case FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload,
        error: null,
      };

    case FETCH_PRODUCTS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        products: [],
      };

    case ADD_PRODUCT:
      return {
        ...state,
        products: [...state.products, action.payload],
      };

    case UPDATE_PRODUCT:
      return {
        ...state,
        products: state.products.map((product) =>
          product.id === action.payload.id ? action.payload : product
        ),
      };

    case DELETE_PRODUCT:
      return {
        ...state,
        products: state.products.filter(
          (product) => product.id !== action.payload
        ),
      };

    default:
      return state;
  }
};


// 📦 Single Product Detail Reducer
const productDetailState = {
  product: null,
  loading: false,
  error: null,
};

export const productDetailsReducer = (state = productDetailState, action) => {
  switch (action.type) {
    case FETCH_PRODUCT_BY_ID_REQUEST:
      return { ...state, loading: true, error: null };

    case FETCH_PRODUCT_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        product: action.payload,
      };

    case FETCH_PRODUCT_BY_ID_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        product: null,
      };

    case CLEAR_PRODUCT_DETAIL:
      return {
        ...state,
        product: null,
        error: null,
        loading: false,
      };

    default:
      return state;
  }
};


// 🎯 Category-based Product Reducer
const categoryProductState = {
  productsByCategory: {},
};

export const productCategoryReducer = (state = categoryProductState, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS_BY_CATEGORY:
      return {
        ...state,
        productsByCategory: {
          ...state.productsByCategory,
          [action.payload.category]: action.payload.products,
        },
      };

    default:
      return state;
  }
};
