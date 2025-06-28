// redux/Reducers/cartReducer.js

// Helper: Load cart from localStorage
const loadCartFromLocalStorage = () => {
  try {
    const data = localStorage.getItem("cart");
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Error loading cart from localStorage:", error);
    return [];
  }
};

// Helper: Save cart to localStorage
const saveCartToLocalStorage = (cartItems) => {
  try {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  } catch (error) {
    console.error("Error saving cart to localStorage:", error);
  }
};

const initialState = {
  cartItems: loadCartFromLocalStorage(),
};

export const cartReducer = (state = initialState, action) => {
  let updatedCart;

  switch (action.type) {
    case "ADD_TO_CART":
      const exists = state.cartItems.find(item => item.id === action.payload.id);
      if (exists) {
        updatedCart = state.cartItems.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + (action.payload.quantity || 1) }
            : item
        );
      } else {
        updatedCart = [...state.cartItems, { ...action.payload, quantity: action.payload.quantity || 1 }];
      }
      break;

    case "REMOVE_FROM_CART":
      updatedCart = state.cartItems.filter(item => item.id !== action.payload);
      break;

    case "UPDATE_QUANTITY":
      updatedCart = state.cartItems.map(item =>
        item.id === action.payload.id
          ? { ...item, quantity: Math.max(1, action.payload.quantity) }
          : item
      );
      break;

    case "CLEAR_CART":
      updatedCart = [];
      break;

    default:
      return state;
  }

  // Save updated cart to localStorage
  saveCartToLocalStorage(updatedCart);

  return {
    ...state,
    cartItems: updatedCart,
  };
};
