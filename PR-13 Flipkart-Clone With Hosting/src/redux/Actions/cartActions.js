import { doc, setDoc, getDoc, collection, addDoc, Timestamp } from "firebase/firestore";
import { database } from "../../firebase";

// Action Types
export const LOAD_CART = "LOAD_CART";
export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const UPDATE_QUANTITY = "UPDATE_QUANTITY";
export const CLEAR_CART = "CLEAR_CART";
export const CART_ERROR = "CART_ERROR";
export const LOADING_CART = "LOADING_CART";

// Firestore doc reference
const getCartRef = (userId) => {
  if (!userId) throw new Error("User ID required to access cart");
  return doc(database, "userCarts", userId);
};

// Load Cart
export const loadCart = (userId = "guest_cart") => async (dispatch) => {
  try {
    dispatch({ type: LOADING_CART });
    const cartRef = getCartRef(userId);
    const cartSnap = await getDoc(cartRef);

    if (cartSnap.exists()) {
      dispatch({ type: LOAD_CART, payload: cartSnap.data().items || [] });
    } else {
      await setDoc(cartRef, { items: [] });
      dispatch({ type: LOAD_CART, payload: [] });
    }
  } catch (error) {
    dispatch({ type: CART_ERROR, payload: error.message });
    console.error("loadCart error:", error.message);
  }
};

// Add to Cart
export const addToCart = (product, userId = "guest_cart") => async (dispatch) => {
  try {
    dispatch({ type: LOADING_CART });
    const cartRef = getCartRef(userId);
    const cartSnap = await getDoc(cartRef);
    const existingItems = cartSnap.exists() ? cartSnap.data().items || [] : [];

    const index = existingItems.findIndex((item) => item.id === product.id);
    const updatedItems =
      index >= 0
        ? existingItems.map((item, i) =>
            i === index ? { ...item, quantity: item.quantity + (product.quantity || 1) } : item
          )
        : [...existingItems, { ...product, quantity: product.quantity || 1 }];

    await setDoc(cartRef, { items: updatedItems });
    dispatch({ type: ADD_TO_CART, payload: updatedItems });
    dispatch(loadCart(userId));
  } catch (error) {
    dispatch({ type: CART_ERROR, payload: error.message });
    console.error("addToCart error:", error.message);
  }
};

// Remove from Cart
export const removeFromCart = (productId, userId = "guest_cart") => async (dispatch) => {
  try {
    dispatch({ type: LOADING_CART });
    const cartRef = getCartRef(userId);
    const cartSnap = await getDoc(cartRef);
    const existingItems = cartSnap.exists() ? cartSnap.data().items || [] : [];

    const updatedItems = existingItems.filter((item) => item.id !== productId);
    await setDoc(cartRef, { items: updatedItems });
    dispatch({ type: REMOVE_FROM_CART, payload: updatedItems });
    dispatch(loadCart(userId));
  } catch (error) {
    dispatch({ type: CART_ERROR, payload: error.message });
    console.error("removeFromCart error:", error.message);
  }
};

// Update Quantity
export const updateQuantity = (productId, actionType, userId = "guest_cart") => async (dispatch) => {
  try {
    dispatch({ type: LOADING_CART });
    const cartRef = getCartRef(userId);
    const cartSnap = await getDoc(cartRef);
    const existingItems = cartSnap.exists() ? cartSnap.data().items || [] : [];

    const updatedItems = existingItems.map((item) => {
      if (item.id === productId) {
        let qty = item.quantity;
        if (actionType === "increase") qty += 1;
        if (actionType === "decrease") qty = Math.max(1, qty - 1);
        return { ...item, quantity: qty };
      }
      return item;
    });

    await setDoc(cartRef, { items: updatedItems });
    dispatch({ type: UPDATE_QUANTITY, payload: updatedItems });
    dispatch(loadCart(userId));
  } catch (error) {
    dispatch({ type: CART_ERROR, payload: error.message });
    console.error("updateQuantity error:", error.message);
  }
};

// Clear Cart
export const clearCart = (userId = "guest_cart") => async (dispatch) => {
  try {
    dispatch({ type: LOADING_CART });
    const cartRef = getCartRef(userId);
    await setDoc(cartRef, { items: [] });
    dispatch({ type: CLEAR_CART, payload: [] });
    dispatch(loadCart(userId));
  } catch (error) {
    dispatch({ type: CART_ERROR, payload: error.message });
    console.error("clearCart error:", error.message);
  }
};

// Place Order
export const placeOrder = (userId, orderData) => async (dispatch) => {
  try {
    const ordersRef = collection(database, "userOrders");
    const newOrder = {
      userId,
      items: orderData.items,
      total: orderData.total,
      paymentMethod: orderData.paymentMethod || "cod",
      createdAt: Timestamp.now(),
    };

    await addDoc(ordersRef, newOrder);
    console.log("Order placed successfully");
    dispatch(clearCart(userId));
  } catch (error) {
    console.error("placeOrder error:", error.message);
  }
};
