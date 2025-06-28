import {
  ADD_PRODUCT,
  UPDATE_PRODUCT,
  FETCH_PRODUCT,
  FETCH_PRODUCT_FAIL
} from "../Actions/productActions";

const initialState = {
  currentProduct: null,
  error: null,
};

export const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCT:
      return { ...state, currentProduct: action.payload, error: null };
    case FETCH_PRODUCT_FAIL:
      return { ...state, currentProduct: null, error: action.error };
    case ADD_PRODUCT:
      return { ...state, error: null };
    case UPDATE_PRODUCT:
      return { ...state, error: null };
    default:
      return state;
  }
};
