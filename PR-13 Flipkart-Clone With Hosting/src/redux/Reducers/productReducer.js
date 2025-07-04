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

const initialProductListState = {
  products: [],
  loading: false,
  error: null,
  lastFetched: null,
  totalProducts: 0,
};

export const productListReducer = (state = initialProductListState, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload.products || action.payload,
        totalProducts: action.payload.totalCount || action.payload.length,
        lastFetched: Date.now(),
        error: null,
      };

    case FETCH_PRODUCTS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        products: [],
        totalProducts: 0,
      };

    case ADD_PRODUCT:
      return {
        ...state,
        products: [action.payload, ...state.products],
        totalProducts: state.totalProducts + 1,
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
        totalProducts: Math.max(0, state.totalProducts - 1),
      };

    default:
      return state;
  }
};

const initialProductDetailState = {
  product: null,
  loading: false,
  error: null,
  lastFetched: null,
};

export const productDetailsReducer = (state = initialProductDetailState, action) => {
  switch (action.type) {
    case FETCH_PRODUCT_BY_ID_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case FETCH_PRODUCT_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        product: action.payload,
        lastFetched: Date.now(),
        error: null,
      };

    case FETCH_PRODUCT_BY_ID_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        product: null,
      };

    case CLEAR_PRODUCT_DETAIL:
      return initialProductDetailState;

    default:
      return state;
  }
};

const initialCategoryState = {
  productsByCategory: {},
  loadingCategories: {},
  errors: {},
};

export const productCategoryReducer = (state = initialCategoryState, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS_REQUEST:
      return {
        ...state,
        loadingCategories: {
          ...state.loadingCategories,
          [action.meta?.category]: true,
        },
        errors: {
          ...state.errors,
          [action.meta?.category]: null,
        },
      };

    case FETCH_PRODUCTS_BY_CATEGORY:
      return {
        ...state,
        productsByCategory: {
          ...state.productsByCategory,
          [action.payload.category]: action.payload.products,
        },
        loadingCategories: {
          ...state.loadingCategories,
          [action.payload.category]: false,
        },
        errors: {
          ...state.errors,
          [action.payload.category]: null,
        },
      };

    case FETCH_PRODUCTS_FAIL:
      return {
        ...state,
        loadingCategories: {
          ...state.loadingCategories,
          [action.meta?.category]: false,
        },
        errors: {
          ...state.errors,
          [action.meta?.category]: action.payload,
        },
      };

    default:
      return state;
  }
};
