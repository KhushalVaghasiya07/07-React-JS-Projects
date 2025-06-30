import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { database } from "../../firebase";

// Action Types
export const ADD_PRODUCT = "ADD_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const FETCH_PRODUCTS_BY_CATEGORY = "FETCH_PRODUCTS_BY_CATEGORY";
export const DELETE_PRODUCT = "DELETE_PRODUCT";

export const FETCH_PRODUCTS_REQUEST = "FETCH_PRODUCTS_REQUEST";
export const FETCH_PRODUCTS_SUCCESS = "FETCH_PRODUCTS_SUCCESS";
export const FETCH_PRODUCTS_FAIL = "FETCH_PRODUCTS_FAIL";

export const FETCH_PRODUCT_BY_ID_REQUEST = "FETCH_PRODUCT_BY_ID_REQUEST";
export const FETCH_PRODUCT_BY_ID_SUCCESS = "FETCH_PRODUCT_BY_ID_SUCCESS";
export const FETCH_PRODUCT_BY_ID_FAIL = "FETCH_PRODUCT_BY_ID_FAIL";

export const CLEAR_PRODUCT_DETAIL = "CLEAR_PRODUCT_DETAIL";

// Clear product detail (for cleanup)
export const clearProductDetail = () => ({
  type: CLEAR_PRODUCT_DETAIL,
});

// Utility to generate a 6-digit unique ID
const generateShortId = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// ✅ Add product to Firestore
export const addNewProduct = (product) => async (dispatch) => {
  try {
    const id = generateShortId();
    const newProduct = { id, ...product };
    await addDoc(collection(database, "products"), newProduct);
    dispatch({ type: ADD_PRODUCT, payload: newProduct });
  } catch (error) {
    console.error("Add product failed:", error);
  }
};

// ✅ Update product in Firestore
export const updateProductData = (id, updatedData) => async (dispatch) => {
  try {
    const querySnapshot = await getDocs(collection(database, "products"));
    const match = querySnapshot.docs.find((docSnap) => docSnap.data().id === id);

    if (match) {
      await updateDoc(doc(database, "products", match.id), updatedData);
      dispatch({ type: UPDATE_PRODUCT, payload: { id, ...updatedData } });
    }
  } catch (error) {
    console.error("Update failed:", error);
  }
};

// ✅ Fetch all products from Firestore
export const fetchAllProducts = () => async (dispatch) => {
  try {
    dispatch({ type: FETCH_PRODUCTS_REQUEST });

    const querySnapshot = await getDocs(collection(database, "products"));
    const products = querySnapshot.docs.map((doc) => doc.data());

    dispatch({ type: FETCH_PRODUCTS_SUCCESS, payload: products });
  } catch (error) {
    dispatch({ type: FETCH_PRODUCTS_FAIL, payload: error.message });
  }
};

// ✅ Fetch products by category
export const fetchProductsByCategory = (category) => async (dispatch) => {
  try {
    const querySnapshot = await getDocs(collection(database, "products"));
    const filtered = querySnapshot.docs
      .map((doc) => doc.data())
      .filter((item) => item.category?.toLowerCase() === category.toLowerCase());

    dispatch({
      type: FETCH_PRODUCTS_BY_CATEGORY,
      payload: { category, products: filtered },
    });
  } catch (error) {
    console.error("Fetch by category error:", error);
  }
};

// ✅ Delete product from Firestore
export const deleteProduct = (productId) => async (dispatch) => {
  try {
    const querySnapshot = await getDocs(collection(database, "products"));
    const match = querySnapshot.docs.find((docSnap) => docSnap.data().id === productId);

    if (match) {
      await deleteDoc(doc(database, "products", match.id));
      dispatch({ type: DELETE_PRODUCT, payload: productId });
    }
  } catch (error) {
    console.error("Delete error:", error);
  }
};

export const fetchProductById = (id) => async (dispatch) => {
  dispatch({ type: FETCH_PRODUCT_BY_ID_REQUEST });

  try {
    const docRef = doc(database, "products", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      dispatch({
        type: FETCH_PRODUCT_BY_ID_SUCCESS,
        payload: { id: docSnap.id, ...docSnap.data() }
      });
      return;
    }

    const querySnapshot = await getDocs(
      query(collection(database, "products"), where("id", "==", id))
    );

    if (querySnapshot.empty) {
      throw new Error("Product not found");
    }

    dispatch({
      type: FETCH_PRODUCT_BY_ID_SUCCESS,
      payload: {
        id: querySnapshot.docs[0].id,
        ...querySnapshot.docs[0].data()
      }
    });
  } catch (error) {
    dispatch({
      type: FETCH_PRODUCT_BY_ID_FAIL,
      payload: error.message
    });
  }
};

