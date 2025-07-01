// src/redux/Actions/orderActions.js
import { collection, addDoc, serverTimestamp, query, where, getDocs } from "firebase/firestore";
import { database } from "../../firebase";
import { clearCart } from "./cartActions";

// src/redux/Actions/orderActions.js
export const createOrder = (items, total, guestId) => async () => {
  try {
    const orderData = {
      guestId,
      items,
      total,
      status: "processing",
      createdAt: serverTimestamp()
    };

    const docRef = await addDoc(collection(database, "orders"), orderData);
    return { success: true, orderId: docRef.id };
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
};

export const fetchGuestOrders = (guestId) => async () => {
  try {
    const q = query(collection(database, "orders"), where("guestId", "==", guestId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      // Convert Firestore timestamp to JS date
      createdAt: doc.data().createdAt?.toDate()
    }));
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
};