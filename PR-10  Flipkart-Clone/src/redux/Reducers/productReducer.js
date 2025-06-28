// redux/Reducers/productReducer.js

// 📦 Product List State (for all products)
const productListState = {
  products: [],
  loading: false,
  error: null,
};

export const productListReducer = (state = productListState, action) => {
  switch (action.type) {
    case "FETCH_PRODUCTS_REQUEST":
      return { ...state, loading: true };

    case "FETCH_PRODUCTS_SUCCESS":
      return {
        ...state,
        loading: false,
        products: action.payload,
        error: null,
      };

    case "FETCH_PRODUCTS_FAIL":
      return {
        ...state,
        loading: false,
        error: action.payload,
        products: [],
      };

    default:
      return state;
  }
};

// 🧾 Single Product Detail (for detail page)
const productDetailState = {
  product: null,
  loading: false,
  error: null,
};

export const productDetailsReducer = (state = productDetailState, action) => {
  switch (action.type) {
    case "FETCH_PRODUCT_BY_ID_REQUEST":
      return { ...state, loading: true, error: null };

    case "FETCH_PRODUCT_BY_ID_SUCCESS":
      return {
        ...state,
        loading: false,
        product: action.payload,
      };

    case "FETCH_PRODUCT_BY_ID_FAIL":
      return {
        ...state,
        loading: false,
        error: action.payload,
        product: null,
      };

    case "CLEAR_PRODUCT_DETAIL":
      return { ...state, product: null };

    default:
      return state;
  }
};

// 🧃 Category-based Product State (for carousel)
const categoryProductState = {
  productsByCategory: {},
};

export const productCategoryReducer = (state = categoryProductState, action) => {
  switch (action.type) {
    case "FETCH_PRODUCTS_BY_CATEGORY":
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

