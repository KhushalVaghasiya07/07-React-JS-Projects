import { collection, addDoc, serverTimestamp, query, where, getDocs } from "firebase/firestore";
import { database } from "../../firebase";

// ✅ Create Order (works with dispatch and returns result)
export const createOrder = (items, total, guestId = null, userId = null) => {
  return async (dispatch) => {
    try {
      const orderData = {
        guestId,
        userId,
        items,
        total,
        status: "processing",
        createdAt: serverTimestamp(),
      };

      const docRef = await addDoc(collection(database, "orders"), orderData);

      // 🔥 return result to CheckoutPage or anywhere it's dispatched
      return { success: true, orderId: docRef.id };
    } catch (error) {
      console.error("Error creating order:", error);
      return { success: false, error };
    }
  };
};

// ✅ Fetch Guest Orders
export const fetchGuestOrders = (guestId) => {
  return async (dispatch) => {
    try {
      const q = query(collection(database, "orders"), where("guestId", "==", guestId));
      const querySnapshot = await getDocs(q);

      return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate(), // Firestore timestamp to JS date
      }));
    } catch (error) {
      console.error("Error fetching guest orders:", error);
      return [];
    }
  };
};

// ✅ Fetch User Orders
export const fetchUserOrders = (userId) => {
  return async (dispatch) => {
    try {
      const q = query(collection(database, "orders"), where("userId", "==", userId));
      const querySnapshot = await getDocs(q);

      return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate(),
      }));
    } catch (error) {
      console.error("Error fetching user orders:", error);
      return [];
    }
  };
};
