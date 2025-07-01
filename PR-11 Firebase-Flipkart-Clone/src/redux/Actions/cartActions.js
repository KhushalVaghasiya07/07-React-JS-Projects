import { doc, setDoc, getDoc } from "firebase/firestore";
import { database } from "../../firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore"; // 🆕


export const LOAD_CART = "LOAD_CART";
export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const UPDATE_QUANTITY = "UPDATE_QUANTITY";
export const CLEAR_CART = "CLEAR_CART";
export const CART_ERROR = "CART_ERROR";
export const LOADING_CART = "LOADING_CART";


const getCartRef = (userId) => {
  if (!userId) throw new Error("User ID is required to access cart");
  return doc(database, "userCarts", userId);
};

export const loadCart = (userId) => async (dispatch) => {
  try {
    dispatch({ type: LOADING_CART });
    const cartRef = getCartRef(userId);
    const cartSnap = await getDoc(cartRef);

    console.log("📦 Cart Data:", cartSnap.exists() ? cartSnap.data() : "No cart found");

    if (cartSnap.exists()) {
      dispatch({
        type: LOAD_CART,
        payload: cartSnap.data().items || [],
      });
    } else {
      await setDoc(cartRef, { items: [] });
      dispatch({ type: LOAD_CART, payload: [] });
    }
  } catch (error) {
    dispatch({ type: CART_ERROR, payload: error.message });
    console.error("🔥 loadCart error:", error.message);
  }
};

export const addToCart = (product, userId) => async (dispatch) => {
  try {
    dispatch({ type: LOADING_CART });
    const cartRef = getCartRef(userId);
    const cartSnap = await getDoc(cartRef);

    const existingItems = cartSnap.exists() ? cartSnap.data().items || [] : [];
    const index = existingItems.findIndex((item) => item.id === product.id);

    const updatedItems = index >= 0
      ? existingItems.map((item, i) =>
          i === index ? { ...item, quantity: item.quantity + (product.quantity || 1) } : item
        )
      : [...existingItems, { ...product, quantity: product.quantity || 1 }];

    await setDoc(cartRef, { items: updatedItems });
    dispatch({ type: ADD_TO_CART, payload: updatedItems });

    // ✅ Reload cart to keep synced
    dispatch(loadCart(userId));
  } catch (error) {
    dispatch({ type: CART_ERROR, payload: error.message });
    console.error("🔥 addToCart error:", error.message);
  }
};

export const removeFromCart = (productId, userId) => async (dispatch) => {
  try {
    dispatch({ type: LOADING_CART });
    const cartRef = getCartRef(userId);
    const cartSnap = await getDoc(cartRef);

    const existingItems = cartSnap.exists() ? cartSnap.data().items || [] : [];
    const updatedItems = existingItems.filter((item) => item.id !== productId);

    await setDoc(cartRef, { items: updatedItems });
    dispatch({ type: REMOVE_FROM_CART, payload: updatedItems });

    // ✅ Keep UI updated
    dispatch(loadCart(userId));
  } catch (error) {
    dispatch({ type: CART_ERROR, payload: error.message });
    console.error("🔥 removeFromCart error:", error.message);
  }
};

export const updateQuantity = (productId, actionType, userId) => async (dispatch) => {
  try {
    dispatch({ type: LOADING_CART });
    const cartRef = getCartRef(userId);
    const cartSnap = await getDoc(cartRef);

    const existingItems = cartSnap.exists() ? cartSnap.data().items || [] : [];
    const updatedItems = existingItems.map((item) => {
      if (item.id === productId) {
        let newQty = item.quantity;
        if (actionType === "increase") newQty += 1;
        else if (actionType === "decrease") newQty = Math.max(1, newQty - 1);
        return { ...item, quantity: newQty };
      }
      return item;
    });

    await setDoc(cartRef, { items: updatedItems });
    dispatch({ type: UPDATE_QUANTITY, payload: updatedItems });

    // ✅ Refresh the cart
    dispatch(loadCart(userId));
  } catch (error) {
    dispatch({ type: CART_ERROR, payload: error.message });
    console.error("🔥 updateQuantity error:", error.message);
  }
};

export const clearCart = (userId) => async (dispatch) => {
  try {
    dispatch({ type: LOADING_CART });
    const cartRef = getCartRef(userId);
    await setDoc(cartRef, { items: [] });
    dispatch({ type: CLEAR_CART, payload: [] });

    // ✅ Sync again to confirm empty state
    dispatch(loadCart(userId));
  } catch (error) {
    dispatch({ type: CART_ERROR, payload: error.message });
    console.error("🔥 clearCart error:", error.message);
  }
};


export const placeOrder = (userId, orderData) => async (dispatch) => {
  try {
    const ordersRef = collection(database, "userOrders");
    const orderPayload = {
      userId,
      items: orderData.items,
      total: orderData.total,
      paymentMethod: orderData.paymentMethod || "cod",
      createdAt: Timestamp.now(),
    };

    await addDoc(ordersRef, orderPayload);
    console.log("✅ Order saved to Firestore");

    // Clear cart after order placed
    dispatch(clearCart(userId));
  } catch (error) {
    console.error("❌ placeOrder error:", error.message);
  }
};