import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import CartPage from './pages/CartPage.jsx';
import AddProductForm from './components/addProductForm';
import Header from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import CheckoutPage from './components/CheckoutPage.jsx';

const App = () => {
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
        </Routes>
      </main>

      <Footer />
    </div>
  );
};

export default App;