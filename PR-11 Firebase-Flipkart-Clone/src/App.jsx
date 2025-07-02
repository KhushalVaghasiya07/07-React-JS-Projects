import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import CartPage from './pages/CartPage.jsx';
import AddProductForm from './components/addProductForm';
import Header from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import CheckoutPage from './components/CheckoutPage.jsx';
import SignIn from './pages/Auth/Sign_In.jsx';
import MyOrders from './pages/Auth/MyOrders.jsx';
import SignUp from './pages/Auth/Sign_Up.jsx';
import { checkAuthStateAsync } from './redux/Actions/authActions';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuthStateAsync()); // ✅ keep user logged in after refresh
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
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/Sign_In" element={<SignIn />} />
          <Route path="/Sign_Up" element={<SignUp />} />
          <Route path="/my-orders" element={<MyOrders />} />

        </Routes>
      </main>

      <Footer />
    </div>
  );
};

export default App;
