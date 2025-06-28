import axios from "axios";

export const ADD_PRODUCT = "ADD_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const FETCH_PRODUCT = "FETCH_PRODUCT";
export const FETCH_PRODUCT_FAIL = "FETCH_PRODUCT_FAIL";
export const FETCH_PRODUCTS_BY_CATEGORY = "FETCH_PRODUCTS_BY_CATEGORY";
export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const SET_PRODUCTS = "SET_PRODUCTS";
export const FETCH_PRODUCT_BY_ID = "FETCH_PRODUCT_BY_ID";

export const FETCH_PRODUCTS_REQUEST = "FETCH_PRODUCTS_REQUEST";
export const FETCH_PRODUCTS_SUCCESS = "FETCH_PRODUCTS_SUCCESS";
export const FETCH_PRODUCTS_FAIL = "FETCH_PRODUCTS_FAIL";

const generateShortId = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const addNewProduct = (product) => async (dispatch) => {
  try {
    const res = await axios.get("http://localhost:5000/products");
    let newId;
    let isUnique = false;
    while (!isUnique) {
      newId = generateShortId();
      isUnique = !res.data.find((item) => item.id === newId);
    }

    const newProduct = { id: newId, ...product };
    await axios.post("http://localhost:5000/products", newProduct);
    dispatch({ type: ADD_PRODUCT, payload: newProduct });
  } catch (error) {
    console.error("Add product failed:", error);
  }
};

export const updateProductData = (id, product) => async (dispatch) => {
  try {
    await axios.put(`http://localhost:5000/products/${id}`, product);
    dispatch({ type: UPDATE_PRODUCT, payload: { id, ...product } });
  } catch (error) {
    console.error("Update failed:", error);
  }
};

export const fetchProductsByCategory = (category) => async (dispatch) => {
  try {
    const res = await axios.get("http://localhost:5000/products");
    const filtered = res.data.filter(
      (item) => item.category.toLowerCase() === category.toLowerCase()
    );
    dispatch({
      type: FETCH_PRODUCTS_BY_CATEGORY,
      payload: { category, products: filtered },
    });
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};

export const deleteProduct = (productId) => async (dispatch) => {
  try {
    await axios.delete(`http://localhost:5000/products/${productId}`);
    dispatch({ type: DELETE_PRODUCT, payload: productId });
  } catch (error) {
    console.error("Error deleting product:", error);
  }
};

export const setProducts = (products) => ({
  type: SET_PRODUCTS,
  payload: products,
});

export const fetchProductById = (id) => async (dispatch) => {
  try {
    dispatch({ type: "FETCH_PRODUCT_BY_ID_REQUEST" });

    const res = await axios.get(`http://localhost:5000/products/${id}`);

    dispatch({
      type: "FETCH_PRODUCT_BY_ID_SUCCESS",
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: "FETCH_PRODUCT_BY_ID_FAIL",
      payload: err.message,
    });
  }
};

export const fetchProducts = () => async (dispatch) => {
  try {
    dispatch({ type: FETCH_PRODUCTS_REQUEST });

    const res = await axios.get("http://localhost:5000/products");

    dispatch({
      type: FETCH_PRODUCTS_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: FETCH_PRODUCTS_FAIL,
      payload: err.message,
    });
  }
};
