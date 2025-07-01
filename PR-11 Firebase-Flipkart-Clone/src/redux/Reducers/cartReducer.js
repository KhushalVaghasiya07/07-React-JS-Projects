import {
  LOAD_CART,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  UPDATE_QUANTITY,
  CLEAR_CART,
  CART_ERROR,
  LOADING_CART,
} from "../Actions/cartActions";

const initialState = {
  cartItems: [],
  loading: false,
  error: null,
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING_CART:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case LOAD_CART:
      return {
        ...state,
        cartItems: action.payload,
        loading: false,
        error: null,
      };

    case ADD_TO_CART:
      return {
        ...state,
        cartItems: action.payload,
        loading: false,
        error: null,
      };

    case REMOVE_FROM_CART:
      return {
        ...state,
        cartItems: action.payload,
        loading: false,
        error: null,
      };

    case UPDATE_QUANTITY:
      return {
        ...state,
        cartItems: action.payload,
        loading: false,
        error: null,
      };

    case CLEAR_CART:
      return {
        ...state,
        cartItems: [],
        loading: false,
        error: null,
      };

    case CART_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
