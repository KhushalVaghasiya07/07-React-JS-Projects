import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';

import { setProducts } from './redux/Actions';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import CartPage from './pages/CartPage.jsx';
import AddProductForm from './components/addProductForm';
import Header from './components/Navbar.jsx';
import Footer from "./components/Footer.jsx";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/products");
        dispatch(setProducts(response.data));
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };
    fetchProducts();
  }, [dispatch]);

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <main className="flex-grow-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/add_product" element={<AddProductForm />} />
          <Route path="/add-product/:id" element={<AddProductForm />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;