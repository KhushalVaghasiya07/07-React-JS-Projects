import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
  query,
  where
} from "firebase/firestore";
import { database } from "../../firebase";
import { getDoc } from "firebase/firestore";


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

export const clearProductDetail = () => ({
  type: CLEAR_PRODUCT_DETAIL,
});

const generateShortId = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const addNewProduct = (product) => async (dispatch) => {
  try {
    const id = generateShortId();
    const newProduct = { id, ...product };
    await addDoc(collection(database, "products"), newProduct);
    dispatch({ type: ADD_PRODUCT, payload: newProduct });
    return { success: true, id };
  } catch (error) {
    console.error("Add product failed:", error);
    return { success: false, error: error.message };
  }
};

export const updateProductData = (id, updatedData) => async (dispatch) => {
  try {
    const q = query(collection(database, "products"), where("id", "==", id));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      throw new Error("Product not found");
    }

    const docId = querySnapshot.docs[0].id;
    await updateDoc(doc(database, "products", docId), updatedData);

    dispatch({
      type: UPDATE_PRODUCT,
      payload: { id, ...updatedData },
    });

    return { success: true };
  } catch (error) {
    console.error("Update failed:", error);
    return { success: false, error: error.message };
  }
};

export const fetchAllProducts = () => async (dispatch) => {
  try {
    dispatch({ type: FETCH_PRODUCTS_REQUEST });

    const querySnapshot = await getDocs(collection(database, "products"));
    const products = querySnapshot.docs.map(doc => ({
      id: doc.data().id,
      ...doc.data()
    }));

    dispatch({ type: FETCH_PRODUCTS_SUCCESS, payload: products });
  } catch (error) {
    dispatch({
      type: FETCH_PRODUCTS_FAIL,
      payload: error.message
    });
  }
};

export const fetchProductsByCategory = (category) => async (dispatch) => {
  try {
    const normalizedCategory = category.toLowerCase();

    dispatch({
      type: FETCH_PRODUCTS_REQUEST,
      meta: { category: normalizedCategory },
    });

    const q = query(
      collection(database, "products"),
      where("category", "==", normalizedCategory)
    );

    const querySnapshot = await getDocs(q);
    const products = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    dispatch({
      type: FETCH_PRODUCTS_BY_CATEGORY,
      payload: {
        category: normalizedCategory,
        products,
      },
    });
  } catch (error) {
    console.error("Fetch by category error:", error);
    dispatch({
      type: FETCH_PRODUCTS_FAIL,
      meta: { category: category.toLowerCase() },
      payload: error.message,
    });
  }
};


export const deleteProduct = (productId) => async (dispatch) => {
  try {
    const q = query(
      collection(database, "products"),
      where("id", "==", productId)
    );

    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      throw new Error("Product not found");
    }

    const docId = querySnapshot.docs[0].id;
    await deleteDoc(doc(database, "products", docId));

    dispatch({
      type: DELETE_PRODUCT,
      payload: productId
    });

    return { success: true };
  } catch (error) {
    console.error("Delete error:", error);
    return { success: false, error: error.message };
  }
};

export const fetchProductById = (id) => async (dispatch) => {
  dispatch({ type: FETCH_PRODUCT_BY_ID_REQUEST });

  try {
    const productDoc = await getDoc(doc(database, "products", id));

    if (!productDoc.exists()) {
      throw new Error("Product not found");
    }

    dispatch({
      type: FETCH_PRODUCT_BY_ID_SUCCESS,
      payload: {
        id: productDoc.id,
        ...productDoc.data(),
      },
    });
  } catch (error) {
    console.error("Error fetching product:", error);
    dispatch({
      type: FETCH_PRODUCT_BY_ID_FAIL,
      payload: error.message,
    });
  }
};
