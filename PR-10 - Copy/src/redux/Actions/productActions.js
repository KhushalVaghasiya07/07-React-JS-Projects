import axios from "axios";

// Action Types
export const ADD_PRODUCT = "ADD_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const FETCH_PRODUCT = "FETCH_PRODUCT";
export const FETCH_PRODUCT_FAIL = "FETCH_PRODUCT_FAIL";

// 6-digit ID generator
const generateShortId = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Fetch product (for edit mode)
export const fetchProduct = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`http://localhost:5000/products/${id}`);
    dispatch({ type: FETCH_PRODUCT, payload: res.data });
  } catch (err) {
    dispatch({ type: FETCH_PRODUCT_FAIL, error: err.message });
  }
};

// Add product
export const addProduct = (product, navigate) => async (dispatch) => {
  try {
    const res = await axios.get("http://localhost:5000/products");

    let newId, isUnique = false;
    while (!isUnique) {
      newId = generateShortId();
      isUnique = !res.data.find((item) => item.id === newId);
    }

    const newProduct = { id: newId, ...product };
    await axios.post("http://localhost:5000/products", newProduct);
    dispatch({ type: ADD_PRODUCT, payload: newProduct });
    alert("Product added successfully!");
    navigate("/");
  } catch (err) {
    alert("Failed to add product.");
  }
};

// Update product
export const updateProduct = (id, product, navigate) => async (dispatch) => {
  try {
    await axios.put(`http://localhost:5000/products/${id}`, product);
    dispatch({ type: UPDATE_PRODUCT, payload: { id, product } });
    alert("Product updated successfully!");
    navigate("/");
  } catch (err) {
    alert("Failed to update product.");
  }
};
