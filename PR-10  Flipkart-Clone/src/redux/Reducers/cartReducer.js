import { ADD_TO_CART, REMOVE_FROM_CART } from '../Actions/cartActions';

const initialState = {
  cartItems: JSON.parse(localStorage.getItem('cart')) || []
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x.id === item.id);

      const updatedCartItems = existItem
        ? state.cartItems.map((x) =>
            x.id === existItem.id ? { ...x, quantity: x.quantity + 1 } : x
          )
        : [...state.cartItems, { ...item, quantity: 1 }];

      localStorage.setItem('cart', JSON.stringify(updatedCartItems));

      return {
        ...state,
        cartItems: updatedCartItems
      };

    case REMOVE_FROM_CART:
      const filteredItems = state.cartItems.filter(
        (x) => x.id !== action.payload
      );

      localStorage.setItem('cart', JSON.stringify(filteredItems));

      return {
        ...state,
        cartItems: filteredItems
      };

    default:
      return state;
  }
};

export default cartReducer;