import { combineReducers } from 'redux';
import {
  productListReducer,
  productDetailsReducer,
  productCategoryReducer,
} from './productReducer';

// 🛒 LocalStorage Helpers
const loadCart = () => {
  try {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
  } catch (err) {
    console.error("🛑 Error loading cart from localStorage:", err);
    return [];
  }
};

const saveCart = (cartItems) => {
  try {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  } catch (err) {
    console.error("🛑 Error saving cart to localStorage:", err);
  }
};

// 🛒 Cart Reducer
const cartReducer = (state = loadCart(), action) => {
  let newState;

  switch (action.type) {
    case "ADD_TO_CART":
      const exists = state.find(item => item.id === action.payload.id);
      if (exists) {
        newState = state.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + (action.payload.quantity || 1) }
            : item
        );
      } else {
        newState = [...state, { ...action.payload, quantity: action.payload.quantity || 1 }];
      }
      break;

    case "REMOVE_FROM_CART":
      newState = state.filter(item => item.id !== action.payload);
      break;

    case "UPDATE_QUANTITY":
      newState = state.map(item =>
        item.id === action.payload.id
          ? { ...item, quantity: Math.max(1, action.payload.quantity) }
          : item
      );
      break;

    case "CLEAR_CART":
      newState = [];
      break;

    default:
      return state;
  }

  saveCart(newState);
  return newState;
};

// 🧠 Root Reducer combining all slices
const rootReducer = combineReducers({
  productList: productListReducer,       // list of all products
  productDetail: productDetailsReducer,  // single product detail
  productCategory: productCategoryReducer, // filtered by category
  cart: cartReducer                      // shopping cart
});

export default rootReducer;
