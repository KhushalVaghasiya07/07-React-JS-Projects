import { combineReducers } from 'redux';
import { productReducer } from './productReducer'; // ✅ Add this line

// Helper function to load cart from localStorage
const loadCart = () => {
  try {
    const serializedCart = localStorage.getItem('cart');
    if (serializedCart === null) return [];
    return JSON.parse(serializedCart);
  } catch (err) {
    console.error("Could not load cart from localStorage", err);
    return [];
  }
};

// Helper function to save cart to localStorage
const saveCart = (cartItems) => {
  try {
    const serializedCart = JSON.stringify(cartItems);
    localStorage.setItem('cart', serializedCart);
  } catch (err) {
    console.error("Could not save cart to localStorage", err);
  }
};

// ✅ Products list reducer
const productsReducer = (
  state = { loading: false, products: [], error: null },
  action
) => {
  switch (action.type) {
    case "FETCH_PRODUCTS_REQUEST":
      return { ...state, loading: true, error: null };
    case "FETCH_PRODUCTS_SUCCESS":
      return { ...state, loading: false, products: action.payload };
    case "FETCH_PRODUCTS_FAIL":
      return { ...state, loading: false, error: action.payload };
    case "SET_PRODUCTS":
      return { ...state, products: action.payload };
    default:
      return state;
  }
};

// ✅ Cart reducer with complete functionality
const cartReducer = (state = loadCart(), action) => {
  let newState;

  switch (action.type) {
    case "ADD_TO_CART":
      const existingItem = state.find(item => item.id === action.payload.id);
      if (existingItem) {
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

// ✅ Combine all reducers including productReducer
export default combineReducers({
  products: productsReducer,
  cart: cartReducer,
  productReducer, // ✅ This is necessary for single product view to work
});
